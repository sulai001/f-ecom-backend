const Favorite = require('../models/Favorite');

exports.addToFavorites = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let fav = await Favorite.findOne({ user: userId });
    if (!fav) {
      fav = new Favorite({ user: userId, products: [] });
    }
    if (!fav.products.includes(productId)) {
      fav.products.push(productId);
    }
    await fav.save();
    await fav.populate('products');
    res.json({ products: fav.products });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFavorites = async (req, res) => {
  const { userId } = req.query;
  try {
    const fav = await Favorite.findOne({ user: userId }).populate('products');
    res.json({ products: fav ? fav.products : [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeFromFavorites = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const fav = await Favorite.findOne({ user: userId });
    if (!fav) return res.status(404).json({ message: 'Favorites not found' });
    fav.products = fav.products.filter(pid => pid.toString() !== productId);
    await fav.save();
    await fav.populate('products');
    res.json({ products: fav.products });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};