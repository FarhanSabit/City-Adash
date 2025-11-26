import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      id: 'create-work-order',
      label: 'Create Work Order',
      icon: 'Plus',
      color: 'bg-primary text-primary-foreground',
      onClick: () => {
        console.log('Create work order clicked');
        setIsOpen(false);
      }
    },
    {
      id: 'report-issue',
      label: 'Report Equipment Issue',
      icon: 'AlertTriangle',
      color: 'bg-warning text-warning-foreground',
      onClick: () => {
        console.log('Report issue clicked');
        setIsOpen(false);
      }
    },
    {
      id: 'emergency-alert',
      label: 'Emergency Alert',
      icon: 'Siren',
      color: 'bg-error text-error-foreground',
      onClick: () => {
        console.log('Emergency alert clicked');
        setIsOpen(false);
      }
    },
    {
      id: 'quick-inspection',
      label: 'Quick Inspection',
      icon: 'CheckCircle',
      color: 'bg-success text-success-foreground',
      onClick: () => {
        console.log('Quick inspection clicked');
        setIsOpen(false);
      }
    }
  ];

  const toggleActions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-slide-in">
          {quickActions?.map((action, index) => (
            <div
              key={action?.id}
              className="flex items-center justify-end space-x-3"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-popover border border-border rounded-md px-3 py-2 shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <span className="text-sm text-popover-foreground whitespace-nowrap">
                  {action?.label}
                </span>
              </div>
              <Button
                onClick={action?.onClick}
                className={`h-12 w-12 rounded-full shadow-modal hover:scale-110 transition-all duration-200 group ${action?.color}`}
              >
                <Icon name={action?.icon} size={20} />
              </Button>
            </div>
          ))}
        </div>
      )}
      {/* Main Action Button */}
      <Button
        onClick={toggleActions}
        className={`h-14 w-14 rounded-full shadow-modal hover:scale-110 transition-all duration-200 ${
          isOpen 
            ? 'bg-muted text-muted-foreground rotate-45' 
            : 'bg-primary text-primary-foreground'
        }`}
      >
        <Icon name={isOpen ? "X" : "Plus"} size={24} />
      </Button>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default QuickActionButton;