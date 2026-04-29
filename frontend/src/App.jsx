import React, { useState } from 'react';
import PokedexLayout from './components/layout/PokedexLayout';
import PokemonScreenList from './components/pokemon/PokemonScreenList';
import PokemonScreenDetails from './components/pokemon/PokemonScreenDetails';
import { usePokemonList } from './hooks/usePokemon';
import { useFavorites } from './hooks/useFavorites';

function App() {
  const { 
    pokemonList, loading, error, 
    loadNextPage, loadPreviousPage, page, hasMore,
    searchQuery, setSearchQuery, selectedType, setSelectedType
  } = usePokemonList(1, 20);

  const { isFavorite, toggleFavorite } = useFavorites();
  
  // State for deciding which Pokemon to show on the left screen
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);

  return (
    <>
      <div id="stars" />
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center py-4 px-2 md:px-4">
        
        <PokedexLayout 
          leftContent={
            <PokemonScreenDetails 
              pokemonName={selectedPokemonName}
              isFavorite={selectedPokemonName ? isFavorite(selectedPokemonName) : false}
              onToggleFavorite={toggleFavorite}
            />
          }
          rightContent={
            <PokemonScreenList 
              pokemonList={pokemonList}
              loading={loading}
              error={error}
              onCardClick={(name) => setSelectedPokemonName(name)}
              onNext={loadNextPage}
              onPrev={loadPreviousPage}
              hasMore={hasMore}
              page={page}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              isFavorite={isFavorite}
            />
          }
          LeftHeaderLights={
            // Some extra decorative lights for the header
            <div className="flex gap-2">
               <div className="w-1.5 h-6 bg-black rounded" />
               <div className="w-1.5 h-6 bg-black rounded" />
            </div>
          }
        />
      </div>
    </>
  );
}

export default App;
