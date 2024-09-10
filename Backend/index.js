const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 4000;

// Middleware
const corsOptions = {
  origin: ["http://localhost:3000", "https://sharath-ecommerce.netlify.app"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("combined"));

// Serve static files for uploaded images
app.use("/images", express.static(path.join(__dirname, "./upload/images")));

// Routes
app.use("/products", require("./routes/products"));
app.use("/users", require("./routes/users"));

// Root route
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Connect to MongoDB (ensure you have your MongoDB connection file correctly set up)
require("./config/db");

// Start server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error :" + error);
  }
});
