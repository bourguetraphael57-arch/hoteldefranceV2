/**
 * Registre des photos sous licence libre (Wikimedia Commons). Les photos des chambres
 * reprises du site actuel de l'hôtel sont dans photos-officielles.ts : usage limité à la
 * maquette locale tant que l'autorisation écrite de l'hôtel n'est pas obtenue.
 * Les autres emplacements sans photo utilisent le composant PhotoPending.
 */
import data from './photos-libres.json';

export interface PhotoLibre {
  id: string;
  sujet: string;
  alt: string;
  /** Chemin sans suffixe : `${src}-800.webp`, `${src}-1600.jpg`… */
  src: string;
  largeur: number;
  hauteur: number;
  auteur: string;
  licence: string;
  licenceUrl: string;
  source: string;
}

export const photos: PhotoLibre[] = data;

export function getPhoto(id: string): PhotoLibre {
  const photo = photos.find((p) => p.id === id);
  if (!photo) throw new Error(`Photo inconnue : ${id}`);
  return photo;
}
