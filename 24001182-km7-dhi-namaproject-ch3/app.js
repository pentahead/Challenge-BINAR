require("dotenv").config(); // To enable .env called
const express = require("express");
const fileUpload = require("express-fileupload");
const routes = require("./src/routes");
const {
  errorHandler,
  NotFoundURLHandler,
} = require("./src/middlewares/errorHandler");

// Make/initialize express aplication
const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// to read form-body if you want to upload file
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 }, //50 mb
  })
);

// Use routes
app.use("/", routes);

// Middleware untuk menangani 404 Not Found
app.use("*", NotFoundURLHandler);

// Middleware untuk menangani error
app.use(errorHandler);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
