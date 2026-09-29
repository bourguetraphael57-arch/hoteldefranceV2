import { expect, test, type Page } from '@playwright/test';
import { offline } from './helpers';

test.beforeEach(async ({ page }) => offline(page));

function isoIn(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('sv-SE', { timeZone: 'Europe/Paris' });
}

async function captureReservit(page: Page, action: () => Promise<void>) {
  const req = page.waitForRequest(/secure\.reservit\.com/);
  await action();
  return new URL((await req).url());
}

test('choisir une chambre depuis l’accueil puis réserver via Reservit', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Chambre double', exact: true }).first().click();
  await expect(page).toHaveURL(/\/chambres\/chambre-double\/$/);
  await expect(page.locator('h1')).toContainText(/double/i);

  await page.getByRole('link', { name: 'Choisir mes dates' }).click();
  const booking = page.locator('#reserver');
  await expect(booking).toBeInViewport();
  const arrivee = isoIn(10);
  const depart = isoIn(12);
  await booking.getByLabel(/Arrivée/).fill(arrivee);
  await booking.getByLabel(/Départ/).fill(depart);
  await booking.getByRole('button', { name: /Ajouter un adulte/ }).click();

  const url = await captureReservit(page, () => booking.getByRole('button', { name: /Voir les disponibilités et réserver/ }).click());
  const p = url.searchParams;
  expect(p.get('hotelid')).toBe('152592');
  expect(p.get('roomtcode')).toBe('439120');
  expect(p.get('nbadt')).toBe('3');
  expect(`${p.get('fyear')}-${p.get('fmonth')}-${p.get('fday')}`).toBe(arrivee);
  expect(`${p.get('tyear')}-${p.get('tmonth')}-${p.get('tday')}`).toBe(depart);
});

test('le moteur refuse un départ avant l’arrivée sans quitter le site', async ({ page }) => {
  await page.goto('/chambres/chambre-triple/');
  const booking = page.locator('#reserver');
  await booking.getByLabel(/Arrivée/).fill(isoIn(10));
  await booking.getByLabel(/Départ/).fill(isoIn(8));
  await booking.getByRole('button', { name: /Voir les disponibilités et réserver/ }).click();
  await expect(booking.getByRole('alert')).toBeVisible();
  await expect(page).toHaveURL(/\/chambres\/chambre-triple\/$/);
});

test('les boutons Réserver des cartes chambres pointent vers le bon type', async ({ page }) => {
  await page.goto('/chambres/');
  const hrefs = await page.locator('.card a.btn--primary').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
  const codes = hrefs.map((h) => new URL(h).searchParams.get('roomtcode'));
  expect(codes).toEqual(['439120', '439121', '439122', '439123']);
  for (const h of hrefs) expect(new URL(h).searchParams.get('hotelid')).toBe('152592');
});

test('choisir une chambre puis envoyer une demande de disponibilité (mode démo)', async ({ page }) => {
  await page.goto('/chambres/chambre-familiale/');
  const booking = page.locator('#reserver');
  const arrivee = isoIn(20);
  await booking.getByLabel(/Arrivée/).fill(arrivee);
  await booking.getByLabel(/Arrivée/).dispatchEvent('change');
  await booking.getByRole('link', { name: /demande de disponibilité/ }).click();

  await expect(page).toHaveURL(/\/contact\/\?/);
  await expect(page.getByLabel('Arrivée')).toHaveValue(arrivee);
  await expect(page.getByLabel('Départ')).toHaveValue(isoIn(21));
  await expect(page.getByLabel(/Type de chambre/)).not.toHaveValue('');

  await page.getByLabel(/^Nom/).fill('Camille Test');
  await page.getByLabel(/^E-mail/).fill('camille@example.fr');
  await page.getByRole('button', { name: 'Envoyer ma demande' }).click();

  await expect(page.getByRole('status')).toContainText('Mode démonstration');
  await expect(page.getByText('Récapitulatif')).toBeVisible();
  await expect(page.locator('main')).toContainText('Camille Test');
  await expect(page.locator('main')).not.toContainText(/réservation (est )?confirmée/i);
});

test('validation du formulaire côté navigateur', async ({ page }) => {
  await page.goto('/contact/?objet=question');
  await page.getByRole('button', { name: 'Envoyer ma demande' }).click();
  const summary = page.locator('[data-error-summary]');
  await expect(summary).toBeVisible();
  await expect(summary).toBeFocused();
  await expect(page.locator('#nom')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#message')).toHaveAttribute('aria-invalid', 'true');
  // Le lien du récapitulatif amène au champ.
  await summary.getByRole('link').first().click();
  await expect(page.locator('#nom')).toBeFocused();
});

test('validation côté serveur sans JavaScript', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/contact/');
  await page.locator('#nom').fill('X');
  // Valeurs acceptées par le navigateur mais refusées par le serveur : ni e-mail ni téléphone, départ avant l'arrivée.
  await page.locator('#arrivee').fill(isoIn(5));
  await page.locator('#depart').fill(isoIn(3));
  const [res] = await Promise.all([page.waitForResponse((r) => r.url().includes('/contact/') && r.request().method() === 'POST'), page.getByRole('button', { name: 'Envoyer ma demande' }).click()]);
  expect(res.status()).toBe(422);
  await expect(page.locator('#erreurs')).toBeVisible();
  await expect(page.locator('#email-err')).toContainText(/e-mail ou un numéro/);
  await expect(page.locator('#depart-err')).toBeVisible();
  await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#nom')).toHaveValue('X');
  await ctx.close();
});

test('le lien d’une offre pré-remplit le formulaire', async ({ page }) => {
  await page.goto('/offres/');
  await page.locator('a[href*="offre="]').first().click();
  await expect(page).toHaveURL(/\/contact\/\?.*offre=/);
  await expect(page.locator('#message')).toHaveValue(/offre/);
});

test('le serveur refuse un envoi depuis un autre site', async ({ request }, info) => {
  test.skip(info.project.name !== 'bureau-1280');
  const res = await request.post('/contact/', { headers: { Origin: 'https://exemple-malveillant.test' }, form: { objet: 'question', nom: 'A', email: 'a@b.fr', message: 'x' } });
  expect(res.status()).toBe(403);
});

test('le champ piège anti-robot ne déclenche aucun envoi réel', async ({ request, baseURL }, info) => {
  test.skip(info.project.name !== 'bureau-1280');
  const res = await request.post('/contact/', { headers: { Origin: baseURL! }, form: { objet: 'question', nom: 'Robot', email: 'r@b.fr', message: 'spam', site_web: 'http://spam.test' } });
  expect(res.status()).toBe(200);
  expect(res.headers()['cache-control']).toBe('no-store');
});
