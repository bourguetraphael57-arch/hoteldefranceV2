import { defineConfig, devices } from '@playwright/test';

const PORT = 4329;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: `http://127.0.0.1:${PORT}`, locale: 'fr-FR', timezoneId: 'Europe/Paris' },
  projects: [
    { name: 'mobile-375', use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 740 }, isMobile: true, hasTouch: true } },
    { name: 'tablette-768', use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } } },
    { name: 'bureau-1280', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 850 } } },
  ],
  // Le site doit être construit (npm run build) ; SMTP_HOST vide = mode démonstration, rien n'est envoyé.
  webServer: {
    command: 'node ./dist/server/entry.mjs',
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: false,
    env: { HOST: '127.0.0.1', PORT: String(PORT), SMTP_HOST: '', CONTACT_RATE_LIMIT: '1000' },
  },
});
