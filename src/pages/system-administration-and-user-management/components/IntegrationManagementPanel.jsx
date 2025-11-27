import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationManagementPanel = ({ integrations, onTestConnection, onConfigureIntegration }) => {
  const [expandedIntegration, setExpandedIntegration] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'var(--color-success)';
      case 'error': return 'var(--color-error)';
      case 'warning': return 'var(--color-warning)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'connected':
        return 'status-success';
      case 'error':
        return 'status-error';
      case 'warning':
        return 'status-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const toggleExpand = (id) => {
    setExpandedIntegration(expandedIntegration === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {integrations?.map((integration) => (
        <div key={integration?.id} className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                  <Icon name={integration?.icon} size={24} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{integration?.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(integration?.status)}`}>
                      <div
                        className="w-1.5 h-1.5 rounded-full mr-1.5"
                        style={{ backgroundColor: getStatusColor(integration?.status) }}
                      />
                      {integration?.statusLabel}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{integration?.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-muted-foreground">Last sync: {integration?.lastSync}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Activity" size={14} color="var(--color-muted-foreground)" />
                      <span className="text-muted-foreground">{integration?.syncFrequency}</span>
                    </div>
                    {integration?.recordsSync && (
                      <div className="flex items-center gap-2">
                        <Icon name="Database" size={14} color="var(--color-muted-foreground)" />
                        <span className="text-muted-foreground">{integration?.recordsSync} records synced</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={() => onTestConnection(integration?.id)}
                >
                  Test
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                  onClick={() => onConfigureIntegration(integration?.id)}
                >
                  Configure
                </Button>
                <button
                  onClick={() => toggleExpand(integration?.id)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label={expandedIntegration === integration?.id ? 'Collapse details' : 'Expand details'}
                >
                  <Icon
                    name={expandedIntegration === integration?.id ? 'ChevronUp' : 'ChevronDown'}
                    size={20}
                    color="var(--color-muted-foreground)"
                  />
                </button>
              </div>
            </div>

            {expandedIntegration === integration?.id && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Configuration Details</h4>
                    <div className="space-y-2">
                      {integration?.config?.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item?.label}:</span>
                          <span className="text-foreground font-medium">{item?.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h4>
                    <div className="space-y-3">
                      {integration?.recentActivity?.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-1.5"
                            style={{ backgroundColor: getStatusColor(activity?.status) }}
                          />
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{activity?.message}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{activity?.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {integration?.errorLog && integration?.errorLog?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
                      Error Log
                    </h4>
                    <div className="bg-error/5 border border-error/20 rounded-lg p-4 space-y-2">
                      {integration?.errorLog?.map((error, index) => (
                        <div key={index} className="text-sm">
                          <span className="text-error font-medium">{error?.timestamp}:</span>
                          <span className="text-foreground ml-2">{error?.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntegrationManagementPanel;