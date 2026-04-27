import { useState, useEffect, useCallback } from 'react';
import { favApi } from '../services/api';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Fetch all favorites initially
  const loadFavorites = useCallback(async () => {
    try {
      const response = await favApi.getFavorites();
      if (response.data.success) {
        setFavorites(response.data.data);
      }
    } catch (err) {
      console.error('Failed to load favorites:', err);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const toggleFavorite = async (pokemonName, pokemonId) => {
    // Check if it already exists
    const existing = favorites.find(f => f.name === pokemonName);
    
    try {
      if (existing) {
        // Remove it
        await favApi.removeFavorite(existing.id);
        setFavorites(prev => prev.filter(f => f.id !== existing.id));
      } else {
        // Add it
        const response = await favApi.addFavorite({ name: pokemonName, pokemonId: Number(pokemonId) });
        if (response.data.success) {
          setFavorites(prev => [...prev, response.data.data]);
        }
      }
    } catch (err) {
      console.error('Toggle favorite failed:', err);
    }
  };

  const isFavorite = (name) => {
    return favorites.some(f => f.name === name);
  };

  return { favorites, toggleFavorite, isFavorite };
}
