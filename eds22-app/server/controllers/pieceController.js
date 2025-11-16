const Piece = require('../models/Piece');
const MouvementStock = require('../models/MouvementStock');

// Obtenir toutes les pièces
exports.getPieces = async (req, res) => {
  try {
    const { search, categorie, stockBas, page = 1, limit = 20 } = req.query;
    const query = { actif: true };

    if (search) {
      query.$or = [
        { reference: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { marque: { $regex: search, $options: 'i' } }
      ];
    }

    if (categorie) {
      query.categorie = categorie;
    }

    const pieces = await Piece.find(query)
      .sort({ designation: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Filtrer le stock bas côté serveur si demandé
    let filteredPieces = pieces;
    if (stockBas === 'true') {
      filteredPieces = pieces.filter(p => p.isStockBas());
    }

    const count = await Piece.countDocuments(query);

    res.json({
      pieces: filteredPieces,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une pièce par ID
exports.getPieceById = async (req, res) => {
  try {
    const piece = await Piece.findById(req.params.id);
    if (!piece) {
      return res.status(404).json({ message: 'Pièce non trouvée' });
    }
    res.json(piece);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle pièce
exports.createPiece = async (req, res) => {
  try {
    const piece = new Piece(req.body);
    const nouvellePiece = await piece.save();

    // Enregistrer le mouvement de stock initial si quantité > 0
    if (nouvellePiece.quantiteStock > 0) {
      await MouvementStock.create({
        pieceId: nouvellePiece._id,
        type: 'Entrée',
        quantite: nouvellePiece.quantiteStock,
        quantiteAvant: 0,
        quantiteApres: nouvellePiece.quantiteStock,
        motif: 'Inventaire',
        utilisateur: req.user?.nom || 'Système',
        notes: 'Stock initial'
      });
    }

    res.status(201).json(nouvellePiece);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une pièce
exports.updatePiece = async (req, res) => {
  try {
    const piece = await Piece.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!piece) {
      return res.status(404).json({ message: 'Pièce non trouvée' });
    }
    res.json(piece);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ajuster le stock d'une pièce
exports.adjustStock = async (req, res) => {
  try {
    const { quantite, type, motif, notes } = req.body;
    const piece = await Piece.findById(req.params.id);

    if (!piece) {
      return res.status(404).json({ message: 'Pièce non trouvée' });
    }

    const quantiteAvant = piece.quantiteStock;

    if (type === 'Entrée') {
      piece.quantiteStock += quantite;
    } else if (type === 'Sortie') {
      if (piece.quantiteStock < quantite) {
        return res.status(400).json({ message: 'Stock insuffisant' });
      }
      piece.quantiteStock -= quantite;
    }

    await piece.save();

    // Enregistrer le mouvement
    await MouvementStock.create({
      pieceId: piece._id,
      type,
      quantite,
      quantiteAvant,
      quantiteApres: piece.quantiteStock,
      motif,
      utilisateur: req.user?.nom || 'Système',
      notes
    });

    res.json(piece);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une pièce (soft delete)
exports.deletePiece = async (req, res) => {
  try {
    const piece = await Piece.findByIdAndUpdate(
      req.params.id,
      { actif: false },
      { new: true }
    );
    if (!piece) {
      return res.status(404).json({ message: 'Pièce non trouvée' });
    }
    res.json({ message: 'Pièce désactivée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir les mouvements de stock
exports.getMouvementsStock = async (req, res) => {
  try {
    const { pieceId, dateDebut, dateFin, page = 1, limit = 50 } = req.query;
    const query = {};

    if (pieceId) query.pieceId = pieceId;
    if (dateDebut || dateFin) {
      query.date = {};
      if (dateDebut) query.date.$gte = new Date(dateDebut);
      if (dateFin) query.date.$lte = new Date(dateFin);
    }

    const mouvements = await MouvementStock.find(query)
      .populate('pieceId', 'reference designation')
      .populate('interventionId', 'numero')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await MouvementStock.countDocuments(query);

    res.json({
      mouvements,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir les alertes de stock bas
exports.getStockAlerts = async (req, res) => {
  try {
    const pieces = await Piece.find({ actif: true });
    const alertes = pieces.filter(p => p.isStockBas());
    res.json(alertes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
