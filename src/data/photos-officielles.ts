/**
 * Photos des chambres reprises du site actuel de l'hôtel (hotel-meyrueis-lozere.fr).
 * Elles restent la propriété du Grand Hôtel de France : usage limité à la maquette
 * locale, aucune mise en ligne sans autorisation écrite de l'établissement.
 * Les textes alternatifs décrivent seulement ce qui est visible sur l'image.
 */
export interface PhotoOfficielle {
  id: string;
  alt: string;
  /** Chemin sans suffixe : `${src}-800.webp`, `${src}-1600.jpg`… */
  src: string;
  largeur: number;
  hauteur: number;
  /** Remarque affichée sous la photo si la correspondance photo/catégorie est incertaine. */
  remarque?: string;
}

export const creditOfficiel =
  'Photo : © Grand Hôtel de France (site actuel de l’hôtel) — réutilisation soumise à autorisation écrite';

const base = '/images/officielles/';
const photo = (id: string, alt: string, remarque?: string): PhotoOfficielle => ({
  id, alt, src: `${base}${id}`, largeur: 800, hauteur: 533, remarque,
});

export const photosChambres: Record<string, PhotoOfficielle[]> = {
  'chambre-double': [
    photo('double-1', 'Chambre double aux murs magenta, lit double fait de linge blanc'),
    photo('double-3', 'Chambre double aux tons beiges, lit double et table de chevet'),
    photo('double-2', 'Autre vue d’une chambre double aux murs magenta'),
  ],
  'chambre-twin': [
    photo('twin-1', 'Chambre twin aux murs magenta, deux lits simples'),
    photo('twin-2', 'Chambre twin aux murs verts, deux lits simples'),
  ],
  'chambre-triple': [
    photo('triple-1', 'Chambre triple aux murs verts, plusieurs couchages'),
  ],
  'chambre-familiale': [
    photo(
      'familiale-1',
      'Chambre aux tons beiges avec lit double',
      'Photo utilisée par le site actuel pour cette catégorie ; elle ne montre qu’un lit double — correspondance à confirmer avec l’hôtel.',
    ),
  ],
};

export const photoSalleDeBain = photo(
  'salle-de-bain',
  'Salle de bain d’une chambre : douche, lavabo et sèche-cheveux mural',
  'Salle de bain type ; l’équipement exact peut varier selon la chambre — à confirmer.',
);

export function photosDe(slug: string): PhotoOfficielle[] {
  return photosChambres[slug] ?? [];
}

/**
 * Photos de l'établissement (hors chambres) reprises du site actuel.
 * Dimensions = celles du fichier `-1600` (sources 1900×1267 ou 1920×1280).
 */
const photoEtablissement = (
  id: string, alt: string, largeur: number, hauteur: number, remarque?: string,
): PhotoOfficielle => ({ id, alt, src: `${base}${id}`, largeur, hauteur, remarque });

export const photosHotel: Record<string, PhotoOfficielle> = {
  facade: photoEtablissement(
    'facade',
    'Façade en pierre aux volets rouges portant l’enseigne « Grand Hotel de France », terrasse abritée sous des auvents beiges avec tables et pots de fleurs',
    1600, 1067,
  ),
  piscine: photoEtablissement(
    'piscine',
    'Piscine aux bords arrondis entourée d’un dallage clair, transats et parasols sur la pelouse, petite maison en pierre et barrière blanche fleurie, pente boisée en arrière-plan',
    1600, 1067,
  ),
  seminaire: photoEtablissement(
    'seminaire',
    'Salle sous charpente apparente, tables disposées en U avec chaises noires, parquet clair, fenêtres cintrées et écran',
    1600, 1067,
  ),
  cheminee: photoEtablissement(
    'cheminee',
    'Grande cheminée en pierre avec crémaillère et marmites en fonte, fauteuil rond et plante verte, sol carrelé',
    1600, 1067,
    'Photo du site actuel ; la pièce exacte (salon, restaurant) n’est pas précisée — à confirmer avec l’hôtel.',
  ),
  'machine-cafe': photoEtablissement(
    'machine-cafe',
    'Machine à expresso chromée à leviers devant un mur ocre portant l’inscription « Grand Hotel de France »',
    1600, 1067,
  ),
};

/** Photo de l'établissement par clé (`facade`, `piscine`, `seminaire`, `cheminee`, `machine-cafe`). */
export function photoHotel(cle: string): PhotoOfficielle | undefined {
  return photosHotel[cle];
}

/** Toutes les photos officielles (chambres, salle de bain, établissement), sans doublon. */
export function toutesPhotosOfficielles(): PhotoOfficielle[] {
  const toutes = [...Object.values(photosChambres).flat(), photoSalleDeBain, ...Object.values(photosHotel)];
  return toutes.filter((p, i) => toutes.findIndex((q) => q.id === p.id) === i);
}

/** Photo officielle par identifiant de fichier (`facade`, `double-3`, `salle-de-bain`…). */
export function photoOfficielleParId(id: string): PhotoOfficielle {
  const p = toutesPhotosOfficielles().find((x) => x.id === id);
  if (!p) throw new Error(`Photo officielle inconnue : ${id}`);
  return p;
}
