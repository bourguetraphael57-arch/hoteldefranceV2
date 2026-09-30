/**
 * Questions fréquentes. Chaque réponse reprend une information publiée sur le site actuel ;
 * quand elle est incomplète, la réponse invite à contacter l'hôtel plutôt que d'inventer.
 */
export interface QuestionFaq { id: string; question: string; reponse: string[] }
export interface ThemeFaq { id: string; titre: string; questions: QuestionFaq[] }

export const faq: ThemeFaq[] = [
  {
    id: 'reservation',
    titre: 'Réservation et séjour',
    questions: [
      {
        id: 'reserver',
        question: 'Comment réserver une chambre ?',
        reponse: [
          'En ligne, sur le moteur de réservation sécurisé Reservit utilisé par l’hôtel, accessible depuis les boutons « Réserver » de ce site.',
          'Vous pouvez aussi appeler l’hôtel au 04 66 45 60 07 ou envoyer une demande de disponibilité : l’hôtel vous répond, rien n’est réservé tant qu’il ne l’a pas confirmé.',
        ],
      },
      {
        id: 'horaires',
        question: 'À quelle heure puis-je arriver et partir ?',
        reponse: ['Arrivées de 15 h à 20 h, départs de 7 h 30 à 11 h. Si vous arrivez plus tard, prévenez l’hôtel.'],
      },
      {
        id: 'prix',
        question: 'Pourquoi les prix des chambres ne sont-ils pas affichés ?',
        reponse: [
          'Les tarifs varient selon les dates. Le tarif exact s’affiche sur le moteur de réservation une fois vos dates choisies, ou vous est communiqué par l’hôtel.',
        ],
      },
      {
        id: 'annulation',
        question: 'Quelles sont les conditions d’annulation ?',
        reponse: [
          'Les conditions d’annulation dépendent du tarif choisi : elles s’affichent sur le moteur de réservation avant le paiement. L’hôtel vous les précise aussi sur simple demande.',
        ],
      },
    ],
  },
  {
    id: 'services',
    titre: 'Services et équipements',
    questions: [
      {
        id: 'wifi',
        question: 'Le wifi est-il disponible dans tout l’hôtel ?',
        reponse: ['Oui, le wifi est gratuit dans tout l’hôtel.'],
      },
      {
        id: 'parking',
        question: 'Puis-je me garer à l’hôtel en voiture, à moto ou à vélo ?',
        reponse: ['L’hôtel annonce un parking privé sécurisé et un garage pour les motos et les vélos. Renseignez-vous auprès de l’hôtel pour les conditions d’accès.'],
      },
      {
        id: 'petit-dejeuner',
        question: 'Le petit-déjeuner est-il inclus ?',
        reponse: [
          'Il est proposé en supplément (12,50 € par personne) et servi de 7 h 30 à 9 h 30. Il est inclus dans la formule demi-pension.',
        ],
      },
      {
        id: 'animaux',
        question: 'Les animaux sont-ils acceptés ?',
        reponse: ['Les animaux domestiques sont admis sous conditions. Contactez l’hôtel avant de réserver pour les connaître.'],
      },
      {
        id: 'piscine',
        question: 'La piscine est-elle ouverte toute l’année ?',
        reponse: [
          'L’hôtel dispose d’une piscine extérieure chauffée dans son jardin. Ses dates d’ouverture ne sont pas publiées : renseignez-vous auprès de l’hôtel.',
        ],
      },
    ],
  },
  {
    id: 'accessibilite',
    titre: 'Accessibilité',
    questions: [
      {
        id: 'pmr',
        question: 'L’hôtel est-il adapté aux personnes à mobilité réduite ?',
        reponse: [
          'L’hôtel ne dispose pas de chambre spécifiquement équipée pour les personnes à mobilité réduite et indique ne pas pouvoir recevoir de personne à mobilité réduite. Les chambres sont desservies par un ascenseur.',
          'Pour l’accès à l’entrée, au restaurant, à la terrasse, au jardin ou à la salle de séminaires, appelez l’hôtel au 04 66 45 60 07 pour décrire vos besoins avant de réserver.',
        ],
      },
    ],
  },
  {
    id: 'restaurant',
    titre: 'Restaurant',
    questions: [
      {
        id: 'table',
        question: 'Faut-il réserver sa table ?',
        reponse: ['C’est conseillé : réservez par e-mail, par téléphone ou avec le formulaire de contact. Les groupes à partir de 10 personnes peuvent bénéficier de formules dédiées.'],
      },
    ],
  },
  {
    id: 'acces',
    titre: 'Accès',
    questions: [
      {
        id: 'train',
        question: 'Peut-on venir en train ?',
        reponse: [
          'La gare la plus proche est celle de Millau (ligne Paris – Béziers), à 43 km. Pour rejoindre Meyrueis depuis la gare, renseignez-vous auprès de l’hôtel.',
        ],
      },
    ],
  },
];
