const { body, validationResult } = require('express-validator');
const { BadRequestError } = require('../utils/requestHandler')

// Aturan validasi untuk data mobil
const carValidationRules = [
  body('plate')
    .isString()
    .notEmpty()
    .withMessage('Plat nomor tidak boleh kosong'),
  body('manufacture')
    .isString()
    .notEmpty()
    .withMessage('Merek tidak boleh kosong'),
  body('model')
    .isString()
    .notEmpty()
    .withMessage('Model tidak boleh kosong'),
  body('image')
    .isString()
    .notEmpty()
    .withMessage('URL gambar tidak boleh kosong'),
  body('rentPerDay')
    .isInt({ gt: 0 })
    .withMessage('Harga sewa harus berupa angka positif'),
  body('capacity')
    .isInt({ gt: 0 })
    .withMessage('Kapasitas harus berupa angka positif'),
  body('description')
    .isString()
    .notEmpty()
    .withMessage('Deskripsi tidak boleh kosong'),
  body('availableAt')
    .isISO8601()
    .withMessage('Tanggal ketersediaan tidak valid'),
  body('transmission')
    .isString()
    .notEmpty()
    .withMessage('Transmisi tidak boleh kosong'),
  body('available')
    .isBoolean()
    .withMessage('Ketersediaan harus berupa boolean'),
  body('type')
    .isString()
    .notEmpty()
    .withMessage('Tipe tidak boleh kosong'),
  body('year')
    .isInt({ gt: 1885 })
    .withMessage('Tahun harus lebih dari 1885'),
  body('options')
    .isArray()
    .withMessage('Opsi harus berupa array'),
  body('specs')
    .isArray()
    .withMessage('Spesifikasi harus berupa array'),
];

// Middleware untuk memeriksa hasil validasi
const validateCar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestError(validationResult.errors);
  }
  next();
};

module.exports = {
  carValidationRules,
  validateCar,
};
