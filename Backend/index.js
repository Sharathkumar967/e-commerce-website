const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB (ensure you have your MongoDB connection file correctly set up)
require("./config/db");

// Serve static files for uploaded images
app.use("/images", express.static(path.join(__dirname, "./upload/images")));

// Routes
app.use("/products", require("./routes/products"));
app.use("/users", require("./routes/users"));

// Root route
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Start server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error :" + error);
  }
});