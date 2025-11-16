const express = require('express');
const router = express.Router();
const {
  login,
  getMe,
  createUser,
  getUsers,
  updateUser
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', protect, getMe);

// Routes admin uniquement
router.use(protect);
router.get('/users', getUsers);
router.post('/users', authorize('Admin'), createUser);
router.put('/users/:id', authorize('Admin'), updateUser);

module.exports = router;
