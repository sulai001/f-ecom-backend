const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    
    // Calculate total price
    const products = await Product.find({ 
      '_id': { $in: items.map(item => item.product) } 
    });
    
    const totalPrice = items.reduce((total, item) => {
      const product = products.find(p => p._id.equals(item.product));
      return total + (product.price * item.quantity);
    }, 0);
    
    const order = new Order({
      user: req.user.id,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod
    });
    
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed' });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if (order && (order.user._id.toString() === req.user.id)) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get logged in user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};