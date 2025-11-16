const mongoose = require('mongoose');

const pieceSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  marque: {
    type: String,
    trim: true
  },
  modelesCompatibles: [String],
  categorie: {
    type: String,
    trim: true
  },
  emplacement: {
    type: String,
    trim: true
  },
  quantiteStock: {
    type: Number,
    required: true,
    default: 0
  },
  quantiteMinimum: {
    type: Number,
    default: 5
  },
  prixAchat: {
    type: Number,
    default: 0
  },
  prixVente: {
    type: Number,
    required: true
  },
  fournisseur: {
    type: String,
    trim: true
  },
  fournisseurRef: {
    type: String,
    trim: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  dateModification: {
    type: Date,
    default: Date.now
  },
  actif: {
    type: Boolean,
    default: true
  }
});

// Middleware pour mettre à jour dateModification
pieceSchema.pre('save', function(next) {
  this.dateModification = Date.now();
  next();
});

// Méthode pour vérifier si le stock est bas
pieceSchema.methods.isStockBas = function() {
  return this.quantiteStock <= this.quantiteMinimum;
};

module.exports = mongoose.model('Piece', pieceSchema);
