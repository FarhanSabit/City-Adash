import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertCard = ({ alert }) => {
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'var(--color-error)',
          bgColor: 'var(--color-error)',
          icon: 'AlertTriangle',
          label: 'Critical'
        };
      case 'warning':
        return {
          color: 'var(--color-warning)',
          bgColor: 'var(--color-warning)',
          icon: 'AlertCircle',
          label: 'Warning'
        };
      case 'info':
        return {
          color: 'var(--color-accent)',
          bgColor: 'var(--color-accent)',
          icon: 'Info',
          label: 'Info'
        };
      default:
        return {
          color: 'var(--color-muted-foreground)',
          bgColor: 'var(--color-muted-foreground)',
          icon: 'Bell',
          label: 'Notice'
        };
    }
  };

  const config = getSeverityConfig(alert?.severity);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMs = now - alertTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-150">
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0" style={{ backgroundColor: `${config?.bgColor}15` }}>
          <Icon name={config?.icon} size={20} color={config?.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${config?.bgColor}15`, color: config?.color }}>
                {config?.label}
              </span>
              <span className="text-xs text-muted-foreground">{formatTimestamp(alert?.timestamp)}</span>
            </div>
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-1">{alert?.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{alert?.description}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
              <span>{alert?.location}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Icon name="Activity" size={14} color="var(--color-muted-foreground)" />
              <span>{alert?.metric}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
              View Details
            </Button>
            <Button variant="ghost" size="sm" iconName="X">
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;