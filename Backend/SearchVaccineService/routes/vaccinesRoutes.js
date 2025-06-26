const express = require('express');
const router = express.Router();
const publicController = require('../controllers/vaccinesController.js');

router.get('/vaccines', publicController.getAllVaccines);
router.post('/vaccines/add', publicController.addVaccine);

module.exports = router;