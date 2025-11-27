import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MapLegend = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const legendItems = [
    { label: 'Critical Alert', color: 'var(--color-error)', icon: 'AlertTriangle' },
    { label: 'Warning', color: 'var(--color-warning)', icon: 'AlertCircle' },
    { label: 'Normal', color: 'var(--color-success)', icon: 'CheckCircle' },
    { label: 'Offline', color: 'var(--color-muted-foreground)', icon: 'XCircle' },
    { label: 'Active Work Order', color: 'var(--color-accent)', icon: 'Wrench' },
    { label: 'Scheduled Maintenance', color: 'var(--color-primary)', icon: 'Calendar' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon name="Info" size={18} color="var(--color-primary)" />
          <span className="text-sm font-semibold text-foreground">Legend</span>
        </div>
        <Icon
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          color="var(--color-muted-foreground)"
        />
      </button>
      {isExpanded && (
        <div className="p-3 space-y-2">
          {legendItems?.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <Icon name={item?.icon} size={16} color={item?.color} />
              <span className="text-sm text-foreground">{item?.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapLegend;