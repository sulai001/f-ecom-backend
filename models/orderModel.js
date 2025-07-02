const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }
  ],
  totalPrice: Number,
  shippingAddress: Object,
  paymentMethod: String,
  orderNotes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);