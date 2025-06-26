const express = require('express');
const router = express.Router();
const { 
  createOrder,
  getOrderById,
  getUserOrders
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrderById);
router.get('/user/orders', protect, getUserOrders);

module.exports = router;