import React from 'react';
import Icon from '../../../components/AppIcon';

const IntegrationStatus = ({ integrations }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'var(--color-success)';
      case 'syncing':
        return 'var(--color-accent)';
      case 'error':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle2';
      case 'syncing':
        return 'RefreshCw';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">System Integrations</h3>
        <button className="text-xs text-primary hover:underline">View Details</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {integrations?.map((integration) => (
          <div
            key={integration?.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex-shrink-0">
              <Icon
                name={getStatusIcon(integration?.status)}
                size={20}
                color={getStatusColor(integration?.status)}
                className={integration?.status === 'syncing' ? 'animate-spin' : ''}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">{integration?.name}</div>
              <div className="text-xs text-muted-foreground">
                Last sync: {integration?.lastSync}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationStatus;