const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pokemonId: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

// Ensure a user can't favorite the same pokemon twice
favoriteSchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
