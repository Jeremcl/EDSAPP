const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protéger les routes
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Non autorisé, token manquant' });
    }

    try {
      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Récupérer l'utilisateur
      req.user = await User.findById(decoded.id).select('-motDePasse');

      if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }

      if (!req.user.actif) {
        return res.status(401).json({ message: 'Compte désactivé' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vérifier le rôle admin
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Le rôle ${req.user.role} n'est pas autorisé à accéder à cette ressource`
      });
    }
    next();
  };
};
