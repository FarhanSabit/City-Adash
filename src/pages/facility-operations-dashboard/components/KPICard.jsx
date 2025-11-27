import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, trend, trendValue, icon, iconColor, onClick }) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'var(--color-success)';
    if (trend === 'down') return 'var(--color-error)';
    return 'var(--color-muted-foreground)';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-4 hover:shadow-md hover:border-primary/50 transition-all duration-200 cursor-pointer group min-h-[140px] flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-shrink-0 p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
          <Icon name={icon} size={20} color={iconColor} />
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Icon name={getTrendIcon()} size={16} color={getTrendColor()} />
          <span className="text-xs font-medium whitespace-nowrap" style={{ color: getTrendColor() }}>
            {trendValue}
          </span>
        </div>
      </div>
      <div className="space-y-1 flex-1 flex flex-col justify-end">
        <h3 className="text-sm font-medium text-muted-foreground line-clamp-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground whitespace-nowrap">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default KPICard;