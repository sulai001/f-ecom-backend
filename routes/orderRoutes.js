const express = require('express');
const router = express.Router();
const { 
  createOrder,
  getOrderById,
  getUserOrders
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

// Create a new order
router.post('/orders', createOrder);

// Get order details by ID (with user, address, items, payment, notes)
router.get('/orders/:id', getOrderById);

// Get all orders for the logged-in user
router.get('/user/orders', getUserOrders);

module.exports = router;