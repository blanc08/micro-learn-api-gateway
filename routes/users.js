const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const handler = require('./handler/users');

router.post('/register', handler.register);
router.post('/login', handler.login);
router.put('/', verifyToken, handler.update);
router.get('/', verifyToken, handler.getUser);
router.post('/logout', verifyToken, handler.logout);

module.exports = router;
