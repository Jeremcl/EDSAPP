const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/database');
const config = require('./config/config');
const User = require('./models/User');

// Charger les variables d'environnement
dotenv.config();

// Connecter à la base de données
connectDB();

// Initialiser l'utilisateur admin par défaut
const initAdmin = async () => {
  try {
    // Supprimer l'ancien admin s'il existe avec un mot de passe incorrectement hashé
        await User.deleteOne({ email: 'admin@eds22.com' });
    
    // Créer un nouvel admin avec le mot de passe en clair (le modèle User le hashera)
    await User.create({
      nom: 'Admin',
      prenom: 'EDS22',
      email: 'admin@eds22.com',
      motDePasse: 'password123',
      role: 'Admin'
    });
    console.log('✅ Utilisateur admin créé avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de l\'admin:', error);
  }
};

// Appeler initAdmin après la connexion DB
initAdmin();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/interventions', require('./routes/interventions'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/stock', require('./routes/stock'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
