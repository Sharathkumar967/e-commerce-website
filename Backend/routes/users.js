require("dotenv").config();
const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const jwt = require("jsonwebtoken");

// Sign up route
router.post("/signup", async (req, res) => {
  let check = await Users.findOne({
    email: req.body.email,
  });

  if (check) {
    return res.status(400).json({
      success: false,
      error: "existing user found with same email address",
    });
  }

  let cart = [];

  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, process.env.JWT_SECRET || "secrete_ecom");

  res.json({ success: true, token });
});

// Login route
router.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });

  if (user) {
    const passCompare = req.body.password === user.password;

    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, process.env.JWT_SECRET || "secrete_ecom");

      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        error: "Wrong Password",
      });
    }
  } else {
    res.json({
      success: false,
      error: "Wrong Email Id",
    });
  }
});

module.exports = router;
