import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const LayerControls = ({ activeLayers, onLayerToggle }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const layers = [
    { id: 'equipment', name: 'Equipment', icon: 'Cpu', count: 156 },
    { id: 'workOrders', name: 'Work Orders', icon: 'ClipboardList', count: 12 },
    { id: 'sensors', name: 'IoT Sensors', icon: 'Radio', count: 89 },
    { id: 'security', name: 'Security Cameras', icon: 'Camera', count: 34 },
    { id: 'hvac', name: 'HVAC Systems', icon: 'Wind', count: 28 },
    { id: 'electrical', name: 'Electrical Panels', icon: 'Zap', count: 45 },
    { id: 'plumbing', name: 'Plumbing', icon: 'Droplet', count: 67 },
    { id: 'fire', name: 'Fire Safety', icon: 'Flame', count: 52 }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon name="Eye" size={18} color="var(--color-primary)" />
          <span className="text-sm font-semibold text-foreground">Map Layers</span>
        </div>
        <Icon
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          color="var(--color-muted-foreground)"
        />
      </button>
      {isExpanded && (
        <div className="p-3 space-y-2 max-h-96 overflow-y-auto scrollbar-thin">
          {layers?.map((layer) => (
            <div
              key={layer?.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                checked={activeLayers?.includes(layer?.id)}
                onChange={(e) => onLayerToggle(layer?.id, e?.target?.checked)}
                label={
                  <div className="flex items-center gap-2">
                    <Icon
                      name={layer?.icon}
                      size={16}
                      color={activeLayers?.includes(layer?.id) ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                    />
                    <span className="text-sm font-medium">{layer?.name}</span>
                  </div>
                }
              />
              <span className="text-xs text-muted-foreground ml-2">{layer?.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LayerControls;