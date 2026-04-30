import React, { useState, useRef, useEffect } from 'react';

// Helper to extract Pokémon ID from its PokeAPI URL or fallback to index
function getPokemonId(poke, fallbackIndex) {
  if (poke.url) {
    const match = poke.url.match(/\/(\d+)\/?$/);
    if (match) return match[1];
  }
  if (poke.id) return String(poke.id);
  if (poke.pokemonId) return String(poke.pokemonId);
  return String(fallbackIndex);
}

export default function PokemonScreenList({
  pokemonList,
  loading,
  error,
  onCardClick,
  onNext,
  onPrev,
  hasMore,
  page,
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  isFavorite
}) {
  // We want to force render up to 20 slots to keep the UI dimension consistent.
  const slots = Array.from({ length: 20 });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pokemonTypes = [
    { value: '', label: 'ALL TYPES' },
    { value: 'fire', label: 'FIRE' },
    { value: 'water', label: 'WATER' },
    { value: 'grass', label: 'GRASS' },
    { value: 'electric', label: 'ELECTRIC' },
    { value: 'psychic', label: 'PSYCHIC' },
    { value: 'ice', label: 'ICE' },
    { value: 'dragon', label: 'DRAGON' },
    { value: 'dark', label: 'DARK' },
    { value: 'fairy', label: 'FAIRY' },
    { value: 'normal', label: 'NORMAL' },
    { value: 'fighting', label: 'FIGHTING' },
    { value: 'flying', label: 'FLYING' },
    { value: 'poison', label: 'POISON' },
    { value: 'ground', label: 'GROUND' },
    { value: 'rock', label: 'ROCK' },
    { value: 'bug', label: 'BUG' },
    { value: 'ghost', label: 'GHOST' },
    { value: 'steel', label: 'STEEL' }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden items-center justify-center">

      {/* Inner Screen - Fills available height */}
      <div className="w-full max-w-[480px] flex-1 min-h-0 bg-black p-3 md:p-5 rounded-md overflow-hidden flex flex-col mt-2 mb-4 relative gap-3">

        {/* Controls Row - Styled as Hardware Buttons */}
        <div className="flex justify-between items-center shrink-0 w-full pr-1 pb-1 gap-2 md:gap-3">
          <input
            type="text"
            placeholder="SEARCH..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="flex-1 min-w-0 bg-[#111] text-white px-3 py-1.5 rounded border-2 border-black shadow-[0_4px_0_#000] focus:outline-none focus:translate-y-1 focus:shadow-none transition-all uppercase tracking-widest font-bold font-[var(--font-poppins)] text-[11px] md:text-xs placeholder-gray-500"
          />
          <div className="relative shrink-0 min-w-[120px]" ref={dropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#111] hover:bg-[#222] text-white pl-2 pr-8 py-1.5 rounded border-2 border-black shadow-[0_4px_0_#000] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest font-bold font-[var(--font-poppins)] text-[11px] md:text-xs cursor-pointer select-none flex items-center justify-between"
            >
              <span className="truncate">{pokemonTypes.find(t => t.value === (selectedType || ''))?.label || 'ALL TYPES'}</span>
              <svg className={`fill-current h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} absolute right-2 text-white/70`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
            
            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-2 bg-[#1a2b3c] border-2 border-black rounded-md shadow-xl max-h-48 overflow-y-auto pokedex-scroll transform origin-top animate-fadeSlideIn">
                <div className="flex flex-col p-1 gap-0.5">
                  {pokemonTypes.map((type) => (
                    <div
                      key={type.value}
                      onClick={() => {
                        setSelectedType && setSelectedType(type.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-2 py-1.5 text-[10px] md:text-xs font-bold font-[var(--font-poppins)] uppercase tracking-widest cursor-pointer rounded transition-colors flex items-center justify-between ${
                        (selectedType || '') === type.value 
                          ? 'bg-yellow-400 text-black' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {type.label}
                      {(selectedType || '') === type.value && (
                        <span className="text-[10px] ml-2">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pokemon Grid */}
        <div key={page} className="bg-[#1a2b3c] border-[4px] border-[#0a1118] rounded-2xl flex-1 grid grid-flow-col grid-cols-2 grid-rows-10 gap-x-1 gap-y-0 px-3 md:px-4 py-2 md:py-3 overflow-hidden text-white font-[var(--font-poppins)] justify-items-start content-evenly shadow-inner animate-pageSlideIn">

          {loading && (
            slots.map((_, i) => (
              <div key={`skeleton-row-${i}`} className="flex items-center w-full h-[30px] overflow-hidden pl-1 rounded animate-pulse">
                <div className="w-[24px] h-[24px] bg-white/10 rounded-full mr-1.5 shrink-0" />
                <div className="w-16 h-3 bg-white/15 rounded" />
              </div>
            ))
          )}

          {error && !loading && (
            <div className="col-span-2 row-span-10 flex items-center justify-center text-red-500 font-bold text-center px-4 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && pokemonList.length === 0 && (
            <div className="col-span-2 row-span-10 flex items-center justify-center text-gray-400 font-mono text-sm">
              No Pokémon found.
            </div>
          )}

          {!loading && !error && pokemonList.length > 0 && slots.map((_, i) => {
            const poke = pokemonList[i];

            if (!poke) {
              return <div key={`empty-${i}`} className="h-[30px]" />;
            }

            const pokeId = getPokemonId(poke, ((page - 1) * 20) + i + 1);
            const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;

            return (
              <div
                key={poke.name}
                onClick={() => onCardClick(poke.name)}
                className="flex items-center text-white hover:text-yellow-300 hover:bg-white/10 cursor-pointer text-[11px] md:text-xs h-[30px] overflow-hidden pl-0.5 pr-1 rounded-md w-full transition-all group animate-listRow hover:-translate-y-0.5"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <img
                  src={spriteUrl}
                  alt={poke.name}
                  width="24"
                  height="24"
                  className="w-[24px] h-[24px] shrink-0 mr-1 object-contain image-rendering-pixelated opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.target.style.visibility = 'hidden'; }}
                />
                <span className="capitalize font-semibold whitespace-nowrap drop-shadow-sm truncate">
                  {poke.name.replace(/-/g, ' ')}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-12 shrink-0 pb-2">
        <button
          onClick={onPrev}
          disabled={page <= 1 || loading}
          className="bg-[#111] hover:bg-[#222] disabled:opacity-50 text-white font-bold py-2 px-8 rounded-md border-2 border-black shadow-[0_4px_0_#000] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest text-sm"
        >
          Prev
        </button>
        <button
          onClick={onNext}
          disabled={!hasMore || loading}
          className="bg-[#111] hover:bg-[#222] disabled:opacity-50 text-white font-bold py-2 px-8 rounded-md border-2 border-black shadow-[0_4px_0_#000] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest text-sm"
        >
          Next
        </button>
      </div>

    </div>
  );
}
