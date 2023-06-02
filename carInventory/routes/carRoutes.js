// routes/carRoutes.js
const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router.post('/', carController.addCar);
router.put('/:id', carController.updateCar);
router.put('/', carController.updateMultipleCars);
router.delete('/:id', carController.deleteCar);
router.get('/', carController.getAllCars);
router.get('/olderThan5Years', carController.getCarsOlderThan5Years);

module.exports = router;