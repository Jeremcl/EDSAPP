import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

// Formater une date
export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: fr });
};

// Formater une date et heure
export const formatDateTime = (date) => {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
};

// Formater un montant en euros
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '0,00 €';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

// Obtenir la classe CSS d'un badge de statut
export const getStatutBadgeClass = (statut) => {
  const statusMap = {
    'Demande': 'badge-demande',
    'Planifié': 'badge-planifie',
    'En cours': 'badge-encours',
    'Diagnostic': 'badge-diagnostic',
    'Réparation': 'badge-reparation',
    'Terminé': 'badge-termine',
    'Facturé': 'badge-facture'
  };
  return `badge ${statusMap[statut] || 'badge-demande'}`;
};

// Calculer le nombre de jours restants
export const getDaysRemaining = (date) => {
  if (!date) return null;
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  const diffTime = dateObj - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Vérifier si une garantie est encore valide
export const isGarantieValide = (dateGarantie) => {
  if (!dateGarantie) return false;
  const dateObj = typeof dateGarantie === 'string' ? parseISO(dateGarantie) : dateGarantie;
  return dateObj > new Date();
};

// Générer un nom complet
export const getFullName = (prenom, nom) => {
  return `${prenom} ${nom}`;
};

// Valider un email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Valider un numéro de téléphone français
export const isValidPhone = (phone) => {
  const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return re.test(phone.replace(/\s/g, ''));
};

// Formater un numéro de téléphone
export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1.$2.$3.$4.$5');
  }
  return phone;
};

// Tronquer un texte
export const truncate = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Obtenir les initiales
export const getInitials = (prenom, nom) => {
  return `${prenom?.charAt(0) || ''}${nom?.charAt(0) || ''}`.toUpperCase();
};
