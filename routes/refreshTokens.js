const express = require('express');
const router = express.Router();

const handler = require('./handler/refresh-tokens');

router.post('/', handler.refreshToken);

module.exports = router;
