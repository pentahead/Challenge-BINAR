const express = require("express"); // import with non module
const students = require("./data/student.json"); // import data students
const fs = require("fs");
const path = require("path");
const { z } = require("zod");

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
      id: getNextId(students),
      ...validateData, //titik tiga digunakan agar tidak mengikutkan objcet [], hanya value saja yang diambil
    };

    students.push(newStudent);
    const filepath = path.join(__dirname, "./data/student.json");
    fs.writeFile(filepath, JSON.stringify(students), (err) => {
      if (err) {
        res.status(500).json({ message: "Failed to save student data" });
        return;
      }
    });
    res.status(201).json(newStudent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "error" + error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.put("/students/:id", (req, res) => {
  //make validation scema
  const validateSchema = z.object({
    name: z.string(),
    nickname: z.string(),
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

  //mengambil param id
  const { id } = req.params;
  const student = students.find((student) => student.id == id);
  if (!student) {
    return res.status(404).json({ msg: "student not found" });
  }

  //validate data req.body
  const validateData = validateSchema.safeParse(req.body);
  if (!validateData.success) {
    return res.status(400).json({
      msg: "Validasi Gagal",
      errors: validateData.error.errors.map((err) => ({
        field: err.path[0],
        issue: err.message,
      })),
    });
  }
  //memperbarui data
  Object.assign(student, validateData.data);
  //menyipan data
  const filepath = path.join(__dirname, "./data/student.json");
  fs.writeFileSync(filepath, JSON.stringify(students), (err) => {
    if (err) {
      res.status(500).json({ message: "Failed to save student data" });
      return;
    }
  });
  return res.status(200).json(student);

  // if (error instanceof z.ZodError) {
  //   res.status(400).json({ message: error.message });
  // } else {
  //   res.status(500).json({ message: "Internal server error" });
  // }
});

// app.put("/student/:id", (req, res) => {
//   const { id } = req.params;
//   const student = students.find((student) => student.id == id);
//   //make validation scema
//   const validatebody = z.object({
//     name: z.string(),
//     nickname: z.string(),
//     class: z.string(),
//     address: z.object({
//       province: z.string(),
//       city: z.string(),
//     }),
//     education: z
//       .object({
//         bachelor: z.string().optional().nullable(),
//       })
//       .optional()
//       .nullable(),
//   });
//   //validate req params
//   try {
//     const result = validatebody.safeParse(req.body);
//     if (!result.success) {
//       return res.status(400).json({
//         msg: "Validation Failed",
//         errors: result.error.errors.map((err) => ({
//           field: err.path[0],
//           issue: err.message,
//         })),
//       });
//     }
//     if (student >= 0) {
//       Object.assign(student, result);
//       const filepath = path.join(__dirname, "./data/student.json");
//       fs.writeFileSync(filepath, JSON.stringify(students, null, 2), "utf-8");
//       return res.status(200).json({ msg: "Success", data: student });
//     }
//   } catch {
//     res.status(404).json({ msg: "Student id not found!" });
//   }
// });

app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const student = students.findIndex((student) => student.id == id);
  if (student == -1) {
    res.status(404).json({ message: "Student not found" });
    return;
  }
  try {
    const deletedStudent = students.splice(student, 1)[0];
    const filepath = path.join(__dirname, "./data/student.json");
    fs.writeFileSync(filepath, JSON.stringify(students), (err) => {
      if (err) {
        res.status(500).json({ message: "Failed to save student data" });
        return;
      }
      res.status(201).json({
        message: "Siswa berhasil dihapus",
        deletedStudent: deletedStudent,
      });
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

//function untuk membuat id baru
function getNextId(students) {
  const maxId = students.reduce((max, student) => Math.max(max, student.id), 0);
  return maxId + 1;
}

// Run the express.js application
app.listen(port, () => {
  console.log(`The express.js is running on port ${port}`);
});
