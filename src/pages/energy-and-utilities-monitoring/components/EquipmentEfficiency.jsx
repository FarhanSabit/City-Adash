import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EquipmentEfficiency = ({ equipment }) => {
  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'var(--color-success)';
    if (efficiency >= 70) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'optimal':
        return { color: 'var(--color-success)', icon: 'CheckCircle2', label: 'Optimal' };
      case 'warning':
        return { color: 'var(--color-warning)', icon: 'AlertCircle', label: 'Warning' };
      case 'critical':
        return { color: 'var(--color-error)', icon: 'AlertTriangle', label: 'Critical' };
      default:
        return { color: 'var(--color-muted-foreground)', icon: 'Circle', label: 'Unknown' };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Equipment Efficiency</h3>
          <p className="text-sm text-muted-foreground">Real-time performance monitoring</p>
        </div>
        <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
          Configure
        </Button>
      </div>
      <div className="space-y-4">
        {equipment?.map((item) => {
          const statusConfig = getStatusConfig(item?.status);
          return (
            <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-150">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon name={item?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground">{item?.name}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${statusConfig?.color}15`, color: statusConfig?.color }}>
                        {statusConfig?.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item?.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold" style={{ color: getEfficiencyColor(item?.efficiency) }}>
                    {item?.efficiency}%
                  </p>
                  <p className="text-xs text-muted-foreground">Efficiency</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Current Load</span>
                  <span className="font-medium text-foreground">{item?.currentLoad} kW</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(item?.currentLoad / item?.maxLoad) * 100}%`,
                      backgroundColor: getEfficiencyColor(item?.efficiency)
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Max Load: {item?.maxLoad} kW</span>
                  <span className="text-muted-foreground">Runtime: {item?.runtime}h</span>
                </div>
              </div>
              {item?.alerts && item?.alerts?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-start gap-2">
                    <Icon name="AlertCircle" size={14} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-warning">{item?.alerts?.[0]}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentEfficiency;