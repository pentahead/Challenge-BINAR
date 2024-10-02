const express = require("express"); // import with non module
const students = require("./data/student.json"); // import data students
const fs = require("fs");
const path = require("path");
const { z, object } = require("zod");

//make/Initialize express application
const app = express();
const port = 4000;

// Middleware untuk memparsing JSON dari request body
app.use(express.json());

const studentSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 characters"),
  nickname: z.string().min(1, "Nickname must be at least 1 characters"),
  class: z.string().min(1, "Class must be at least 1 characters"),
  address: z.object({
    province: z.string().min(1, "Province must be at least 1 characters"),
    city: z.string().min(1, "City must be at least 1 characters"),
  }),
  education: z.object({
    bachelor: z.string().min(1, "Bachelor must be at least 1 characters"),
  }),
});

// Make a routing and responses
app.get("/", (req, res) => {
  res.send("Hello World!, im using nodemon");
});

//membuat routing baru
app.get("/students", (req, res) => {
  res.json(students); //meminta response file json
});

app.get("/students/:id", (req, res) => {
  const { id } = req.params; //get the id form params

  //find stuudent by id
  const student = students.find((student) => student.id == id);
  console.log(student);
  // if student has been found, it will be response the student data
  if (student) {
    res.json(student);
    return;
  }

  // if there is no student with the id that client request , it will response not found
  res.status(404).json({ message: "student not found! nih" });
});

app.post("/students", (req, res) => {
  //validasi inputan dari user
  try {
    const validateData = studentSchema.parse(req.body);
    const newStudent = {
      id: students.length + 1,
      ...validateData,
    };

    students.push(newStudent);
    const filepath = path.join(__dirname, "./data/student.json");
    fs.writeFile(filepath, JSON.stringify(students), (err) => {
      if (err) {
        res.status(500).json({ message: "Failed to save student data" });
        return;
      }
      res.status(201).json(newStudent);
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const student = students.find((student) => student.id == id);
  if (!student) {
    return res.status(404).json({ msg: "student not found" });
  }
  try {
    const validateData = studentSchema.parse(req.body);

    Object.assign(student, validateData);
    const filepath = path.join(__dirname, "./data/student.json");
    fs.writeFile(filepath, JSON.stringify(students), (err) => {
      if (err) {
        res.status(500).json({ message: "Failed to save student data" });
        return;
      }
      res.status(201).json(student);
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const studentIndex = students.findIndex((student) => student.id == id);
  if (studentIndex == -1) {
    res.status(404).json({ message: "Student not found" });
    return;
  }
});

// Run the express.js application
app.listen(port, () => {
  console.log(`The express.js is running on port ${port}`);
});
