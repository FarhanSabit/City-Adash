import React from 'react';
import Icon from '../../../components/AppIcon';

const HeatMapOverlay = ({ type, isActive, onToggle }) => {
  const heatMapTypes = {
    energy: {
      name: 'Energy Consumption',
      icon: 'Zap',
      description: 'Shows energy usage patterns across zones'
    },
    traffic: {
      name: 'Traffic Patterns',
      icon: 'Users',
      description: 'Displays foot traffic and occupancy data'
    },
    maintenance: {
      name: 'Maintenance Frequency',
      icon: 'Wrench',
      description: 'Highlights areas requiring frequent maintenance'
    },
    temperature: {
      name: 'Temperature Distribution',
      icon: 'Thermometer',
      description: 'Shows temperature variations across facility'
    }
  };

  const currentType = heatMapTypes?.[type] || heatMapTypes?.energy;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/30">
        <div className="flex items-center gap-2">
          <Icon name="Activity" size={18} color="var(--color-primary)" />
          <span className="text-sm font-semibold text-foreground">Heat Map Analysis</span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {Object.entries(heatMapTypes)?.map(([key, value]) => (
          <button
            key={key}
            onClick={() => onToggle(key)}
            className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all duration-150 ${
              type === key && isActive
                ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted border border-transparent'
            }`}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
              type === key && isActive ? 'bg-primary/20' : 'bg-muted'
            }`}>
              <Icon
                name={value?.icon}
                size={18}
                color={type === key && isActive ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
              />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-foreground">{value?.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{value?.description}</div>
            </div>
            {type === key && isActive && (
              <Icon name="Check" size={16} color="var(--color-primary)" />
            )}
          </button>
        ))}

        {isActive && (
          <div className="pt-3 border-t border-border">
            <div className="text-xs font-medium text-muted-foreground mb-2">Intensity Scale</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Low</span>
              <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-success via-warning to-error" />
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeatMapOverlay;