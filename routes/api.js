const express = require("express");
const router = express.Router();

// Sample product data
const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 45 },
  { id: 4, name: "Monitor", price: 300 },
];

// API endpoint to get all products
router.get("/products", (req, res) => {
  // Simulate network delay
  setTimeout(() => {
    res.json({
      success: true,
      data: products,
    });
  }, 500);
});

// API endpoint to get a single product by ID
router.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json({
      success: true,
      data: product,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
});

module.exports = router;
