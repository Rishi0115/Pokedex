const express = require('express');
const Favorite = require('../models/Favorite');
const router = express.Router();

// Auth middleware
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ success: false, message: 'Authentication required' });
};

// Get all favorites for the logged-in user
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id });
    res.json({ success: true, data: favorites });
  } catch (err) {
    next(err);
  }
});

// Add a favorite
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { name, pokemonId } = req.body;
    
    if (!name || !pokemonId) {
      return res.status(400).json({ success: false, message: 'name and pokemonId are required' });
    }

    const favorite = await Favorite.create({
      userId: req.user._id,
      name,
      pokemonId: Number(pokemonId),
    });

    res.status(201).json({ success: true, data: favorite });
  } catch (err) {
    // Handle duplicate favorite
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Already favorited' });
    }
    next(err);
  }
});

// Remove a favorite
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id, // Ensure user can only delete their own
    });

    if (!favorite) {
      return res.status(404).json({ success: false, message: 'Favorite not found' });
    }

    res.json({ success: true, message: 'Favorite removed' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
