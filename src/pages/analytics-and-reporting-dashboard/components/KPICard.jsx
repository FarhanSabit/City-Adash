import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ kpi }) => {
  const getTrendColor = (trend) => {
    if (trend > 0) return 'var(--color-success)';
    if (trend < 0) return 'var(--color-error)';
    return 'var(--color-muted-foreground)';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-150 hover-lift">
      <div className="flex items-start justify-between mb-3">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg"
          style={{ backgroundColor: `${kpi?.color}15` }}
        >
          <Icon name={kpi?.icon} size={20} color={kpi?.color} />
        </div>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${getTrendColor(kpi?.trend)}15`,
            color: getTrendColor(kpi?.trend)
          }}
        >
          <Icon name={getTrendIcon(kpi?.trend)} size={12} color={getTrendColor(kpi?.trend)} />
          {Math.abs(kpi?.trend)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground mb-1">{kpi?.value}</div>
      <div className="text-sm text-muted-foreground mb-2">{kpi?.label}</div>
      <div className="text-xs text-muted-foreground">vs. {kpi?.comparison}</div>
    </div>
  );
};

export default KPICard;