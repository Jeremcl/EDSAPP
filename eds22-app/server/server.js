const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/database');
const config = require('./config/config');
const User = require('./models/User');

// Charger les variables d'environnement
dotenv.config();

// Fonction pour initialiser l'utilisateur admin
const initAdmin = async () => {
  console.log('🔄 Début de l\'initialisation de l\'utilisateur admin...');
  try {
    // Supprimer l'ancien admin s'il existe
    const deleted = await User.deleteOne({ email: 'admin@eds22.com' });
    console.log(`🗑️ Admin supprimé (${deleted.deletedCount} document(s))`);
    
    // Créer un nouvel admin (le modèle User hashera automatiquement le mot de passe)
    const admin = await User.create({
      nom: 'Admin',
      prenom: 'EDS22',
      email: 'admin@eds22.com',
      motDePasse: 'password123',
      role: 'Admin'
    });
    console.log('✅ Utilisateur admin créé avec succès!');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Mot de passe hashé: ${admin.motDePasse.substring(0, 20)}...`);
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de l\'admin:');
    console.error(error);
    throw error;
  }
};

// Fonction principale pour démarrer le serveur
const startServer = async () => {
  try {
    // Logs de débogage initiaux
    console.log('🔍 Démarrage de l\'application...');
    console.log('🔍 MONGODB_URI:', process.env.MONGODB_URI ? 'DÉFINIE' : 'MANQUANTE');
    console.log('🔍 PORT:', process.env.PORT || 5000);

    // 1. Connecter à la base de données
    console.log('🔗 Connexion à MongoDB...');
    await connectDB();
    console.log('✅ Connecté à MongoDB');
    
    // 2. Initialiser l'admin AVANT de démarrer le serveur
    await initAdmin();
    
    // 3. Créer l'application Express
    const app = express();
    
    // Middlewares
    app.use(cors());
    app.use(express.json());
    
    // Routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/interventions', require('./routes/interventions'));
    app.use('/api/clients', require('./routes/clients'));
    app.use('/api/stock', require('./routes/stock'));
    
    // Démarrer le serveur
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur fatale au démarrage:');
    console.error(error);
    process.exit(1);
  }
};

// Lancer le serveur
startServer();
