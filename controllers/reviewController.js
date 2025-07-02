const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Add a review to a product
// @route   POST /api/reviews/:productId
// @access  Private (requires req.user)
exports.createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.productId);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You already reviewed this product' });
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, r) => r.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added', reviews: product.reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
exports.getProductReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('reviews.user', 'name');

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ reviews: product.reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a review without auth
exports.createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, rating, comment } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Create and save review
    const review = new Review({
      product: productId,
      name: name || "Anonymous",
      rating,
      comment
    });
    await review.save();

    // Optionally update product stats
    const reviews = await Review.find({ product: productId });
    product.numReviews = reviews.length;
    product.rating = reviews.reduce((acc, r) => r.rating + acc, 0) / reviews.length;
    await product.save();

    res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
