const express = require("express");
const carsController = require("../controllers/carsController");
const {
  carValidationRules,
  validateCar,
} = require("../middlewares/validators");

const router = express.Router();

router
  .route("/")
  .get("/", carsController.getCars)
  .post("/", carValidationRules, validateCar, carsController.addCar);

router
  .route("/:id")
  .get("/:id", carsController.getCarById)
  .put("/:id", carValidationRules, validateCar, carsController.updateCar)
  .delete("/:id", carsController.deleteCar);

module.exports = router;
