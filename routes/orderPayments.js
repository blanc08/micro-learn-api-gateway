const express = require('express');
const router = express.Router();

const handler = require('./handler/order-payment');

router.get('/', handler.getOrders);

module.exports = router;
