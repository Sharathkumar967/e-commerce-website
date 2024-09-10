// const mongoose = require("mongoose");

// mongoose
//   .connect(
//     "mongodb+srv://sharathkumar:sharath123@cluster0.5jet0.mongodb.net/e-commerce"
//   )
//   .then(() => {
//     console.log("MongoDB Connected");
//   })
//   .catch((err) => {
//     console.error("MongoDB Connection Error:", err);
//   });

require("dotenv").config();

const mongoose = require("mongoose");

// Use the MONGO_URI environment variable
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://sharathkumar:sharath123@cluster0.5jet0.mongodb.net/e-commerce"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });
