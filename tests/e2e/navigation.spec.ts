import { expect, test } from '@playwright/test';
import { offline } from './helpers';

test.beforeEach(async ({ page }) => offline(page));

test('menu mobile : ouverture, Échap, retour du focus', async ({ page }, info) => {
  test.skip(info.project.name === 'bureau-1280', 'menu toujours visible sur grand écran');
  await page.goto('/');
  const toggle = page.locator('[data-nav-toggle]');
  const menu = page.locator('#menu-principal');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeHidden();

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(menu).toBeVisible();
  await expect(page.locator('main')).toHaveAttribute('inert', '');

  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
  await expect(page.locator('main')).not.toHaveAttribute('inert', '');

  await toggle.click();
  await menu.getByRole('link', { name: 'Restaurant' }).click();
  await expect(page).toHaveURL(/\/restaurant\/$/);
  await expect(page.locator('#menu-principal a[aria-current="page"]')).toHaveText(/Restaurant/);
});

test('menu utilisable sans JavaScript', async ({ browser }, info) => {
  test.skip(info.project.name !== 'mobile-375');
  const ctx = await browser.newContext({ reducedMotion: 'reduce', javaScriptEnabled: false, viewport: { width: 375, height: 740 } });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('#menu-principal')).toBeVisible();
  await expect(page.locator('[data-nav-toggle]')).toBeHidden();
  await ctx.close();
});

test('barre mobile : appeler et réserver toujours accessibles', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile-375');
  await page.goto('/restaurant/');
  const bar = page.locator('[data-mobile-bar]');
  // En haut de page, la barre s'efface derrière les boutons d'action du hero (qui restent visibles)…
  const topActions = page.locator('main .btn-row').first();
  await expect(topActions.getByRole('link').first()).toBeVisible();
  // …et revient dès qu'on les a dépassés.
  await page.evaluate(() => scrollTo(0, 2500));
  await expect(bar).toBeVisible();
  await expect(bar.getByRole('link', { name: /Appeler/ })).toHaveAttribute('href', 'tel:+33466456007');
  await expect(bar.getByRole('link', { name: /Réserver/ })).toBeVisible();
});

test('lien d’évitement vers le contenu', async ({ page }) => {
  await page.goto('/chambres/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: /Aller au contenu/ });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#contenu$/);
});

test('galerie : ouverture, flèches, fermeture et focus rendu', async ({ page }) => {
  await page.goto('/meyrueis-environs/');
  const first = page.locator('[data-gallery] a').first();
  await first.click();
  const dialog = page.locator('dialog[open]');
  await expect(dialog).toBeVisible();
  const src1 = await dialog.locator('img').getAttribute('src');
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('img')).not.toHaveAttribute('src', src1!);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(first).toBeFocused();
});

test('comparateur des chambres lisible', async ({ page }) => {
  await page.goto('/chambres/#comparatif');
  const table = page.locator('#comparatif table');
  await expect(table).toBeVisible();
  await expect(table.locator('thead th')).toHaveCount(6);
  await expect(table).toContainText('Chambre double');
  await expect(table).toContainText('Chambre familiale');
});

test('captures d’écran', async ({ page }, info) => {
  for (const [name, path] of [['accueil', '/'], ['chambre', '/chambres/chambre-double/'], ['chambres', '/chambres/'], ['contact', '/contact/'], ['restaurant', '/restaurant/'], ['infos', '/infos-pratiques/']] as const) {
    await page.goto(path);
    await page.screenshot({ path: `test-results/captures/${info.project.name}-${name}.png`, fullPage: true });
  }
});
