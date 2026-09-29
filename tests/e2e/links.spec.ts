import { expect, test } from '@playwright/test';
import { offline, PAGES } from './helpers';

test.describe.configure({ mode: 'serial' });

test('tous les liens internes et ancres répondent', async ({ page, request }, info) => {
  test.skip(info.project.name !== 'bureau-1280', 'une seule passe suffit');
  await offline(page);
  const checked = new Map<string, number>();
  const problems: string[] = [];
  const external = new Set<string>();

  for (const path of PAGES) {
    await page.goto(path);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!));
    for (const href of hrefs) {
      if (href.startsWith('tel:')) { if (!/^tel:\+33\d{9}$/.test(href)) problems.push(`${path} → ${href} (tel)`); continue; }
      if (href.startsWith('mailto:')) { if (!/^mailto:[^@\s?]+@[^@\s?]+\.[a-z]{2,}(\?subject=[^&\s]+)?$/.test(href)) problems.push(`${path} → ${href} (mailto)`); continue; }
      if (/^https?:/.test(href)) { external.add(href); continue; }
      if (href.startsWith('#')) {
        if (href.length > 1 && (await page.locator(`[id="${decodeURIComponent(href.slice(1))}"]`).count()) === 0) problems.push(`${path} → ${href} (ancre absente)`);
        continue;
      }
      const url = new URL(href, `http://x${path}`);
      const key = url.pathname + url.search;
      if (!checked.has(key)) {
        const res = await request.get(key, { maxRedirects: 0 });
        checked.set(key, res.status());
      }
      if (checked.get(key) !== 200) problems.push(`${path} → ${href} (${checked.get(key)})`);
      if (!url.pathname.endsWith('/') && !/\.[a-z0-9]+$/.test(url.pathname)) problems.push(`${path} → ${href} (slash final manquant)`);
      if (url.hash && url.pathname !== path) {
        const target = await request.get(url.pathname);
        if (!(await target.text()).includes(`id="${url.hash.slice(1)}"`)) problems.push(`${path} → ${href} (ancre absente sur la cible)`);
      }
    }
  }
  expect(problems).toEqual([]);
  // Les liens externes Reservit doivent tous porter l'identifiant de l'hôtel.
  for (const href of external) if (href.includes('reservit')) expect(href, href).toContain('hotelid=152592');
  info.annotations.push({ type: 'liens internes vérifiés', description: String(checked.size) });
  info.annotations.push({ type: 'liens externes (non appelés)', description: [...external].join('\n') });
});

test('sitemap et robots', async ({ request }, info) => {
  test.skip(info.project.name !== 'bureau-1280');
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toMatch(/Disallow: \//);
  const sm = await request.get('/sitemap-index.xml');
  expect(sm.status()).toBe(200);
});
