const express = require('express');
const router = express.Router();
const vaccinationController = require('../controllers/vaccinationsController');

router.get('/vaccinations', vaccinationController.getAllVaccinations);
router.get('/vaccinations/search', vaccinationController.searchVaccines);
router.post('/vaccinations/add', vaccinationController.addVaccine);
router.put('/vaccinations/update/:id', vaccinationController.updateVaccine);
router.delete('/vaccinations/delete/:id', vaccinationController.deleteVaccine);

module.exports = router;
