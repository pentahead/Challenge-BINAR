const express = require("express");
const cars = require('./data/cars.json');

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Everything is Fine!");
});

app.get("/cars", (req, res) => {
  res.json(cars);
});

app.get("/cars/:id", (req, res) => {
  const { id } = req.params;

  const car = cars.find((car) => car.id == id);
  if (car) {
    res.json(car);      
    return;
  }
  res.status(404).json({ msg: "car not found!" });
});

app.listen(port, () => {
  console.log(`ExpressJS is running on port ${port}`);
});
