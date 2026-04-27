import React from 'react';
import { Search } from 'lucide-react';

const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 
  'dragon', 'dark', 'steel', 'fairy'
];

export default function Filters({ searchQuery, setSearchQuery, selectedType, setSelectedType }) {
  
  // Handling mutual exclusivity (if you search name, we clear type, and vice versa)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    if (selectedType) setSelectedType('');
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    if (searchQuery) setSearchQuery('');
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8">
      
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Search by Pokémon name..."
        />
      </div>

      {/* Type Dropdown */}
      <div className="w-full sm:w-48">
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="block w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer capitalize transition-colors"
        >
          <option value="">All Types</option>
          {POKEMON_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}
