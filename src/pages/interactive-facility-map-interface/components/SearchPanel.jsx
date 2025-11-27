import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchPanel = ({ onSearchResult }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockSearchData = [
    { id: 1, type: 'equipment', name: 'HVAC Unit A-101', location: 'Ground Floor - Zone A', icon: 'Wind' },
    { id: 2, type: 'equipment', name: 'Electrical Panel EP-205', location: 'Second Floor - Zone B', icon: 'Zap' },
    { id: 3, type: 'room', name: 'Conference Room 3A', location: 'Third Floor - East Wing', icon: 'DoorOpen' },
    { id: 4, type: 'sensor', name: 'Temperature Sensor TS-089', location: 'First Floor - Zone C', icon: 'Thermometer' },
    { id: 5, type: 'equipment', name: 'Fire Alarm Panel FA-012', location: 'Ground Floor - Main Lobby', icon: 'Flame' }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    setTimeout(() => {
      if (query?.trim()) {
        const filtered = mockSearchData?.filter(item =>
          item?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item?.location?.toLowerCase()?.includes(query?.toLowerCase())
        );
        setSearchResults(filtered);
      } else {
        setSearchResults([]);
      }
      setIsSearching(false);
    }, 300);
  };

  const handleResultClick = (result) => {
    onSearchResult(result);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search equipment, rooms, or assets..."
        value={searchQuery}
        onChange={(e) => handleSearch(e?.target?.value)}
        className="w-full"
      />
      {(searchResults?.length > 0 || isSearching) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto scrollbar-thin">
          {isSearching ? (
            <div className="flex items-center justify-center py-8">
              <Icon name="Loader2" size={24} color="var(--color-primary)" className="animate-spin" />
            </div>
          ) : searchResults?.length > 0 ? (
            <div className="p-2">
              {searchResults?.map((result) => (
                <button
                  key={result?.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <Icon name={result?.icon} size={18} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{result?.name}</div>
                    <div className="text-xs text-muted-foreground">{result?.location}</div>
                  </div>
                  <Icon name="ArrowRight" size={16} color="var(--color-muted-foreground)" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
              <p className="mt-2 text-sm text-muted-foreground">No results found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPanel;