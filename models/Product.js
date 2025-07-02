const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Add this line
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
}, { timestamps: true });

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
  oldPrice: {
    type: Number,
    required: true
  },
  sizes: {  
    type: [String],
    required: [true, 'Please enter product sizes'],
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