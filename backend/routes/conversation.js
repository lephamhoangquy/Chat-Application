const express = require('express');
const { Router } = express;
const router = Router();
const controller = require('../controllers/conversation');

router.get('/getByID/:id', controller.getByID);
router.get('/getConversations', controller.getConversationsByUserID);
router.post('/init', controller.init);

module.exports = router;
