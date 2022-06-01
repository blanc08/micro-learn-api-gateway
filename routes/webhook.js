const express = require('express');
const router = express.Router();

const handler = require('./handler/webhook');

router.post('/', handler.webhook);

module.exports = router;
