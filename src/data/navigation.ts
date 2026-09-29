export interface Lien { href: string; label: string }

export const navPrincipale: Lien[] = [
  { href: '/', label: 'L’hôtel' },
  { href: '/chambres/', label: 'Chambres' },
  { href: '/restaurant/', label: 'Restaurant' },
  { href: '/offres/', label: 'Offres' },
  { href: '/groupes-seminaires/', label: 'Groupes & séminaires' },
  { href: '/meyrueis-environs/', label: 'Meyrueis & environs' },
  { href: '/infos-pratiques/', label: 'Infos pratiques' },
];

export const navPied: { titre: string; liens: Lien[] }[] = [
  {
    titre: 'Séjourner',
    liens: [
      { href: '/chambres/', label: 'Chambres' },
      { href: '/offres/', label: 'Offres et formules' },
      { href: '/restaurant/', label: 'Restaurant' },
      { href: '/groupes-seminaires/', label: 'Groupes & séminaires' },
      { href: '/meyrueis-environs/', label: 'Meyrueis & environs' },
    ],
  },
  {
    titre: 'Pratique',
    liens: [
      { href: '/infos-pratiques/', label: 'Infos pratiques' },
      { href: '/infos-pratiques/#accessibilite', label: 'Accessibilité' },
      { href: '/faq/', label: 'Questions fréquentes' },
      { href: '/contact/', label: 'Contact et accès' },
    ],
  },
  {
    titre: 'Informations',
    liens: [
      { href: '/mentions-legales/', label: 'Mentions légales' },
      { href: '/confidentialite/', label: 'Confidentialité' },
      { href: '/credits-photos/', label: 'Crédits photos' },
      { href: '/plan-du-site/', label: 'Plan du site' },
    ],
  },
];
