const express = require('express');
const carsController = require('../controllers/carsController');
const { carValidationRules, validateCar } = require('../middlewares/validators');

const router = express.Router();

router.get('/', carsController.getCars);
router.get('/:id', carsController.getCarById);
router.post('/', carValidationRules, validateCar, carsController.addCar);
router.put('/:id', carValidationRules, validateCar, carsController.updateCar); 
router.delete('/:id', carsController.deleteCar);

module.exports = router;
