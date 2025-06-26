const Product = require('../models/Product');
const { ErrorResponse } = require('../middleware/error');

// @desc    Get all reviews for a product
// @route   GET /api/v1/products/:productId/reviews
exports.getReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
      .select('reviews')
      .populate('reviews.user', 'name');

    if (!product) {
      return next(new ErrorResponse('Product not found', 404));
    }

    res.status(200).json({
      success: true,
      count: product.reviews.length,
      data: product.reviews
    });
  } catch (err) {
    next(new ErrorResponse(err.message, 500));
  }
};

// @desc    Get single review
// @route   GET /api/v1/reviews/:id
exports.getReview = async (req, res, next) => {
  try {
    const product = await Product.findOne({ 'reviews._id': req.params.id })
      .select('reviews')
      .populate('reviews.user', 'name');

    if (!product) {
      return next(new ErrorResponse('Review not found', 404));
    }

    const review = product.reviews.id(req.params.id);
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    next(new ErrorResponse(err.message, 500));
  }
};

// @desc    Add review
// @route   POST /api/v1/products/:productId/reviews
exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return next(new ErrorResponse('Product not found', 404));
    }

    // Check if already reviewed
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user.id
    );

    if (alreadyReviewed) {
      return next(new ErrorResponse('Already reviewed this product', 400));
    }

    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    next(new ErrorResponse(err.message, 500));
  }
};

// @desc    Update review
// @route   PUT /api/v1/reviews/:id
exports.updateReview = async (req, res, next) => {
  try {
    const product = await Product.findOne({ 'reviews._id': req.params.id });

    if (!product) {
      return next(new ErrorResponse('Review not found', 404));
    }

    const review = product.reviews.id(req.params.id);

    // Check ownership
    if (review.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized', 401));
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    await product.save();
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    next(new ErrorResponse(err.message, 500));
  }
};

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
exports.deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findOne({ 'reviews._id': req.params.id });

    if (!product) {
      return next(new ErrorResponse('Review not found', 404));
    }

    const review = product.reviews.id(req.params.id);

    // Check ownership or admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized', 401));
    }

    product.reviews.pull(req.params.id);
    product.numOfReviews = product.reviews.length;

    // Recalculate average
    if (product.reviews.length > 0) {
      product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    } else {
      product.ratings = 0;
    }

    await product.save();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(new ErrorResponse(err.message, 500));
  }
};