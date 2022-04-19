const express = require('express');
const { Router } = express;
const messageController = require('../controllers/messages');
const router = Router();

router.post('/', messageController.addNewMessage);

module.exports = router;
