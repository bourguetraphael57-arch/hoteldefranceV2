/**
 * Restaurant. Source : page restaurant du site actuel.
 * Les menus changent : modifier ici les plats, prix et horaires.
 * Le PDF de 2022 affiche d'autres prix (23 / 26 / 29 €) : la version web est reprise, à confirmer.
 */
export interface Plat { nom: string; detail?: string }
export interface Menu {
  id: string;
  titre: string;
  formule: string;
  prix: string;
  note?: string;
  services: { titre: string; plats: Plat[] }[];
}

export const restaurant = {
  intro:
    'L’équipe du restaurant vous installe sur la terrasse en teck fleurie ou au salon particulier, pour un repas en famille, à deux ou lors d’une soirée-étape. La cuisine s’inspire du terroir lozérien.',
  espaces: [
    { titre: 'Terrasse en teck fleurie', texte: 'Pour les repas aux beaux jours.' },
    { titre: 'Salon particulier', texte: 'Pour un repas en famille ou entre amis, plus au calme.' },
    { titre: 'Salle voûtée de 70 places', texte: 'Pour les groupes : randonneurs, cyclistes, motards, clubs de voitures anciennes, autocaristes.' },
  ],
  groupes:
    'Pour les groupes (à partir de 10 personnes selon le site français, 15 selon le site anglais : seuil à confirmer), formules en demi-pension ou en pension complète, boisson comprise.',
  /** Horaires publiés sur le site français. Le site anglais indique d'autres jours. */
  horaires: [
    { jour: 'Lundi', dejeuner: null, diner: '19 h – 21 h' },
    { jour: 'Mardi', dejeuner: '12 h – 13 h 30', diner: '19 h – 21 h' },
    { jour: 'Mercredi', dejeuner: '12 h – 13 h 30', diner: '19 h – 21 h' },
    { jour: 'Jeudi', dejeuner: null, diner: '19 h – 21 h' },
    { jour: 'Vendredi', dejeuner: null, diner: '19 h – 21 h' },
    { jour: 'Samedi', dejeuner: '12 h – 13 h 30', diner: '19 h – 21 h' },
    { jour: 'Dimanche', dejeuner: '12 h – 13 h 30', diner: '19 h – 21 h' },
  ] as { jour: string; dejeuner: string | null; diner: string | null }[],
  horairesAConfirmer:
    'jours d’ouverture du déjeuner (le site anglais indique le mercredi et le dimanche, et 7 j/7 en juillet-août), périodes de fermeture annuelle',
  reservationTable: 'Le site actuel propose de réserver par e-mail. Vous pouvez aussi appeler l’hôtel.',
  menus: [
    {
      id: 'terroir',
      titre: 'Menu « Autour du terroir »',
      formule: 'Plat et dessert, entrée et plat, ou entrée, plat et dessert',
      prix: '21 € à 26 €',
      note: 'Taxes et service compris.',
      services: [
        {
          titre: 'Entrées',
          plats: [
            { nom: 'Verrine fraîcheur', detail: 'concombre, tomate, melon, menthe, soja et citron' },
            { nom: 'Galette feuilletée et son fricandeau rôti', detail: 'compotée pommes et oignons des Cévennes, salade du marché' },
            { nom: 'Mousse de bleu des Causses des caves de Peyrelade', detail: 'compotée de poires, noix torréfiées' },
            { nom: 'Terrine maison aux trompettes de la mort', detail: 'et son duo de confitures carottes et oignons' },
          ],
        },
        {
          titre: 'Plats',
          plats: [
            { nom: 'Pastilla de veau, saveur blanquette et badiane', detail: 'semoule arlequin, mousseline de patate douce' },
            { nom: 'Cromesqui de biche, sauce grand veneur', detail: 'écrasé de pommes de terre à l’huile d’olive, mousseline de chou rouge' },
            { nom: 'Filet d’églefin à l’unilatéral, crémeux de crustacés', detail: 'écrasé de pommes de terre à l’huile d’olive et ratatouille' },
            { nom: 'Bourguignon de bœuf façon parmentière', detail: 'chapelure à l’ail des ours, velouté de carottes' },
          ],
        },
        {
          titre: 'Fromages ou desserts',
          plats: [
            { nom: 'Duo de fromages de pays', detail: 'bleu de Peyrelade, pélardon AOP des Oubrets' },
            { nom: 'Crumble pommes-poires au caramel beurre salé', detail: 'et sa boule de glace vanille' },
            { nom: 'Tiramisu aux framboises et spéculoos' },
            { nom: 'Entremets aux deux chocolats, croustillant praliné', detail: 'et sa boule de glace mangue (à commander en début de repas)' },
          ],
        },
      ],
    },
    {
      id: 'midi',
      titre: 'Suggestion du midi',
      formule: 'Entrée, plat et dessert',
      prix: '20 €',
      services: [
        {
          titre: 'Entrées',
          plats: [
            { nom: 'Ardoise de charcuterie maison', detail: 'fricandeau, terrine aux trompettes de la mort, jambon cru' },
            { nom: 'Gaspacho andalou' },
          ],
        },
        {
          titre: 'Plats',
          plats: [{ nom: 'Filet de sole, crémeux de crustacés' }, { nom: 'Suprême de poulet curry et coco' }],
        },
        {
          titre: 'Desserts',
          plats: [
            { nom: 'Crumble pommes-poires au caramel beurre salé', detail: 'et sa boule de glace vanille' },
            { nom: 'Tiramisu aux framboises et spéculoos' },
            { nom: 'Entremets aux deux chocolats, croustillant praliné', detail: 'à commander en début de repas' },
          ],
        },
      ],
    },
  ] satisfies Menu[],
  desserts: {
    titre: 'Carte des desserts',
    note: 'Toutes les pâtisseries sont faites maison. Desserts proposés dans le cadre du menu.',
    plats: [
      { nom: 'Petit sablé breton, crémeux au citron', detail: 'sorbet citron vert' },
      { nom: 'Crumble pommes-poires au caramel beurre salé', detail: 'et boule de glace vanille' },
      { nom: 'Marquise chocolat et framboises' },
      { nom: 'Glaces et sorbets artisanaux de la ferme « Ô délices de Lozère »', detail: 'vanille, café, fraise, chocolat, framboise, cassis, citron, mangue' },
      { nom: 'Crème brûlée à la vanille de Madagascar et à la cassonade' },
    ] as Plat[],
  },
  menusAConfirmer:
    'menus et prix en vigueur : le menu téléchargeable de 2022 affiche 23 €, 26 € et 29 € avec d’autres plats, et la carte des desserts PDF de 2021 diffère de la liste ci-dessus',
} as const;
