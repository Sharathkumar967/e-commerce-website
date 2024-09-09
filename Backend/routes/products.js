const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const mongoose = require("mongoose");

// Define the path for storing uploaded files
const uploadPath = path.join(__dirname, "../upload/images");

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });

  try {
    const data = jwt.verify(token, "secrete_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Token invalid, please authenticate again" });
  }
};

// Add product route
router.post("/addproduct", async (req, res) => {
  const { name, image, category, new_price, old_price, available } = req.body;

  try {
    const product = new Product({
      name,
      image,
      category,
      new_price: Number(new_price),
      old_price: Number(old_price),
      available,
    });

    await product.save();
    res.json({ success: true, name });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Remove product route
router.post("/removeproduct", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body._id);
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Get all products route
router.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Get new collection data
router.get("/newCollections", async (req, res) => {
  try {
    const products = await Product.find({});
    const newCollection = products.slice(-8);
    res.json(newCollection);
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Get popular women data
router.get("/popularinwomen", async (req, res) => {
  try {
    const products = await Product.find({ category: "women" });
    const popular_in_women = products.slice(0, 4);
    res.json(popular_in_women);
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Add to Cart route
router.post("/addToCart", fetchUser, async (req, res) => {
  const { cartId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid product ID" });
    }

    const product = await Product.findById(cartId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    let user = await Users.findById(req.user.id);
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });

    const productId = new mongoose.Types.ObjectId(cartId);

    if (!user.cartData.includes(productId)) {
      user.cartData.push(productId);
    }

    await user.save();

    res.json({
      success: true,
      message: "Item added to cart",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error("Error adding to cart:", error); // Log the error
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Remove from Cart route
router.post("/removeFromCart", fetchUser, async (req, res) => {
  const { productId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid product ID" });
    }

    let user = await Users.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.cartData = user.cartData.filter(
      (item) => item !== null && item !== undefined
    );

    const cartItemIndex = user.cartData.findIndex(
      (item) => item && item.toString() === productId
    );

    if (cartItemIndex !== -1) {
      user.cartData.splice(cartItemIndex, 1);

      await user.save();

      res.json({
        success: true,
        message: "Item removed from cart",
        cartData: user.cartData,
      });
    } else {
      res.status(400).json({ success: false, message: "Item not in cart" });
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Fetch cart data route
router.get("/getCart", fetchUser, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).populate("cartData");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (!user.cartData || !Array.isArray(user.cartData)) {
      return res
        .status(404)
        .json({ success: false, error: "Cart data not found" });
    }

    console.log("Fetched cart data:", user.cartData);

    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Get related products route
router.get("/relatedProducts/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    console.log("Product:", product);

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: productId },
    }).limit(4);

    res.json({ success: true, relatedProducts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Handle file upload
router.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: 0, message: "No file uploaded" });

  res.json({
    success: 1,
    // image_url: `http://localhost:4000/images/${req.file.filename}`,
    image_url: `/${req.file.filename}`,
  });
});

module.exports = router;
