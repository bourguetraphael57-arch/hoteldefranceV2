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
