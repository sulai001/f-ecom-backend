const express = require('express');
const router = express.Router();
const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

const { isAuthenticatedUser } = require('../middleware/auth');

// Public route
router.get('/products/:productId/reviews', getProductReviews);

// Protected routes
router.post('/products/:productId/reviews', isAuthenticatedUser, createReview);
router.put('/reviews/:id', isAuthenticatedUser, updateReview);
router.delete('/reviews/:id', isAuthenticatedUser, deleteReview);

module.exports = router;