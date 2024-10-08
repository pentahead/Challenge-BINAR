const carsService = require("../services/carsService");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { NotFoundError } = require("../utils/requestHandler");
// Mendapatkan semua mobil
const getCars = (req, res, next) => {
  try {
    const filters = req.query;
    const cars = carsService.getAllCars(filters);
    if (cars.length === 0) {
      throw new NotFoundError("No cars found with the provided criteria.");
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
      throw new NotFoundError(carsService.getCarById.errors);
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
    const deletedCar = carsService.deleteCar(req.params.id);
    successResponse(res, deletedCar);
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
