const express = require('express');
const router = express.Router();
const handler = require('./handler/lessons');

router.post('/', handler.create);
router.put('/:id', handler.update);
router.delete('/:id', handler.destroy);
router.get('/:id', handler.get);
router.get('/', handler.getAll);

module.exports = router;
