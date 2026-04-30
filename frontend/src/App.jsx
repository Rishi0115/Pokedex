import React, { useState } from 'react';
import PokedexLayout from './components/layout/PokedexLayout';
import PokemonScreenList from './components/pokemon/PokemonScreenList';
import PokemonScreenDetails from './components/pokemon/PokemonScreenDetails';
import LoginScreen from './components/auth/LoginScreen';
import { usePokemonList } from './hooks/usePokemon';
import { useFavorites } from './hooks/useFavorites';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading: authLoading, logout } = useAuth();

  const { 
    pokemonList, loading, error, 
    loadNextPage, loadPreviousPage, page, hasMore,
    searchQuery, setSearchQuery, selectedType, setSelectedType
  } = usePokemonList(1, 20);

  const { isFavorite, toggleFavorite } = useFavorites();
  
  // State for deciding which Pokemon to show on the left screen
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <>
        <div id="stars" />
        <div className="relative z-10 min-h-screen w-full flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-red-500 animate-spin" />
        </div>
      </>
    );
  }

  // Show login screen if not authenticated
  if (!user) {
    return <LoginScreen />;
  }

  return (
    <>
      <div id="stars" />
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center py-4 px-2 md:px-4">
        
        {/* User Info Bar */}
        <div className="w-full max-w-5xl flex justify-end items-center gap-3 mb-2 px-2 animate-fadeSlideIn">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5">
            {user.avatar && (
              <img 
                src={user.avatar} 
                alt={user.displayName} 
                className="w-7 h-7 rounded-full border border-white/20"
                referrerPolicy="no-referrer"
              />
            )}
            <span className="text-white/70 text-xs font-[var(--font-poppins)] font-medium">
              {user.displayName}
            </span>
            <button 
              onClick={logout}
              className="text-white/40 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-colors ml-2"
            >
              Logout
            </button>
          </div>
        </div>

        <PokedexLayout 
          leftContent={
            <PokemonScreenDetails 
              pokemonName={selectedPokemonName}
              isFavorite={selectedPokemonName ? isFavorite(selectedPokemonName) : false}
              onToggleFavorite={toggleFavorite}
              onClose={() => setSelectedPokemonName(null)}
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
