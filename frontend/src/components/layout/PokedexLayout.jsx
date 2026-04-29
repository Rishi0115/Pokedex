import React from 'react';
import { Home } from 'lucide-react';

export default function PokedexLayout({ leftContent, rightContent, LeftHeaderLights }) {
  return (
    <div className="pokedex-outer-wrapper relative">

      {/* Peeking Charizard */}
      <div className="absolute top-[-80px] right-[20px] lg:right-[40px] xl:right-[100px] z-0 pointer-events-none transform rotate-[15deg]">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
          alt="Charizard peeking"
          className="w-48 h-48 object-contain drop-shadow-xl"
        />
      </div>

      <div className="pokedex-main-shell relative z-10 !border-[8px] !border-[#2a1717] !rounded-xl !bg-[#361f1f] shadow-2xl">

        {/* LEFT CONTAINER */}
        <div className="pokedex-left-panel !border-0 !bg-transparent !shadow-none !rounded-none w-full md:w-1/2 flex flex-col relative z-20">
          <div className="w-full h-full flex flex-col border-r-[4px] border-[#1a1111]">

            {/* Top Indicator Section */}
            <div className="h-[60px] shrink-0 border-b-[4px] border-[#1a1111] flex items-center px-4 bg-[#361f1f] rounded-tl-xl">

              {/* Custom Pill Indicator */}
              <div className="w-[18px] h-[34px] bg-[#e0e0e0] rounded-[10px] flex flex-col items-center justify-start pt-1 border border-[#1a1111] shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.4)] mr-6 relative overflow-hidden">
                <div className="w-[10px] h-[10px] bg-[#4285F4] rounded-full border border-[#1a1111] shadow-inner mt-0.5" />
                <div className="w-[8px] h-[2px] bg-black opacity-30 mt-2 rounded" />
              </div>

              {/* Three dots */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E53935] shadow-inner border border-[#1a1111]" />
                <div className="w-3 h-3 rounded-full bg-[#FDD835] shadow-inner border border-[#1a1111]" />
                <div className="w-3 h-3 rounded-full bg-[#43A047] shadow-inner border border-[#1a1111]" />
              </div>
              <div className="ml-auto">
                {LeftHeaderLights}
              </div>
            </div>

            {/* Main Screen Section */}
            <div className="flex-1 p-4 md:p-8 flex items-center justify-center min-h-0 bg-[#361f1f] rounded-bl-xl overflow-hidden">
              {/* White outer frame, black inner frame - SCALED TO FIT */}
              <div className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-[340px] aspect-[4/5] min-w-0 min-h-0 flex-shrink-0 bg-[#f0f0f0] border-[8px] md:border-[10px] border-[#f0f0f0] shadow-[0_0_0_6px_#111] md:shadow-[0_0_0_8px_#111] rounded-sm flex items-center justify-center box-border overflow-hidden">
                <div className="w-full h-full bg-[#111] flex items-center justify-center overflow-hidden">
                  {leftContent}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Hinge */}
        <div className="pokedex-hinge-column !bg-[#3d1f1f] border-l-[4px] border-r-[4px] border-[#1a1111] hidden md:flex w-[40px] flex-col justify-between h-full relative z-10">
          <div className="w-full h-[60px] bg-[#2a1717] border-b-[4px] border-[#1a1111] shadow-[inset_0_-2px_5px_rgba(0,0,0,0.5)]" />
          <div className="w-full h-[60px] bg-[#2a1717] border-t-[4px] border-[#1a1111] shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]" />
        </div>

        {/* RIGHT CONTAINER */}
        <div className="pokedex-right-panel !border-0 !bg-[#361f1f] !shadow-none !rounded-none w-full md:w-1/2 flex flex-col relative z-20 rounded-r-xl">
          <div className="w-full h-full flex flex-col justify-between p-6 md:p-8">
            {rightContent}
          </div>
        </div>

      </div>

      {/* Home Icon */}
      <div className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-110 transition-transform">
        <Home className="w-10 h-10 text-white drop-shadow-lg" />
      </div>

    </div>
  );
}
