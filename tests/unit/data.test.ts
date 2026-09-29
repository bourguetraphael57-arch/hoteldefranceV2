import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { chambres } from '../../src/data/chambres';
import { offres } from '../../src/data/offres';
import { photos } from '../../src/data/photos';
import { hotel } from '../../src/data/hotel';
import { faq } from '../../src/data/faq';
import { formatEuros, personnes } from '../../src/lib/format';

describe('données', () => {
  it('4 chambres avec des codes Reservit distincts et aucun prix inventé', () => {
    expect(chambres.map((c) => c.roomtcode)).toEqual(['439120', '439121', '439122', '439123']);
    for (const c of chambres) expect(c.prixAPartirDe).toBeUndefined();
  });

  it('chaque offre à prix indique ce qui reste à confirmer', () => {
    for (const o of offres) if (o.prix !== undefined) expect(o.aConfirmer.length).toBeGreaterThan(0);
  });

  it('chaque photo libre a un auteur, une licence et ses 4 fichiers', () => {
    for (const p of photos) {
      expect(p.auteur && p.licence && p.licenceUrl && p.source && p.alt).toBeTruthy();
      for (const suffix of ['-800.webp', '-1600.webp', '-800.jpg', '-1600.jpg']) {
        expect(existsSync(`public${p.src}${suffix}`), `${p.src}${suffix}`).toBe(true);
      }
    }
  });

  it('aucun texte ne prétend que l’hôtel est « accessible PMR »', () => {
    const texte = JSON.stringify({ hotel, faq, chambres, offres }).toLowerCase();
    expect(texte).not.toMatch(/accessible (aux )?pmr|accueil pmr(?! »)|accessible aux personnes à mobilité réduite/);
  });

  it('téléphone au format international cliquable', () => {
    expect(hotel.telephone.href).toBe('tel:+33466456007');
  });
});

describe('format', () => {
  it('formate les prix à la française', () => {
    expect(formatEuros(82)).toBe('82 €');
    expect(formatEuros(12.5)).toBe('12,50 €');
    expect(personnes(1)).toBe('1 personne');
    expect(personnes(4)).toBe('4 personnes');
  });
});
