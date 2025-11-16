const express = require('express');
const router = express.Router();
const {
  getInterventions,
  getInterventionById,
  createIntervention,
  updateIntervention,
  addPieceToIntervention,
  deleteIntervention,
  getDashboardStats
} = require('../controllers/interventionController');
const { protect } = require('../middleware/auth');

// Toutes les routes sont protégées
router.use(protect);

router.get('/dashboard-stats', getDashboardStats);

router.route('/')
  .get(getInterventions)
  .post(createIntervention);

router.route('/:id')
  .get(getInterventionById)
  .put(updateIntervention)
  .delete(deleteIntervention);

router.post('/:id/pieces', addPieceToIntervention);

module.exports = router;
