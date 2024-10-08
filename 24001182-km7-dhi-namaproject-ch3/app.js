const express = require("express");
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

// Use routes
app.use("/", routes);

// Middleware untuk menangani 404 Not Found
app.use("*", NotFoundURLHandler);
// app.use((req, res, next) => {
//   res.status(404).json({ success: false, message: "Resource not found" });
// });

// Middleware untuk menangani error
app.use(errorHandler);
// app.use((err, req, res, next) => {
//   const statusCode = err.status || 500;

//   if (statusCode >= 500) {
//     console.error(err.stack);
//   }

//   res.status(statusCode).json({
//     success: false,
//     message: statusCode >= 500 ? "Terjadi kesalahan. Silakan coba lagi nanti." : err.message,
//   });
// });

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
