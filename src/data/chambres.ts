/**
 * Catégories de chambres. Source : pages chambres et offres 731 à 734 du site actuel.
 * Règle : une information absente reste `undefined` et s'affiche « Non communiquée ».
 * Aucun prix n'est publié par l'hôtel : `prixAPartirDe` reste vide tant qu'il n'est pas validé.
 */
export interface Chambre {
  slug: string;
  nom: string;
  /** Nom court pour les tableaux. */
  court: string;
  /** Nombre maximal de personnes, tel qu'affiché sur le site actuel. */
  capacite?: number;
  literie?: string;
  surface?: string;
  resume: string;
  /** Code de type de chambre dans Reservit. */
  roomtcode: string;
  /** Prix « à partir de », en euros, à renseigner seulement après validation par l'hôtel. */
  prixAPartirDe?: number;
  aConfirmer: string[];
}

/** Équipements communs annoncés pour les 44 chambres (page chambres du site actuel). */
export const equipementsCommuns = [
  'Salle de bain avec baignoire ou douche, et WC',
  'Sèche-cheveux et prise rasoir',
  'Télévision à écran plat',
  'Wifi gratuit',
  'Bureau avec port USB',
  'Téléphone direct',
] as const;

export const vuesChambres =
  'Selon la chambre, vue sur le village, sur le parc ou sur la nature environnante.';

export const chambres: Chambre[] = [
  {
    slug: 'chambre-double',
    nom: 'Chambre double',
    court: 'Double',
    capacite: 2,
    literie: '1 lit 140 × 190 cm',
    surface: '12 à 15 m²',
    resume: 'Pour deux personnes, avec un grand lit.',
    roomtcode: '439120',
    aConfirmer: ['surface (12 à 15 m² sur la page chambres, 12 m² sur la page demi-pension)', 'baignoire ou douche selon la chambre'],
  },
  {
    slug: 'chambre-twin',
    nom: 'Chambre twin',
    court: 'Twin',
    capacite: 2,
    literie: '2 lits individuels',
    resume: 'Pour deux personnes qui préfèrent deux lits séparés : amis, collègues en déplacement, randonneurs.',
    roomtcode: '439121',
    aConfirmer: ['capacité (non indiquée sur la fiche, déduite de l’intitulé « twin »)', 'dimensions des lits', 'surface'],
  },
  {
    slug: 'chambre-triple',
    nom: 'Chambre triple',
    court: 'Triple',
    capacite: 3,
    resume: 'Pour trois personnes : une famille avec un enfant ou un petit groupe d’amis.',
    roomtcode: '439122',
    aConfirmer: ['composition de la literie', 'surface'],
  },
  {
    slug: 'chambre-familiale',
    nom: 'Chambre familiale',
    court: 'Familiale',
    capacite: 4,
    resume: 'Pour quatre personnes, pensée pour les familles en vacances en Lozère.',
    roomtcode: '439123',
    aConfirmer: ['composition de la literie', 'surface', 'existence d’un duplex (cité une fois sur le site actuel)'],
  },
];

export function getChambre(slug: string): Chambre | undefined {
  return chambres.find((c) => c.slug === slug);
}
