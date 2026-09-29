/**
 * Données générales de l'établissement.
 * Source : site actuel (export du 29/09/2026) — voir docs/audit.md.
 * Toute valeur listée dans `aConfirmer` est affichée avec la mention « à confirmer ».
 */
export const hotel = {
  nom: 'Grand Hôtel de France',
  slogan: 'Hôtel familial à Meyrueis, entre Causses et Cévennes',
  /** Classement affiché sur le site actuel, sans date de classement. */
  classement: '3 étoiles',
  adresse: {
    rue: '10, place Jean Séquier',
    codePostal: '48150',
    ville: 'Meyrueis',
    departement: 'Lozère',
    region: 'Occitanie',
    pays: 'FR',
  },
  geo: { lat: 44.1781333, lng: 3.4281833 },
  telephone: { affiche: '04 66 45 60 07', international: '+33 4 66 45 60 07', href: 'tel:+33466456007' },
  email: 'grandhoteldefrance@wanadoo.fr',
  itineraire: 'https://www.google.com/maps/dir/?api=1&destination=44.1781333%2C3.4281833',
  carte: 'https://www.google.com/maps/search/?api=1&query=44.1781333%2C3.4281833',
  horaires: {
    arrivee: '15 h – 20 h',
    depart: '7 h 30 – 11 h',
    petitDejeuner: '7 h 30 – 9 h 30',
  },
  nombreChambres: 44,
  renovation: 2017,
  histoire: {
    depuis: 1946,
    famille: 'Cordelier',
    batiment: 'ancien relais de poste du XVIIe siècle',
  },
  /** Équipements cités sur le site actuel (pages accueil et accès). */
  equipements: [
    { id: 'piscine', label: 'Piscine extérieure chauffée', detail: 'À flanc de colline, dans le jardin', aConfirmer: 'saison et horaires d’ouverture' },
    { id: 'jardin', label: 'Jardin belvédère', detail: 'Vue sur le massif de l’Aigoual et le causse Méjean', aConfirmer: 'accès et aménagement' },
    { id: 'terrasse', label: 'Grande terrasse en teck fleurie', detail: 'Côté restaurant', aConfirmer: 'période d’ouverture' },
    { id: 'parking', label: 'Parking privé sécurisé', aConfirmer: 'gratuit ou payant, nombre de places' },
    { id: 'garage', label: 'Garage pour vélos et motos', aConfirmer: 'conditions d’accès' },
    { id: 'wifi', label: 'Wifi gratuit dans tout l’hôtel', aConfirmer: 'couverture et gratuité' },
    { id: 'ascenseur', label: 'Ascenseur', aConfirmer: 'étages et espaces desservis' },
    { id: 'seminaire', label: 'Salle de séminaires climatisée et équipée', aConfirmer: 'capacité, surface et équipements' },
    { id: 'bar', label: 'Bar', aConfirmer: 'horaires' },
    { id: 'bibliotheque', label: 'Coin lecture', aConfirmer: 'présence actuelle' },
    { id: 'velos', label: 'Location de vélos', aConfirmer: 'présence actuelle et tarifs' },
  ],
  animaux: {
    texte: 'Animaux domestiques admis sous conditions.',
    aConfirmer: 'conditions et supplément éventuel',
  },
  /** Informations d'accès reprises du site actuel. */
  acces: {
    voiture: 'Autoroute A75, sortie 44-1, puis direction Meyrueis. Environ 1 h 45 de Montpellier, 3 h de Lyon, Marseille ou Clermont-Ferrand, 3 h 30 de Toulouse, 6 h 30 de Paris.',
    train: 'Gare de Millau (ligne Paris – Béziers), à 43 km.',
    trainAConfirmer: 'le site actuel mentionne une navette régulière entre la gare de Millau et Meyrueis : renseignez-vous auprès de l’hôtel avant de vous y fier',
    avion: 'Aéroport le plus proche : Montpellier – Méditerranée.',
    proximite: [
      { lieu: 'Gorges du Tarn (Sainte-Enimie)', distance: 'environ 29 km' },
      { lieu: 'Florac', distance: 'environ 34 km' },
      { lieu: 'Millau', distance: 'environ 43 km' },
    ],
  },
  /** Informations d'accessibilité : UNIQUEMENT ce que le site publie, zone par zone. */
  accessibilite: {
    chambres: [
      'Selon le site actuel, les chambres sont desservies par un ascenseur (étages et espaces desservis à confirmer).',
      'L’hôtel indique ne pas disposer de chambre spécifiquement équipée pour les personnes à mobilité réduite.',
    ],
    /** Formulation la plus restrictive du site actuel (page d'accueil), à trancher avec l'hôtel. */
    restrictif: 'La page d’accueil du site actuel indique par ailleurs : « Notre établissement ne peut pas recevoir de personne à mobilité réduite ».',
    nonDocumente: [
      'l’entrée et la réception (présence de marches, rampe)',
      'le restaurant, la salle voûtée et le salon particulier',
      'la terrasse, le jardin et la piscine',
      'la salle de séminaires',
      'le stationnement (place réservée)',
      'les dimensions de l’ascenseur et les étages desservis',
    ],
    /** Contradiction relevée sur le site actuel, à lever avec l'hôtel. */
    contradiction:
      'Ces deux formulations du site actuel n’ont pas la même portée et doivent être confirmées par l’hôtel.',
  },
  evenements: [
    { nom: 'Marché de Meyrueis', quand: 'Le mercredi, du 15 juin au 15 septembre', aConfirmer: true },
    { nom: 'Foire de la Saint-Michel', quand: 'Dernier week-end de septembre', aConfirmer: true },
  ],
  /** Mention systématique tant que le site n'est pas validé par l'établissement. */
  statut: 'Maquette non officielle',
} as const;

export type Hotel = typeof hotel;

export const adresseComplete = `${hotel.adresse.rue}, ${hotel.adresse.codePostal} ${hotel.adresse.ville}`;
