const express = require('express');
const router = express.Router();
const handler = require('./handler/courses');

const verifyToken = require('../middlewares/verifyToken');
const permission = require('../middlewares/permission');

router.get('/', handler.getAll);
router.get('/:id', handler.get);

router.post('/', verifyToken, permission('admin'), handler.create);
router.put('/:id', verifyToken, permission('admin'), handler.update);
router.delete('/:id', verifyToken, permission('admin'), handler.destroy);

module.exports = router;
