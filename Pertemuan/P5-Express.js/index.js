const express = require("express"); // import with non module
const students = require("./data/student.json"); // import data students

//make/Initialize express application
const app = express();
const port = 3000;

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

// Run the express.js application
app.listen(port, () => {
  console.log(`The express.js is running on port ${port}`);
});
