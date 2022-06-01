const express = require('express');
const router = express.Router();
const handler = require('./handler/image-courses');

router.post('/', handler.create);
router.delete('/:id', handler.destroy);

module.exports = router;
