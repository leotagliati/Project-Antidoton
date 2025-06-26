const express = require('express');
const router = express.Router();
const vaccinesController = require('../controllers/vaccinesController.js');

router.get('/vaccines', vaccinesController.getAllVaccines);
router.post('/vaccines/add', vaccinesController.addVaccine);

module.exports = router;