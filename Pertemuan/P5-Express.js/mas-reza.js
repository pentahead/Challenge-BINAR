const express = require("express"); // Import express with non-module
require("express-async-errors");
const fs = require("fs");
const { z } = require("zod");
const students = require("./data/students.json"); // Import data student
const router = require("./src/routes");

/* Make/initiate expess application */
const app = express();
const port = 4000;

/* We need to activate body parser/reader */
app.use(express.json());

/* Make a routing and response */
app.get("/", (req, res) => {
  res.send(`Hello World, I am using nodemon!`);
});

app.use("/", router);

app.get("/students/:id", (req, res) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Get the id from params
  const { id } = req.params;

  // find student by id
  const student = students.find((student) => student.id == id);
  if (!student) {
    // If there is no student with the id that client request, it will response not found
    throw new NotFoundError("Student is Not Found!");
  }

  // If student has been found, it will be response the student data
  successResponse(res, student);
});

app.post("/students", (req, res) => {
  // Validation body schema
  const validateBody = z.object({
    name: z.string(),
    nickName: z.string(),
    class: z.string(),
    address: z.object({
      province: z.string(),
      city: z.string(),
    }),
    education: z
      .object({
        bachelor: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
  });

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Find the max index to defnine the new data id
  const maxId = students.reduce(
    (max, student) => student.id > max && student.id,
    0
  );

  // let max = 0;
  // for (let index = 0; index < students.length; index++) {
  //     if (students[index].id > max) {
  //         max = students[index].id;
  //     }
  // }
  // let max = 0;
  // students.map((student) => {
  //     if (student.id > max) {
  //         max = student.id;
  //     }
  // });

  const newStudent = {
    id: maxId + 1,
    ...req.body,
  };

  /* Add data to current array students */
  students.push(newStudent);

  // Save the latest data to json
  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students, null, 4),
    "utf-8"
  );

  successResponse(res, newStudent);
});

// Update a student: PUT /students/:id
app.put("/students/:id", (req, res) => {
  // zod validation
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Validation body schema
  const validateBody = z.object({
    name: z.string(),
    nickName: z.string(),
    class: z.string(),
    address: z.object({
      province: z.string(),
      city: z.string(),
    }),
    education: z
      .object({
        bachelor: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
  });

  // Validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Find the existing student data
  const id = Number(req.params.id);
  const student = students.find((student) => student.id === id);
  if (!student) {
    // Make a error class
    throw new NotFoundError("Student is Not Found!");
  }

  // Update the data
  Object.assign(student, resultValidateBody.data);

  // Update the json data
  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students, null, 4),
    "utf-8"
  );

  successResponse(res, student);
});

// Delete a student: DELETE /students/:id
app.delete("/students/:id", (req, res) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Get the id from params
  const { id } = req.params;

  // Find index
  const studentIndex = students.findIndex((student) => student.id == id);

  if (studentIndex < 0) {
    // If no index found
    throw new NotFoundError("Student is Not Found!");
  }

  // If the index found
  const deletedStudent = students.splice(studentIndex, 1);

  // Update the json
  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students, null, 4),
    "utf-8"
  );

  successResponse(res, deletedStudent);
});

// This function is to handle error when API hit
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errors = err.errors || [];
  let message = err.message;
  if (status == 500) {
    message = "Internal Server Error";
  }

  console.error(err);

  res.status(status).json({
    success: false,
    data: null,
    message,
    errors,
  });
});

/* Run the express.js application */
app.listen(port, () => {
  console.log(`The express.js app is runing on port ${port}`);
});
