const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products/top
router.get('/top', async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(4);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
