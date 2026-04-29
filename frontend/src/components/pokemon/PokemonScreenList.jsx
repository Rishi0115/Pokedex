import React from 'react';

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

  return (
    <div className="flex flex-col h-full overflow-hidden items-center justify-center">

      {/* Inner Screen */}
      <div className="w-full max-w-[450px] aspect-[1.1] bg-black p-4 md:p-6 rounded-md overflow-hidden flex flex-col mb-6 mt-2 relative gap-3">

        {/* Controls Row - Styled as Hardware Buttons */}
        <div className="flex justify-between items-center shrink-0 w-full pr-1 pb-1 gap-2 md:gap-3">
          <input
            type="text"
            placeholder="SEARCH..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="flex-1 min-w-0 bg-[#111] text-white px-3 py-1.5 rounded border-2 border-black shadow-[0_4px_0_#000] focus:outline-none focus:translate-y-1 focus:shadow-none transition-all uppercase tracking-widest font-bold font-[var(--font-poppins)] text-[11px] md:text-xs placeholder-gray-500"
          />
          <div className="relative shrink-0 min-w-fit">
            <select
              value={selectedType || ''}
              onChange={(e) => setSelectedType && setSelectedType(e.target.value)}
              className="w-full bg-[#111] hover:bg-[#222] text-white pl-2 pr-8 py-1.5 rounded border-2 border-black shadow-[0_4px_0_#000] focus:outline-none focus:translate-y-1 focus:shadow-none transition-all uppercase tracking-widest font-bold font-[var(--font-poppins)] text-[11px] md:text-xs cursor-pointer appearance-none"
            >
              <option value="">ALL TYPES</option>
              <option value="fire">FIRE</option>
              <option value="water">WATER</option>
              <option value="grass">GRASS</option>
              <option value="electric">ELECTRIC</option>
              <option value="psychic">PSYCHIC</option>
              <option value="ice">ICE</option>
              <option value="dragon">DRAGON</option>
              <option value="dark">DARK</option>
              <option value="fairy">FAIRY</option>
              <option value="normal">NORMAL</option>
              <option value="fighting">FIGHTING</option>
              <option value="flying">FLYING</option>
              <option value="poison">POISON</option>
              <option value="ground">GROUND</option>
              <option value="rock">ROCK</option>
              <option value="bug">BUG</option>
              <option value="ghost">GHOST</option>
              <option value="steel">STEEL</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-white/70">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-[#1a2b3c] border-[4px] border-[#0a1118] rounded-2xl flex-1 grid grid-flow-col grid-cols-2 grid-rows-10 gap-x-2 md:gap-x-4 gap-y-2 px-2 md:px-4 py-3 md:py-4 overflow-hidden text-white font-[var(--font-poppins)] justify-items-start content-evenly">

          {loading && (
            slots.map((_, i) => (
              <div key={`skeleton-row-${i}`} className="flex items-center text-white h-[24px] overflow-hidden pl-2 rounded text-sm animate-pulse">
                <div className="w-5 h-2.5 bg-white/20 rounded mr-2" />
                <div className="w-20 h-2.5 bg-white/20 rounded" />
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
              return <div key={`empty-${i}`} className="h-[24px]" />;
            }

            // Use the actual index based on page offset to match the screenshot "1. Bulbasaur"
            const displayId = ((page - 1) * 20) + i + 1;

            return (
              <div
                key={poke.name}
                onClick={() => onCardClick(poke.name)}
                className="flex items-center text-white hover:text-yellow-300 cursor-pointer text-[11px] md:text-xs h-[24px] overflow-hidden pl-1 rounded w-full transition-colors"
              >
                <span className="mr-1 md:mr-2 font-semibold w-[20px] md:w-[24px] shrink-0 inline-block">{displayId}.</span>
                <span className="capitalize font-medium whitespace-nowrap tracking-wide">{poke.name.replace(/-/g, ' ')}</span>
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
