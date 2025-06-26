const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const productSchema = new mongoose.Schema({
 name: {
  type: String,
  required: [true, 'Please enter product name'],
  trim: true,
  maxlength: [100, 'Product name cannot exceed 100 characters'],
  unique: true // <-- Add this line
},
  price: {
    type: Number,
    required: true
  },
  description: String,
  category: String,
  stock: {
    type: Number,
    default: 0
  },
  images: [{
    url: String,
    public_id: String
  }],
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Product', productSchema);