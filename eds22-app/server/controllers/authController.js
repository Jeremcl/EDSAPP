const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Générer un token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérifier que l'email et le mot de passe sont fournis
    if (!email || !motDePasse) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Vérifier si l'utilisateur est actif
    if (!user.actif) {
      return res.status(401).json({ message: 'Compte désactivé' });
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparerMotDePasse(motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Mettre à jour la dernière connexion
    user.derniereConnexion = new Date();
    await user.save();

    // Générer le token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir l'utilisateur connecté
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-motDePasse');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouvel utilisateur (admin seulement)
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-motDePasse').sort({ nom: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { motDePasse, ...updateData } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    Object.assign(user, updateData);

    if (motDePasse) {
      user.motDePasse = motDePasse;
    }

    await user.save();

    res.json({
      message: 'Utilisateur mis à jour',
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
