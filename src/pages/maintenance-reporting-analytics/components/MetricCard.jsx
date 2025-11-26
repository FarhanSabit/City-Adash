import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'bg-primary text-primary-foreground',
      success: 'bg-success text-success-foreground',
      warning: 'bg-warning text-warning-foreground',
      error: 'bg-error text-error-foreground',
      secondary: 'bg-secondary text-secondary-foreground'
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-soft hover:shadow-modal hover:scale-105 transition-all duration-200 min-w-[140px] flex-shrink-0">
      <div className="flex items-center justify-center mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={16} />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-foreground mb-1">{value}</h3>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2 leading-tight">{title}</p>
        {change && (
          <div className={`flex items-center justify-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon name={getChangeIcon(changeType)} size={12} />
            <span className="text-xs font-medium">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;