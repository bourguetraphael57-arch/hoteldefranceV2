# Design & UX — refonte non officielle du Grand Hôtel de France (Meyrueis)

Cible : Astro 5 statique, CSS natif (custom properties, `@layer`), JS minimal (menu, visionneuse, widget dates). Réservation : Reservit (lien externe, `hotelid=152592`, `custId=2`).

## 1. Direction : « hôtel de village contemporain »

- Chaleureux et naturel : fonds couleur calcaire, bois de teck en accent, vert des pins pour la confiance (succès, labels), bleu de l'Aigoual pour les liens d'information.
- Sobre : pas de dorures, pas de filets ornementaux, pas de texte « luxe ». La maison est familiale (depuis 1946), l'ancien relais de poste en pierre fait le travail : de grandes photos honnêtes, beaucoup d'air, une typographie lisible.
- Léger : aucune animation de défilement, pas de carrousel automatique. Seules transitions autorisées : 150 ms sur couleur/ombre, désactivées sous `prefers-reduced-motion`.
- Pourquoi : les clients (familles, randonneurs, motards, groupes, étapes d'affaires) consultent surtout sur mobile, parfois sur un réseau faible en zone de gorges. Ils cherchent vite : disponibilités, prix, téléphone, accès. Le faux luxe contredirait l'offre réelle (demi-pension, terroir) et abîmerait la confiance.

## 2. Design tokens

### Couleurs (contrastes WCAG calculés, formule de luminance relative 2.x)

| Token | Hex | Rôle | Contraste vérifié |
|---|---|---|---|
| `--c-bg` | `#F6F1E7` | fond de page (calcaire) | — |
| `--c-surface` | `#FFFCF6` | cartes, formulaires | — |
| `--c-surface-2` | `#ECE4D6` | sections alternées, en-tête de tableau | — |
| `--c-text` | `#2A241F` | texte principal | 13,61 sur bg · 14,96 sur surface · 12,14 sur surface-2 |
| `--c-text-muted` | `#5E554B` | texte secondaire, légendes | 6,48 sur bg · 7,13 sur surface · 5,78 sur surface-2 |
| `--c-accent` | `#8B4A22` | teck : fond du CTA, liens forts | blanc dessus 6,77 · sur bg 6,02 · sur surface-2 5,37 |
| `--c-accent-hover` | `#6F3918` | survol/actif du CTA | blanc dessus 9,23 · sur bg 8,20 |
| `--c-pin` | `#2F5A3C` | vert pin/buis : titres de section, badges | 7,04 sur bg · blanc dessus 7,93 |
| `--c-sky` | `#35627F` | bleu Aigoual : liens informatifs | 5,82 sur bg · blanc dessus 6,55 |
| `--c-border` | `#D9CFBF` | séparateurs décoratifs uniquement | 1,37 (non porteur d'info) |
| `--c-border-strong` | `#8A7E70` | bordures de champs, contrôles | 3,52 sur bg · 3,87 sur surface (≥ 3:1, WCAG 1.4.11) |
| `--c-success` / `--c-success-bg` | `#2E6B3F` / `#E6F0E5` | message de succès | 5,46 texte sur fond |
| `--c-error` / `--c-error-bg` | `#A12D1F` / `#F9E5E1` | erreur de champ, alerte | 5,95 sur error-bg · 7,05 sur surface |
| `--c-warn-text` / `--c-warn-bg` | `#6A4700` / `#FBF0D4` | bandeau « à confirmer » | 7,37 |
| `--c-warn-border` | `#A07A2C` | bordure gauche du bandeau | 3,48 sur warn-bg |
| `--c-focus` | `#1F5F8B` | anneau de focus | 6,08 sur bg · 6,68 sur surface |
| `--c-footer-bg` / `--c-footer-text` / `--c-footer-link` | `#2A241F` / `#ECE4D6` / `#E9B98F` | pied de page sombre | 12,14 · 8,61 |

Règles : jamais de texte en `--c-border`. L'anneau de focus fait 3 px avec `outline-offset: 3px` : il repose sur le fond et non sur le bouton teck (focus sur teck = 1,01, à proscrire). Pas de mode sombre en v1 (tokens prêts à être surchargés plus tard).

### Typographie (2 familles)

- Titres : Source Serif 4 (SIL OFL, variable), auto-hébergée en woff2 via `@fontsource-variable/source-serif-4` ou fichier local. Graisses 600 (titres) et 400 italique (accroches, rare). `font-display: swap`, précharger uniquement le fichier latin normal.
  Pile : `"Source Serif 4", "Iowan Old Style", "Palatino Linotype", Georgia, serif`.
- Texte et interface : pile système, 400 / 600, sans téléchargement.
  Pile : `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
- Échelle fluide (320 → 1280 px) :

```css
--fs-sm:   clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem); /* légendes, mentions */
--fs-base: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);      /* corps : 16 → 18 px */
--fs-lg:   clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem);  /* chapô, h4 */
--fs-xl:   clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);    /* h3 */
--fs-2xl:  clamp(1.75rem, 1.45rem + 1.4vw, 2.5rem);     /* h2 */
--fs-3xl:  clamp(2.125rem, 1.6rem + 2.4vw, 3.5rem);     /* h1 */
--lh-tight: 1.15; /* h1-h2 */  --lh-snug: 1.3; /* h3-h4, boutons */  --lh-body: 1.6;
```
Largeur de ligne max `65ch`. Pas de texte en majuscules intégrales sauf les micro-étiquettes (`letter-spacing: .06em`, ≤ 3 mots).

### Espacements, rayons, ombres

```css
--sp-1: .25rem; --sp-2: .5rem; --sp-3: .75rem; --sp-4: 1rem; --sp-5: 1.5rem;
--sp-6: 2rem; --sp-7: 3rem; --sp-8: clamp(3rem, 2rem + 4vw, 6rem); /* entre sections */
--container: 72rem; --gutter: clamp(1rem, 0.5rem + 2.5vw, 2rem);
--radius-sm: 4px; /* champs, badges */ --radius-md: 8px; /* cartes, boutons */ --radius-lg: 12px; /* images mises en avant */
--shadow-1: 0 1px 2px rgb(42 36 31 / .08);
--shadow-2: 0 4px 16px rgb(42 36 31 / .10); /* survol carte, barre mobile, dialog */
--tap: 44px; /* cible tactile minimale, 48px pour la barre mobile */
```

## 3. Navigation

- Menu principal (7 entrées) : L'hôtel · Chambres · Restaurant · Offres · Groupes & séminaires · Meyrueis & environs · Infos pratiques. À droite, hors liste : bouton « Réserver » (primaire) et lien `tel:+33466456007`. Contact est atteint via Infos pratiques, le pied de page et la barre mobile. FR/EN : lien texte « English » avec `hreflang="en" lang="en"`.
- Page courante : `aria-current="page"` avec un soulignement de 2 px en `--c-accent`, jamais la couleur seule.
- Fil d'Ariane sur toutes les pages sauf l'accueil : `<nav aria-label="Fil d'Ariane"><ol>`, séparateurs en CSS (`::before`, ignorés par les lecteurs d'écran), dernier élément `aria-current="page"` non cliquable. Données BreadcrumbList en JSON-LD.
- Pied de page (fond sombre) sur 4 colonnes, empilées sur mobile : (1) coordonnées complètes, horaires d'arrivée 15h–20h / départ 7h30–11h ; (2) Séjourner : chambres, offres, restaurant, séminaires ; (3) Pratique : accès, FAQ, accessibilité, contact ; (4) Mentions légales, confidentialité, gestion des cookies, plan du site. Dernière ligne : mention « Maquette non officielle ».
- En-tête desktop (≥ 64rem) : collant, 72 px, fond `--c-surface`, ombre `--shadow-1` après défilement (classe posée par un IntersectionObserver sur une sentinelle, sans écouteur de scroll).
- En-tête mobile : 56 px, logo texte + bouton « Menu ». Pas de CTA « Réserver » dans l'en-tête : il est dans la barre du bas.
- Menu mobile :
  - `<button aria-expanded="false" aria-controls="menu">` avec l'étiquette visible « Menu » / « Fermer » et une icône `aria-hidden`.
  - Panneau plein écran sous l'en-tête. Échap ferme et rend le focus au bouton. Un clic sur un lien ferme. `inert` sur `main` et `footer` quand le panneau est ouvert (ce qui dispense d'un piège de focus en JS).
  - Sans JS : le menu reste visible en liste dépliée (amélioration progressive, `<noscript>` inutile).
- Barre d'action fixe mobile (< 64rem) : `position: fixed; inset-inline: 0; bottom: 0`, 3 cibles égales de 48 px minimum : Réserver (primaire teck) · Appeler (`tel:`) · Itinéraire (lien Google Maps / `geo:` en repli). Chaque cible porte une icône et un libellé texte.
  - `padding-bottom: max(var(--sp-2), env(safe-area-inset-bottom))` ; ajouter `viewport-fit=cover` à la meta viewport ; appliquer aussi `safe-area-inset-left/right` au conteneur.
  - Réserver de la place : `body { padding-bottom: calc(64px + env(safe-area-inset-bottom)) }`.
  - Masquer la barre quand le clavier est ouvert, soit sur `focusin` d'un champ de formulaire, soit en cachant la barre pendant qu'un champ a le focus. Dans les deux cas, le focus ne doit jamais se retrouver sous la barre (WCAG 2.4.11, `scroll-padding-bottom`).
- Lien d'évitement « Aller au contenu » en premier élément focusable.

## 4. Gabarits de pages (ordre des sections)

- Accueil
  1. Hero court : photo façade, H1 « Hôtel familial à Meyrueis, entre Causses et Cévennes », une phrase de promesse, puis 4 atouts factuels (44 chambres rénovées en 2017, restaurant de terroir, piscine chauffée et jardin belvédère, parking et garage deux-roues).
  2. Bloc réservation (dates → Reservit) + « Appeler » + « Demande de disponibilité ».
  3. Chambres : 4 cartes (double, twin, triple, familiale) et lien vers le comparatif.
  4. Restaurant : terrasse en teck, salle voûtée de 70 places, horaires, lien vers les menus.
  5. Formules : demi-pension, petit-déjeuner, groupes (3 cartes offre).
  6. Environs : 4 à 6 sites (Aigoual, gorges de la Jonte et du Tarn, Dargilan, Maison des vautours…).
  7. Infos pratiques résumées : horaires, accès, animaux, et encart accessibilité.
  8. Contact.
- Chambres : intro (équipements communs : ascenseur, TV, wifi, bureau USB), cartes comparatives, puis tableau comparatif `<table>` avec `<caption>`, `<th scope="col|row">`, conteneur `overflow-x:auto` avec `tabindex="0"` et `role="region"` + `aria-label` (colonnes : type, capacité, literie, surface, salle d'eau, tarif). Cellule inconnue : « Non communiqué » en toutes lettres, jamais un tiret seul. Ensuite petit-déjeuner et demi-pension, puis FAQ courte.
- Fiche chambre : fil d'Ariane, H1, galerie, résumé (capacité, literie, surface), bloc réservation spécifique (`roomtcode`), équipements en liste, conditions (arrivée/départ, animaux), autres chambres (3 cartes max).
- Restaurant : intro terroir, espaces (terrasse, salon particulier, salle voûtée), menus en HTML (pas seulement en PDF ; PDF en téléchargement avec poids et format indiqués), horaires sous forme de tableau des jours, puis « Réserver une table » (`tel:` + formulaire) et groupes à partir de 10 personnes.
- Offres : filtre simple en ancres (Séjour · Restauration · Groupes · Circuits), cartes offre, conditions générales, cartes cadeaux si confirmées.
- Groupes & séminaires : 2 publics (tourisme/autocaristes, professionnels), salle de séminaire (capacité à confirmer), restauration de groupe, circuits, formulaire de devis.
- Meyrueis & environs : le village, puis sites classés par thème et temps de route (tableau), marché et foire de la Saint-Michel, liens externes signalés comme tels.
- Infos pratiques & accessibilité : horaires, accès voiture/train/avion, parking, animaux, paiement, encart accessibilité complet, lien vers la FAQ.
- FAQ : questions groupées par thème en `<details><summary>` (le résumé contient la question complète), tous fermés par défaut sauf si ciblé par ancre, JSON-LD FAQPage.
- Contact & accès : coordonnées cliquables, carte statique (image + lien « Ouvrir l'itinéraire », pas d'iframe avant consentement), formulaire.
- Pages légales : colonne unique `65ch`, sommaire en ancres, date de mise à jour.

## 5. Composants

- Bouton : `.btn` en 3 variantes. Primaire : fond teck, texte blanc. Secondaire : bordure 2 px `--c-accent`, texte teck, fond transparent. Lien : texte souligné (`text-underline-offset: .2em`). États : repos, survol (primaire → `--c-accent-hover` ; secondaire → fond `--c-surface-2`), `:focus-visible` (anneau `--c-focus`), actif (`translateY(1px)`), désactivé (`aria-disabled="true"`, opacité .55, curseur par défaut, reste focusable avec un message qui explique pourquoi). Hauteur minimale 44 px, padding `0 var(--sp-5)`. Un lien externe vers Reservit porte le libellé « Réserver (site sécurisé Reservit) » ou une icône avec texte caché « nouvelle fenêtre » s'il ouvre un onglet ; préférer le même onglet.
- Carte chambre : `<article>` avec image 3:2, puis H3 contenant le lien de la carte (zone cliquable étendue par `::after` ; les autres boutons de la carte restent au-dessus via `position: relative; z-index`), puis une liste de caractéristiques en `<dl>` (Capacité, Literie, Surface) et une zone tarif. Champ manquant : ligne omise, sauf la surface qui s'affiche « Surface : non communiquée ». Tarif inconnu : « Tarif selon dates — voir disponibilités » en `--c-text-muted`, suivi du bouton secondaire « Voir les disponibilités » (lien `tabavail`). Ne jamais afficher « -€ », « € » vide ou un prix barré (supprimer l'argument « autre site » tant qu'il n'est pas sourcé). Actions : « Réserver » (primaire) et « Détails » (lien). Survol : `--shadow-2`.
- Carte offre : image 3:2, étiquette de catégorie, titre, 2 lignes de résumé (`line-clamp` purement visuel, texte complet dans le DOM), puis le prix au format « 82 € / jour / personne » avec « base 2 personnes » en muted et la mention « Tarif indicatif, à confirmer » tant qu'il n'est pas validé. Sans prix : « Tarif sur demande ». CTA : « Voir l'offre ».
- Bloc réservation : `<form action="https://secure.reservit.com/reservit/reserhotel.php" method="get">` avec des champs masqués (`hotelid`, `custId`, `lang`) et visibles : Arrivée et Départ (`type="date"`, `min` = aujourd'hui, départ > arrivée validé à la soumission), Adultes (stepper = `<input type="number" min="1">` entouré de 2 boutons −/+ de 44 px avec `aria-label`). Les noms de paramètres de dates Reservit sont à confirmer avec l'hôtel ou Reservit ; en attendant, repli sur le lien « Voir le tableau des disponibilités ». Sous le bouton : « Paiement sur le site sécurisé Reservit ». Alternative visible : « Vous préférez nous écrire ? Demande de disponibilité » (formulaire préremplissant les dates) et le téléphone.
- Galerie : grille CSS `repeat(auto-fill, minmax(10rem, 1fr))`, chaque vignette est un `<button>` contenant l'`<img>` avec son `alt`. La visionneuse `<dialog>` s'ouvre avec `showModal()` (focus et inert natifs) et contient : image, légende `<figcaption>`, compteur « 3 / 12 » en `aria-live="polite"`, boutons Précédent / Suivant / Fermer (44 px). Clavier : ← → pour naviguer, Échap pour fermer (natif), focus rendu à la vignette d'origine. Pas de balayage obligatoire (le tactile reste facultatif). Sans JS, les vignettes deviennent des liens vers l'image.
- Bandeau « information à confirmer » : `<p class="note-confirm">` en ligne (pas de modale), fond `--c-warn-bg`, bordure gauche 4 px `--c-warn-border`, icône `aria-hidden` et texte préfixé « À confirmer : » (ex. « À confirmer : classement 3 étoiles, capacité de la salle de séminaire »). Variante compacte : badge « à confirmer » à côté d'une valeur.
- Encart accessibilité prudent : `<aside aria-labelledby>` titré « Accessibilité de l'hôtel ». Il rapporte uniquement les faits publiés : « L'hôtel indique ne pas disposer de chambre adaptée aux personnes à mobilité réduite. Les chambres sont desservies par un ascenseur. » Il invite ensuite à appeler pour tout besoin spécifique. Ne pas reprendre le pictogramme « Accueil PMR » de l'ancien site, qui contredit ce texte (signalé comme incohérence à lever).
- Formulaire : labels visibles au-dessus des champs, avec « (obligatoire) » en texte, pas seulement un astérisque. Aides en `<p id>` liées par `aria-describedby`. `autocomplete` renseigné (name, email, tel). Validation à la soumission : les champs fautifs reçoivent `aria-invalid="true"` et un message `<p id="x-err">` ajouté à `aria-describedby`, en `--c-error` avec icône et texte. Un récapitulatif d'erreurs en tête de formulaire (`role="alert"`, liens vers les champs) reçoit le focus. Succès : panneau `--c-success-bg` avec `role="status"`, qui reprend ce qui a été envoyé et le délai de réponse. En cas d'échec d'envoi, afficher un message clair et le téléphone. Anti-spam par champ piège, sans CAPTCHA visuel. Consentement RGPD : texte d'information plutôt qu'une case précochée.
- Bandeau « maquette non officielle » : bande de 32 px au-dessus de l'en-tête, fond `--c-surface-2`, texte `--fs-sm` : « Maquette non officielle — pour réserver, utilisez les coordonnées officielles de l'hôtel. » Non refermable en v1 et repris dans le pied de page. Aucun logo officiel sans autorisation.

## 6. Parcours mobile : choisir une chambre puis réserver ou contacter

1. Accueil ou barre du bas → « Chambres » : cartes empilées, capacité lisible en premier (« 2 pers. », « 4 pers. »). Un filtre d'ancres « 2 / 3 / 4 personnes » en haut est facultatif.
2. Fiche chambre : photo, capacité et literie visibles sans défilement, puis bloc réservation déjà ciblé sur ce type de chambre.
3. Choix des dates et des adultes → « Réserver » ouvre Reservit (même onglet, dates transmises si les paramètres sont confirmés, sinon tableau des disponibilités du type).
4. Alternative à chaque étape, via la barre du bas : « Appeler » ou « Demande de disponibilité » (formulaire court de 5 champs : nom, e-mail ou téléphone, dates, personnes, message), qui se termine par un écran de confirmation.

## 7. Images

- Ratios : hero 16:9 (desktop) / 4:5 (mobile, via `<picture>` avec `media`) ; cartes 3:2 ; galerie 4:3 ; portrait (équipe, plats) 4:5. Toujours `width`/`height` ou `aspect-ratio` pour un CLS nul.
- Astro `<Image>` / `<Picture>` (astro:assets) : AVIF + WebP + JPEG de repli, largeurs 400/800/1200/1600.
  - `sizes` des cartes : `(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw`.
  - `sizes` du hero : `100vw`.
- Hero : `loading="eager"` avec `fetchpriority="high"`. Tout le reste en `loading="lazy" decoding="async"`. Poids cible ≤ 200 Ko pour le hero, ≤ 80 Ko par carte.
- `alt` descriptif et factuel (« Terrasse en teck fleurie du restaurant »), `alt=""` pour les images décoratives. Pas de texte incrusté dans les images.
- Placeholder quand la photo n'est pas autorisée : composant `<PhotoPending label="Façade de l'hôtel">`.
  - Même ratio que l'image attendue, fond `--c-surface-2`, bordure 1 px en tirets `--c-border-strong`, pictogramme appareil photo au trait (`aria-hidden`) et texte centré « Photo à venir — Façade de l'hôtel » en `--c-text-muted`.
  - Rendu en `role="img"` avec `aria-label` identique.
  - Aucune photo de banque d'images, aucune illustration générée, aucun flou simulant une vraie photo.
  - Tenir un registre des autorisations (source, droits, crédit) ; le crédit s'affiche en légende quand il est requis.

## 8. Checklist accessibilité (RGAA 4.1 / WCAG 2.2 AA)

- [ ] `lang="fr"` sur `<html>`, `lang="en"` sur les passages anglais ; `<title>` unique « Page — Grand Hôtel de France (maquette) ».
- [ ] Un seul `<h1>`, hiérarchie sans saut ; repères `header`, `nav` (labellisés s'il y en a plusieurs), `main`, `footer` ; lien d'évitement.
- [ ] Contrastes : texte ≥ 4,5:1, grands textes et composants d'interface ≥ 3:1 (tokens ci-dessus). Aucune information portée par la couleur seule.
- [ ] Focus visible partout (`:focus-visible`, 3 px, offset 3 px), ordre logique, jamais masqué par l'en-tête collant ou la barre mobile (`scroll-padding-top/bottom`, WCAG 2.4.11).
- [ ] Cibles ≥ 44×44 px (au-delà du minimum 24 px de WCAG 2.5.8) avec au moins 8 px d'espacement ; aucune action qui dépend uniquement d'un geste ou d'un glissement (2.5.7).
- [ ] Menu, visionneuse et FAQ entièrement utilisables au clavier ; Échap ferme ; focus restitué ; `aria-expanded` à jour.
- [ ] Formulaires : labels visibles, `autocomplete`, erreurs textuelles liées par `aria-describedby`, `aria-invalid`, récapitulatif focalisé ; pas de limite de temps ; aucune ressaisie exigée d'une information déjà fournie (3.3.7) ; pas de CAPTCHA cognitif (3.3.8).
- [ ] Tableaux : `<caption>`, `th` avec `scope` ; aucun tableau de mise en page.
- [ ] Images : `alt` pertinents, décoratives en `alt=""` ; icônes SVG `aria-hidden="true"` accompagnées d'un texte.
- [ ] Liens explicites hors contexte (« Voir les menus du restaurant » plutôt que « En savoir + ») ; ouverture d'une nouvelle fenêtre et format/poids des PDF annoncés.
- [ ] Zoom 200 % et reflow à 320 px sans défilement horizontal (hors tableau dans sa région défilante) ; espacement de texte (1.4.12) sans perte.
- [ ] `prefers-reduced-motion` respecté ; aucun contenu clignotant ni lecture automatique.
- [ ] Contenus tiers (carte, avis, réseaux sociaux) chargés seulement après consentement, avec une alternative texte ou un lien.
- [ ] Mêmes libellés et même ordre de navigation sur toutes les pages (3.2.3/3.2.4) ; aide (téléphone, contact) au même endroit (3.2.6).
- [ ] Tests : clavier seul, VoiceOver iOS + Safari, NVDA + Firefox, axe-core/Pa11y en CI sur chaque gabarit, Lighthouse accessibilité ≥ 95.
- [ ] Déclaration d'accessibilité (même simplifiée) dans le pied de page, avec l'état « non conforme / partiellement conforme » tant qu'aucun audit n'a été fait.
