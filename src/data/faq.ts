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
          'Le site actuel ne publie pas de conditions générales de vente. Vérifiez les conditions du tarif choisi sur le moteur de réservation avant de payer, et demandez-les à l’hôtel en cas de doute.',
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
        reponse: ['Le site actuel annonce un wifi gratuit dans tout l’hôtel (à confirmer par l’hôtel).'],
      },
      {
        id: 'parking',
        question: 'Puis-je me garer à l’hôtel en voiture, à moto ou à vélo ?',
        reponse: ['L’hôtel annonce un parking privé sécurisé et un garage pour les motos et les vélos. Gratuité, nombre de places et conditions d’accès sont à confirmer auprès de l’hôtel.'],
      },
      {
        id: 'petit-dejeuner',
        question: 'Le petit-déjeuner est-il inclus ?',
        reponse: [
          'Il est proposé en supplément (12,50 € par personne selon le site actuel, tarif à confirmer) et servi de 7 h 30 à 9 h 30. Il est inclus dans la formule demi-pension.',
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
          'L’hôtel indique ne pas disposer de chambre spécifiquement équipée pour les personnes à mobilité réduite, et la page d’accueil du site actuel précise même qu’il « ne peut pas recevoir de personne à mobilité réduite ». Ces informations doivent être confirmées par l’hôtel. Selon le site actuel, les chambres sont desservies par un ascenseur (étages desservis non précisés).',
          'Aucune information vérifiée n’est disponible à ce jour sur l’accès à l’entrée, au restaurant, à la terrasse, au jardin ou à la salle de séminaires. Appelez l’hôtel au 04 66 45 60 07 pour décrire vos besoins avant de réserver.',
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
        reponse: ['Le site actuel propose de réserver sa table par e-mail ; vous pouvez aussi appeler l’hôtel. Les groupes (à partir de 10 personnes selon le site français, 15 selon le site anglais : seuil à confirmer) peuvent bénéficier de formules dédiées.'],
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
          'La gare la plus proche est celle de Millau (ligne Paris – Béziers), à 43 km. Le site actuel mentionne une navette jusqu’à Meyrueis : vérifiez les horaires auprès de l’hôtel ou du transporteur avant votre voyage.',
        ],
      },
    ],
  },
];
