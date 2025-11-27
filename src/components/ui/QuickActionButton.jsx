import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getContextActions = () => {
    const path = location?.pathname;
    
    if (path?.includes('work-order')) {
      return [
        { label: 'New Work Order', icon: 'Plus', action: 'create-work-order' },
        { label: 'Emergency Request', icon: 'AlertTriangle', action: 'emergency' },
      ];
    }
    
    if (path?.includes('ticket')) {
      return [
        { label: 'Submit Ticket', icon: 'Plus', action: 'create-ticket' },
        { label: 'Report Issue', icon: 'AlertCircle', action: 'report-issue' },
      ];
    }
    
    if (path?.includes('asset')) {
      return [
        { label: 'Add Asset', icon: 'Plus', action: 'add-asset' },
        { label: 'Schedule Maintenance', icon: 'Calendar', action: 'schedule' },
      ];
    }

    return [
      { label: 'New Work Order', icon: 'Plus', action: 'create-work-order' },
      { label: 'Submit Ticket', icon: 'Ticket', action: 'create-ticket' },
      { label: 'Emergency Alert', icon: 'AlertTriangle', action: 'emergency' },
    ];
  };

  const handleAction = (action) => {
    console.log('Quick action:', action);
    setIsOpen(false);
  };

  const actions = getContextActions();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute bottom-16 right-0 w-56 bg-card border border-border rounded-lg shadow-lg animation-scale-in">
            <div className="p-2">
              {actions?.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleAction(action?.action)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-150 text-left"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <Icon
                      name={action?.icon}
                      size={16}
                      color="var(--color-primary)"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {action?.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-150 hover-lift"
        aria-label="Quick actions"
        aria-expanded={isOpen}
      >
        <Icon
          name={isOpen ? 'X' : 'Zap'}
          size={24}
          color="var(--color-primary-foreground)"
        />
      </button>
    </div>
  );
};

export default QuickActionButton;