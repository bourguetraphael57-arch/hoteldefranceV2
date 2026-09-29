import { describe, expect, it } from 'vitest';
import { clean, createRateLimiter, parseContact, resume, validateContact } from '../../src/lib/contact';

const today = '2026-09-29';
const base = { objet: 'disponibilite', nom: 'Camille Martin', email: 'camille@example.fr', arrivee: '2026-10-10', depart: '2026-10-12', adultes: '2' };

describe('validateContact', () => {
  it('accepte une demande de disponibilité complète', () => {
    expect(validateContact(parseContact(base), today)).toEqual({});
  });

  it('exige un nom et un moyen de réponse', () => {
    const e = validateContact(parseContact({ ...base, nom: '', email: '' }), today);
    expect(e.nom).toBeDefined();
    expect(e.email).toMatch(/e-mail ou un numéro/);
  });

  it('accepte le téléphone seul', () => {
    expect(validateContact(parseContact({ ...base, email: '', telephone: '06 12 34 56 78' }), today)).toEqual({});
  });

  it('refuse un e-mail ou un téléphone mal formés', () => {
    const e = validateContact(parseContact({ ...base, email: 'pas-un-email', telephone: 'abc' }), today);
    expect(e.email).toBeDefined();
    expect(e.telephone).toBeDefined();
  });

  it('contrôle les dates', () => {
    expect(validateContact(parseContact({ ...base, arrivee: '2026-09-01' }), today).arrivee).toMatch(/passée/);
    expect(validateContact(parseContact({ ...base, depart: '2026-10-10' }), today).depart).toMatch(/postérieure/);
    expect(validateContact(parseContact({ ...base, arrivee: '2026-02-31' }), today).arrivee).toMatch(/valide/);
    expect(validateContact(parseContact({ ...base, arrivee: '', depart: '' }), today).arrivee).toBeDefined();
  });

  it('exige un message pour une question', () => {
    expect(validateContact(parseContact({ objet: 'question', nom: 'A', email: 'a@b.fr' }), today).message).toBeDefined();
    expect(validateContact(parseContact({ objet: 'question', nom: 'A', email: 'a@b.fr', message: 'Bonjour' }), today)).toEqual({});
  });

  it('refuse un type de chambre hors liste et des nombres aberrants', () => {
    const e = validateContact(parseContact({ ...base, chambre: 'Suite royale', adultes: '0', enfants: '-1' }), today);
    expect(e.chambre).toBeDefined();
    expect(e.adultes).toBeDefined();
    expect(e.enfants).toBeDefined();
  });

  it('borne la longueur du message', () => {
    expect(validateContact(parseContact({ ...base, message: 'x'.repeat(3001) }), today).message).toBeDefined();
  });
});

describe('parseContact / clean', () => {
  it('neutralise un objet inconnu et les caractères de contrôle', () => {
    const d = parseContact({ objet: 'pirate', nom: 'Bob\r\nBcc: x@y.z', message: 'a\r\nb\u0007' });
    expect(d.objet).toBe('question');
    expect(d.nom).not.toMatch(/[\r\n]/);
    expect(d.message).toBe('a\nb');
  });

  it('ignore les valeurs non textuelles', () => {
    expect(clean(42)).toBe('');
    expect(clean(undefined)).toBe('');
  });

  it('produit un récapitulatif lisible sans champs vides', () => {
    const r = resume(parseContact(base));
    expect(r.find((x) => x.label === 'Arrivée')?.value).toBe('10/10/2026');
    expect(r.find((x) => x.label === 'Objet')?.value).toBe('Demande de disponibilité');
    expect(r.some((x) => x.label === 'Téléphone')).toBe(false);
  });
});

describe('createRateLimiter', () => {
  it('bloque au-delà du maximum puis libère après la fenêtre', () => {
    const allow = createRateLimiter(2, 1000);
    expect(allow('ip', 0)).toBe(true);
    expect(allow('ip', 10)).toBe(true);
    expect(allow('ip', 20)).toBe(false);
    expect(allow('autre', 20)).toBe(true);
    expect(allow('ip', 1500)).toBe(true);
  });
});
