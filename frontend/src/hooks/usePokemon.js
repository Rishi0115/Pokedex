import { useState, useEffect, useCallback } from 'react';
import { pokeApi } from '../services/api';

export function usePokemonList(initialPage = 1, limit = 20) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  // New states directly managed inside the hook for clean encapsulation
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const fetchPokemon = useCallback(async (currentPage, query, type, shouldAppend = false) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;

      if (query) {
        // Fetch specific pokemon by name
        response = await pokeApi.getPokemonDetails(query);
        if (response.data.success) {
          // Wrap the single object into an array shape to keep the UI grid happy
          setPokemonList([{ name: response.data.data.name, url: `https://pokeapi.co/api/v2/pokemon/${response.data.data.id}/` }]);
          setHasMore(false);
          return;
        }
      } else if (type) {
        // Fetch by type
        response = await pokeApi.getPokemonByType(type);
        if (response.data.success) {
          setPokemonList(response.data.data.pokemon);
          setHasMore(false); // Type endpoint returns all of them at once, no pagination for now
          return;
        }
      } else {
        // Fetch paginated list
        response = await pokeApi.getPokemonList(currentPage, limit);
        if (response.data.success) {
          setPokemonList((prev) => 
            shouldAppend ? [...prev, ...response.data.data.pokemon] : response.data.data.pokemon
          );
          const currentCount = currentPage * limit;
          setHasMore(currentCount < response.data.data.total);
          return;
        }
      }
      
      // Fallback throw
      throw new Error(response?.data?.message || 'Failed to fetch');
      
    } catch (err) {
      // Don't nuke the whole list on a simple 404 search
      if (err.response?.status === 404) {
        setPokemonList([]);
        setError('No Pokémon found matching your criteria.');
      } else {
        setError(err.message || 'Error communicating with server');
      }
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    // Reset page to 1 whenever filters change
    setPage(1);
    const timeoutId = setTimeout(() => {
      fetchPokemon(1, searchQuery, selectedType, false);
    }, 300); // 300ms debounce on fetching

    return () => clearTimeout(timeoutId);
  }, [fetchPokemon, searchQuery, selectedType]);

  // Load next/prev effect
  useEffect(() => {
    if (page > 1 || (!searchQuery && !selectedType)) {
       fetchPokemon(page, searchQuery, selectedType, false);
    }
  }, [page]); // Notice fetchPokemon is intentionally omitted here to prevent dual-fires on mount

  const loadNextPage = () => setPage((p) => p + 1);
  const loadPreviousPage = () => setPage((p) => Math.max(1, p - 1));

  return { 
    pokemonList, loading, error, page, hasMore, 
    loadNextPage, loadPreviousPage,
    searchQuery, setSearchQuery, selectedType, setSelectedType 
  };
}
