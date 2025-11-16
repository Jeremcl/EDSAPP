const express = require('express');
const router = express.Router();
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  exportClients
} = require('../controllers/clientController');
const { protect } = require('../middleware/auth');

// Toutes les routes sont protégées
router.use(protect);

router.route('/')
  .get(getClients)
  .post(createClient);

router.get('/export', exportClients);

router.route('/:id')
  .get(getClientById)
  .put(updateClient)
  .delete(deleteClient);

module.exports = router;
