
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts, // ✅ Import this
} = require('../controllers/productController');


router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/:id/reviews', createProductReview);
router.get('/top', getTopProducts);

module.exports = router;