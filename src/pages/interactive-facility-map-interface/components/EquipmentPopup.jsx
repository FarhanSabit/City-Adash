import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EquipmentPopup = ({ equipment, onClose, onCreateWorkOrder }) => {
  if (!equipment) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'var(--color-success)';
      case 'warning': return 'var(--color-warning)';
      case 'critical': return 'var(--color-error)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="absolute bg-card border border-border rounded-lg shadow-xl w-80 z-40 animation-fade-in">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name={equipment?.icon} size={20} color="var(--color-primary)" />
          <h3 className="text-sm font-semibold text-foreground">{equipment?.name}</h3>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-6 h-6 rounded hover:bg-muted transition-colors"
        >
          <Icon name="X" size={16} color="var(--color-muted-foreground)" />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Status</span>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getStatusColor(equipment?.status) }}
            />
            <span className="text-sm font-medium text-foreground capitalize">
              {equipment?.status}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Location</span>
          <span className="text-sm text-foreground">{equipment?.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Asset ID</span>
          <span className="text-sm font-mono text-foreground">{equipment?.assetId}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Last Maintenance</span>
          <span className="text-sm text-foreground">{equipment?.lastMaintenance}</span>
        </div>

        {equipment?.nextMaintenance && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Next Maintenance</span>
            <span className="text-sm text-foreground">{equipment?.nextMaintenance}</span>
          </div>
        )}

        {equipment?.alerts && equipment?.alerts?.length > 0 && (
          <div className="pt-2 border-t border-border">
            <span className="text-xs font-medium text-muted-foreground">Active Alerts</span>
            <div className="mt-2 space-y-1">
              {equipment?.alerts?.map((alert, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-error/10 rounded">
                  <Icon name="AlertTriangle" size={14} color="var(--color-error)" />
                  <span className="text-xs text-foreground">{alert}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 px-4 py-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="FileText"
          iconPosition="left"
          fullWidth
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="Wrench"
          iconPosition="left"
          onClick={() => onCreateWorkOrder(equipment)}
          fullWidth
        >
          Create Work Order
        </Button>
      </div>
    </div>
  );
};

export default EquipmentPopup;