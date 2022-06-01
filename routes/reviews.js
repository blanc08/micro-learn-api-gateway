const express = require('express');
const router = express.Router();
const handler = require('./handler/reviews');

router.post('/', handler.create);
router.put('/:id', handler.update);
router.delete('/:id', handler.destroy);

module.exports = router;
