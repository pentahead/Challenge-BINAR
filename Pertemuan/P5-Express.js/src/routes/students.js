const express = require("express");
const { validateGetStudents } = require("../middlewares/students");
const { getStudents } = require("../controllers/students");

const router = express.Router();

router.get("/", validateGetStudents, getStudents);

module.exports = router;