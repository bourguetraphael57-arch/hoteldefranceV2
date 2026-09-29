const NBSP = String.fromCharCode(0xa0);
const NNBSP = new RegExp(String.fromCharCode(0x202f), 'g');

function eurosFormatter(decimals: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** 82 → « 82 € », 12.5 → « 12,50 € » (espace fine insécable remplacée par une espace insécable). */
export function formatEuros(value: number): string {
  return eurosFormatter(Number.isInteger(value) ? 0 : 2).format(value).replace(NNBSP, NBSP);
}

/** Pluriel simple pour les capacités : 1 personne, 2 personnes. */
export function personnes(n: number): string {
  return `${n}${NBSP}personne${n > 1 ? 's' : ''}`;
}
