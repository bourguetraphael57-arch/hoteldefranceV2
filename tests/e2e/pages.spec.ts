import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { offline, PAGES } from './helpers';

test.beforeEach(async ({ page }) => offline(page));

for (const path of PAGES) {
  test(`page ${path} : rendu, titre, h1 unique, axe, pas de débordement`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error' && !/net::ERR_FAILED/.test(m.text())) errors.push(m.text()); });

    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/Grand Hôtel de France|Meyrueis/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByText('Maquette non officielle').first()).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, 'défilement horizontal').toBeLessThanOrEqual(0);

    // axe fait défiler la page pendant l'analyse, ce qui déclencherait les apparitions en cours de mesure :
    // on affiche d'abord l'état final des animations (celui que voit le visiteur une fois l'élément à l'écran).
    await page.evaluate(() => document.querySelectorAll('.reveal, .is-armed').forEach((el) => el.classList.add('is-visible')));
    await page.waitForTimeout(1600);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const summary = axe.violations.map((v) => `${v.id} (${v.impact}) : ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`);
    expect(summary).toEqual([]);

    const imgsSansAlt = await page.locator('img:not([alt])').count();
    expect(imgsSansAlt).toBe(0);
    expect(errors).toEqual([]);
  });
}

test('aucun badge ou mention « accessible PMR » non vérifié', async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    const text = (await page.locator('body').innerText()).toLowerCase();
    expect(text, path).not.toMatch(/chambres? accessibles? pmr|établissement accessible|100 % accessible|accessible aux personnes à mobilité réduite/);
  }
});

test('aucun prix de chambre ni disponibilité inventés', async ({ page }) => {
  for (const path of ['/', '/chambres/', '/chambres/chambre-double/', '/chambres/chambre-familiale/']) {
    await page.goto(path);
    const text = await page.locator('main').innerText();
    expect(text, path).not.toMatch(/\bdisponible(s)? (ce soir|maintenant)|plus que \d+ chambre|réservation confirmée/i);
  }
});

test('404 personnalisée', async ({ page }) => {
  const res = await page.goto('/cette-page-n-existe-pas/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByRole('link', { name: /accueil/i }).first()).toBeVisible();
});
