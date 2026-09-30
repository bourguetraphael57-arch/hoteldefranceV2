/**
 * Textes des animations décoratives (src/components/motion/).
 * Aucune distance n'est saisie ici : elles viennent de src/data/environs.ts et src/data/hotel.ts.
 */
import type { Etape } from '../components/motion/Itineraire.astro';
import { sites } from './environs';
import { hotel } from './hotel';
import { restaurant } from './restaurant';

/** Distance affichée pour un site : vérification cartographique si elle existe, sinon valeur du site actuel. */
const depuisHotel = (nom: string): string | undefined => {
  const s = sites.find((x) => x.nom === nom);
  if (!s) throw new Error(`Site inconnu dans environs.ts : ${nom}`);
  const d = s.distanceVerifiee ?? s.distance;
  return d ? `Depuis l’hôtel : ${d}` : undefined;
};

/** Page Meyrueis & environs : idées d'étapes, du causse Noir à l'Aigoual. */
export const itineraireEnvirons = {
  titre: 'Idées d’étapes autour de l’hôtel',
  intro: 'Du causse Noir au mont Aigoual en passant par les gorges de la Jonte et le causse Méjean : quelques sites de la sélection de l’hôtel, dans l’ordre d’une boucle possible.',
  label: 'Étapes proposées autour de l’hôtel, avec la distance depuis l’hôtel',
  note: 'distances indicatives, reprises du site actuel ou vérifiées sur carte',
  etapes: [
    { nom: 'Meyrueis', distance: 'Départ de l’hôtel, place Jean Séquier', icone: 'village' },
    { nom: 'Grotte de Dargilan', texte: 'Causse Noir', distance: depuisHotel('Grotte de Dargilan'), icone: 'grotte' },
    { nom: 'Maison des vautours', texte: 'Gorges de la Jonte', distance: depuisHotel('Maison des vautours'), icone: 'vautour' },
    { nom: 'Ferme caussenarde d’autrefois', texte: 'Causse Méjean', distance: depuisHotel('Ferme caussenarde d’autrefois'), icone: 'causse' },
    { nom: 'Observatoire du mont Aigoual', texte: 'Massif de l’Aigoual', distance: depuisHotel('Observatoire du mont Aigoual'), icone: 'sommet' },
  ] satisfies Etape[],
};

/** Page Infos pratiques : villes proches (distances de hotel.acces.proximite, depuis l'hôtel). */
const iconesProximite: Record<string, Etape['icone']> = {
  'Gorges du Tarn (Sainte-Enimie)': 'gorge',
  Florac: 'causse',
  Millau: 'viaduc',
};
export const itineraireAcces = {
  label: 'Villes et sites proches, avec la distance depuis l’hôtel',
  etapes: [
    { nom: 'Meyrueis', distance: 'L’hôtel', icone: 'village' },
    ...hotel.acces.proximite.map((p) => ({ nom: p.lieu, distance: p.distance, icone: iconesProximite[p.lieu] })),
  ] satisfies Etape[],
};

/** Annotations manuscrites de l'accueil. */
export const annotations = {
  maison: 'les toits, vus d’une chambre',
  terrasse: 'la terrasse aux beaux jours',
};

/** Repères horaires du restaurant (tasse / lune). Le dîner n'est affiché que s'il est identique tous les jours. */
const diners = new Set(restaurant.horaires.map((h) => h.diner));
const dinerUnique = diners.size === 1 ? [...diners][0] : null;
export const reperesRepas = [
  { icone: 'tasse', label: 'Petit-déjeuner', valeur: hotel.horaires.petitDejeuner },
  ...(dinerUnique ? [{ icone: 'nuit', label: 'Dîner, tous les soirs', valeur: dinerUnique }] : []),
] as const;

/** Page 404. */
export const page404 = { clin: 'même les vautours s’égarent parfois…' };
