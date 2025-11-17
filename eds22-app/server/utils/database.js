const mongoose = require('mongoose');
const config = require('../config/config');

const connectDB = async () => {
  try {
    console.log('🔍 Tentative de connexion à MongoDB...');
    console.log('🔍 URI MongoDB:', config.mongoUri ? 'Configurée' : 'Non configurée');

    const conn = await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:');
    console.error('📝 Message:', error.message);
    console.error('📋 Stack:', error.stack);
    throw error; // Throw l'erreur au lieu de process.exit(1)
  }
};

module.exports = connectDB;
