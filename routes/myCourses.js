const express = require('express');
const router = express.Router();
const handler = require('./handler/my-courses');

router.post('/', handler.create);
router.get('/', handler.get);

module.exports = router;
