import React from 'react';

export default function PokedexLayout({ leftContent, rightContent, LeftHeaderLights }) {
  return (
    <div className="relative z-10 flex flex-col items-center pt-20 pb-10 min-w-[320px] max-w-[1000px] w-full px-4">
      
      {/* Pokedex Title Header */}
      <div className="absolute top-[20%] left-4 xl:left-[-120px] 2xl:left-[-180px] hidden lg:block z-0 pointer-events-none">
        <h5 className="text-5xl font-bold font-mono tracking-[7px] text-white uppercase border-[5px] border-[#1e1f23] p-4 drop-shadow-2xl">
          <span className="block text-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">P</span>
          <span className="block text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">o</span>
          <span className="block text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">k</span>
          <span className="block text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">é</span>
          <span className="block text-white mt-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">d</span>
          <span className="block text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">e</span>
          <span className="block text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">x</span>
        </h5>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-[1100px] h-auto md:h-[600px]">
        
        {/* LEFT CONTAINER */}
        <div className="w-full md:w-1/2 flex border-4 border-black bg-gradient-to-b from-[#231313] via-[#1b1c1c] to-[#231313] relative rounded-b-none md:rounded-bl-3xl md:rounded-tl-3xl z-20 shadow-2xl">
          <div className="w-full h-full flex flex-col">
            
            {/* Top Indicator Section */}
            <div className="h-[50px] shrink-0 border-b-4 border-black flex items-center px-4 bg-gradient-to-r from-[#811414] to-transparent">
              <div className="w-9 h-9 rounded-full bg-blue-500 border-4 border-white shadow-[0_0_5px_rgba(0,0,0,0.5)] mr-6" />
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full border border-black bg-[#a13836]" />
                <div className="w-3 h-3 rounded-full border border-black bg-[#d2d579]" />
                <div className="w-3 h-3 rounded-full border border-black bg-[#459866]" />
              </div>
              <div className="ml-auto">
                {LeftHeaderLights}
              </div>
            </div>

            {/* Main Screen Section */}
            <div className="flex-1 p-6 flex">
              <div className="flex-1 bg-[#DEDEDE] border-4 border-black box-border shadow-[inset_0_0_5px_3px_rgba(0,0,0,0.3)] rounded-lg p-3">
                {leftContent}
              </div>
            </div>
            
          </div>

          {/* Hinge */}
          <div className="hidden md:flex w-[50px] border-l-4 border-black flex-col justify-between h-full bg-gradient-to-r from-[#181616] via-[#240e0f] to-[#171414]">
            <div className="w-full h-[75px] pokedex-hinge border-b-4 border-black shadow-[inset_0_-2px_5px_rgba(0,0,0,0.5)]" />
            <div className="w-full h-[75px] pokedex-hinge border-t-4 border-black shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]" />
          </div>
        </div>

        {/* RIGHT CONTAINER */}
        <div className="w-full md:w-1/2 flex border-4 border-black md:border-l-0 bg-gradient-to-b from-[#231313] via-[#1b1c1c] to-[#231313] rounded-b-3xl md:rounded-br-3xl md:rounded-tr-3xl z-10 shadow-2xl p-6">
           <div className="w-full h-full flex flex-col justify-between">
              {rightContent}
           </div>
        </div>

      </div>
    </div>
  );
}
