import { useState, useEffect, useCallback } from 'react';
import { favApi } from '../services/api';

const LOCAL_STORAGE_KEY = 'pokedex_favorites';

// Read favorites from localStorage
function readLocalFavorites() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Write favorites to localStorage
function writeLocalFavorites(favorites) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // localStorage might be full or unavailable — silently fail
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => readLocalFavorites());

  // Fetch all favorites from backend and merge with localStorage
  const loadFavorites = useCallback(async () => {
    try {
      const response = await favApi.getFavorites();
      if (response.data.success) {
        const serverFavs = response.data.data;
        setFavorites(serverFavs);
        writeLocalFavorites(serverFavs);
      }
    } catch (err) {
      // Backend unavailable or not authenticated — use localStorage as fallback
      console.warn('Using localStorage favorites (backend unavailable):', err.message);
      setFavorites(readLocalFavorites());
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const toggleFavorite = async (pokemonName, pokemonId) => {
    // Check if it already exists
    const existing = favorites.find(f => f.name === pokemonName);

    if (existing) {
      // --- Remove ---
      // Optimistic local update
      const updated = favorites.filter(f => f.name !== pokemonName);
      setFavorites(updated);
      writeLocalFavorites(updated);

      try {
        if (existing._id || existing.id) {
          await favApi.removeFavorite(existing._id || existing.id);
        }
      } catch (err) {
        console.warn('Backend remove failed, localStorage still updated:', err.message);
      }
    } else {
      // --- Add ---
      const newFav = { name: pokemonName, pokemonId: Number(pokemonId), id: `local_${Date.now()}` };

      // Optimistic local update
      const updated = [...favorites, newFav];
      setFavorites(updated);
      writeLocalFavorites(updated);

      try {
        const response = await favApi.addFavorite({ name: pokemonName, pokemonId: Number(pokemonId) });
        if (response.data.success) {
          // Replace the local placeholder with the server record
          const serverFav = response.data.data;
          const synced = updated.map(f => f.name === pokemonName && f.id === newFav.id ? serverFav : f);
          setFavorites(synced);
          writeLocalFavorites(synced);
        }
      } catch (err) {
        console.warn('Backend add failed, localStorage still updated:', err.message);
      }
    }
  };

  const isFavorite = (name) => {
    return favorites.some(f => f.name === name);
  };

  return { favorites, toggleFavorite, isFavorite };
}
