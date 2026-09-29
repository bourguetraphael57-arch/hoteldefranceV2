/**
 * Construction des liens vers le moteur de réservation officiel Reservit.
 * Paramètres relevés dans le widget du site actuel (docs/audit.md §4) :
 * hotelid 152592, custId 2. À faire confirmer par l'hôtel avant mise en ligne.
 */
export const RESERVIT = {
  base: 'https://secure.reservit.com/reservit/reserhotel.php',
  hotelid: '152592',
  custId: '2',
  redirectHOST: 'hotel.reservit.com',
  adultesMin: 1,
  adultesMax: 14,
  adultesDefaut: 2,
} as const;

export interface ResaOptions {
  /** Date d'arrivée au format AAAA-MM-JJ. */
  arrivee?: string;
  /** Date de départ au format AAAA-MM-JJ. */
  depart?: string;
  adultes?: number;
  /** Code type de chambre Reservit (roomtcode). */
  roomtcode?: string;
  lang?: 'FR' | 'EN';
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Découpe une date AAAA-MM-JJ valide ; renvoie null sinon. */
export function splitDate(value: string | undefined): { d: string; m: string; y: string } | null {
  if (!value) return null;
  const match = ISO_DATE.exec(value);
  if (!match) return null;
  const [, y, m, d] = match as unknown as [string, string, string, string];
  const date = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
  if (date.getUTCFullYear() !== Number(y) || date.getUTCMonth() !== Number(m) - 1 || date.getUTCDate() !== Number(d)) {
    return null;
  }
  return { d, m, y };
}

export function clampAdultes(n: number | undefined): number {
  if (n === undefined || !Number.isFinite(n)) return RESERVIT.adultesDefaut;
  return Math.min(RESERVIT.adultesMax, Math.max(RESERVIT.adultesMin, Math.round(n)));
}

/** URL de réservation (avec dates si elles sont valides et cohérentes). */
export function bookingUrl(opts: ResaOptions = {}): string {
  const params = new URLSearchParams({
    lang: opts.lang ?? 'FR',
    action: 'resa',
    redirectHOST: RESERVIT.redirectHOST,
    hotelid: RESERVIT.hotelid,
    custId: RESERVIT.custId,
  });
  const a = splitDate(opts.arrivee);
  const b = splitDate(opts.depart);
  if (a && b && opts.arrivee! < opts.depart!) {
    params.set('fday', a.d);
    params.set('fmonth', a.m);
    params.set('fyear', a.y);
    params.set('tday', b.d);
    params.set('tmonth', b.m);
    params.set('tyear', b.y);
  }
  if (opts.roomtcode) params.set('roomtcode', opts.roomtcode);
  params.set('nbadt', String(clampAdultes(opts.adultes)));
  return `${RESERVIT.base}?${params.toString()}`;
}

/** Tableau des disponibilités (repli sans dates). */
export function availabilityUrl(lang: 'FR' | 'EN' = 'FR'): string {
  const params = new URLSearchParams({ action: 'tabavail', lang, id: RESERVIT.custId, hotelid: RESERVIT.hotelid });
  return `${RESERVIT.base}?${params.toString()}`;
}
