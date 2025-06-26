const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity, action } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    const qtyChange = quantity ?? 1;

    if (itemIndex > -1) {
  if (action === "increment") {
    cart.items[itemIndex].quantity += qtyChange;
  } else if (action === "decrement") {
    cart.items[itemIndex].quantity -= qtyChange;

    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1); // Remove item
    }
  } else {
    cart.items[itemIndex].quantity = qtyChange;
  }
} else {
  cart.items.push({ product: productId, quantity: qtyChange });
}


    await cart.save();
    await cart.populate('items.product');

    res.json({ items: cart.items });
  } catch (err) {
    console.error("Cart update error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.query;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    res.json({ items: cart ? cart.items : [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    await cart.populate('items.product');

    res.json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
