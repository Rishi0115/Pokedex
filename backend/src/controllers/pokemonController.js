const pokeService = require('../services/pokeService');

async function getList(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);

    const data = await pokeService.fetchPokemonList(page, limit);
    res.json({ success: true, message: 'Pokemon list fetched', data });
  } catch (err) {
    next(err);
  }
}

async function getDetails(req, res, next) {
  try {
    const { name } = req.params;
    const data = await pokeService.fetchPokemonDetails(name);
    res.json({ success: true, message: 'Pokemon details fetched', data });
  } catch (err) {
    next(err);
  }
}

async function getByType(req, res, next) {
  try {
    const { type } = req.params;
    const data = await pokeService.fetchPokemonByType(type);
    res.json({ success: true, message: `Pokemon of type "${type}" fetched`, data });
  } catch (err) {
    next(err);
  }
}

async function getFavorites(req, res, next) {
  try {
    const data = pokeService.getAllFavorites();
    res.json({ success: true, message: 'Favorites fetched', data });
  } catch (err) {
    next(err);
  }
}

async function addFavorite(req, res, next) {
  try {
    const { name, pokemonId } = req.body;
    const data = pokeService.addToFavorites({ name, pokemonId });
    res.status(201).json({ success: true, message: `"${name}" added to favorites`, data });
  } catch (err) {
    next(err);
  }
}

async function removeFavorite(req, res, next) {
  try {
    const { id } = req.params;
    const data = pokeService.removeFromFavorites(id);
    res.json({ success: true, message: 'Removed from favorites', data });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getList,
  getDetails,
  getByType,
  getFavorites,
  addFavorite,
  removeFavorite,
};
