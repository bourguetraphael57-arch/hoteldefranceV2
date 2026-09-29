import type { Page } from '@playwright/test';

export const PAGES = [
  '/', '/chambres/', '/chambres/chambre-double/', '/chambres/chambre-twin/', '/chambres/chambre-triple/', '/chambres/chambre-familiale/',
  '/restaurant/', '/offres/', '/groupes-seminaires/', '/meyrueis-environs/', '/infos-pratiques/', '/faq/',
  '/contact/', '/mentions-legales/', '/confidentialite/', '/credits-photos/', '/plan-du-site/',
];

/** Bloque tout réseau externe : les tests ne doivent pas dépendre de Reservit ni de Wikimedia. */
export async function offline(page: Page) {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
}
