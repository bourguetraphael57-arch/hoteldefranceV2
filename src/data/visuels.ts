/**
 * Compositions photo du site : quelle photo va où, avec quelle légende.
 * Une référence pointe soit vers une photo libre (src/data/photos-libres.json, crédit auteur + licence),
 * soit vers une photo officielle de l'hôtel (src/data/photos-officielles.ts, © hôtel, usage limité à la maquette).
 * Règle : une photo n'illustre que ce qu'elle montre. Les sujets introuvables restent en « Photo à venir ».
 */
import { getPhoto } from './photos';
import { creditOfficiel, photoOfficielleParId, photosChambres, photosHotel, photoSalleDeBain, type PhotoOfficielle } from './photos-officielles';
import { hotel } from './hotel';

export type RefPhoto = { libre: string } | { officielle: string };

export interface Visuel {
  photo: RefPhoto;
  /** Légende visible (ce que montre la photo, en termes factuels). */
  legende?: string;
  /** `object-position` pour le recadrage (ex. « 50% 85% » pour ne garder que la terrasse). */
  position?: string;
}

/** Emplacement volontairement vide : sujet à photographier à l'hôtel. */
export interface Attendu { attendu: string; legende?: string }

export interface PhotoResolue {
  src: string;
  largeur: number;
  hauteur: number;
  alt: string;
  sujet: string;
  officielle: boolean;
  remarque?: string;
  auteur?: string;
  licence?: string;
  licenceUrl?: string;
  source?: string;
}

export const creditOfficielCourt = '© Grand Hôtel de France';

export function resoudre(ref: RefPhoto): PhotoResolue {
  if ('libre' in ref) {
    const p = getPhoto(ref.libre);
    return { src: p.src, largeur: p.largeur, hauteur: p.hauteur, alt: p.alt, sujet: p.sujet, officielle: false,
      auteur: p.auteur, licence: p.licence, licenceUrl: p.licenceUrl, source: p.source };
  }
  const p = photoOfficielleParId(ref.officielle);
  // Les fichiers `-1600` des photos officielles font 1600 px de large, au même ratio.
  return { src: p.src, largeur: 1600, hauteur: Math.round((p.hauteur * 1600) / p.largeur), alt: p.alt,
    sujet: p.alt, officielle: true, remarque: p.remarque };
}

export { creditOfficiel };

const libre = (id: string): RefPhoto => ({ libre: id });
const officielle = (id: string): RefPhoto => ({ officielle: id });

/**
 * Images d'ouverture des pages internes (variante photo de PageHero).
 * Une image différente par page, et jamais celle du hero d'accueil (meyrueis-pont).
 */
export const heros = {
  chambres: { photo: libre('vue-chambre'), position: '50% 60%' },
  restaurant: { photo: officielle('facade'), position: '50% 70%' },
  offres: { photo: libre('causse-noir'), position: '50% 45%' },
  groupes: { photo: libre('gorges-jonte-genets'), position: '50% 55%' },
  environs: { photo: libre('meyrueis-confluent'), position: '50% 45%' },
  infos: { photo: libre('meyrueis-drone'), position: '50% 50%' },
  contact: { photo: libre('hotel-monument'), position: '50% 70%' },
} satisfies Record<string, Visuel>;

/** Sur-titres des en-têtes de page et des sections (textes courts, jamais de texte courant). */
export const surtitres = {
  chambres: `${hotel.nombreChambres} chambres, de 2 à 4 personnes`,
  groupes: 'Clubs, associations, entreprises',
  environs: 'Causses, gorges et Cévennes',
  accueilRestaurant: 'Cuisine du terroir',
  accueilEnvirons: 'Causses et Cévennes',
  offres: 'Formules',
} as const;

/** Page offres : phrase d'ouverture de chaque catégorie. */
export const introsCategories = {
  sejour: 'La nuit, le petit-déjeuner et le dîner du terroir réunis dans une même formule.',
  restauration: 'Le petit-déjeuner se prend à l’hôtel de 7 h 30 à 9 h 30, en supplément de la chambre.',
  groupes: 'Pour les clubs, associations et équipes en séminaire : hébergement, repas et salle de travail.',
  circuits: 'Des itinéraires entre gorges, causses et Aigoual, préparés par l’hôtel pour les groupes et les voyageurs.',
} as const;

/** Accueil. */
export const accueil = {
  maison: {
    surtitre: `Depuis ${hotel.histoire.depuis}`,
    titre: 'La maison, sur la place du village',
    texte: [
      `Selon le site actuel, la famille ${hotel.histoire.famille} accueille ses hôtes depuis ${hotel.histoire.depuis} dans un ${hotel.histoire.batiment}, sur la place Jean Séquier, au cœur de Meyrueis (historique à confirmer).`,
      'Devant la façade, le monument aux morts du village ; depuis les fenêtres, les toits, le clocher et les pentes boisées.',
    ],
    principale: { photo: libre('hotel-monument'), legende: 'Le monument aux morts, devant la façade de l’hôtel', position: '50% 55%' },
    secondaire: { photo: libre('vue-chambre'), legende: 'Vue depuis une fenêtre de l’hôtel' },
    chiffresLabel: 'L’hôtel en chiffres (selon le site actuel)',
    aConfirmer: ['historique de la maison et capacité de la salle voûtée'],
  },
  restaurant: {
    principale: { photo: officielle('facade'), legende: 'La terrasse abritée, devant la façade', position: '50% 100%' },
    vignette: { photo: officielle('cheminee'), legende: 'Cheminée en pierre (pièce à confirmer)' },
  },
  environs: {
    bandeau: { photo: libre('gorges-tarn'), legende: 'Les gorges du Tarn depuis le Point Sublime', position: '50% 55%' },
  },
  contact: { photo: officielle('facade'), legende: 'L’hôtel sur la place Jean Séquier', position: '50% 0%' },
} as const;

/** Chiffres clés (accueil, bloc « la maison »). Chaque valeur vient de src/data/hotel.ts. */
export const chiffresCles = [
  { valeur: String(hotel.histoire.depuis), label: 'la même famille, selon le site actuel' },
  { valeur: String(hotel.nombreChambres), label: 'chambres, de 2 à 4 personnes' },
  { valeur: String(hotel.renovation), label: 'année de rénovation des chambres' },
  { valeur: '70', label: 'places dans la salle voûtée' },
] as const;

/** Page restaurant : mosaïque des espaces (photos réelles + emplacements à photographier). */
/** La terrasse (photo « facade ») ouvre déjà la page : elle n'est pas répétée ici. */
export const restaurantMosaique: (Visuel | Attendu)[] = [
  { photo: officielle('cheminee'), legende: 'Cheminée en pierre et marmites en fonte' },
  { photo: officielle('machine-cafe'), legende: 'L’expresso de la maison' },
  { attendu: 'Salon particulier' },
  { attendu: 'Salle voûtée de 70 places' },
];

export const restaurantTerroir = {
  surtitre: 'Fromages de pays',
  titre: 'Du causse à l’assiette',
  texte:
    'Les menus publiés sur le site actuel citent des produits de la région, du fromage de chèvre des Cévennes au bleu affiné sous le causse.',
  produitsLabel: 'Produits cités sur les menus publiés',
  produits: [
    'Pélardon AOP des Oubrets',
    'Bleu des Causses des caves de Peyrelade',
    'Fricandeau et terrine maison aux trompettes de la mort',
    'Compotée de pommes et oignons des Cévennes',
    'Glaces artisanales « Ô délices de Lozère »',
  ],
  photos: [
    { photo: libre('pelardon'), legende: 'Un pélardon, fromage de chèvre des Cévennes (photo d’illustration, pas un plat de l’hôtel)' },
    { photo: libre('perail'), legende: 'Un pérail, fromage de brebis des Grands Causses fabriqué en Aveyron (hors Lozère) ; il ne figure pas sur les menus publiés' },
  ] satisfies Visuel[],
};

/** Page offres : image d'ouverture de chaque catégorie (circuits : une image par offre, voir offres.ts). */
export const offresCategories: Partial<Record<'sejour' | 'restauration' | 'groupes', Visuel>> = {
  sejour: { photo: officielle('facade'), legende: 'La terrasse abritée du restaurant, devant la façade', position: '50% 80%' },
  restauration: { photo: officielle('machine-cafe'), legende: 'La machine à expresso de la maison. Le buffet du petit-déjeuner n’est pas encore photographié.' },
  groupes: { photo: officielle('seminaire'), legende: 'La salle de séminaires, sous charpente, tables en U' },
};

/** Groupes et séminaires. */
export const groupesVisuels = {
  seminaire: { photo: officielle('seminaire'), legende: 'La salle de séminaires : charpente apparente, tables en U, écran' },
  circuitsSurtitre: 'À moto, à pied ou en autocar',
  salleGroupe: { attendu: 'Salle voûtée du restaurant, dressée pour un groupe' } satisfies Attendu,
  vueSeminaire: { attendu: 'Vue depuis la salle de séminaires' } satisfies Attendu,
};

/** Meyrueis et environs : mosaïque du village (ordre = placement dans la grille). */
export const villageMosaique = {
  surtitre: 'Au fil de la Jonte et du Béthuzon',
  titre: 'Le village',
  texte:
    'Tour de l’Horloge, maison du Viguier, halle couverte, quais du Béthuzon et chapelle Notre-Dame-du-Rocher au-dessus des toits : le centre ancien se découvre à pied depuis la place de l’hôtel.',
  photos: [
    { photo: libre('meyrueis-quai-bethuzon'), legende: 'Le quai de la Barrière, le long du Béthuzon' },
    { photo: libre('meyrueis-tour-horloge'), legende: 'La tour de l’Horloge' },
    { photo: libre('meyrueis-halle'), legende: 'La halle couverte' },
    { photo: libre('meyrueis-maison-viguier'), legende: 'La maison du Viguier' },
    { photo: libre('notre-dame-du-rocher'), legende: 'Chapelle Notre-Dame-du-Rocher' },
    { photo: libre('meyrueis-vue-chapelle'), legende: 'Les toits vus de la chapelle' },
  ] satisfies Visuel[],
};

/** Page environs : textes de la galerie et des listes de sites. */
export const environsTextes = {
  galerieTitre: 'Les environs en images',
  galerieIntro: 'Photos sous licence libre (Wikimedia Commons), classées par thème. Sélectionnez une photo pour l’agrandir.',
  galerieNavLabel: 'Thèmes de la galerie',
  sitesLabel: 'Sites à visiter, par thème',
  tableauCaption: 'Récapitulatif : sites à visiter, par thème, avec la distance ou le temps de trajet depuis l’hôtel',
} as const;

/** Galeries thématiques de la page environs (identifiants de photos libres). */
export const galeriesEnvirons = [
  { id: 'nature', titre: 'Vautours, forêts et Aigoual', ids: ['belvedere-vautours', 'vautours', 'maison-vautours-terrasse', 'aigoual-forets', 'aigoual'] },
  { id: 'gorges', titre: 'Gorges de la Jonte et du Tarn', ids: ['gorges-tarn-detroits', 'gorges-jonte', 'gorges-jonte-genets', 'gorges-tarn'] },
  { id: 'causses', titre: 'Causses et chaos rocheux', ids: ['montpellier-le-vieux', 'causse-mejean', 'causse-noir', 'nimes-le-vieux'] },
  { id: 'grottes', titre: 'Grottes et avens', ids: ['aven-armand', 'dargilan', 'bramabiau'] },
  { id: 'alentours', titre: 'Meyrueis et Florac', ids: ['meyrueis-drone', 'meyrueis-pont', 'meyrueis-rue', 'florac'] },
] as const;

/** Infos pratiques. */
export const infosVisuels = {
  equipementsLabel: 'Équipements en photo',
  acces: { photo: officielle('facade'), legende: 'L’hôtel et sa terrasse, 10 place Jean Séquier', position: '50% 40%' },
  equipements: [
    { photo: officielle('piscine'), legende: 'Piscine extérieure, pelouse et transats' },
    { attendu: 'Jardin belvédère', legende: 'Jardin belvédère' },
    { attendu: 'Parking et garage deux-roues', legende: 'Parking privé et garage deux-roues' },
  ] satisfies (Visuel | Attendu)[],
};

/** Contact : photo sous les coordonnées. */
export const contactVisuel: Visuel = { photo: officielle('facade'), legende: 'L’hôtel sur la place Jean Séquier', position: '50% 40%' };

export function estAttendu(v: Visuel | Attendu): v is Attendu {
  return 'attendu' in v;
}

/**
 * Vignettes des cartes offre (accueil, chambres, offres, groupes), par slug d'offre.
 * `attendu` : la photo juste reste à prendre à l'hôtel (on n'illustre pas avec un autre sujet).
 */
export const offresPhotos: Record<string, Visuel | Attendu> = {
  'demi-pension': { photo: officielle('double-3'), legende: 'Une chambre double, celle de la formule pour deux' },
  'petit-dejeuner': { photo: officielle('machine-cafe'), legende: 'La machine à expresso de la maison' },
  'demi-pension-groupe': { attendu: 'Salle voûtée dressée pour un groupe' },
  'journee-etude': { photo: officielle('seminaire'), legende: 'La salle de séminaires, tables en U' },
  'circuit-voitures-motos-velos': { photo: libre('gorges-jonte'), legende: 'La route D996 dans les gorges de la Jonte' },
  'circuit-randonnees': { photo: libre('causse-mejean'), legende: 'Pâturages du causse Méjean' },
  'circuit-autocaristes': { photo: libre('bramabiau'), legende: 'L’abîme de Bramabiau, étape du circuit Aigoual' },
};

/** Page crédits : textes, liste des photos officielles (avec leur usage) et polices. */
export const creditsPage = {
  titre: 'Crédits photos',
  lead: 'Les photos du village et des environs proviennent de Wikimedia Commons et sont publiées sous licence libre ; elles ont été redimensionnées pour le web. Les photos des chambres et de l’établissement proviennent du site actuel de l’hôtel : elles lui appartiennent et ne figurent ici que dans une maquette, en attente de son autorisation écrite.',
  libres: {
    titre: 'Photos sous licence libre',
    caption: (n: number) => `${n} photos libres, avec auteur, licence et source`,
    note: 'Les images sous licence CC BY-SA modifiées (redimensionnement) restent diffusées sous la même licence.',
  },
  officielles: {
    titre: 'Photos de l’hôtel',
    texte: 'Ces photos sont reprises du site actuel du Grand Hôtel de France (hotel-meyrueis-lozere.fr) et redimensionnées pour le web. Elles restent la propriété de l’hôtel. Aucune licence de réutilisation n’a été accordée : elles ne doivent pas être publiées en ligne sans l’autorisation écrite de l’établissement.',
    caption: (n: number) => `${n} photos de l’hôtel, avec leur usage sur le site`,
    mention: '© Grand Hôtel de France — usage soumis à autorisation',
  },
  polices: {
    titre: 'Polices',
    texte: 'Les polices sont hébergées sur le site (aucun appel à un service tiers).',
    liste: [
      { nom: 'Source Serif 4', usage: 'Titres et texte courant', auteur: 'Adobe', licence: 'SIL Open Font License 1.1', fichier: '/fonts/OFL-source-serif-4.txt' },
      { nom: 'Caveat', usage: 'Quelques sur-titres manuscrits', auteur: 'The Caveat Project Authors', licence: 'SIL Open Font License 1.1', fichier: '/fonts/OFL-caveat.txt' },
    ],
  },
} as const;

const usagesEtablissement: Record<string, string> = {
  facade: 'Façade et terrasse',
  piscine: 'Piscine',
  seminaire: 'Salle de séminaires',
  cheminee: 'Cheminée',
  'machine-cafe': 'Machine à café',
};

/** Toutes les photos officielles avec leur usage (chambres par catégorie, salle de bain, établissement). */
export function photosOfficiellesAvecUsage(nomsChambres: Record<string, string>): { photo: PhotoOfficielle; usage: string }[] {
  return [
    ...Object.entries(photosChambres).flatMap(([slug, liste]) => liste.map((photo) => ({ photo, usage: nomsChambres[slug] ?? slug }))),
    { photo: photoSalleDeBain, usage: 'Salle de bain' },
    ...Object.entries(photosHotel).map(([cle, photo]) => ({ photo, usage: usagesEtablissement[cle] ?? 'Établissement' })),
  ];
}
