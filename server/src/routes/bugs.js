// routes/bugs.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bugController');

router.post('/', ctrl.createBug);
router.get('/', ctrl.getAllBugs);
router.put('/:id', ctrl.updateBug);
router.delete('/:id', ctrl.deleteBug);

module.exports = router;
