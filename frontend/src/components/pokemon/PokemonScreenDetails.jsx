import React, { useEffect, useState } from 'react';
import { pokeApi } from '../../services/api';

export default function PokemonScreenDetails({ pokemonName, isFavorite, onToggleFavorite, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonName) {
      setDetails(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await pokeApi.getPokemonDetails(pokemonName);
        if (res.data.success) {
          setDetails(res.data.data);
        } else {
          throw new Error('Failed to fetch details');
        }
      } catch (err) {
        setError('Could not load Pokémon details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemonName]);

  // The outer screen wrapper logic
  const mainScreenTypeClass = details && details.types.length > 0 
    ? `type-bg-${details.types[0]}` 
    : 'bg-[#2a2a2a]'; // Dark default

  return (
    <div className={`w-full h-full flex flex-col justify-between overflow-hidden relative ${mainScreenTypeClass}`}>
      
      {/* If nothing selected */}
      {!pokemonName && !loading && (
        <div className="w-full h-full flex items-center justify-center text-center p-4">
           <p className="text-white/60 font-mono tracking-widest animate-pulse text-lg">Select a Pokémon</p>
        </div>
      )}

      {/* Loading indicator - Modern Shimmer Skeleton */}
      {loading && (
        <div className="w-full h-full flex flex-col p-4 md:p-6 relative overflow-hidden">
           {/* Shimmer Overlay */}
           <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite] z-20 pointer-events-none" />
           
           {/* Header: Name + Star (no ID) */}
           <div className="flex justify-between items-center z-10 relative shrink-0 h-[10%]">
              <div className="w-36 h-8 bg-white/15 rounded" />
              <div className="w-8 h-8 bg-white/10 rounded-full" />
           </div>
           
           {/* Image placeholder - 55% */}
           <div className="h-[55%] flex justify-center items-center relative z-10 shrink-0">
              <div className="w-44 h-44 bg-black/10 rounded-full shadow-inner" />
           </div>
           
           {/* Bottom: Capsule pills left, Square stats right */}
           <div className="h-[30%] w-full flex justify-between items-end pb-2 z-10 relative shrink-0">
             {/* Left: Capsule pill placeholders in a column */}
             <div className="flex flex-col gap-1.5 justify-end">
               <div className="w-16 h-6 bg-white/15 rounded-full" />
               <div className="w-20 h-6 bg-white/15 rounded-full" />
               <div className="w-24 h-6 bg-white/10 rounded-full" />
               <div className="w-20 h-6 bg-white/10 rounded-full" />
             </div>
             {/* Right: Square stat box placeholders */}
             <div className="flex flex-col gap-2 items-end">
               <div className="w-20 h-10 bg-white/10 rounded-lg" />
               <div className="w-20 h-10 bg-white/10 rounded-lg" />
             </div>
           </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="w-full h-full flex items-center justify-center text-center p-4">
           <p className="text-red-900 font-bold uppercase">{error}</p>
        </div>
      )}

      {/* Detail State */}
      {details && !loading && !error && (
        <div key={details.name} className="w-full h-full flex flex-col p-4 md:p-6 animate-fadeSlideIn">
          {/* Header - Name + Favorite + Close */}
          <div className="flex justify-between items-center z-10 relative shrink-0 h-[10%]">
            <span className="text-2xl md:text-3xl font-bold capitalize tracking-wide font-[var(--font-poppins)] drop-shadow-md text-white">
              {details.name.replace(/-/g, ' ')}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => onToggleFavorite(details.name, details.id)}
                className={`text-2xl md:text-3xl transition-all duration-300 hover:scale-125 active:scale-90 focus:outline-none shrink-0 ${isFavorite ? 'text-yellow-400 animate-pulseGlow' : 'text-white/40 hover:text-white/80'}`}
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                ★
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-red-400 text-xl md:text-2xl font-bold transition-all duration-200 hover:scale-110 active:scale-90 focus:outline-none shrink-0 leading-none"
                  title="Close detail view"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Image - Fills more space */}
          <div className="h-[55%] flex justify-center items-center relative z-10 shrink-0">
            <img 
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(details.id).padStart(3, '0')}.png`} 
              alt={details.name}
              className="w-full h-full object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.4)] animate-scaleIn"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                 e.target.src = details.sprites.official || details.sprites.front;
              }}
            />
          </div>

          {/* Bottom Data Container */}
          <div className="h-[30%] w-full flex justify-between items-end pb-2 z-10 relative overflow-hidden shrink-0">
            
            {/* Left Side: Capsule Pills - Types + Abilities in a single column */}
            <div className="flex flex-col gap-1.5 justify-end">
              {details.types.slice(0, 2).map((t, i) => (
                <span key={`type-${i}`} className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full capitalize font-bold shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)] whitespace-nowrap text-center text-xs">
                  {t}
                </span>
              ))}
              {details.abilities.slice(0, 2).map((a, i) => (
                <span key={`ability-${i}`} className="bg-black/40 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full capitalize font-bold shadow-[0_4px_6px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.2)] whitespace-nowrap text-center text-xs">
                  {a.replace(/-/g, ' ')}
                </span>
              ))}
            </div>

            {/* Right Side: Square Stat Boxes */}
            <div className="flex flex-col gap-2 text-right justify-end shrink-0 text-white font-semibold text-sm">
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-lg shadow-lg">
                <span className="opacity-80 text-xs uppercase tracking-wider block leading-tight">Weight</span>
                <span className="block leading-tight drop-shadow-md">{details.weight}</span>
              </div>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-lg shadow-lg">
                <span className="opacity-80 text-xs uppercase tracking-wider block leading-tight">Height</span>
                <span className="block leading-tight drop-shadow-md">{details.height}</span>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
