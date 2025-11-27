import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssetCard = ({ asset, onViewDetails, onScheduleMaintenance, onEdit }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Operational': 'var(--color-success)',
      'Maintenance': 'var(--color-warning)',
      'Critical': 'var(--color-error)',
      'Retired': 'var(--color-muted-foreground)'
    };
    return colors?.[status] || 'var(--color-muted-foreground)';
  };

  const getConditionBadge = (condition) => {
    const badges = {
      'Excellent': 'status-success',
      'Good': 'status-success',
      'Fair': 'status-warning',
      'Poor': 'status-error'
    };
    return badges?.[condition] || 'status-success';
  };

  const isMaintenanceDue = () => {
    const dueDate = new Date(asset.nextMaintenance);
    const today = new Date();
    const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-150 hover-lift">
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={asset?.image}
          alt={asset?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span
            className="px-2 py-1 text-xs font-medium rounded-full text-white"
            style={{ backgroundColor: getStatusColor(asset?.status) }}
          >
            {asset?.status}
          </span>
          {isMaintenanceDue() && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-error text-white flex items-center gap-1">
              <Icon name="AlertTriangle" size={12} color="white" />
              Due Soon
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-1">
              {asset?.name}
            </h3>
            <p className="text-sm text-muted-foreground">ID: {asset?.id}</p>
          </div>
          <button
            onClick={() => onEdit(asset)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Edit asset"
          >
            <Icon name="MoreVertical" size={18} color="var(--color-muted-foreground)" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
            <span className="text-foreground">{asset?.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Tag" size={16} color="var(--color-muted-foreground)" />
            <span className="text-foreground">{asset?.category}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
            <span className="text-muted-foreground">
              Last Service: {new Date(asset.lastService)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Condition</p>
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getConditionBadge(asset?.condition)}`}>
              {asset?.condition}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Next Maintenance</p>
            <p className="text-sm font-medium text-foreground">
              {new Date(asset.nextMaintenance)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(asset)}
          >
            Details
          </Button>
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="Wrench"
            iconPosition="left"
            onClick={() => onScheduleMaintenance(asset)}
          >
            Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;