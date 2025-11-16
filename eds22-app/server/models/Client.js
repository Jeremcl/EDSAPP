const mongoose = require('mongoose');

const appareilSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  marque: String,
  modele: String,
  numeroSerie: String,
  dateAchat: Date
}, { _id: false });

const clientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  adresse: {
    type: String,
    trim: true
  },
  codePostal: {
    type: String,
    trim: true
  },
  ville: {
    type: String,
    trim: true
  },
  telephone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  appareils: [appareilSchema],
  notes: String,
  dateCreation: {
    type: Date,
    default: Date.now
  },
  dateModification: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour mettre à jour dateModification
clientSchema.pre('save', function(next) {
  this.dateModification = Date.now();
  next();
});

module.exports = mongoose.model('Client', clientSchema);
