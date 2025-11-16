const mongoose = require('mongoose');

const appareilInterventionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  marque: String,
  modele: String,
  numeroSerie: String
}, { _id: false });

const pieceUtiliseeSchema = new mongoose.Schema({
  pieceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Piece'
  },
  designation: String,
  quantite: {
    type: Number,
    default: 1
  },
  prixUnitaire: Number
}, { _id: false });

const interventionSchema = new mongoose.Schema({
  numero: {
    type: String,
    unique: true,
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  appareil: {
    type: appareilInterventionSchema,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  statut: {
    type: String,
    enum: ['Demande', 'Planifié', 'En cours', 'Diagnostic', 'Réparation', 'Terminé', 'Facturé'],
    default: 'Demande'
  },
  priorite: {
    type: String,
    enum: ['Basse', 'Normale', 'Haute', 'Urgente'],
    default: 'Normale'
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  datePrevue: Date,
  dateRealisation: Date,
  technicien: String,
  diagnostic: String,
  solutionApportee: String,
  piecesUtilisees: [pieceUtiliseeSchema],
  tempsMainOeuvre: {
    type: Number,
    default: 0
  },
  tauxHoraire: {
    type: Number,
    default: 45
  },
  typeIntervention: {
    type: String,
    enum: ['Atelier', 'Domicile']
  },
  forfaitApplique: Number,
  coutMainOeuvre: {
    type: Number,
    default: 0
  },
  coutPieces: {
    type: Number,
    default: 0
  },
  coutTotal: {
    type: Number,
    default: 0
  },
  garantieJusquau: Date,
  photos: [String],
  documentsPDF: [String]
});

// Générer le numéro d'intervention automatiquement
interventionSchema.pre('save', async function(next) {
  if (!this.numero) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Intervention').countDocuments({
      numero: new RegExp(`^INT-${year}`)
    });
    this.numero = `INT-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  // Calculer les coûts
  this.coutMainOeuvre = this.tempsMainOeuvre * this.tauxHoraire;
  this.coutPieces = this.piecesUtilisees.reduce((sum, piece) => {
    return sum + (piece.quantite * piece.prixUnitaire);
  }, 0);
  this.coutTotal = this.coutMainOeuvre + this.coutPieces + (this.forfaitApplique || 0);

  // Calculer la garantie (3 mois après réalisation)
  if (this.dateRealisation && this.statut === 'Terminé') {
    const garantieDate = new Date(this.dateRealisation);
    garantieDate.setMonth(garantieDate.getMonth() + 3);
    this.garantieJusquau = garantieDate;
  }

  next();
});

module.exports = mongoose.model('Intervention', interventionSchema);
