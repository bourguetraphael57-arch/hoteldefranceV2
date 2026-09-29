// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// Site statique (pages pré-rendues) + une seule route serveur : le formulaire de contact.
// SITE_URL doit être renseigné pour la production (URL canoniques, sitemap).
const SITE = process.env.SITE_URL ?? 'https://www.hotel-meyrueis-lozere.fr';

// Depuis Astro 5.18, l'en-tête Host n'est pris en compte que pour les domaines déclarés ici ;
// sans cette liste, la vérification d'origine rejette le formulaire de contact (403).
// ALLOWED_HOSTS (liste séparée par des virgules) permet d'ajouter un domaine de préproduction.
const allowedDomains = [
  { hostname: new URL(SITE).hostname },
  { hostname: 'localhost' },
  { hostname: '127.0.0.1' },
  ...(process.env.ALLOWED_HOSTS ?? '').split(',').map((h) => h.trim()).filter(Boolean).map((hostname) => ({ hostname })),
];

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    // La page contact est rendue à la demande : on l'ajoute explicitement au sitemap.
    sitemap({ customPages: [`${SITE}/contact/`], filter: (page) => !page.includes('/404') }),
  ],
  security: { checkOrigin: true, allowedDomains },
  build: { inlineStylesheets: 'auto' },
  prefetch: false,
});
