const express = require('express');
const router = express.Router();
const {
  getPieces,
  getPieceById,
  createPiece,
  updatePiece,
  adjustStock,
  deletePiece,
  getMouvementsStock,
  getStockAlerts
} = require('../controllers/pieceController');
const { protect } = require('../middleware/auth');

// Toutes les routes sont protégées
router.use(protect);

router.get('/alertes', getStockAlerts);
router.get('/mouvements', getMouvementsStock);

router.route('/')
  .get(getPieces)
  .post(createPiece);

router.route('/:id')
  .get(getPieceById)
  .put(updatePiece)
  .delete(deletePiece);

router.post('/:id/ajuster-stock', adjustStock);

module.exports = router;
