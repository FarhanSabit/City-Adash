import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BulkOperationsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [showActionMenu, setShowActionMenu] = useState(false);

  const bulkActions = [
    { value: 'schedule-maintenance', label: 'Schedule Maintenance', icon: 'Wrench' },
    { value: 'update-location', label: 'Update Location', icon: 'MapPin' },
    { value: 'change-status', label: 'Change Status', icon: 'RefreshCw' },
    { value: 'export-data', label: 'Export Selected', icon: 'Download' },
    { value: 'generate-report', label: 'Generate Report', icon: 'FileText' },
    { value: 'assign-technician', label: 'Assign Technician', icon: 'Users' }
  ];

  const handleBulkAction = (action) => {
    onBulkAction(action);
    setShowActionMenu(false);
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 animation-slide-in">
      <div className="bg-card border border-border rounded-lg shadow-lg px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
            <Icon name="CheckSquare" size={16} color="var(--color-primary)" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
          </span>
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              variant="default"
              size="sm"
              iconName="Zap"
              iconPosition="left"
              onClick={() => setShowActionMenu(!showActionMenu)}
            >
              Bulk Actions
            </Button>

            {showActionMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowActionMenu(false)}
                  aria-hidden="true"
                />
                <div className="absolute bottom-full left-0 mb-2 w-64 bg-card border border-border rounded-lg shadow-lg z-20 animation-fade-in">
                  <div className="p-2">
                    {bulkActions?.map((action) => (
                      <button
                        key={action?.value}
                        onClick={() => handleBulkAction(action?.value)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                      >
                        <Icon
                          name={action?.icon}
                          size={16}
                          color="var(--color-muted-foreground)"
                        />
                        <span className="text-sm text-foreground">{action?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearSelection}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkOperationsBar;