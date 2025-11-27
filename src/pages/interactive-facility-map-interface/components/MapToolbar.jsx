import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapToolbar = ({ onToolSelect, activeTool, onCreateWorkOrder }) => {
  const tools = [
    { id: 'select', icon: 'MousePointer', label: 'Select' },
    { id: 'measure', icon: 'Ruler', label: 'Measure' },
    { id: 'annotate', icon: 'PenTool', label: 'Annotate' },
    { id: 'search', icon: 'Search', label: 'Search' }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
      <div className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg shadow-lg">
        <div className="flex items-center gap-1 pr-3 border-r border-border">
          {tools?.map((tool) => (
            <button
              key={tool?.id}
              onClick={() => onToolSelect(tool?.id)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150 ${
                activeTool === tool?.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
              title={tool?.label}
            >
              <Icon
                name={tool?.icon}
                size={18}
                color={activeTool === tool?.id ? 'var(--color-primary-foreground)' : 'currentColor'}
              />
            </button>
          ))}
        </div>

        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={onCreateWorkOrder}
        >
          Create Work Order
        </Button>

        <div className="flex items-center gap-1 pl-3 border-l border-border">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
            title="Zoom In"
          >
            <Icon name="ZoomIn" size={18} color="var(--color-muted-foreground)" />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
            title="Zoom Out"
          >
            <Icon name="ZoomOut" size={18} color="var(--color-muted-foreground)" />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
            title="Reset View"
          >
            <Icon name="Maximize2" size={18} color="var(--color-muted-foreground)" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapToolbar;