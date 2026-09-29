/**
 * Validation du formulaire de contact / demande de disponibilité.
 * Fonctions pures, testées dans tests/unit/contact.test.ts.
 */
export const OBJETS = {
  disponibilite: 'Demande de disponibilité',
  table: 'Réservation de table',
  groupe: 'Groupe ou séminaire',
  question: 'Autre question',
} as const;
export type Objet = keyof typeof OBJETS;

export const CHAMBRES_FORM = ['Indifférent', 'Chambre double', 'Chambre twin', 'Chambre triple', 'Chambre familiale'] as const;

export const LIMITES = { nom: 100, email: 254, telephone: 30, message: 3000, chambre: 40 } as const;

export interface ContactData {
  objet: Objet;
  nom: string;
  email: string;
  telephone: string;
  arrivee: string;
  depart: string;
  adultes: string;
  enfants: string;
  chambre: string;
  message: string;
}

export type Erreurs = Partial<Record<keyof ContactData, string>>;

export const CHAMPS: (keyof ContactData)[] = ['objet', 'nom', 'email', 'telephone', 'arrivee', 'depart', 'adultes', 'enfants', 'chambre', 'message'];

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const TEL = /^\+?[0-9 ().-]{6,25}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Nettoie une valeur texte : supprime les caractères de contrôle (sauf retours à la ligne si multiline). */
export function clean(value: unknown, multiline = false): string {
  if (typeof value !== 'string') return '';
  const stripped = multiline
    ? value.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '')
    : value.replace(/[\u0000-\u001F\u007F]/g, ' ');
  return stripped.trim();
}

function isValidDate(value: string): boolean {
  if (!DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

export function parseContact(input: Record<string, unknown>): ContactData {
  const objet = clean(input.objet);
  return {
    objet: (objet in OBJETS ? objet : 'question') as Objet,
    nom: clean(input.nom),
    email: clean(input.email),
    telephone: clean(input.telephone),
    arrivee: clean(input.arrivee),
    depart: clean(input.depart),
    adultes: clean(input.adultes),
    enfants: clean(input.enfants),
    chambre: clean(input.chambre),
    message: clean(input.message, true),
  };
}

/** Valide les données ; `today` au format AAAA-MM-JJ (injecté pour les tests). */
export function validateContact(d: ContactData, today: string): Erreurs {
  const e: Erreurs = {};

  if (!d.nom) e.nom = 'Indiquez votre nom.';
  else if (d.nom.length > LIMITES.nom) e.nom = `Le nom ne doit pas dépasser ${LIMITES.nom} caractères.`;

  if (!d.email && !d.telephone) {
    e.email = 'Indiquez une adresse e-mail ou un numéro de téléphone pour que l’hôtel puisse vous répondre.';
  }
  if (d.email && (d.email.length > LIMITES.email || !EMAIL.test(d.email))) {
    e.email = 'L’adresse e-mail n’est pas valide (exemple : nom@exemple.fr).';
  }
  if (d.telephone && !TEL.test(d.telephone)) {
    e.telephone = 'Le numéro de téléphone n’est pas valide (exemple : 06 12 34 56 78).';
  }

  const datesRequises = d.objet === 'disponibilite';
  if (datesRequises || d.arrivee || d.depart) {
    if (!d.arrivee) e.arrivee = 'Indiquez la date d’arrivée.';
    else if (!isValidDate(d.arrivee)) e.arrivee = 'La date d’arrivée n’est pas valide.';
    else if (d.arrivee < today) e.arrivee = 'La date d’arrivée est déjà passée.';

    if (!d.depart) e.depart = 'Indiquez la date de départ.';
    else if (!isValidDate(d.depart)) e.depart = 'La date de départ n’est pas valide.';
    else if (!e.arrivee && d.depart <= d.arrivee) e.depart = 'La date de départ doit être postérieure à la date d’arrivée.';
  }

  if (datesRequises || d.adultes) {
    const n = Number(d.adultes);
    if (!d.adultes) e.adultes = 'Indiquez le nombre d’adultes.';
    else if (!Number.isInteger(n) || n < 1 || n > 60) e.adultes = 'Indiquez un nombre d’adultes entre 1 et 60.';
  }
  if (d.enfants) {
    const n = Number(d.enfants);
    if (!Number.isInteger(n) || n < 0 || n > 30) e.enfants = 'Indiquez un nombre d’enfants entre 0 et 30.';
  }
  if (d.chambre && !(CHAMBRES_FORM as readonly string[]).includes(d.chambre)) {
    e.chambre = 'Choisissez un type de chambre dans la liste.';
  }

  if (d.objet !== 'disponibilite' && !d.message) e.message = 'Écrivez votre message.';
  if (d.message.length > LIMITES.message) e.message = `Le message ne doit pas dépasser ${LIMITES.message} caractères.`;

  return e;
}

/** Libellés des champs, utilisés dans le récapitulatif et l'e-mail. */
export const LIBELLES: Record<keyof ContactData, string> = {
  objet: 'Objet',
  nom: 'Nom',
  email: 'E-mail',
  telephone: 'Téléphone',
  arrivee: 'Arrivée',
  depart: 'Départ',
  adultes: 'Adultes',
  enfants: 'Enfants',
  chambre: 'Type de chambre',
  message: 'Message',
};

export function formatDateFr(iso: string): string {
  if (!isValidDate(iso)) return iso;
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

/** Résumé lisible (texte brut) de la demande, sans les champs vides. */
export function resume(d: ContactData): { label: string; value: string }[] {
  return CHAMPS.filter((k) => d[k] !== '')
    .map((k) => ({
      label: LIBELLES[k],
      value: k === 'objet' ? OBJETS[d.objet] : k === 'arrivee' || k === 'depart' ? formatDateFr(d[k]) : d[k],
    }));
}

/** Limitation de débit en mémoire : `max` envois par fenêtre et par clé (adresse IP). */
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (key: string, now = Date.now()): boolean => {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
    return true;
  };
}
