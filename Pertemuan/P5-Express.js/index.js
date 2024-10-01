const express = require("express"); // import with non module
const students = require("./data/student.json"); // import data students

//make/Initialize express application
const app = express();
const port = 4000;

// Middleware untuk memparsing JSON dari request body
app.use(express.json());

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
  const {name, nickName, address, education} = req.body;
  if (!name || name == "") {
    res.status(400).json({ message: "name is required!" });
    return;
  }
  if (!nickName || nickName == ""){
    res.status(400).json({ message: "nickname is required!" });
    return;
  }
  if (!req.body.class || req.body.class == ""){
    res.status(400).json({ message: "class is required!" });
    return;
  }
  if (!address || address == ""){
    res.status(400).json({ message: "address is required!" });
    return;
  }
  if (!education || education == ""){
    res.status(400).json({ message: "education is required!" });
    return;
  }

  const { province, city} = address;
  if (!city) {
    res.status(400).json({ message: "city is required!" });
    return;
  }
  if (!province) {
    res.status(400).json({ message: "province is required!" });
    return;
  }

  const { bachelor } = education;
  if (!bachelor) {
    res.status(400).json({ message: "bachelor is required!" });
    return;
  }

  //add data to current array students
  const newData = {
    id: students.length + 1,
    name,
    nickName,
    class: req.body.class,
    address: {
      province,
      city,
    },
    education: {
      bachelor,
    }
  };
  students.push(newData);
  res.status(201).json(newData);
  // res.status(201).json({msg: "Student data added suscessfuly"});
});

// Run the express.js application
app.listen(port, () => {
  console.log(`The express.js is running on port ${port}`);
});
