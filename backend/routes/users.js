const express = require('express');
const { Router } = express;
const userController = require('../controllers/users');
const router = Router();
const verify = require('../middlewares/auth.mdw');

router.get('/getFriends', verify, userController.getFriends);
router.get('/getUser/:id', verify, userController.get);
router.post('/', userController.add);
router.get('/me', verify, userController.me);

module.exports = router;
