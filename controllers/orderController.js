// Correct import (case-sensitive on some systems)
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, orderNotes } = req.body;

    // Calculate total price
    const products = await Product.find({
      '_id': { $in: items.map(item => item.product) }
    });

    if (!products.length) {
      return res.status(400).json({ message: 'No products found for order.' });
    }

    const totalPrice = items.reduce((total, item) => {
      const product = products.find(p => p._id.equals(item.product));
      if (!product) throw new Error('Product not found: ' + item.product);
      return total + (product.price * item.quantity);
    }, 0);

    const order = new Order({
      // user: req.user?.id, // Make this optional or remove
      items,
      totalPrice,
      shippingAddress,
      paymentMethod,
      orderNotes
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Order creation failed:', error); // <--- Add this for debugging
    res.status(500).json({ message: 'Order creation failed', error: error.message });
  }
};

// Get order by ID (with all details)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .lean();
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};

// Get logged in user orders (NO authentication)
exports.getUserOrders = async (req, res) => {
  try {
        const orders = await Order.find().populate('items.product');
    res.json(orders);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};