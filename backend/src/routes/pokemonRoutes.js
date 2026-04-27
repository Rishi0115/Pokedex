const express = require('express');
const router = express.Router();
const pokemon = require('../controllers/pokemonController');

// pokemon endpoints
router.get('/pokemon', pokemon.getList);
router.get('/pokemon/:name', pokemon.getDetails);
router.get('/type/:type', pokemon.getByType);

// favorites endpoints
router.get('/favorites', pokemon.getFavorites);
router.post('/favorites', pokemon.addFavorite);
router.delete('/favorites/:id', pokemon.removeFavorite);

module.exports = router;
