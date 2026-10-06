# Grand Hôtel de France, Meyrueis : proposition de refonte

> **Proposition non officielle.** Ce site est une maquette réalisée sans accord de l'établissement. Il ne doit pas être mis en ligne sous le nom de l'hôtel avant validation écrite de celui-ci : contenus, tarifs, photos et mentions légales. Le fichier `public/robots.txt` interdit l'indexation, et un bandeau « Maquette non officielle » apparaît sur toutes les pages.

## Démarrage

Prérequis : Node.js 22.12 ou plus récent.

```sh
npm ci
npm run dev        # développement : http://localhost:4321
npm run build      # construction dans dist/
npm start          # serveur de production (dist/server/entry.mjs), variables HOST et PORT
```

Contrôles :

```sh
npm run check      # types (astro check)
npm run lint       # ESLint, règles d'accessibilité jsx-a11y strictes
npm test           # tests unitaires (Vitest)
npx playwright install chromium   # une seule fois
npm run build && npm run test:e2e # tests navigateur : 375, 768 et 1280 px, axe, parcours
npm run verify     # tout enchaîner
```

## Architecture

- Toutes les pages sont pré-rendues en HTML statique. La seule page servie à la demande est `/contact/` : elle traite le formulaire sur le serveur, avec l'adaptateur `@astrojs/node` en mode standalone.
- `src/data/` contient **tous les contenus modifiables**. Les pages n'en contiennent aucun en dur.
  - `hotel.ts` : coordonnées, horaires d'arrivée et de départ, petit-déjeuner, équipements, accès, accessibilité.
  - `chambres.ts` : catégories, capacités, literie, codes Reservit. Pour afficher un tarif « à partir de », renseigner `prixAPartirDe` ; il reste vide tant que l'hôtel ne l'a pas validé.
  - `offres.ts` : formules et prix. Mettre `publiee: false` pour masquer une offre.
  - `restaurant.ts` : horaires jour par jour (`null` = fermé), menus et prix.
  - `environs.ts`, `faq.ts`, `seo.ts` (title et description par page), `navigation.ts`, `photos-libres.json`.
  - Chaque donnée incertaine porte une liste `aConfirmer`. Elle s'affiche sur le site sous la mention « À confirmer ». Une fois l'information validée, vider cette liste.
- `src/lib/reservit.ts` construit les liens vers le moteur de réservation officiel Reservit (hotelid 152592). Le site ne calcule ni disponibilité ni prix de chambre.
- `src/lib/contact.ts` contient la validation du formulaire. Le même code sert côté serveur et côté navigateur.
- `src/components/` : composants réutilisables (cartes chambre et offre, bloc de réservation, note « à confirmer », galerie, photo, emplacement de photo en attente, etc.).
- `src/middleware.ts` et `src/lib/typo.ts` appliquent la typographie française (espaces insécables avant ; ? ! : et dans « »). Cela vaut pour toutes les pages HTML, générées ou servies. Les données peuvent donc être saisies avec des espaces ordinaires.
- `src/styles/global.css` : CSS natif en couches, avec les couleurs, espacements et typographies en variables dans `tokens`.

## Formulaire de contact

Les variables sont décrites dans `.env.example`.

| Variable | Rôle |
|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Serveur d'envoi. **Si `SMTP_HOST` est vide, le formulaire est en mode démonstration** : la demande est validée, rien n'est envoyé, et le visiteur en est clairement informé. |
| `MAIL_FROM`, `MAIL_TO` | Expéditeur et destinataire. |
| `CONTACT_RATE_LIMIT` | Nombre d'envois autorisés par adresse IP et par tranche de 10 minutes (5 par défaut). |
| `SITE_URL` | URL publique, utilisée pour les URL canoniques et le sitemap. |
| `ALLOWED_HOSTS` | Domaines supplémentaires, séparés par des virgules (préproduction). Sans cela, le contrôle d'origine d'Astro refuse les envois avec une erreur 403. |

Protections en place :
- contrôle d'origine (CSRF) ;
- champ piège anti-robot ;
- limitation du nombre d'envois ;
- validation serveur ;
- suppression des retours à la ligne dans les en-têtes ;
- `Cache-Control: no-store`.

Aucune donnée n'est stockée par le site : la demande est seulement transmise par e-mail. Si le formulaire est derrière un proxy, celui-ci doit transmettre l'adresse IP réelle, sinon la limitation s'applique au proxy entier. La limitation est gardée en mémoire : elle est remise à zéro au redémarrage et n'est pas partagée entre plusieurs instances.

## Photos

- **Photos officielles** (`public/images/officielles/`, déclarées dans `src/data/photos-officielles.ts`) : chambres et salle de bain (`photosChambres`, `photoSalleDeBain`) et établissement (`photosHotel` : façade et terrasse, piscine, salle de séminaires, cheminée, machine à café). Reprises du site actuel pour la maquette **locale** uniquement : elles appartiennent à l'hôtel, **ne pas mettre en ligne sans son autorisation écrite**. La photo « familiale » ne montre qu'un lit double et la pièce de la cheminée n'est pas précisée : à confirmer.
- **Photos libres** (`public/images/libres/`, déclarées dans `src/data/photos-libres.json`) : 31 photos Wikimedia Commons du village et des environs (dont 20 ajoutées pour la refonte : l'hôtel et le monument aux morts, le patrimoine du village (tour de l'Horloge, maison du Viguier, halle, quais, chapelle Notre-Dame-du-Rocher), vautours, gorges, causses, Aigoual, Bramabiau, Florac et deux fromages d'illustration (pélardon, pérail)). Auteur et licence sont crédités près de chaque image et sur `/credits-photos/`, qui liste automatiquement toutes les photos (libres et officielles) et les polices. Ajout : placer `{id}-800` et `{id}-1600` en `.webp` et `.jpg`, puis déclarer l'entrée dans le JSON.
- **`src/data/visuels.ts`** décide quelle photo va où (en-têtes de page, compositions de l'accueil, mosaïques, vignettes d'offres) avec légende et recadrage. Une entrée `{ attendu: '…' }` est un emplacement « Photo à venir » : sujet à photographier à l'hôtel, jamais remplacé par une autre photo.
- **Composants** : `Cliche.astro` affiche une photo libre ou officielle avec légende et crédit ; `CreditsGroupe.astro` regroupe les crédits sous une composition serrée (mosaïque, bandeau).
- **Italique Instrument Serif** (SIL OFL 1.1) : classe `.hand`, pour les sur-titres et annotations.

Photos à faire faire par l'hôtel : salle voûtée (vide et dressée), salon particulier, terrasse en gros plan, jardin belvédère, vrai petit-déjeuner, plats, vue depuis la salle de séminaires, chambre familiale montrant ses 4 couchages.

## Mise en production

Avant de publier :
1. obtenir la validation de l'hôtel (voir `docs/audit.md`, section 7 « Données à faire valider par l’hôtel ») ;
2. retirer `Disallow: /` de `public/robots.txt` ;
3. retirer le bandeau « Maquette » dans `src/layouts/BaseLayout.astro` ;
4. compléter les mentions légales.

Redirections 301 depuis l'ancien site (forcer aussi https, www et la barre finale) :

| Ancienne URL | Nouvelle URL |
|---|---|
| `/chambres-meyrueis-lozere` | `/chambres/` |
| `/infos-offre--meyrueis-lozere,chambre-double,731` | `/chambres/chambre-double/` |
| `/infos-offre--meyrueis-lozere,chambre-twin,732` | `/chambres/chambre-twin/` |
| `/infos-offre--meyrueis-lozere,chambre-triple,733` | `/chambres/chambre-triple/` |
| `/infos-offre--meyrueis-lozere,chambre-familiale,734` | `/chambres/chambre-familiale/` |
| `/restaurant-meyrueis-lozere` | `/restaurant/` |
| `/seminaire-meyrueis-lozere` | `/groupes-seminaires/` |
| `/offres-speciales-cadeaux-meyrueis-lozere`, `/infos-offre--meyrueis-lozere` | `/offres/` |
| `…,formule-demi-pension,606` | `/offres/#demi-pension` |
| `…,formule-demi-pension-groupe,605` | `/groupes-seminaires/#demi-pension-groupe` |
| `…,petit-dejeuner,611` | `/offres/#petit-dejeuner` |
| `…,circuit-voitures-motos-velos,608` | `/offres/#circuit-voitures-motos-velos` |
| `…,circuit-randonnees,609` | `/offres/#circuit-randonnees` |
| `…,circuit-autocaristes,610` | `/groupes-seminaires/#autocaristes` |
| `…,forfait-journee-detude,622` | `/groupes-seminaires/#journee-etude` |
| `/tourisme-meyrueis-lozere` | `/meyrueis-environs/` |
| `/acces-contact-meyrueis-lozere` | `/contact/` |
| `/mentions-legales` | `/mentions-legales/` |
| `/charte-vie-privee` | `/confidentialite/` |
| `/plan-du-site-hotel` | `/plan-du-site/` |

## Documents

- `docs/audit.md` : audit du site actuel. Il distingue les faits fiables, ceux à confirmer et les contradictions, et donne la liste des points à faire valider par l'hôtel.
- `docs/contenus-seo.md` : textes, balises SEO, FAQ, données structurées, pages légales.
- `docs/design-ux.md` : principes visuels et d'ergonomie.
