import React, { useState } from 'react';
import Icon from '../AppIcon';

const FacilitySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState({
    id: 'FAC-001',
    name: 'Main Campus',
    location: 'Building A',
  });

  const facilities = [
    { id: 'FAC-001', name: 'Main Campus', location: 'Building A' },
    { id: 'FAC-002', name: 'North Wing', location: 'Building B' },
    { id: 'FAC-003', name: 'South Complex', location: 'Building C' },
    { id: 'FAC-004', name: 'East Facility', location: 'Building D' },
  ];

  const handleFacilityChange = (facility) => {
    setSelectedFacility(facility);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-all duration-150"
        aria-label="Select facility"
        aria-expanded={isOpen}
      >
        <Icon name="Building2" size={20} color="var(--color-primary)" />
        <div className="hidden md:flex flex-col items-start">
          <span className="text-xs text-muted-foreground">Facility</span>
          <span className="text-sm font-medium text-foreground">
            {selectedFacility?.name}
          </span>
        </div>
        <Icon
          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          color="var(--color-muted-foreground)"
        />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-20 animation-fade-in">
            <div className="p-2">
              {facilities?.map((facility) => (
                <button
                  key={facility?.id}
                  onClick={() => handleFacilityChange(facility)}
                  className={`w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-150 ${
                    selectedFacility?.id === facility?.id
                      ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
                  }`}
                >
                  <Icon
                    name="Building2"
                    size={18}
                    color={
                      selectedFacility?.id === facility?.id
                        ? 'var(--color-primary)'
                        : 'var(--color-muted-foreground)'
                    }
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{facility?.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {facility?.location}
                    </div>
                  </div>
                  {selectedFacility?.id === facility?.id && (
                    <Icon name="Check" size={16} color="var(--color-primary)" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FacilitySelector;