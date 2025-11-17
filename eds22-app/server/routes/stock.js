const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Toutes les routes sont protégées
router.use(protect);

// Route GET de base pour /api/stock
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: []
  });
});

module.exports = router;
