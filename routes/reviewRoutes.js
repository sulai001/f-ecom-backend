const express = require('express');
const router = express.Router();
const { createReview, getProductReviews } = require('../controllers/reviewController');

// Anyone can post or get reviews
router.post('/review/:productId', createReview);
router.get('/review/:productId', getProductReviews);

module.exports = router;
