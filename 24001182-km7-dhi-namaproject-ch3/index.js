const express = require("express");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Path untuk file data siswa
const dataFilePath = "./data/cars.json"; // Menggunakan path relatif langsung

// Dummy data siswa (jika file tidak ada)
let cars = [];

// Fungsi untuk membaca data siswa dari file JSON
const loadDataFromFile = () => {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath);
    cars = JSON.parse(data);
  }
};

// Fungsi untuk menyimpan data siswa ke file JSON
const saveDataToFile = () => {
  fs.writeFileSync(dataFilePath, JSON.stringify(cars, null, 2));
};

// Load data siswa saat server dijalankan
loadDataFromFile();

// validate schema
const carValidationRules = [
  body("plate")
    .isString()
    .notEmpty()
    .withMessage("Plat nomor tidak boleh kosong"),
  body("manufacture")
    .isString()
    .notEmpty()
    .withMessage("Merek tidak boleh kosong"),
  body("model").isString().notEmpty().withMessage("Model tidak boleh kosong"),
  body("image")
    .isString()
    .notEmpty()
    .withMessage("URL gambar tidak boleh kosong"),
  body("rentPerDay")
    .isInt({ gt: 0 })
    .withMessage("Harga sewa harus berupa angka positif"),
  body("capacity")
    .isInt({ gt: 0 })
    .withMessage("Kapasitas harus berupa angka positif"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Deskripsi tidak boleh kosong"),
  body("availableAt")
    .isISO8601()
    .withMessage("Tanggal ketersediaan tidak valid"),
  body("transmission")
    .isString()
    .notEmpty()
    .withMessage("Transmisi tidak boleh kosong"),
  body("available")
    .isBoolean()
    .withMessage("Ketersediaan harus berupa boolean"),
  body("type").isString().notEmpty().withMessage("Tipe tidak boleh kosong"),
  body("year").isInt({ gt: 1885 }).withMessage("Tahun harus lebih dari 1885"), // Tahun mobil pertama kali diproduksi
  body("options").isArray().withMessage("Opsi harus berupa array"),
  body("specs").isArray().withMessage("Spesifikasi harus berupa array"),
];
// Middleware untuk memeriksa validasi
const validateCar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Endpoint untuk mendapatkan semua siswa atau melakukan filter
app.get("/api/cars", (req, res, next) => {
  const { model, manufacture } = req.query; // Ambil parameter name dan nickname dari query

  let filteredcars = cars; // Mulai dengan semua siswa

  // Filter siswa berdasarkan nama jika ada parameter name
  if (model) {
    filteredcars = filteredcars.filter((cars) =>
      cars.model.toLowerCase().includes(cars.toLowerCase())
    );
  }

  // Filter siswa berdasarkan nickname jika ada parameter nickname
  if (manufacture) {
    filteredcars = filteredcars.filter((cars) =>
      cars.manufacture.toLowerCase().includes(manufacture.toLowerCase())
    );
  }

  // Cek apakah ada siswa yang ditemukan
  if (filteredcars.length === 0) {
    const error = new Error("No cars found with the provided criteria.");
    error.status = 404;
    return next(error); // Panggil middleware error
  }

  // Kirim respons dengan data siswa yang difilter
  res.json({
    success: true,
    data: filteredcars,
  });
});

// Endpoint untuk mendapatkan siswa berdasarkan ID
app.get("/api/cars/:id", (req, res, next) => {
  const car = cars.find((c) => c.id == req.params.id);
  if (!car) {
    const error = new Error("car not found");
    error.status = 404;
    return next(error);
  }
  res.json({ success: true, data: car });
});

// Endpoint untuk menambah siswa baru
app.post("/api/cars", carValidationRules, validateCar, (req, res, next) => {
  const newCar = {
    id: uuidv4(), // Menggunakan UUID untuk ID yang unik
    ...req.body,
  };

  cars.push(newCar);
  saveDataToFile(); // Simpan data ke file
  res.status(201).json({ success: true, data: newCar });
});

// Endpoint untuk memperbarui data siswa
app.put("/api/cars/:id", carValidationRules, validateCar, (req, res, next) => {
  const carIndex = cars.findIndex((c) => c.id == req.params.id);
  if (carIndex === -1) {
    const error = new Error("car not found");
    error.status = 404;
    return next(error);
  }

  const updatedCar = {
    ...cars[carIndex],
    ...req.body, // Mengupdate data siswa yang ada
  };

  cars[carIndex] = updatedCar;
  saveDataToFile(); // Simpan data ke file
  res.json({ success: true, data: updatedCar });
});

// Endpoint untuk menghapus siswa
app.delete("/api/cars/:id", (req, res, next) => {
  const carIndex = cars.findIndex((c) => c.id == req.params.id);
  if (carIndex === -1) {
    const error = new Error("Car not found");
    error.status = 404;
    return next(error);
  }

  cars.splice(carIndex, 1); // Menghapus siswa dari array
  saveDataToFile(); // Simpan data ke file
  return res.status(200).json({success: true, msg: "Car deleted!"}); // No Content
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err); // Log error di server
  res.status(err.status || 500).json({  
    success: false,
    message: "Terjadi kesalahan. Silakan coba lagi nanti.",
  });
});
// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
