const { validationResult } = require('express-validator');

// Middleware de validation
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Erreur de validation',
      errors: errors.array()
    });
  }
  next();
};
