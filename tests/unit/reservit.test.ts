import { describe, expect, it } from 'vitest';
import { availabilityUrl, bookingUrl, clampAdultes, splitDate } from '../../src/lib/reservit';

const params = (url: string) => new URL(url).searchParams;

describe('bookingUrl', () => {
  it('renseigne toujours hotelid (bug du site actuel : hotelid vide)', () => {
    const p = params(bookingUrl({ roomtcode: '439120' }));
    expect(p.get('hotelid')).toBe('152592');
    expect(p.get('custId')).toBe('2');
    expect(p.get('action')).toBe('resa');
    expect(p.get('roomtcode')).toBe('439120');
    expect(p.get('nbadt')).toBe('2');
  });

  it('transmet les dates au format du widget officiel', () => {
    const p = params(bookingUrl({ arrivee: '2026-10-03', depart: '2026-10-05', adultes: 3 }));
    expect([p.get('fday'), p.get('fmonth'), p.get('fyear')]).toEqual(['03', '10', '2026']);
    expect([p.get('tday'), p.get('tmonth'), p.get('tyear')]).toEqual(['05', '10', '2026']);
    expect(p.get('nbadt')).toBe('3');
  });

  it('ignore des dates incohérentes ou invalides', () => {
    for (const [arrivee, depart] of [['2026-10-05', '2026-10-03'], ['2026-02-30', '2026-03-02'], ['03/10/2026', '2026-10-05'], ['2026-10-05', '2026-10-05']]) {
      const p = params(bookingUrl({ arrivee, depart }));
      expect(p.has('fday')).toBe(false);
      expect(p.has('tday')).toBe(false);
    }
  });

  it('borne le nombre d’adultes', () => {
    expect(clampAdultes(0)).toBe(1);
    expect(clampAdultes(99)).toBe(14);
    expect(clampAdultes(Number.NaN)).toBe(2);
    expect(clampAdultes(undefined)).toBe(2);
  });

  it('utilise HTTPS et le bon domaine', () => {
    expect(bookingUrl()).toMatch(/^https:\/\/secure\.reservit\.com\/reservit\/reserhotel\.php\?/);
    expect(availabilityUrl()).toContain('action=tabavail');
    expect(params(availabilityUrl()).get('hotelid')).toBe('152592');
  });
});

describe('splitDate', () => {
  it('valide les dates réelles', () => {
    expect(splitDate('2028-02-29')).toEqual({ d: '29', m: '02', y: '2028' });
    expect(splitDate('2027-02-29')).toBeNull();
    expect(splitDate('')).toBeNull();
  });
});
