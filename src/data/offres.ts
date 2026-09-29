/**
 * Formules et offres publiées sur le site actuel (pages offres 605 à 622).
 * Tous les tarifs sont indicatifs : ils ne comportent ni période de validité ni conditions.
 * Pour modifier un prix, changer `prix` ; pour retirer une offre, passer `publiee` à false.
 */
export type CategorieOffre = 'sejour' | 'restauration' | 'groupes' | 'circuits';

export interface Offre {
  slug: string;
  titre: string;
  categorie: CategorieOffre;
  /** Prix en euros. */
  prix?: number;
  unite?: string;
  base?: string;
  resume: string;
  inclus: string[];
  aConfirmer: string[];
  publiee: boolean;
}

export const categoriesOffres: Record<CategorieOffre, string> = {
  sejour: 'Séjour',
  restauration: 'Restauration',
  groupes: 'Groupes',
  circuits: 'Circuits',
};

export const offres: Offre[] = [
  {
    slug: 'demi-pension',
    titre: 'Formule demi-pension',
    categorie: 'sejour',
    prix: 82,
    unite: 'par jour et par personne',
    base: 'base 2 personnes',
    resume: 'La nuit, le petit-déjeuner et un dîner du terroir.',
    inclus: [
      '1 nuit en chambre double',
      '1 petit-déjeuner',
      '1 dîner du terroir (menu imposé) : entrée, plat, fromage local et dessert',
      'Wifi gratuit',
    ],
    aConfirmer: ['tarif et période de validité', 'type de petit-déjeuner (« complet » ou « continental » selon les pages)'],
    publiee: true,
  },
  {
    slug: 'petit-dejeuner',
    titre: 'Petit-déjeuner',
    categorie: 'restauration',
    prix: 12.5,
    unite: 'par personne',
    resume: 'Servi de 7 h 30 à 9 h 30, avec des produits maison et locaux.',
    inclus: [
      'Boisson chaude au choix, jus de fruits bio',
      'Viennoiserie, pain d’artisan blanc et aux céréales, beurre',
      'Confitures, charcuterie et cake maison',
      'Fromages locaux, yaourt de la ferme, miel de producteur',
      'Céréales, salade de fruits frais',
    ],
    aConfirmer: ['tarif'],
    publiee: true,
  },
  {
    slug: 'demi-pension-groupe',
    titre: 'Demi-pension groupe',
    categorie: 'groupes',
    prix: 78,
    unite: 'par jour et par personne',
    base: 'à partir de 10 personnes (seuil à confirmer)',
    resume: 'Hébergement, petit-déjeuner et dîner du terroir boissons comprises, pour les groupes.',
    inclus: [
      'Hébergement en chambre double ou à deux lits',
      '1 petit-déjeuner (continental selon le site actuel)',
      '1 dîner du terroir : entrée, plat, fromage local, dessert, vin et café ou infusion',
      '1 gratuité pour 20 personnes payantes',
      '1 apéritif de bienvenue à partir de 3 jours de séjour',
    ],
    aConfirmer: ['seuil du groupe (10 personnes sur le site français, 15 sur le site anglais)', 'type de petit-déjeuner (« complet » ou « continental » selon les pages)', 'tarif et période de validité'],
    publiee: true,
  },
  {
    slug: 'journee-etude',
    titre: 'Forfait journée d’étude',
    categorie: 'groupes',
    prix: 78,
    unite: 'par jour et par personne',
    resume: 'Une journée de travail dans la salle de séminaires climatisée.',
    inclus: [],
    aConfirmer: ['contenu du forfait (non détaillé sur le site actuel)', 'tarif', 'capacité de la salle'],
    publiee: true,
  },
  {
    slug: 'circuit-voitures-motos-velos',
    titre: 'Circuits voitures, motos et vélos',
    categorie: 'circuits',
    prix: 78,
    unite: 'par jour et par personne',
    resume: 'Quatre itinéraires entre gorges, causses, Cévennes, Aubrac et Aveyron.',
    inclus: [
      'Entre gorges (Tarn et Jonte) et causses (Méjean et Noir)',
      'Autour du massif de l’Aigoual et de la corniche des Cévennes',
      'Aubrac et Margeride',
      'Gorges de la Dourbie, site des Templiers (Aveyron)',
    ],
    aConfirmer: ['tarif (identique pour tous les circuits sur le site actuel)', 'ce que comprend le prix'],
    publiee: true,
  },
  {
    slug: 'circuit-randonnees',
    titre: 'Circuits randonnées',
    categorie: 'circuits',
    prix: 78,
    unite: 'par jour et par personne',
    resume: 'Des sentiers de grande randonnée sur le causse Méjean et dans le massif de l’Aigoual.',
    inclus: [
      'GR des corniches du Méjean',
      'Sentier de la forêt de l’Aigoual',
      'Les arcs de Saint-Pierre',
      'Les trois hameaux du Méjean',
    ],
    aConfirmer: ['tarif', 'ce que comprend le prix'],
    publiee: true,
  },
  {
    slug: 'circuit-autocaristes',
    titre: 'Circuits autocaristes',
    categorie: 'circuits',
    prix: 78,
    unite: 'par jour et par personne',
    resume: 'Trois circuits de visites pour les groupes en autocar.',
    inclus: [
      'Gorges de la Jonte et Millau : Maison des vautours, cité de pierres, ganterie Causse, viaduc de Millau, caves de Roquefort',
      'Causse Méjean et gorges du Tarn : aven Armand, ferme caussenarde d’autrefois, moulin à vent de la Borie, descente en barque avec les bateliers de la Malène',
      'Massif de l’Aigoual : abîme de Bramabiau, observatoire météorologique, dégustation chez les brasseurs de la Jonte, jeanserie Tuffery',
    ],
    aConfirmer: ['tarif', 'ce que comprend le prix', 'visites toujours proposées'],
    publiee: true,
  },
];

export const offresPubliees = offres.filter((o) => o.publiee);

export function getOffre(slug: string): Offre | undefined {
  return offres.find((o) => o.slug === slug);
}
