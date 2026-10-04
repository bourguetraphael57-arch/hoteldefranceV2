/**
 * Sites à découvrir autour de Meyrueis. Source : pages accueil et tourisme du site actuel.
 * Les distances sont reprises telles quelles (unités mélangées sur le site actuel) : à confirmer.
 * `photo` renvoie à un identifiant de src/data/photos-libres.json (photos sous licence libre).
 */
export type ThemeSite = 'nature' | 'grottes' | 'patrimoine' | 'activites';

export interface Site {
  nom: string;
  theme: ThemeSite;
  /** Distance ou durée telle qu'affichée sur le site actuel. */
  distance: string;
  /** Vérification cartographique indicative, quand elle diffère du site actuel. */
  distanceVerifiee?: string;
  texte: string;
  url: string;
  photo?: string;
  /** Sujet en attente de photo libre. */
  attendu?: string;
  /** Mis en avant sur l'accueil. */
  accueil?: boolean;
}

export const themesSites: Record<ThemeSite, string> = {
  nature: 'Nature et faune',
  grottes: 'Grottes et avens',
  patrimoine: 'Patrimoine et terroir',
  activites: 'Activités de plein air',
};

export const village = {
  intro:
    'Ancienne cité fortifiée, Meyrueis est située au pied du causse Méjean et du causse Noir, sous le mont Aigoual, à l’entrée des gorges de la Jonte et aux portes du Parc national des Cévennes. Le village fait partie du territoire « Causses et Cévennes » inscrit au patrimoine mondial de l’UNESCO.',
  terroir:
    'Fromages de chèvre et de brebis, charcuteries paysannes, miel des Causses et des Cévennes, confitures, bières artisanales : la région se découvre aussi à table.',
};

export const sites: Site[] = [
  {
    nom: 'Maison des vautours',
    theme: 'nature',
    distance: '20 km',
    distanceVerifiee: 'environ 16 km par la route',
    texte: 'Découvrir les vautours des gorges de la Jonte.',
    url: 'https://www.lozere-tourisme.com/maison-des-vautours/meyrueis/loiloz048fs0005a',
    photo: 'maison-vautours-terrasse',
    accueil: true,
  },
  {
    nom: 'Observatoire du mont Aigoual',
    theme: 'nature',
    distance: '35 min',
    texte: 'L’observatoire météorologique au sommet du massif de l’Aigoual.',
    url: 'https://www.sudcevennes.com/Visiter/Les-sites-a-visiter/observatoire-du-mont-aigoual/10220',
    photo: 'aigoual',
    accueil: true,
  },
  {
    nom: 'Grotte de Dargilan',
    theme: 'grottes',
    distance: '13 min',
    texte: 'Une grotte à visiter sur le causse Noir, tout près de Meyrueis.',
    url: 'https://www.grotte-dargilan-48.com/',
    photo: 'dargilan',
    accueil: true,
  },
  {
    nom: 'Bateliers de la Malène',
    theme: 'activites',
    distance: '31 km',
    distanceVerifiee: 'environ 24 km par la route',
    texte: 'Descendre en barque les gorges du Tarn.',
    url: 'https://www.gorgesdutarn.com/',
    photo: 'gorges-tarn-detroits',
    accueil: true,
  },
  {
    nom: 'Ferme caussenarde d’autrefois',
    theme: 'patrimoine',
    distance: '15 km',
    texte: 'La vie paysanne sur le causse Méjean.',
    url: 'https://www.ferme-caussenarde.com/',
    photo: 'ferme-caussenarde',
  },
  {
    nom: 'Moulin à vent de la Borie',
    theme: 'patrimoine',
    distance: '13 km',
    texte: 'Un moulin à vent sur le causse Méjean.',
    url: 'https://moulindelaborie.com/',
    photo: 'moulin-borie',
  },
  {
    nom: 'Bisons des Randals',
    theme: 'nature',
    distance: '16 km',
    texte: 'Des bisons sur le causse Noir.',
    url: 'https://www.randals-bison.com/',
    photo: 'bisons-causse',
  },
  {
    nom: 'Escalade dans les corniches',
    theme: 'activites',
    distance: '47 min',
    texte: 'Les voies des corniches de la Jonte et du Tarn (Vase de Chine, Vase de Sèvres).',
    url: 'https://www.altituderando.com/Corniches-de-la-Jonte-et-du-Tarn-Vase-de-Chine-et-Vase-de-Sevres',
    photo: 'gorges-jonte-genets',
  },
  {
    nom: 'Parapente à Millau',
    theme: 'activites',
    distance: '1 h',
    texte: 'Survoler la vallée du Tarn et le viaduc.',
    url: 'https://www.leviaducdemillau.com/fr',
    photo: 'viaduc-millau',
  },
  {
    nom: 'Caves de Roquefort',
    theme: 'patrimoine',
    distance: '1 h 20',
    texte: 'Visiter les caves de Roquefort.',
    url: 'https://www.tourisme-aveyron.com/fr/voir-faire/decouvrir-aveyron/sites-visiter/roquefort-et-ses-caves/la-visite-caves-roquefort',
    photo: 'caves-roquefort',
  },
];

/** Sites mis en avant sur l'accueil. */
export const sitesAccueil = sites.filter((s) => s.accueil && s.photo);
