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
    : 'bg-black';

  return (
    <div className={`w-full h-full p-3 rounded-xl flex flex-col justify-between transition-colors duration-500 relative overflow-hidden ${mainScreenTypeClass}`}>
      
      {/* If nothing selected */}
      {!pokemonName && !loading && (
        <div className="w-full h-full flex items-center justify-center text-center p-4">
           <p className="text-gray-400 font-mono tracking-widest animate-pulse">Select a Pokémon from the list</p>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="w-full h-full flex flex-col justify-between animate-pulse">
           {/* Header Skeleton */}
           <div className="flex justify-between items-center z-10 relative">
              <div className="w-32 h-8 bg-white/20 rounded" />
              <div className="flex items-center gap-3">
                 <div className="w-12 h-6 bg-white/20 rounded" />
                 <div className="w-8 h-8 rounded-full bg-white/20" />
              </div>
           </div>
           
           {/* Image Skeleton */}
           <div className="flex-1 flex justify-center items-center py-2 relative z-10">
              <div className="w-36 h-36 bg-white/10 rounded-full" />
           </div>

           {/* Bottom Skeleton */}
           <div className="flex flex-col gap-2 relative z-10">
              <div className="flex justify-between gap-2">
                 <div className="flex-1 flex flex-col gap-2">
                    <div className="h-6 bg-white/20 rounded-full" />
                 </div>
                 <div className="flex-1 flex flex-col gap-2">
                    <div className="h-6 bg-white/20 rounded-full" />
                    <div className="h-6 bg-white/20 rounded-full" />
                 </div>
              </div>
              <div className="w-full h-16 bg-white/10 rounded-xl mt-2" />
           </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="w-full h-full flex items-center justify-center text-center p-4">
           <p className="text-red-400 font-mono font-bold uppercase">{error}</p>
        </div>
      )}

      {/* Detail State */}
      {details && !loading && !error && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center z-10 relative">
            <span className="text-white text-2xl font-bold font-[var(--font-nova)] uppercase tracking-wider">
              {details.name}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-white/70 text-xl font-[var(--font-merienda)] drop-shadow">
                #{String(details.id).padStart(3, '0')}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(details.name, details.id);
                }}
                className={`flex items-center justify-center p-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all ${isFavorite ? 'bg-white/20' : 'bg-black/30 hover:bg-white/10'}`}
              >
                <svg className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-400 fill-red-400' : 'text-gray-300 fill-transparent'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center items-center py-2 relative z-10">
            <img 
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(details.id).padStart(3, '0')}.png`} 
              alt={details.name}
              className="w-36 h-36 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
              onError={(e) => {
                 /* fallback to official sprite if custom 3D sprite fails */
                 e.target.src = details.sprites.official || details.sprites.front;
              }}
            />
          </div>

          {/* Bottom Data Container */}
          <div className="flex flex-col gap-2 relative z-10 shrink-0 h-[150px]">
            {/* Types and Abilities */}
            <div className="flex justify-between gap-2 h-[70px]">
              <div className="flex-1 flex flex-col gap-1.5 h-full overflow-hidden">
                {details.types.map(t => (
                  <span key={t} className="bg-white/30 backdrop-blur-sm rounded-full py-1 text-center font-[var(--font-merienda)] text-sm shadow-sm capitalize truncate px-2 min-h-[28px] leading-tight">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-1.5 h-full overflow-hidden">
                {details.abilities.slice(0, 2).map((a) => (
                  <span key={a} className="bg-black/30 backdrop-blur-sm rounded-full py-1 text-center font-[var(--font-merienda)] text-sm shadow-sm text-white/90 capitalize truncate px-2 min-h-[28px] leading-tight">
                    {a.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Height / Weight Data */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center mt-auto font-[var(--font-nova)] border border-white/10 shrink-0 h-[70px] flex flex-col justify-center">
              <div className="flex justify-around items-center">
                <div>
                  <p className="text-white/60 text-[10px] tracking-wider uppercase mb-0.5 drop-shadow-md">Weight</p>
                  <p className="text-lg font-bold drop-shadow-md leading-none">{details.weight / 10} kg</p>
                </div>
                <div className="w-[1px] h-8 bg-white/20" />
                <div>
                   <p className="text-white/60 text-[10px] tracking-wider uppercase mb-0.5 drop-shadow-md">Height</p>
                   <p className="text-lg font-bold drop-shadow-md leading-none">{details.height / 10} m</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
