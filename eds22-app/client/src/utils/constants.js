// Statuts des interventions
export const STATUTS_INTERVENTION = [
  { value: 'Demande', label: 'Demande', color: '#3B82F6' },
  { value: 'Planifié', label: 'Planifié', color: '#EAB308' },
  { value: 'En cours', label: 'En cours', color: '#F97316' },
  { value: 'Diagnostic', label: 'Diagnostic', color: '#A855F7' },
  { value: 'Réparation', label: 'Réparation', color: '#EF4444' },
  { value: 'Terminé', label: 'Terminé', color: '#22C55E' },
  { value: 'Facturé', label: 'Facturé', color: '#94A3B8' }
];

// Priorités
export const PRIORITES = [
  { value: 'Basse', label: 'Basse' },
  { value: 'Normale', label: 'Normale' },
  { value: 'Haute', label: 'Haute' },
  { value: 'Urgente', label: 'Urgente' }
];

// Types d'appareils
export const TYPES_APPAREILS = [
  'Lave-linge',
  'Lave-vaisselle',
  'Réfrigérateur',
  'Congélateur',
  'Four',
  'Plaque de cuisson',
  'Micro-ondes',
  'Sèche-linge',
  'Aspirateur',
  'Télévision',
  'Autre'
];

// Types d'intervention
export const TYPES_INTERVENTION = [
  { value: 'Atelier', label: 'Atelier (59€)' },
  { value: 'Domicile', label: 'Domicile (99€)' }
];

// Catégories de pièces
export const CATEGORIES_PIECES = [
  'Filtre',
  'Pompe',
  'Résistance',
  'Joint',
  'Courroie',
  'Moteur',
  'Carte électronique',
  'Thermostat',
  'Bouton',
  'Autre'
];

// Motifs de mouvement de stock
export const MOTIFS_STOCK = [
  'Achat',
  'Intervention',
  'Inventaire',
  'Perte',
  'Retour'
];

// Taux horaire par défaut
export const TAUX_HORAIRE_DEFAUT = 45;

// Forfaits
export const FORFAIT_ATELIER = 59;
export const FORFAIT_DOMICILE = 99;

// Durée de garantie en mois
export const GARANTIE_REPARATION = 3; // 3 mois
export const GARANTIE_APPAREIL = 6; // 6 mois
