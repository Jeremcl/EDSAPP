const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/database');
const config = require('./config/config');

// Charger les variables d'environnement
dotenv.config();

// Connecter à la base de données
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/interventions', require('./routes/interventions'));
app.use('/api/pieces', require('./routes/pieces'));

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EDS22 API is running' });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Erreur serveur',
    error: config.nodeEnv === 'development' ? err.message : 'Une erreur est survenue'
  });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Serveur EDS22 démarré sur le port ${PORT} en mode ${config.nodeEnv}`);
});
