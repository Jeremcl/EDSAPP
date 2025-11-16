const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Technicien'],
    default: 'Technicien'
  },
  actif: {
    type: Boolean,
    default: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  derniereConnexion: Date
});

// Hash le mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('motDePasse')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparerMotDePasse = async function(motDePasse) {
  return await bcrypt.compare(motDePasse, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);
