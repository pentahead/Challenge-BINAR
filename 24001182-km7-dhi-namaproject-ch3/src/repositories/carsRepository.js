const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../../data/cars.json');

const carsRepository = {
  // Membaca data dari file
  getAllCars: () => {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  },

  // Menyimpan data ke file
  saveCars: (cars) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(cars, null, 2));
  },

  // Mendapatkan mobil berdasarkan ID
  getCarById: (id) => {
    const cars = carsRepository.getAllCars();
    return cars.find((car) => car.id === id);
  },
  
  // Menambahkan mobil baru
  addCar: (newCar) => {
    const cars = carsRepository.getAllCars();
    cars.push(newCar);
    carsRepository.saveCars(cars);
  },

  // Menghapus mobil
  deleteCar: (id) => {
    let cars = carsRepository.getAllCars();
    // cars = cars.filter(car => car.id !== id);
    carIndex = cars.find((c) => c.id == id);
    const deletedCar = cars.splice(carIndex, 1);
    carsRepository.saveCars(deletedCar);
  }
};

module.exports = carsRepository;
