import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FloorSelector = ({ selectedFloor, onFloorChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const floors = [
    { id: 'B2', name: 'Basement 2', zones: 12, alerts: 0 },
    { id: 'B1', name: 'Basement 1', zones: 15, alerts: 1 },
    { id: 'G', name: 'Ground Floor', zones: 24, alerts: 3 },
    { id: '1', name: 'First Floor', zones: 28, alerts: 2 },
    { id: '2', name: 'Second Floor', zones: 28, alerts: 0 },
    { id: '3', name: 'Third Floor', zones: 28, alerts: 1 },
    { id: 'R', name: 'Roof', zones: 8, alerts: 0 }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon name="Layers" size={18} color="var(--color-primary)" />
          <span className="text-sm font-semibold text-foreground">Floor Selection</span>
        </div>
        <Icon
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          color="var(--color-muted-foreground)"
        />
      </button>
      {isExpanded && (
        <div className="p-2 space-y-1 max-h-96 overflow-y-auto scrollbar-thin">
          {floors?.map((floor) => (
            <button
              key={floor?.id}
              onClick={() => onFloorChange(floor)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150 ${
                selectedFloor?.id === floor?.id
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                  selectedFloor?.id === floor?.id ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <span className="text-xs font-bold">{floor?.id}</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{floor?.name}</div>
                  <div className="text-xs text-muted-foreground">{floor?.zones} zones</div>
                </div>
              </div>
              {floor?.alerts > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-white bg-error rounded-full">
                  {floor?.alerts}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloorSelector;