const Intervention = require('../models/Intervention');
const Piece = require('../models/Piece');
const MouvementStock = require('../models/MouvementStock');

// Obtenir toutes les interventions
exports.getInterventions = async (req, res) => {
  try {
    const { statut, technicien, dateDebut, dateFin, page = 1, limit = 20 } = req.query;
    const query = {};

    if (statut) query.statut = statut;
    if (technicien) query.technicien = technicien;
    if (dateDebut || dateFin) {
      query.datePrevue = {};
      if (dateDebut) query.datePrevue.$gte = new Date(dateDebut);
      if (dateFin) query.datePrevue.$lte = new Date(dateFin);
    }

    const interventions = await Intervention.find(query)
      .populate('clientId', 'nom prenom telephone')
      .sort({ dateCreation: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Intervention.countDocuments(query);

    res.json({
      interventions,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une intervention par ID
exports.getInterventionById = async (req, res) => {
  try {
    const intervention = await Intervention.findById(req.params.id)
      .populate('clientId');
    if (!intervention) {
      return res.status(404).json({ message: 'Intervention non trouvée' });
    }
    res.json(intervention);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle intervention
exports.createIntervention = async (req, res) => {
  try {
    const intervention = new Intervention(req.body);
    const nouvelleIntervention = await intervention.save();
    res.status(201).json(nouvelleIntervention);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une intervention
exports.updateIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!intervention) {
      return res.status(404).json({ message: 'Intervention non trouvée' });
    }
    res.json(intervention);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ajouter une pièce à une intervention
exports.addPieceToIntervention = async (req, res) => {
  try {
    const { pieceId, quantite } = req.body;
    const intervention = await Intervention.findById(req.params.id);

    if (!intervention) {
      return res.status(404).json({ message: 'Intervention non trouvée' });
    }

    const piece = await Piece.findById(pieceId);
    if (!piece) {
      return res.status(404).json({ message: 'Pièce non trouvée' });
    }

    if (piece.quantiteStock < quantite) {
      return res.status(400).json({ message: 'Stock insuffisant' });
    }

    // Ajouter la pièce à l'intervention
    intervention.piecesUtilisees.push({
      pieceId: piece._id,
      designation: piece.designation,
      quantite,
      prixUnitaire: piece.prixVente
    });

    // Mettre à jour le stock
    const quantiteAvant = piece.quantiteStock;
    piece.quantiteStock -= quantite;
    await piece.save();

    // Enregistrer le mouvement de stock
    await MouvementStock.create({
      pieceId: piece._id,
      type: 'Sortie',
      quantite,
      quantiteAvant,
      quantiteApres: piece.quantiteStock,
      interventionId: intervention._id,
      motif: 'Intervention',
      utilisateur: req.user?.nom || 'Système'
    });

    await intervention.save();
    res.json(intervention);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une intervention
exports.deleteIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findByIdAndDelete(req.params.id);
    if (!intervention) {
      return res.status(404).json({ message: 'Intervention non trouvée' });
    }
    res.json({ message: 'Intervention supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir les statistiques du dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Interventions planifiées aujourd'hui
    const interventionsAujourdhui = await Intervention.countDocuments({
      datePrevue: { $gte: today, $lte: endOfDay }
    });

    // Interventions en cours
    const interventionsEnCours = await Intervention.countDocuments({
      statut: { $in: ['En cours', 'Diagnostic', 'Réparation'] }
    });

    // Interventions terminées cette semaine
    const interventionsTerminesSemaine = await Intervention.countDocuments({
      statut: 'Terminé',
      dateRealisation: { $gte: startOfWeek }
    });

    // Stats par statut ce mois
    const statsParStatut = await Intervention.aggregate([
      {
        $match: { dateCreation: { $gte: startOfMonth } }
      },
      {
        $group: {
          _id: '$statut',
          count: { $sum: 1 }
        }
      }
    ]);

    // Chiffre d'affaires du mois
    const caMonth = await Intervention.aggregate([
      {
        $match: {
          statut: 'Facturé',
          dateRealisation: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$coutTotal' }
        }
      }
    ]);

    res.json({
      interventionsAujourdhui,
      interventionsEnCours,
      interventionsTerminesSemaine,
      statsParStatut,
      chiffreAffairesMois: caMonth[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
