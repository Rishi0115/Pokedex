import React from 'react';

export default function PokemonScreenList({ 
  pokemonList, 
  loading, 
  error, 
  onCardClick,
  onNext,
  onPrev,
  hasMore,
  page
}) {

  // We want to force render up to 20 slots to keep the UI dimension consistent.
  const slots = Array.from({ length: 20 });
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Inner Black Box (Screen) */}
      <div className="bg-black shadow-[0_0_2px_2px_rgba(0,0,0,0.3)] flex-1 p-3 rounded-lg overflow-hidden flex flex-col mb-6 mt-2 relative">
        <div className="bg-gradient-to-b from-[#141e30] to-[#243b55] rounded-xl flex-1 flex flex-col flex-wrap p-4 custom-scrollbar overflow-x-hidden content-start pokedex-scroll">
          
          {loading && (
             slots.map((_, i) => (
                <div key={`skeleton-row-${i}`} className="flex items-center text-white h-[25px] overflow-hidden pl-2 w-1/2 rounded font-mono border-b border-white/10 animate-pulse">
                   <div className="w-6 h-3 bg-white/20 rounded mr-2" />
                   <div className="w-20 h-3 bg-white/20 rounded" />
                </div>
             ))
          )}

          {error && !loading && (
             <div className="w-full flex items-center justify-center pt-20 text-red-500 font-bold text-center px-4">
                {error}
             </div>
          )}

          {!loading && !error && pokemonList.length === 0 && (
             <div className="w-full flex items-center justify-center pt-20 text-gray-400 font-mono">
                No Pokémon found.
             </div>
          )}

          {!loading && !error && pokemonList.length > 0 && slots.map((_, i) => {
             const poke = pokemonList[i];
             
             if (!poke) {
               return <div key={`empty-${i}`} className="w-1/2 h-[25px] border-b border-white/5" />;
             }

             // Extract ID roughly from url
             const idMatch = poke.url.match(/\/(\d+)\/?$/);
             const pokemonId = idMatch ? idMatch[1] : '?';

             return (
              <div 
               key={poke.name} 
               onClick={() => onCardClick(poke.name)}
               className="list-item-hover flex items-center text-white cursor-pointer text-xs h-[25px] overflow-hidden pl-2 w-1/2 rounded font-mono truncate border-b border-white/10 transition-colors"
              >
                <span className="mr-2 text-white/50">{pokemonId}.</span>
                <span className="capitalize">{poke.name}</span>
              </div>
             );
          })}

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around mt-auto pb-4 shrink-0">
        <button 
          onClick={onPrev}
          disabled={page <= 1 || loading}
          className="flex items-center justify-center h-[30px] w-[100px] bg-[#1f1c18] text-white border-2 border-black rounded shadow-[0_0_2px_2px_rgba(0,0,0,0.3)] font-bold uppercase tracking-wider text-xs transition-colors hover:bg-[#385a81] active:shadow-[inset_0_0_4px_rgba(0,0,0,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button 
          onClick={onNext}
          disabled={!hasMore || loading}
          className="flex items-center justify-center h-[30px] w-[100px] bg-[#1f1c18] text-white border-2 border-black rounded shadow-[0_0_2px_2px_rgba(0,0,0,0.3)] font-bold uppercase tracking-wider text-xs transition-colors hover:bg-[#385a81] active:shadow-[inset_0_0_4px_rgba(0,0,0,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

    </div>
  );
}
