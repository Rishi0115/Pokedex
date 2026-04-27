const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cache = require('../utils/cache');

const BASE_URL = process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2';
const FAVORITES_PATH = path.join(__dirname, '../data/favorites.json');

// -- helpers --

function loadFavorites() {
  try {
    if (!fs.existsSync(FAVORITES_PATH)) return [];
    const raw = fs.readFileSync(FAVORITES_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  const dir = path.dirname(FAVORITES_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(FAVORITES_PATH, JSON.stringify(favorites, null, 2));
}

function createError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

// -- pokemon --

async function fetchPokemonList(page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  const cacheKey = `list_${page}_${limit}`;

  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const { data } = await axios.get(`${BASE_URL}/pokemon`, {
    params: { offset, limit },
  });

  const result = {
    total: data.count,
    page,
    limit,
    pokemon: data.results.map((p) => ({
      name: p.name,
      url: p.url,
    })),
  };

  cache.set(cacheKey, result);
  return result;
}

async function fetchPokemonDetails(name) {
  const cacheKey = `details_${name.toLowerCase()}`;

  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const { data } = await axios.get(`${BASE_URL}/pokemon/${name.toLowerCase()}`);

    const result = {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types.map((t) => t.type.name),
      abilities: data.abilities.map((a) => a.ability.name),
      stats: data.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      sprites: {
        front: data.sprites.front_default,
        back: data.sprites.back_default,
        official: data.sprites.other?.['official-artwork']?.front_default || null,
      },
    };

    cache.set(cacheKey, result);
    return result;
  } catch (err) {
    if (err.response?.status === 404) {
      throw createError(`Pokemon "${name}" not found`, 404);
    }
    throw err;
  }
}

async function fetchPokemonByType(type) {
  const cacheKey = `type_${type.toLowerCase()}`;

  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const { data } = await axios.get(`${BASE_URL}/type/${type.toLowerCase()}`);

    const result = {
      type: data.name,
      count: data.pokemon.length,
      pokemon: data.pokemon.map((entry) => ({
        name: entry.pokemon.name,
        url: entry.pokemon.url,
      })),
    };

    cache.set(cacheKey, result);
    return result;
  } catch (err) {
    if (err.response?.status === 404) {
      throw createError(`Type "${type}" not found`, 404);
    }
    throw err;
  }
}

// -- favorites --

function getAllFavorites() {
  return loadFavorites();
}

function addToFavorites({ name, pokemonId }) {
  if (!name || !pokemonId) {
    throw createError('name and pokemonId are required', 400);
  }

  const favorites = loadFavorites();

  const exists = favorites.some(
    (f) => f.name === name || f.pokemonId === pokemonId
  );
  if (exists) {
    throw createError(`"${name}" is already in favorites`, 409);
  }

  const entry = {
    id: Date.now().toString(),
    name,
    pokemonId,
    addedAt: new Date().toISOString(),
  };

  favorites.push(entry);
  saveFavorites(favorites);
  return entry;
}

function removeFromFavorites(id) {
  const favorites = loadFavorites();
  const index = favorites.findIndex((f) => f.id === id);

  if (index === -1) {
    throw createError(`Favorite with id "${id}" not found`, 404);
  }

  const [removed] = favorites.splice(index, 1);
  saveFavorites(favorites);
  return removed;
}

module.exports = {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonByType,
  getAllFavorites,
  addToFavorites,
  removeFromFavorites,
};
