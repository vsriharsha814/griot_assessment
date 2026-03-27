// server/routes/authRoutes.js
const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth');
const router = express.Router();

// Signup route
router.post(
  '/signup',
  [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('role').optional().isIn(['buyer', 'seller']).withMessage('Role must be buyer or seller'),
  ],
  authController.signup
);

// Login route
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('role').optional().isIn(['buyer', 'seller']).withMessage('Role must be buyer or seller'),
  ],
  authController.login
);

module.exports = router;
