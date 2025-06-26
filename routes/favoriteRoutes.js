const express = require('express');
const router = express.Router();
const { addToFavorites, getFavorites, removeFromFavorites } = require('../controllers/favoriteController');

router.post('/', addToFavorites);
router.get('/', getFavorites);
router.delete('/', removeFromFavorites); // <-- Add this line

module.exports = router;