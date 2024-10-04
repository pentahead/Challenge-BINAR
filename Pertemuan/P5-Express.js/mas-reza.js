const express = require("express"); // Import express with non-module
const fs = require("fs");
const { z } = require("zod");
const students = require("./data/student.json"); // Import data student

/* Make/initiate expess application */
const app = express();
const port = 7000;

// Standarize response
const successResponse = (res, data) => {
  res.status(200).json({
    success: true,
    data,
  });
};

/* We need to activate body parser/reader */
app.use(express.json());

/* Make a routing and response */
app.get("/", (req, res) => {
  res.send(`Hello World, I am using nodemon!`);
});

app.get("/students", (req, res, next) => {
  try {
    // students?name=BAMARAMZY&nickName=ramzy
    // Validate the query
    const validateQuery = z.object({
      name: z.string().optional(),
      nickName: z.string().optional(),
      bachelor: z.string().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.params);
    if (!resultValidateQuery.success) {
      // If validation fails, return error messages
      return res.status(400).json({
        message: "Validation failed",
        errors: resultValidateQuery.error.errors.map((err) => ({
          field: err.path[0],
          issue: err.message,
        })),
      });
    }

    const searchedStudent = students.filter((student) => {
      // Do filter logic here
      let result = true;
      if (req.query.name) {
        const isFoundName = student.name
          .toLowerCase()
          .includes(req.query.name.toLowerCase());
        result = result && isFoundName;
      }
      if (req.query.nickName) {
        const isFoundNickName = student.nickName
          .toLowerCase()
          .includes(req.query.nickName.toLowerCase());
        result = result && isFoundNickName;
      }
      if (req.query.bachelor) {
        const isFoundBachelor = student.education.bachelor
          .toLowerCase()
          .includes(req.query.bachelor.toLowerCase());
        result = result && isFoundBachelor;
      }

      return result;
    });

    successResponse(res, searchedStudent);
  } catch (error) {
    next(error);
  }
});

app.get("/students/:id", (req, res) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.errors.map((err) => ({
        field: err.path[0],
        issue: err.message,
      })),
    });
  }

  // Get the id from params
  const { id } = req.params;

  // find student by id
  const student = students.find((student) => student.id == id);
  if (!student) {
    // If there is no student with the id that client request, it will response not found
    return res.status(404).json({ message: "Student not found!" });
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
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.errors.map((err) => ({
        field: err.path[0],
        issue: err.message,
      })),
    });
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
    return res.status(400).json({
      message: "Validation failed",
      errors: resultValidateParams.error.errors.map((err) => ({
        field: err.path[0],
        issue: err.message,
      })),
    });
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
    return res.status(400).json({
      message: "Validation failed",
      errors: resultValidateBody.error.errors.map((err) => ({
        field: err.path[0],
        issue: err.message,
      })),
    });
  }

  // Find the existing student data
  const id = Number(req.params.id);
  const student = students.find((student) => student.id === id);
  if (!student) {
    return res.status(404).json({
      message: "Student not found!",
    });
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
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.errors.map((err) => ({
        field: err.path[0],
        issue: err.message,
      })),
    });
  }

  // Get the id from params
  const { id } = req.params;

  // Find index
  const studentIndex = students.findIndex((student) => student.id == id);

  if (studentIndex < 0) {
    // If no index found
    return res.status.json({ message: "Student not found!" });
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
