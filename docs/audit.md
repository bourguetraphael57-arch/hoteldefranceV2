# Audit du site actuel – Grand Hôtel de France (Meyrueis, Lozère)

Audit préparatoire à une refonte **non officielle**. Aucune réservation n'a été faite et aucun formulaire n'a été envoyé.

## 0. Sources et méthode

- **[Export]** : fichiers Markdown de `sources-site-actuel/` (23 fichiers FR : accueil, 404, accès-contact, chambres, charte, 11 offres, mentions légales, offres, plan du site, restaurant, séminaire, sitemap, tourisme). Les références sont données sous la forme `page:ligne`. Le préfixe `www.hotel-meyrueis-lozere.fr_` est omis, et `accueil` désigne `www.hotel-meyrueis-lozere.fr_.md`.
- **[En ligne 29/09/2026]** : vérifications faites aujourd'hui avec `curl` :
  - HTML des pages FR (.fr) et EN (.com) ;
  - JavaScript `production.min.js?v=177007b6f3c` ;
  - requêtes GET sur secure.reservit.com (suivi des redirections, **sans aller jusqu'à une réservation**) ;
  - téléchargement des images, dimensions mesurées avec `sips` ;
  - doublons repérés par md5.
- Le contenu FR en ligne correspond à l'export.
- Le site EN n'est pas dans l'export : toutes les données EN sont donc **[En ligne]**.
- Les calendriers et le bandeau cookies ont été ignorés, comme demandé.
- Les fichiers temporaires (`/tmp/audit-hdf-verif`) ont été supprimés à la fin de l'audit.

---

## 1. Inventaire des pages et des offres

### Pages FR (https://www.hotel-meyrueis-lozere.fr/) – toutes en HTTP 200 [En ligne]

| Page | URL (chemin) | Contenu principal |
|---|---|---|
| Accueil | `/` | Présentation, historique « depuis 1946 », services, activités, offres, modale « Demi-pension Groupe 78€ » |
| Chambres | `/chambres-meyrueis-lozere` | 4 types de chambres, petit-déjeuner, boutons Reservit |
| Restaurant | `/restaurant-meyrueis-lozere` | Menu « Autour du Terroir », carte, 2 PDF, horaires |
| Séminaire / groupes | `/seminaire-meyrueis-lozere` | Salle de séminaire, offres groupes et circuits |
| Tourisme | `/tourisme-meyrueis-lozere` | 10 activités avec distances |
| Offres | `/offres-speciales-cadeaux-meyrueis-lozere` | Liste des offres |
| Accès / contact | `/acces-contact-meyrueis-lozere` | FAQ, accès, distances, labels, équipements |
| Mentions légales | `/mentions-legales` | Société, hébergeur, cookies |
| Charte vie privée | `/charte-vie-privee` | Texte générique (voir §2) |
| Plan du site | `/plan-du-site-hotel` | Liens (dont un lien vers `/404`) |
| 404 | `/404` | Page d'erreur contenant le gabarit complet |
| sitemap.xml | `/sitemap.xml` | 10 URL, **aucune page d'offre** |

### Offres (`/infos-offre--meyrueis-lozere,<slug>,<id>`) [Export]

| ID | Offre | Prix affiché | Contenu |
|---|---|---|---|
| 731 | Chambre double | « -€ » (vide) | 12 à 15 m², 2 pers., 140x190. Section « Descriptif » vide |
| 732 | Chambre twin | « -€ » | Aucune caractéristique |
| 733 | Chambre triple | « -€ » | « 3 pers. » |
| 734 | Chambre familiale | « -€ » | « 4 pers. » |
| 606 | Formule demi-pension | 82€ / jour / personne | « pour 2 personnes » : nuitée en chambre double, « petit-déjeuner complet », « dîner du terroir (imposé) », wifi |
| 605 | Formule demi-pension – Groupe | 78€ / jour / personne | « à partir de 10 personnes » : « petit déjeuner continental », dîner vin et café compris, « 1 gratuité pour 20 personnes payantes », « 1 apéritif de bienvenue à partir d'un séjour de 3 jours » |
| 611 | Petit déjeuner | 12.50€ | « servi de 7h30 à 9h30 » avec la composition |
| 622 | Forfait journée d'étude | 78€ / jour / personne | **Aucun contenu** en dehors du prix |
| 608 | Circuit voitures / motos / vélos | 78€ / jour / personne | 4 circuits |
| 609 | Circuit randonnées | 78€ / jour / personne | 4 GR |
| 610 | Circuit autocaristes | 78€ / jour / personne | 3 circuits (coquilles « cautours », « causenarde », « bramabiau ») |

- Aucune offre n'indique de période de validité, de conditions générales de vente ou de conditions d'annulation.
- Mentions légales : section « Conditions générales de vente » = « A renseigner ici ».

### Pages EN (https://www.hotel-meyrueis-lozere.com/) – toutes en HTTP 200 [En ligne]

- Pages : home, rooms, restaurant, seminar, tourism, `spacial-offers-gifts-meyrueis-lozere` (coquille « spacial » dans l'URL), access-contact, legal-notice, charte, plan.
- Offres 605 à 611 et 731 à 734 présentes.
- Exception : `study-day-package,622` renvoie un **302 vers /404** (l'offre journée d'étude n'existe pas en EN).

---

## 2. Données : FIABLE / À CONFIRMER / CONTRADICTOIRE

- **FIABLE** : cohérent partout où la donnée apparaît et vérifié en ligne aujourd'hui (FIABLE veut dire « stable sur le site », pas « validé par l'hôtel »).
- **À CONFIRMER** : une seule source, ou donnée ancienne, vide ou incomplète.
- **CONTRADICTOIRE** : sources divergentes.

| Donnée | Valeur | Statut | Source (page + extrait) |
|---|---|---|---|
| Nom | Grand Hôtel de France | FIABLE | Toutes les pages |
| Classement | Hôtel 3 étoiles | À CONFIRMER | accueil : « Hôtel*** familial » (aucune date de classement Atout France) |
| Adresse | 10 Place Jean Séquier, 48150 Meyrueis | FIABLE | acces-contact:89 « 10, Place Jean Séquier 48150 Meyrueis » |
| GPS | 44.1781333, 3.4281833 | FIABLE | Lien goo.gl/maps/ThJRfeny9qAF4noM9 (302 vers Google Maps) [En ligne] |
| Téléphone | +33 (0)4 66 45 60 07 | FIABLE (numéro) mais liens cassés | Affiché « +33(0)4 66 45 60 07 ». Liens `tel:+334 66 45 60 07` (acces-contact:27) et `tel:4 66 45 60 07` (acces-contact:91) sont malformés. Le format correct est `tel:+33466456007` |
| E-mail | grandhoteldefrance@wanadoo.fr | FIABLE | acces-contact:93 |
| Historique | Famille Cordelier depuis 1946, ancien relais de poste du XVIIe | À CONFIRMER | accueil:177-179 « la famille Cordelier vous reçoit depuis 1946 » ; « ancien relais de poste du XVIIe siècle » |
| Nombre de chambres | 44 | FIABLE (cohérent) | accueil:179 et chambres:169 « les 44 chambres » |
| Rénovation | 2017 | À CONFIRMER (date ancienne) | chambres:169 « totalement rénovées en 2017 » |
| Types de chambres | double, twin, triple, familiale… et duplex ? | CONTRADICTOIRE | chambres:173 « De la chambre double, twin, triple au duplex ». Aucune offre duplex n'existe |
| Surface double | 12 à 15 m² | À CONFIRMER | chambres:183 « 12 à 15m² ». Offre 606 : « 12 m2m² » |
| Lit double | 140x190 | À CONFIRMER | chambres:187 « 140X190 ». Offre 606 : « 140cm ou 2x90cm » |
| Twin, triple et familiale | Capacités seulement (triple 3 pers., familiale 4 pers.) | À CONFIRMER | chambres, offres 732-734 : aucune surface ni literie |
| Prix des chambres | Vides | À CONFIRMER | chambres : « **-€ en réservant sur notre site** » / « Autre site : ~~€~~ » |
| Équipements des chambres | Bain ou douche/WC, sèche-cheveux, prise rasoir, TV écran plat, wifi, bureau avec USB, téléphone | À CONFIRMER | chambres:171 |
| Petit-déjeuner – horaires | 7h30 à 9h30 | FIABLE | Offre 611 et chambres « servi de 7h30 à 9h30 » |
| Petit-déjeuner – type | « complet » ou « continental » ? | CONTRADICTOIRE | Offre 606 FR : « 1 petit-déjeuner complet ». Offre 605 FR : « 1 petit déjeuner continental ». EN : « continental breakfast with a buffet area » |
| Petit-déjeuner – prix | 12.50€ | À CONFIRMER | Offre 611 « 12.50€ » |
| Horaires de l'hôtel | Arrivées 15h00-20h00, départs 7h30-11h00 | FIABLE | acces-contact:97-99 |
| Demi-pension | 82€ / jour / personne, pour 2 personnes | À CONFIRMER | Offre 606 (sans validité ni saison) |
| Demi-pension groupe – seuil | 10 ou 15 personnes | CONTRADICTOIRE | FR, offre 605 : « à partir de 10 personnes ». EN, home et offre 605 : « Starting from 15 people » |
| Demi-pension groupe – prix | 78€ | À CONFIRMER | Offre 605, modale d'accueil |
| Circuits / journée d'étude | 78€ / jour / personne (même prix pour 5 offres) | À CONFIRMER | Offres 608, 609, 610, 622 (prix identique, probablement recopié) |
| Restaurant – capacité | Salle voûtée de 70 places / 70 couverts | FIABLE (cohérent) | restaurant : « grande salle voûtée de 70 places ». seminaire : « salle de restaurant 70 couverts » |
| Restaurant – menu | 21€ à 26€, ou 23 / 26 / 29€ | CONTRADICTOIRE | restaurant:241 « 21€ à 26€ ». Le PDF `20220730193554(1).pdf` (daté 2022) affiche 23 / 26 / 29€ avec des plats différents |
| Suggestion du midi | 20,00€ | À CONFIRMER | restaurant:282 |
| Carte des desserts | Liste web ou PDF | CONTRADICTOIRE | Le PDF `20210114165306(1).pdf` (2021) donne des desserts et des prix différents de la liste web |
| Restaurant – horaires | Déjeuner et dîner | CONTRADICTOIRE | FR, restaurant:335-337 : « Déjeuner : de 12h à 13h30 (ouvert : le mardi - mercredi - samedi et dimanche) », « Dîner : de 19h à 21h (7J/7) ». EN : « Currently closed due to governmental decisions Lunch : from 12pm to 1:30pm (open on Wednesday : market day and Sunday noon, open 7/7 during July and August) » |
| Réserver une table | Par e-mail uniquement | FIABLE | Bouton « Je réserve ma table » = `mailto:` |
| Salle de séminaire | « toute équipée et climatisée » | À CONFIRMER | seminaire, acces-contact:73. **Aucune capacité ni surface indiquée** |
| Piscine | « chauffée à flanc de colline » ; « Piscine extérieure chauffée » | À CONFIRMER | accueil:181 et acces-contact:71. Aucune saison ni horaire |
| Terrasse / jardin | « grande terrasse en teck fleurie », « jardin belvédère » | À CONFIRMER | acces-contact:77, accueil:181 |
| Parking | « parking privé sécurisé », « garage pour motos et vélos » | À CONFIRMER | acces-contact:37. Payant ou gratuit, nombre de places : non précisé |
| Wifi | Gratuit dans tout l'hôtel | À CONFIRMER | acces-contact:31 et suivantes |
| Location de vélos, bibliothèque, bar | Pictogrammes seulement | À CONFIRMER | accueil:246-254 (pictogrammes sans texte explicatif) |
| Note Booking | « Traveller review 2021 : 8.5/10 » | À CONFIRMER (périmée) | acces-contact:63 |
| Accès voiture | A75 sortie 44-1 ; « 1h45 de Montpellier » ; « 6h30 de Paris » | À CONFIRMER | acces-contact:45 |
| Accès train | Gare de Millau puis « navette régulière » | À CONFIRMER | acces-contact:47. L'existence d'une navette régulière est à vérifier |
| Distance Millau | 43 km ou « 40 min … par l'A75/A9 » | CONTRADICTOIRE (formulation) | acces-contact:59 « Millau à 43 km ». seminaire : « à 40 min de Millau par l'A75/A9 » (l'itinéraire le plus logique passe par la D996 et non par l'A75/A9) |
| Gorges du Tarn / La Malène | 29 km ou 31 km | CONTRADICTOIRE | acces-contact : « Gorges du Tarn », « Saint-Enimie à 29 km » (orthographe officielle : Sainte-Enimie). tourisme:171 « Bateliers de la Malène à 31 kms » |
| Distances des activités | Unités mélangées (km et minutes) | À CONFIRMER | tourisme : « 13 min », « 1h20 », « 15 km », « 20 kms »… |
| Marché | Tous les mercredis du 15 juin au 15 septembre | À CONFIRMER | acces-contact:83 |
| Foire de la Saint-Michel | Dernier week-end de septembre | À CONFIRMER | acces-contact:85 |
| Raison sociale | « APCl HOTEL DE FRANCE » | À CONFIRMER | mentions-legales : « APCl » semble être une coquille |
| Capital | « ? euros » | À CONFIRMER | mentions-legales « au capital social de ? euros » |
| Gérant | Thibault CORDELIER | À CONFIRMER | mentions-legales |
| RCS / SIRET / APE / TVA | RCS Mende A 442 392 155 ; SIRET 44239215500010 ; APE 5510Z ; TVA FR70442392155 | À CONFIRMER | mentions-legales. SIREN et TVA sont cohérents entre eux. Ces numéros n'ont pas été vérifiés dans un registre officiel |
| CNIL | Vide | À CONFIRMER | mentions-legales « CNIL n° » (la déclaration CNIL n'est plus exigée depuis le RGPD : mention à supprimer) |
| Hébergeur | OVH, et Samm Agence Web | À CONFIRMER | mentions-legales : l'hébergeur est déclaré deux fois |
| Médiateur de la consommation | MTV | À CONFIRMER | mentions-legales |
| Charte vie privée | Texte hors sujet | CONTRADICTOIRE | Cite une loi belge (1992) et la « Commission de la Protection de la Vie Privée » belge ; mentionne un « compte » utilisateur et une politique cookies qui n'existent pas sur le site |
| Réseaux sociaux | Lien Facebook vide | À CONFIRMER | Lien avec `href=""` [En ligne] |

### Coquilles et anomalies relevées

- « Famillial » dans le `<title>` de l'accueil.
- « Causses etCévennes » (espace manquante, accueil:177).
- « Fraance » dans le titre des offres 731 à 734.
- « le parc où la nature » au lieu de « ou » (chambres:175).
- « 12 m2m² » (offre 606).
- « terrroir » (offre 605).
- « Le moulin à vente de la Borie » (tourisme).
- « cautours », « causenarde », « bramabiau » (offre 610).
- Artefacts « ?> » dans le code (tourisme:164 et suivantes).
- Lien « Ouvrir dans Maps » = `about:invalid`.
- Lien de calendrier `action=lang=FR` malformé.

---

## 3. Accessibilité (PMR)

### 3.1 Citations littérales, page par page

**[Export], vérifiées identiques [En ligne 29/09/2026]**

| Page | Citation exacte | Nature |
|---|---|---|
| FR accueil (accueil:187) | « Notre établissement ne peut pas recevoir de personne à mobilité réduite. » | Texte |
| FR accueil (accueil:247) | Pictogramme `be914284fa20d1696bf334fcc749258a09ba9c5d.png` accompagné du libellé « Accueil PMR » | Pictogramme de la liste des services |
| FR accès-contact (acces-contact:79) | « Nous ne disposons pas de chambre spécifiquement équipée pour les personnes à mobilité réduite » | Texte (FAQ) |
| FR chambres (chambres:171) | « Desservies par un ascenseur, elles sont équipées de bain ou douche/WC… » | Texte |

**[En ligne 29/09/2026] – site EN (.com)**

| Page | Citation exacte | Nature |
|---|---|---|
| EN home | Même pictogramme `be914284….png` avec le libellé « Accessible for people with limited mobility » | Pictogramme |
| EN access-contact | « We do not have rooms accessible for limited mobility people ?? » | Texte, avec un artefact d'encodage |
| EN rooms | « Served by a lift, they are equipped with bath or shower/WC… » | Texte |

- Le site EN ne contient **aucun** équivalent de « ne peut pas recevoir de personne à mobilité réduite ».
- Aucune autre page FR ni EN (restaurant, séminaire, offres, tourisme, mentions légales) ne mentionne les PMR, un ascenseur, des marches, le plain-pied ou un accès quelconque. La recherche a porté sur « pmr, mobilit, ascenseur, handicap, accessib, escalier, marche, plain-pied, rez » et, en EN, sur « mobility, lift, elevator, accessible, disabled ».

### 3.2 Analyse par zone

| Zone | Ce que dit le site | Constat |
|---|---|---|
| Entrée / accueil | Rien : aucune mention de marche, de rampe ou de plain-pied | Non documenté. Aucune photo de l'entrée ni de la réception |
| Restaurant / salle voûtée (70 places) / salon particulier | Rien sur l'accès | Non documenté. Le mot « voûtée » ne permet de rien conclure sur le niveau d'accès |
| Terrasse en teck | Rien sur l'accès | Non documenté |
| Jardin belvédère / piscine « à flanc de colline » | Rien sur l'accès | Non documenté. « À flanc de colline » ne permet aucune conclusion sur les dénivelés ou les marches |
| Salle de séminaire | Rien (pas même la capacité) | Non documenté |
| Parking | « parking privé sécurisé » | Aucune place PMR mentionnée |
| Chambres | « Desservies par un ascenseur » ; « pas de chambre spécifiquement équipée pour les personnes à mobilité réduite » | Seules informations explicites. Rien sur la largeur des portes, les douches de plain-pied ou les barres d'appui |

### 3.3 Conclusion : ce qui peut ou ne peut pas être affirmé

**Peut être repris**, en citant la formulation du site et sous réserve de validation par l'hôtel :

1. Les chambres sont desservies par un ascenseur.
2. L'hôtel ne dispose d'aucune chambre spécifiquement équipée pour les personnes à mobilité réduite.

**Ne peut pas être affirmé** :

- « Accessible PMR », « Accueil PMR », « Accessible for people with limited mobility », ni aucun pictogramme fauteuil. Ces libellés sont **contredits** par le texte FR de l'accueil (« ne peut pas recevoir de personne à mobilité réduite »). Le pictogramme ne constitue pas une preuve. Aucune déduction n'a été tirée des pictogrammes ni des photos.
- L'accessibilité de l'entrée, du restaurant, de la terrasse, du jardin, de la piscine, de la salle de séminaire ou du parking. Aucune information n'existe sur ces zones.
- Que l'ascenseur dessert toutes les chambres, ou les étages des parties communes. Le texte dit seulement « desservies par un ascenseur », sans indiquer ses dimensions.

**Recommandation pour la refonte** :

- Supprimer le pictogramme « Accueil PMR » en FR et en EN tant que l'hôtel ne l'a pas validé.
- Publier une rubrique « Accessibilité » factuelle, rédigée à partir des réponses de l'hôtel (voir §7).
- Trancher la contradiction entre « ne peut pas recevoir » (accueil) et « pas de chambre spécifiquement équipée » (accès-contact). Ce sont deux affirmations de portée différente.

---

## 4. Moteur de réservation Reservit

### 4.1 Identifiants [En ligne 29/09/2026]

- Attributs du widget (HTML .fr) : `data-reservit-hotelid="152592" data-reservit-custid="2" data-reservit-partid="83"`.
- Codes chambres (`roomtcode`), issus des boutons « Réserver » [Export] :
  - double 439120 ;
  - twin 439121 ;
  - triple 439122 ;
  - familiale 439123.

### 4.2 Construction de l'URL par le widget [En ligne, `production.min.js?v=177007b6f3c`]

- Formulaire `#FormReserv` : méthode GET, `target="_blank"`.
- Champs :
  - `#DateIn` et `#DateOut` au format jj/mm/aaaa (fdatepicker, jQuery 2.2.3) ;
  - `nbadt` : min 1, max 14, valeur par défaut 2.

Le script construit l'URL suivante :

```
https://secure.reservit.com/reservit/reserhotel.php
  ?lang=<FR|EN>                 (EN si la langue de la page n'est pas le français)
  &action=resa
  &redirectHOST=<hôte selon custid>   (custid 2 -> hotel.reservit.com ; 12/41/233 -> premium.logishotels.com ; 232 -> seh-hotels.reservit.com)
  &hotelid=152592
  &fday=DD&fmonth=MM&fyear=YYYY  (arrivée)
  &tday=DD&tmonth=MM&tyear=YYYY  (départ)
  [&roomtcode=…] [&catcode=…] [&rateid=…] [&prd=…]   (optionnels)
  &nbadt=N
```

Autres éléments du script :

- Calendrier des disponibilités : même base en `http://` avec `action=tabavail`.
- Appel meilleur prix : `https://secure.reservit.com/api/rs/bestprice/2/152592` avec les paramètres `fromdate`, `todate`, `lang`, `currency=EUR`, `roomAge1`, `partidDistrib=83`.
- Le JS contient un reste de configuration d'un **autre hôtel** (hotelid 3553 / custId 233) et une clé client publique Reservit, non reproduite ici.
- `feed.js` renvoie 404.

### 4.3 Tests réalisés [En ligne 29/09/2026] – GET uniquement, sans réservation

Chaîne de redirection constatée :

- `reserhotel.php` renvoie un **301** vers `/reservit/front2-0-152592/front.do`,
- qui mène à `https://secure.reservit.com/fo/booking/2/152592?...` (application Angular, HTTP 200).

| Test | URL testée | Résultat |
|---|---|---|
| A | Bouton actuel : `…reserhotel.php?redirectHOST=hotel.reservit.com&action=resa&hotelid=&custId=2&roomtcode=439120&nbadt=2` | **404 « Couldn't load site »**. Tous les boutons « Réserver » des pages chambres et offres 731-734, en FR comme en EN, sont **cassés** car `hotelid` est vide |
| B | Même URL avec `hotelid=152592` | 200 à `/fo/booking/2/152592?…roomtcode=439120…roomAge1=40,40` |
| C | Lien de calendrier actuel `action=lang=FR&id=2&hotelid=152592` | 200 (fonctionne malgré le paramètre malformé) |
| D | `action=tabavail&lang=FR&id=2&hotelid=152592` | 200 |
| E | URL du widget avec des dates | 200. `begindate`, `enddate` et `numnight` sont transmis dans l'URL finale |
| F | Dates + `roomtcode` | 200 |

Limite : la page finale est une application monopage (SPA). Le HTTP 200 prouve que la page se charge, **pas** que la chambre et les dates sont effectivement présélectionnées à l'écran. Il faut le vérifier dans un navigateur.

### 4.4 URL recommandées (toutes en 200 après redirection, testées le 29/09/2026)

```
# Générique avec dates (format du widget officiel)
https://secure.reservit.com/reservit/reserhotel.php?lang=FR&action=resa&redirectHOST=hotel.reservit.com&hotelid=152592&fday=DD&fmonth=MM&fyear=YYYY&tday=DD&tmonth=MM&tyear=YYYY&nbadt=2

# Par chambre : ajouter &roomtcode=439120 (double) | 439121 (twin) | 439122 (triple) | 439123 (familiale)
https://secure.reservit.com/reservit/reserhotel.php?lang=FR&action=resa&redirectHOST=hotel.reservit.com&hotelid=152592&custId=2&roomtcode=439120&nbadt=2

# Tableau des disponibilités
https://secure.reservit.com/reservit/reserhotel.php?action=tabavail&lang=FR&id=2&hotelid=152592

# Point d'entrée moderne direct
https://secure.reservit.com/fo/booking/2/152592?langcode=FR&custid=2&hotelid=152592&m=booking
```

- Pour la version EN, remplacer `lang=FR` par `lang=EN` (ou `langcode=EN`).
- Utiliser `https://` partout, y compris pour le calendrier.
- Faire valider par l'hôtel le partenaire de distribution (`partid=83`) avant la mise en production.

---

## 5. Comparaison FR / EN [En ligne 29/09/2026]

| Sujet | FR (.fr) | EN (.com) |
|---|---|---|
| Accessibilité | « ne peut pas recevoir de personne à mobilité réduite » + pictogramme « Accueil PMR » | Aucune phrase équivalente ; pictogramme « Accessible for people with limited mobility » ; « We do not have rooms accessible … ?? » |
| Demi-pension groupe | « à partir de 10 personnes » | « Starting from 15 people » |
| Restaurant | Déjeuner mar/mer/sam/dim, dîner 7j/7 | « Currently closed due to governmental decisions » (texte covid obsolète) ; déjeuner le mercredi et le dimanche, 7/7 en juillet-août |
| Petit-déjeuner | « complet » (offre 606) / « continental » (offre 605) | « continental breakfast with a buffet area » |
| Journée d'étude (622) | Page présente (vide) | 302 vers /404 |
| Mentions légales | En français | En français, avec « Conditions générales de vente à traduire par vos soins » |
| Prix | « € / jour / personne » | « 78€ / jour / personne », non traduit |
| Coquilles | voir §2 | « Loser Cevennes » (title du tourisme), « Bramadiau abyss », URL « spacial-offers », artefacts « ? » d'encodage (« includes:?- ») |
| Boutons Réserver | `hotelid=` vide (404) | Même bug |

---

## 6. Photos par thème

Toutes les photos sont hébergées sur `https://www.monsamm.com/gallery/<fichier>`. Toutes renvoient HTTP 200 et leurs dimensions ont été mesurées avec `sips` [En ligne 29/09/2026]. La classification par thème repose sur un examen visuel des images. Les photos n'ont servi à **aucune** déduction sur l'accessibilité.

> **Droits** : ces photos appartiennent à l'hôtel (ou à leurs auteurs). **Leur réutilisation dans la refonte nécessite l'autorisation préalable de l'hôtel.** Aucune mention de crédit ni de licence n'apparaît sur le site.
>
> **Mise à jour 29/09/2026** : à la demande du porteur de la maquette, 8 photos de chambres (double ×3, twin ×2, triple, « familiale », salle de bain) ont été intégrées à la maquette **locale** (`public/images/officielles/`). Les quasi-doublons ont été écartés. La mise en ligne reste subordonnée à l'autorisation écrite de l'hôtel (point 24).

| Thème | Fichier | Dimensions (px) | Contenu / page d'usage |
|---|---|---|---|
| Façade / terrasse | 60006c43373703.34319462.jpg | 1900x1267 | Façade avec l'enseigne « Grand Hotel de France », terrasse avec stores et tables (slider de l'accueil) |
| Piscine / jardin | 60b8ee2c912624.86749020-xl.webp / -lg / -md / -sm | 3840x2560 / 1920x1280 / 720x480 / 480x320 | Piscine (accueil, en ligne) |
| Piscine / jardin | 20210115110129(1).jpg | 1900x1267 | Offre groupe 605, chambres, séminaire |
| Piscine / jardin | 20210115122502(1).jpg | 1900x1267 | **Doublon md5** de la précédente (accueil) |
| Chambre double | 20210118121600(1).jpg | 1900x1267 | Tons beige (accueil) |
| Chambre double | 60006c3ba408e9.87464696.jpg | 1900x1267 | Tons beige (chambres) |
| Chambre double | 20210302114017(1).jpg | 1900x1267 | Double beige, utilisée pour la **familiale** (offre 734) |
| Chambre double | 60006c37e37a99.48772325.jpg | 1900x1267 | Tons magenta (offre 731) |
| Chambre double | 60006c3b77c208.96842832.jpg | 1900x1267 | Tons magenta, image de la demi-pension, reprise sur de nombreuses pages |
| Chambre twin | 60006c3a1aa589.23299042.jpg | 1900x1267 | Tons magenta (chambres) |
| Chambre twin | 60006c3a53b004.32053582.jpg | 1900x1267 | Tons verts (chambres) |
| Chambre twin | 20210302113914(1).jpg | 1900x1267 | Tons magenta (offre 732) |
| Chambre triple | 20210302113947(1).jpg | 1900x1267 | Deux lits et un lit supplémentaire, tons verts (offre 733) |
| Chambre triple | 60006c3474f282.69264231.jpg | 1900x1267 | Tons verts (chambres) |
| Salle de bain | 60006c3c096485.18245205.jpg | 1900x1267 | Douche, vasque, sèche-cheveux (chambres) |
| Salle de séminaire | 20210118121648(1).jpg | 1900x1267 | Accueil |
| Salle de séminaire | 20210120104618(1).jpg | 1900x1267 | **Doublon md5** de la précédente, présente sur la plupart des pages |
| Salle de séminaire | 20210317170325(1).jpg | 1900x1267 | Séminaire |
| Salle de séminaire | 60006c3d5660c0.41131351.jpg | 1900x1267 | Table en U, poutres (séminaire) |
| Salon / bar | 20210118121630(1).jpg | 1900x1267 | Cheminée en pierre, salon (accueil) |
| Salon / bar | 60006c3db41760.15317226.jpg | 1900x1267 | Cheminée, salon (restaurant) |
| Salon / bar | 20210317164434(1).jpg | 1900x1267 | Machine à expresso gravée « Grand Hotel de France » (restaurant) |
| Salon / bar | 60006c22ca9076.01333908.jpg | 1900x1267 | Idem (restaurant) |
| Cuisine | 20210114170413(3).jpg | 1900x1425 | Plat de viande dressé (restaurant) |
| Cuisine | 20210114170239(3).jpg | 1900x1266 | Mousse au chocolat (restaurant) |
| Petit-déjeuner | 20210115142109(1).jpg | 1900x1266 | Croissant (offre 611, présente sur toutes les pages) |
| Circuits | 20210115112628(1).jpg | 1900x1266 | Cyclistes au coucher du soleil (offre 608) |
| Circuits | 20210115113106(1).jpg | 1900x1139 | Randonneur (offre 609) |
| Circuits | 20210115113610(1).jpg | 1900x1266 | Autocar (offre 610) |
| Tourisme | 20210115114514(1).jpg | 1900x1268 | Gorges et pont (Bateliers de la Malène) |
| Tourisme | 20210115115113(1).jpeg | 1900x1267 | Grotte (Dargilan) |
| Tourisme | 20210115115431(1).jpg | 1900x1266 | Fromage (Roquefort) |
| Tourisme | 20210115120215(1).jpg | 1900x1266 | Escalade |
| Tourisme | 20210115120435(1).jpg | 1900x1263 | Viaduc de Millau (parapente) |
| Tourisme | 20210115120746(1).jpg | 1900x1305 | Observatoire de l'Aigoual |
| Tourisme | 20210115120905(1).jpg | 1900x1266 | Intérieur de la ferme caussenarde |
| Tourisme | 20210115121003(1).jpg | 1900x1200 | Vautour (maison des vautours) |
| Tourisme | 20210115121055(1).jpg | 1900x1265 | Moulin à vent (la Borie) |
| Tourisme | 20210115121225(1).jpg | 2000x700 | Bisons et cavaliers (Randals), format bandeau |
| Tourisme | 6007fe7eac0da3.83388997.jpg | 1900x1069 | Paysage forestier |
| Tourisme | 6007fe7eebf0a7.31577240.jpg | 1900x1334 | Grotte éclairée en rouge |
| PDF | 20220730193554(1).pdf | 595x842 pt (A4) | Menu (2022, prix 23/26/29€) |
| PDF | 20210114165306(1).pdf | 610x838 pt | Carte des desserts (2021) |

Manques :

- Aucune photo de la salle de restaurant ni de la salle voûtée.
- Aucune photo de l'entrée ou de la réception, de l'ascenseur, de la terrasse vue de près, du parking ou du garage à motos.
- Les photos de tourisme, pour la plupart, ne sont probablement pas prises par l'hôtel : droits à vérifier en priorité.

---

## 7. Données à faire valider par l'hôtel

1. Accessibilité : l'hôtel peut-il accueillir des personnes à mobilité réduite, oui ou non ? Le pictogramme « Accueil PMR » (FR) / « Accessible… » (EN) doit-il être supprimé ?
2. Accessibilité, zone par zone : marches ou plain-pied à l'entrée, au restaurant et à la salle voûtée, sur la terrasse, au jardin, à la piscine, à la salle de séminaire ; place de parking PMR ; dimensions de l'ascenseur et étages desservis (y compris les parties communes).
3. Classement 3 étoiles : validité et date du classement.
4. Types de chambres réels : le duplex existe-t-il ? Surface, literie et équipements de chaque type (twin, triple, familiale) ; bain ou douche selon la chambre.
5. Prix indicatifs « à partir de » par type de chambre, ou décision de n'afficher aucun prix.
6. Petit-déjeuner : « complet », « continental » ou buffet ? Composition et prix (12.50€ ?).
7. Demi-pension (82€ pour 2 personnes ?) : prix, contenu et période de validité.
8. Demi-pension groupe : seuil de 10 ou de 15 personnes ? Prix (78€), gratuités, apéritif.
9. Circuits 608, 609 et 610 et journée d'étude 622 : le prix de 78€ est-il réel pour chacun ? Contenu de la journée d'étude ; maintien ou suppression de ces offres.
10. Restaurant : jours et horaires d'ouverture réels (FR et EN divergent ; la mention covid EN est à supprimer), fermeture annuelle.
11. Menu et carte à jour : prix (21-26€ ou 23/26/29€), suggestion du midi (20€), desserts ; remplacement des PDF de 2021 et 2022.
12. Salle de séminaire : capacité, surface, équipements, tarifs.
13. Piscine : saison et horaires d'ouverture, température.
14. Parking : gratuit ou payant, nombre de places, couvert ou non ; conditions d'accès au garage à motos et vélos.
15. Historique : « depuis 1946 » et « relais de poste du XVIIe siècle » ; génération actuelle de la famille Cordelier.
16. Note Booking de 2021 (8.5/10) : la retirer ou l'actualiser avec une source datée.
17. Accès : existence d'une « navette régulière » depuis la gare de Millau ; distances et temps de trajet (Millau 43 km ou 40 min, La Malène 29 ou 31 km) ; unité à harmoniser.
18. Événements locaux : dates du marché et de la Foire de la Saint-Michel.
19. Mentions légales : raison sociale exacte (« APCl » ?), capital social, gérant, RCS, SIRET, TVA, médiateur (MTV : coordonnées), hébergeur réel.
20. CGV, conditions d'annulation et politique de confidentialité conforme au RGPD (remplacer la charte belge).
21. Réseaux sociaux : URL de la page Facebook ou d'autres comptes.
22. Téléphone au format international (`+33 4 66 45 60 07`) et adresse e-mail à utiliser (l'adresse wanadoo est-elle toujours la bonne ?).
23. Reservit : confirmer hotelid 152592, custId 2, partid 83 et les codes chambres 439120 à 439123 ; indiquer si d'autres tarifs ou codes (`rateid`, `catcode`) doivent être liés depuis les offres.
24. Photos : **autorisation écrite de réutilisation** et crédits ; fourniture de photos manquantes (restaurant, salle voûtée, entrée, terrasse, accès).
25. Site EN : maintien d'un site séparé en .com ou version /en/ ; traduction des mentions légales et des CGV.
