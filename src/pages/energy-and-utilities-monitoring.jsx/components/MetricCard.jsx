import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, unit, change, changeType, icon, iconColor, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'var(--color-success)';
    if (changeType === 'negative') return 'var(--color-error)';
    return 'var(--color-muted-foreground)';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover-lift transition-all duration-150">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg" style={{ backgroundColor: `${iconColor}15` }}>
          <Icon name={icon} size={24} color={iconColor} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${getChangeColor()}15`, color: getChangeColor() }}>
            <Icon name={getChangeIcon()} size={14} color={getChangeColor()} />
            {change}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;