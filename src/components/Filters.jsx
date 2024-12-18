import React, { useState } from 'react';
import { Star, Euro } from 'lucide-react';

const priceRanges = [
  { label: '€', value: 1 },
  { label: '€€', value: 2 },
  { label: '€€€', value: 3 },
  { label: '€€€€', value: 4 }
];

const ratings = [
  { label: '4.5+', value: 4.5 },
  { label: '4.0+', value: 4.0 },
  { label: '3.5+', value: 3.5 }
];

const cuisineTypes = [
  'Gastronomique',
  'Traditionnel',
  'Bistronomique',
  'Moderne',
  'Fusion'
];

const Filters = ({ onFilterChange }) => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePriceClick = (price) => {
    const newPrice = selectedPrice === price ? null : price;
    setSelectedPrice(newPrice);
    updateFilters({ price: newPrice });
  };

  const handleRatingClick = (rating) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
    updateFilters({ rating: newRating });
  };

  const handleCuisineClick = (cuisine) => {
    const newCuisine = selectedCuisine === cuisine ? null : cuisine;
    setSelectedCuisine(newCuisine);
    updateFilters({ cuisine: newCuisine });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateFilters({ search: value });
  };

  const updateFilters = (newFilter) => {
    onFilterChange({
      price: newFilter.hasOwnProperty('price') ? newFilter.price : selectedPrice,
      rating: newFilter.hasOwnProperty('rating') ? newFilter.rating : selectedRating,
      cuisine: newFilter.hasOwnProperty('cuisine') ? newFilter.cuisine : selectedCuisine,
      search: newFilter.hasOwnProperty('search') ? newFilter.search : searchTerm
    });
  };

  const resetFilters = () => {
    setSelectedPrice(null);
    setSelectedRating(null);
    setSelectedCuisine(null);
    setSearchTerm('');
    onFilterChange({
      price: null,
      rating: null,
      cuisine: null,
      search: ''
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un restaurant..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filtres de prix */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-gray-700">Prix</h3>
        <div className="flex gap-2">
          {priceRanges.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handlePriceClick(value)}
              className={`flex items-center px-3 py-1 rounded-full border ${
                selectedPrice === value
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
            >
              <Euro className="w-4 h-4 mr-1" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtres de note */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-gray-700">Note minimum</h3>
        <div className="flex gap-2">
          {ratings.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleRatingClick(value)}
              className={`flex items-center px-3 py-1 rounded-full border ${
                selectedRating === value
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
            >
              <Star className="w-4 h-4 mr-1" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Types de cuisine */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-gray-700">Type de cuisine</h3>
        <div className="flex flex-wrap gap-2">
          {cuisineTypes.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => handleCuisineClick(cuisine)}
              className={`px-3 py-1 rounded-full border ${
                selectedCuisine === cuisine
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Bouton de réinitialisation */}
      {(selectedPrice || selectedRating || selectedCuisine || searchTerm) && (
        <button
          onClick={resetFilters}
          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
};

export default Filters;