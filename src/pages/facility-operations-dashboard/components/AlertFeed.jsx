import React from 'react';
import Icon from '../../../components/AppIcon';

const AlertFeed = ({ alerts, onAlertAction }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'var(--color-error)';
      case 'high':
        return 'var(--color-warning)';
      case 'medium':
        return 'var(--color-accent)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-error/10';
      case 'high':
        return 'bg-warning/10';
      case 'medium':
        return 'bg-accent/10';
      default:
        return 'bg-muted';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return 'Wrench';
      case 'energy':
        return 'Zap';
      case 'security':
        return 'Shield';
      case 'safety':
        return 'AlertTriangle';
      default:
        return 'Bell';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        <h2 className="text-lg font-semibold text-foreground whitespace-nowrap">Real-Time Alerts</h2>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-error/10 text-error whitespace-nowrap">
          {alerts?.filter(a => a?.priority === 'critical')?.length} Critical
        </span>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
        <div className="p-2 space-y-2">
          {alerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`p-3 rounded-lg border transition-all duration-150 hover:shadow-sm ${getPriorityBg(alert?.priority)} border-border`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon
                    name={getAlertIcon(alert?.type)}
                    size={18}
                    color={getPriorityColor(alert?.priority)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-medium text-foreground line-clamp-1 flex-1 min-w-0">
                      {alert?.title}
                    </h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                      {formatTime(alert?.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2 break-words">
                    {alert?.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap"
                      style={{
                        backgroundColor: `${getPriorityColor(alert?.priority)}20`,
                        color: getPriorityColor(alert?.priority),
                      }}
                    >
                      {alert?.priority?.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">{alert?.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                <button
                  onClick={() => onAlertAction(alert?.id, 'acknowledge')}
                  className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors whitespace-nowrap"
                >
                  Acknowledge
                </button>
                <button
                  onClick={() => onAlertAction(alert?.id, 'assign')}
                  className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors whitespace-nowrap"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertFeed;