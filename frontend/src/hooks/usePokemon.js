import { useState, useEffect, useCallback, useRef } from 'react';
import { pokeApi } from '../services/api';

export function usePokemonList(initialPage = 1, limit = 20) {
  const [pokemonList, setPokemonList] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]); // Full unfiltered list for client-side search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  // Search & filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Ref to track if we've already cached the full list for search
  const cachedFullList = useRef([]);

  const fetchPokemon = useCallback(async (currentPage, query, type) => {
    try {
      setLoading(true);
      setError(null);
      
      let fetchedList = [];

      if (type) {
        // Fetch by type
        const response = await pokeApi.getPokemonByType(type);
        if (response.data.success) {
          fetchedList = response.data.data.pokemon;
        } else {
          throw new Error(response?.data?.message || 'Failed to fetch');
        }
      } else if (query) {
        // For search: use cached full list, or fetch a large batch
        if (cachedFullList.current.length === 0) {
          const response = await pokeApi.getPokemonList(1, 200);
          if (response.data.success) {
            cachedFullList.current = response.data.data.pokemon;
          }
        }
        fetchedList = cachedFullList.current;
      } else {
        // Normal paginated fetch
        const response = await pokeApi.getPokemonList(currentPage, limit);
        if (response.data.success) {
          fetchedList = response.data.data.pokemon;
          const currentCount = currentPage * limit;
          setHasMore(currentCount < response.data.data.total);
        } else {
          throw new Error(response?.data?.message || 'Failed to fetch');
        }
      }

      // Apply client-side search filter (prefix match)
      if (query) {
        const q = query.toLowerCase().trim();
        fetchedList = fetchedList.filter(p => p.name.toLowerCase().startsWith(q));
        setHasMore(false);
      }

      if (type) {
        setHasMore(false);
      }

      if (fetchedList.length === 0 && (query || type)) {
        setError('No Pokémon found matching your criteria.');
      }

      setPokemonList(fetchedList);
      setAllPokemon(fetchedList);
      
    } catch (err) {
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

  // Debounced effect: triggers 300ms after user stops typing/changing filters
  useEffect(() => {
    setPage(1);
    const timeoutId = setTimeout(() => {
      fetchPokemon(1, searchQuery, selectedType);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [fetchPokemon, searchQuery, selectedType]);

  // Pagination effect (only for non-search, non-type mode)
  useEffect(() => {
    if (page > 1 && !searchQuery && !selectedType) {
       fetchPokemon(page, '', '');
    }
  }, [page]); // Intentionally omit fetchPokemon to prevent dual-fires

  // Clear cache when search is cleared so fresh data loads
  useEffect(() => {
    if (!searchQuery) {
      cachedFullList.current = [];
    }
  }, [searchQuery]);

  const loadNextPage = () => setPage((p) => p + 1);
  const loadPreviousPage = () => setPage((p) => Math.max(1, p - 1));

  return { 
    pokemonList, loading, error, page, hasMore, 
    loadNextPage, loadPreviousPage,
    searchQuery, setSearchQuery, selectedType, setSelectedType 
  };
}
