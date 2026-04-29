import React, { useEffect, useState } from 'react';
import { pokeApi } from '../../services/api';

export default function PokemonScreenDetails({ pokemonName, isFavorite, onToggleFavorite }) {
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
           
           <div className="flex justify-between items-center z-10 relative shrink-0 h-[10%]">
              <div className="w-32 h-8 bg-black/20 rounded" />
              <div className="w-16 h-6 bg-black/20 rounded" />
           </div>
           
           <div className="h-[45%] flex justify-center items-center relative z-10 shrink-0">
              <div className="w-40 h-40 bg-black/10 rounded-full shadow-inner" />
           </div>
           
           <div className="h-[30%] w-full flex justify-between items-end pb-2 z-10 relative shrink-0">
             <div className="flex gap-2">
               <div className="flex flex-col gap-2">
                 <div className="w-20 h-6 bg-white/20 rounded-full" />
                 <div className="w-24 h-6 bg-white/20 rounded-full" />
               </div>
             </div>
             <div className="flex flex-col gap-2 items-end">
               <div className="w-24 h-5 bg-white/20 rounded" />
               <div className="w-24 h-5 bg-white/20 rounded" />
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
        <div className="w-full h-full flex flex-col p-4 md:p-6">
          {/* Header */}
          <div className="flex justify-between items-center z-10 relative text-[#2a2a2a] shrink-0 h-[10%]">
            <span className="text-2xl md:text-3xl font-bold capitalize tracking-wide font-[var(--font-poppins)] overflow-hidden text-ellipsis whitespace-nowrap mr-2 drop-shadow-md text-white">
              {details.name}
            </span>
            <div className="flex items-center gap-3 shrink-0">
              {/* Metallic Accent ID */}
              <span className="text-xl md:text-2xl font-[var(--font-poppins)] font-black bg-gradient-to-b from-[#e0e0e0] to-[#888888] bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                #{String(details.id).padStart(3, '0')}
              </span>
              <button 
                onClick={() => onToggleFavorite(details.name, details.id)}
                className={`text-2xl md:text-3xl transition-all duration-300 hover:scale-125 active:scale-90 focus:outline-none ${isFavorite ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : 'text-white/40 hover:text-white/80'}`}
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                ★
              </button>
            </div>
          </div>

          {/* Image - Strictly 45% max height */}
          <div className="h-[45%] flex justify-center items-center relative z-10 shrink-0">
            <img 
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(details.id).padStart(3, '0')}.png`} 
              alt={details.name}
              className="w-full h-full object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.4)]"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                 e.target.src = details.sprites.official || details.sprites.front;
              }}
            />
          </div>

          {/* Bottom Data Container - Fixed Flex Row with Glassmorphism */}
          <div className="h-[30%] w-full flex justify-between items-end pb-2 z-10 relative overflow-hidden shrink-0">
            
            {/* Left Side: Pills Stack */}
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                {details.types.slice(0, 2).map((t, i) => (
                  <span key={i} className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full capitalize font-bold shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)] whitespace-nowrap overflow-hidden text-ellipsis text-center text-sm min-w-[70px] max-w-[100px]">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {details.abilities.slice(0, 2).map((a, i) => (
                  <span key={i} className="bg-black/40 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full capitalize font-bold shadow-[0_4px_6px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.2)] whitespace-nowrap overflow-hidden text-ellipsis text-center text-sm min-w-[80px] max-w-[120px]">
                    {a.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side: Stats Stack */}
            <div className="flex flex-col gap-2 text-right justify-end shrink-0 text-white font-semibold text-sm md:text-base">
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
