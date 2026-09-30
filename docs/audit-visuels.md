# Audit visuel de la maquette

État audité : le code non commité du 30/09/2026 (hero plein cadre, décor SVG de PageHero, apparition au défilement). Captures à 375 et 1280 px dans `/tmp/audit-captures/`, en dehors du dépôt.

Priorités : **P1** = manque visible qui dessert la vente (hébergement, restaurant, groupes). **P2** = monotonie de mise en page ou finition. **P3** = décor, bonus.

Règle : le restaurant, les salles, la piscine, le jardin, la façade et les chambres doivent être photographiés à l'hôtel. On n'utilise jamais de photo générique. Les photos libres (Wikimedia) ne servent que pour le village et les environs.

Point tranché : `docs/design-ux.md` §1 autorise désormais des animations légères (apparitions, tracés SVG), toutes coupées sous `prefers-reduced-motion`.

---

## 1. Accueil (`/`)

| Section | Visuels présents | Manques / répétitions / finitions | Proposition de composition | Animation SVG | Prio |
|---|---|---|---|---|---|
| Hero | Photo du pont en plein cadre, voile sombre, 3 vautours, relief et rivière en pointillés | Il ne montre pas l'hôtel. On voit le village, pas l'établissement. | Garder le pont. Ajouter une vignette de la façade en médaillon ou en image décalée dans la section suivante. | Déjà riche. Ne rien ajouter. | P2 |
| Réservation | Aucun | Le bloc est large et uniquement textuel. | Garder tel quel : c'est fonctionnel. | – | P3 |
| Chambres (grid--4) | Photos officielles 3:2 | La hauteur du texte varie d'une carte à l'autre, les boutons sont empilés et « Non communiquée » revient sur chaque carte. La familiale montre un seul lit double. | Aligner le bas des cartes (grille avec `subgrid` ou pied de carte en `margin-top:auto`). Il faut une vraie photo de la familiale. | – | P1 (photo familiale), P2 (alignement) |
| Restaurant (split) | PhotoPending « Terrasse du restaurant » en 4:3 | C'est le plus grand vide de la page, en plein milieu. | Mosaïque asymétrique : grande photo de la terrasse et 2 petites (salle voûtée, plat). Le texte passe sous la mosaïque ou à côté, en colonne étroite. | Annotation manuscrite (« terrasse en teck, fleurie l'été ») avec une flèche tracée. | **P1** |
| Formules (grid--3 OfferCard) | Aucun | 3 cartes sans image, 3 badges « à confirmer » : la section est plate. C'est la 3e grille « titre + cartes » de la page. | Donner une vignette 3:2 à chaque carte (assiette du terroir, petit-déjeuner, tablée de groupe), ou une liste horizontale de prix sur un fond teck clair. | – | P1 (photos), P2 (composition) |
| Environs (grid--4) | Photos libres : vautours, Aigoual, Dargilan, gorges du Tarn | La grille est correcte mais répète le motif des chambres. | Remplacer par un bandeau panoramique (causse Méjean) avec 3 vignettes qui le chevauchent. | Vautour qui traverse le bandeau. Rivière en pointillés qui relie les vignettes. | P2 |
| Infos pratiques (split) | Aucun | Faits en texte uniquement. | Petite carte SVG (Millau → Meyrueis → Florac) à côté des faits. | Itinéraire dessiné au trait (stroke-dashoffset) quand la carte entre dans l'écran. | P2 |
| Contact (split) | Photo « vue-chambre » | 3e split de la page, avec la même mise en page image/texte. | Mettre la photo de la façade sur la place Jean Séquier en pleine largeur, avec le bloc contact posé dessus. | Ligne de crête au-dessus du pied de page. | P1 (façade), P2 |

## 2. Chambres (`/chambres/`)

| Section | Visuels présents | Manques / finitions | Proposition | Animation | Prio |
|---|---|---|---|---|---|
| PageHero | Texte, ligne de relief, 1 vautour | Aucune image en ouverture. | Variante de PageHero avec image (bandeau 21:9 de la meilleure chambre ou de la vue depuis la fenêtre). | Relief déjà présent. | P1 |
| Équipements (checklist grid--3) | Coches | Aucune icône, liste monotone. | Pictogrammes au trait (wifi, ascenseur, TV, garage 2 roues). | – | P3 |
| Liste (grid--4 RoomCard) | Photos officielles | Même remarque qu'à l'accueil. La triple n'a qu'une photo. | – | – | P2 |
| Tableau comparatif | – | Correct. | – | – | – |
| Petit-déjeuner / demi-pension (grid--2 OfferCard) | Aucun | Il manque la photo du buffet et celle de la salle. | Split avec la photo du petit-déjeuner, image décalée qui déborde de la colonne. | – | P1 |

## 3. Fiche chambre (`/chambres/[slug]/`)

| Section | Visuels | Manques | Proposition | Animation | Prio |
|---|---|---|---|---|---|
| En-tête (split h1 + galerie) | Photo principale, vignettes, salle de bain | La familiale est douteuse (un seul lit double visible). La triple n'a qu'une vue. | Garder le split. Il faut une 2e photo de la triple et une vraie photo de la familiale (4 couchages). | – | P1 (familiale) |
| Équipements / Bon à savoir | Aucun | Texte sur 2 colonnes. | Suffisant. Éventuellement des pictogrammes. | – | P3 |
| Autres chambres (grid--3) | Photos | – | – | – | – |

## 4. Restaurant (`/restaurant/`)

C'est la page la plus pauvre visuellement, alors qu'elle devrait être la plus appétissante.

| Section | Visuels | Manques | Proposition | Animation | Prio |
|---|---|---|---|---|---|
| PageHero | Texte seul | Aucune image. | Bandeau pleine largeur avec la photo de la terrasse ou d'un plat. | – | **P1** |
| Les espaces (grid--3) | 3 PhotoPending : terrasse en teck fleurie, salon particulier, salle voûtée de 70 places | 3 rectangles vides côte à côte. | Mosaïque : terrasse en grand à gauche, salon et salle voûtée empilés à droite, légendes en surimpression. | – | **P1** |
| Horaires / Réserver / Groupes (split) | Aucun | Tableau et texte seuls. | Garder. Ajouter une photo de la salle voûtée dressée à côté de « Groupes ». | – | P2 |
| Menus (grid--2/3 menu-card) | Aucun | 3 colonnes de texte très longues. Une ardoise de restaurant sans aucune photo de plat. | Composition « carte de restaurant » : une colonne étroite centrée, puis un bandeau de 3 plats photographiés entre les menus. | Annotations manuscrites dans la marge (« fait maison », « caves de Peyrelade ») avec un trait tracé. | **P1** |

## 5. Offres (`/offres/`)

| Section | Visuels | Manques | Proposition | Animation | Prio |
|---|---|---|---|---|---|
| PageHero + anchor-nav | Texte | Aucune image. | Bandeau d'image (route des gorges pour les circuits). | – | P2 |
| Sections par catégorie (grid--2 de panels) | Aucun | La page entière est textuelle. Les panels sont longs et identiques, avec les mêmes badges « à confirmer ». | Chaque catégorie s'ouvre sur une image : séjour (chambre), restauration (petit-déjeuner, **hôtel**), groupes (salle voûtée, **hôtel**), circuits (gorges/causse, **libre**). Alterner image à gauche et à droite. | Pour les circuits : itinéraire tracé sur une mini-carte. | **P1** |
| Conditions | Texte | Acceptable. | – | – | P3 |

## 6. Groupes et séminaires (`/groupes-seminaires/`)

| Section | Visuels | Manques | Proposition | Animation | Prio |
|---|---|---|---|---|---|
| Restaurant pour groupes (split) | PhotoPending « Salle voûtée du restaurant » | Vide. | Photo de la salle voûtée dressée pour un groupe. | – | **P1** |
| Salle de séminaires (split--reverse) | PhotoPending « Salle de séminaires » | Vide. La vue sur l'Aigoual et le causse Méjean est l'argument de vente, mais on ne la voit pas. | Photo de la salle et de sa vue, en image décalée qui déborde. | – | **P1** |
| Circuits (grid--3 de panels) | Aucun | 3 panels texte au même prix de 78 €. | Cartes avec photo libre (gorges du Tarn, causse Méjean, Aigoual) et tracé de l'itinéraire. | Itinéraire SVG dessiné au défilement pour chaque circuit. | P2 |
| CTA centré | – | – | Ligne de crête en fond. | – | P3 |

## 7. Meyrueis et environs (`/meyrueis-environs/`)

| Section | Visuels | Manques | Proposition | Animation | Prio |
|---|---|---|---|---|---|
| PageHero | Texte seul | La page la plus visuelle du site s'ouvre sans image. | Grand bandeau d'ouverture (Meyrueis vu du drone, ou gorges de la Jonte). | Vautours qui planent sur le bandeau. | **P1** |
| Galerie (10 photos) | Photos libres | Bien. | Mosaïque à tailles variées plutôt qu'une grille régulière. | – | P2 |
| Tableau des sites | Aucun | Aucune vignette. 7 sites sans photo. | Vignette 1:1 par ligne (libre) ou petite carte SVG avec les distances. | Rivière (Jonte) qui relie les sites sur la carte. | P2 |
| Terroir / événements + panel Parc national | Aucun | Marché et foire de la Saint-Michel sans photo. | Photo libre du marché ou de la foire. Citation manuscrite. | – | P2 |

## 8. Infos pratiques (`/infos-pratiques/`)

| Section | Visuels | Manques | Proposition | Animation | Prio |
|---|---|---|---|---|---|
| PageHero + horaires (facts) | Texte | – | – | – | P3 |
| Accès (split texte) | Aucun | Ni carte ni plan. | Carte SVG stylisée (Millau, D996, Meyrueis, Florac) avec la photo libre des gorges de la Jonte (route D996). | Itinéraire dessiné. | P2 |
| Équipements (tableau) | – | Piscine, parking et garage deux-roues sans photo. | Bande de 3 vignettes : piscine, parking/garage, ascenseur (**hôtel**). | – | P2 |
| Accessibilité | Texte | – | – | – | – |

## 9. Contact (`/contact/`)

| Section | Visuels | Manques | Proposition | Animation | Prio |
|---|---|---|---|---|---|
| PageHero | Texte | – | Façade de l'hôtel en bandeau. | – | P2 |
| Formulaire / aside | Photo de la rue de Meyrueis | Aucun plan. La façade manque. | Remplacer la photo de la rue par la façade sur la place Jean Séquier. Ajouter un mini-plan SVG. | – | P1 (façade) |

## 10. Pages secondaires

| Page | Constat | Proposition | Prio |
|---|---|---|---|
| FAQ | Texte en colonne étroite, lisible | Annotation manuscrite ou décor de crête. | P3 |
| 404 | Texte seul, sans PageHero ni décor | Vautour égaré qui tourne en rond, ligne de crête. | P3 |
| Crédits photos | Liste texte | Une vignette par crédit. | P3 |
| Plan du site, mentions légales, confidentialité | Texte | Rien à faire. | – |
| Pied de page (toutes les pages) | Fond sombre sur 4 colonnes, sans décor | Ligne de crête du causse en transition au-dessus du pied de page. | P3 |

---

## Sujets photo requis

**À photographier à l'hôtel (aucun substitut possible) :**
1. La façade de l'hôtel sur la place Jean Séquier (accueil, contact, P1)
2. La terrasse en teck fleurie (accueil, restaurant, P1)
3. La salle voûtée de 70 places, vide puis dressée pour un groupe (restaurant, groupes, P1)
4. Le salon particulier (restaurant, P1)
5. La salle de séminaires et sa vue sur l'Aigoual et le causse Méjean (groupes, P1)
6. Trois ou quatre plats du terroir (fricandeau, bleu des Causses, dessert maison) (restaurant, formules, P1)
7. Le buffet du petit-déjeuner (chambres, offres, P1)
8. La chambre familiale montrant ses 4 couchages, et une 2e vue de la triple (P1)
9. La piscine chauffée, le jardin belvédère (P2)
10. Le parking et le garage deux-roues, la réception et l'ascenseur (P2)

**À trouver en photo libre (Wikimedia) :**
route D996 et gorges de la Jonte, causse Méjean, Aigoual et gorges du Tarn pour les circuits (déjà en partie disponibles), marché ou foire de la Saint-Michel, ferme caussenarde d'autrefois, moulin de la Borie, bisons des Randals, corniches du Méjean (escalade), caves de Roquefort, Millau (parapente).

## Pistes transversales

- **Variante `PageHero` avec image** (bandeau 21:9, légende et crédit) pour chambres, restaurant, environs et contact. C'est le gain le plus important pour le moins d'effort.
- **Casser la répétition** : les pages alternent « en-tête + grille » et « split » avec une alternance de fonds, toujours la même. Il faut introduire la mosaïque, l'image décalée qui déborde, le bandeau pleine largeur et la citation manuscrite (famille depuis 1946).
- **Cartes offre** avec une vignette 3:2, comme le prévoit déjà `design-ux.md`.
- **Animations SVG** : ligne de crête sous chaque PageHero (déjà en place), rivière en pointillés qui relie les sections, itinéraire tracé (accès, circuits), vautours (environs, 404), annotations manuscrites (menus). Toutes doivent être désactivées sous `prefers-reduced-motion`.

## État après la refonte (30/09/2026)

Traité : les pistes transversales ci-dessus (PageHero avec image, mosaïques, cartes offre illustrées, annotations manuscrites, itinéraire, vautours, rivière, visionneuse sur les fiches chambres), ainsi que la plupart des points P1 et P2 page par page. Les 36 photos libres sont toutes créditées (auteur, licence, source), dans la page et sur `/credits-photos/`. Sur mobile, les crédits groupés sont repliés derrière « Crédits des N photos ».

Reste ouvert :
- Tous les sujets de la liste « À photographier à l'hôtel » : les emplacements affichent un bloc « photo à venir ». Aucune photo générique ne les remplace.
- Les bisons des Randals, faute de photo libre exploitable.
- P2 : la page `/chambres/` reste assez répétitive (quatre cartes, puis le tableau). Les repères horaires du restaurant, au-dessus du tableau, sont gardés volontairement : ils ajoutent le petit-déjeuner et résument le dîner (« tous les soirs »).
- P3 : la signature manuscrite (`.hand`) revient souvent ; un vide subsiste dans le hero de `/offres/` sur grand écran.
- Les photos officielles de l'hôtel ne peuvent pas être mises en ligne sans l'autorisation écrite de l'établissement.
- L'image d'aperçu de partage par défaut (`og:image`, photo libre `meyrueis-drone`) n'apparaît pas dans les pages. Elle n'est donc créditée que sur `/credits-photos/`.
