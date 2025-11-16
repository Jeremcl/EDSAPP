const mongoose = require('mongoose');

const mouvementStockSchema = new mongoose.Schema({
  pieceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Piece',
    required: true
  },
  type: {
    type: String,
    enum: ['Entrée', 'Sortie'],
    required: true
  },
  quantite: {
    type: Number,
    required: true
  },
  quantiteAvant: {
    type: Number,
    required: true
  },
  quantiteApres: {
    type: Number,
    required: true
  },
  interventionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Intervention'
  },
  motif: {
    type: String,
    enum: ['Achat', 'Intervention', 'Inventaire', 'Perte', 'Retour'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  utilisateur: {
    type: String,
    required: true
  },
  notes: String
});

module.exports = mongoose.model('MouvementStock', mouvementStockSchema);
