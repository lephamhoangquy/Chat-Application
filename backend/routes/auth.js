const express = require('express');
const { Router } = express;
const router = Router();
const authController = require('../controllers/auth');

router.post('/login', authController.login);

module.exports = router;
