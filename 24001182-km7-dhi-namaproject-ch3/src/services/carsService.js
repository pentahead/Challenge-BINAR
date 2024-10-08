const { v4: uuidv4 } = require('uuid');
const carsRepository = require('../repositories/carsRepository');

const carsService = {
  // Mendapatkan semua mobil atau melakukan filter
  getAllCars: (filters) => {
    let cars = carsRepository.getAllCars();
    const { model, manufacture } = filters;

    if (model) {
      cars = cars.filter((car) =>
        car.model.toLowerCase().includes(model.toLowerCase())
      );
    }

    if (manufacture) {
      cars = cars.filter((car) =>
        car.manufacture.toLowerCase().includes(manufacture.toLowerCase())
      );
    }

    return cars;
  },

  // Mendapatkan mobil berdasarkan ID
  getCarById: (id) => {
    return carsRepository.getCarById(id);
  },

  // Menambahkan mobil baru
  addCar: (carData) => {
    const newCar = {
      id: uuidv4(),
      ...carData,
    };
    carsRepository.addCar(newCar);
    return newCar;
  },

  // Memperbarui mobil berdasarkan ID
  updateCar: (id, carData) => {
    const cars = carsRepository.getAllCars();
    const carIndex = cars.findIndex((car) => car.id === id);
    
    if (carIndex === -1) {
      throw new Error('Car not found');
    }
    
    // Perbarui data mobil
    cars[carIndex] = { ...cars[carIndex], ...carData };
    carsRepository.saveCars(cars);

    return cars[carIndex];
  },


  // Menghapus mobil berdasarkan ID
  deleteCar: (id) => {
    carsRepository.deleteCar(id);
  },
};

module.exports = carsService;
