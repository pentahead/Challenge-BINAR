const carsService = require('../services/carsService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// Mendapatkan semua mobil
const getCars = (req, res, next) => {
  try {
    const filters = req.query;
    const cars = carsService.getAllCars(filters);
    if (cars.length === 0) {
      return errorResponse(res, 'No cars found with the provided criteria.', 404);
    }
    successResponse(res, cars);
  } catch (err) {
    next(err);
  }
};

// Mendapatkan mobil berdasarkan ID
const getCarById = (req, res, next) => {
  try {
    const car = carsService.getCarById(req.params.id);
    if (!car) {
      return errorResponse(res, 'Car not found', 404);
    }
    successResponse(res, car);
  } catch (err) {
    next(err);
  }
};

// Menambahkan mobil baru
const addCar = (req, res, next) => {
  try {
    const newCar = carsService.addCar(req.body);
    successResponse(res, newCar, 201);
  } catch (err) {
    next(err);
  }
};

// Memperbarui mobil berdasarkan ID
const updateCar = (req, res, next) => {
    try {
      const updatedCar = carsService.updateCar(req.params.id, req.body);
      successResponse(res, updatedCar);
    } catch (err) {
      next(err);
    }
  };

// Menghapus mobil
const deleteCar = (req, res, next) => {
  try {
    carsService.deleteCar(req.params.id);
    successResponse(res, 'Car deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
};
