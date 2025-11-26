import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, color = 'primary', trend = [] }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const getColorClasses = () => {
    switch (color) {
      case 'success': return 'bg-success text-success-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'error': return 'bg-error text-error-foreground';
      case 'accent': return 'bg-accent text-accent-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="modern-card rounded-lg p-4 lg:p-6 hover-lift-modern min-h-[140px] lg:min-h-[160px] flex flex-col justify-between animate-scale-in">
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center ${getColorClasses()} transition-transform duration-300 hover:scale-110`}>
          <Icon name={icon} size={18} className="lg:w-5 lg:h-5" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={14} />
            <span className="text-responsive-sm font-semibold">{change}</span>
          </div>
        )}
      </div>
      <div className="space-y-2 flex-1">
        <h3 className="text-responsive-xl font-bold text-foreground leading-tight">{value}</h3>
        <p className="text-responsive-sm text-muted-foreground font-medium">{title}</p>
      </div>
      {trend?.length > 0 && (
        <div className="mt-3 lg:mt-4 h-6 lg:h-8">
          <svg width="100%" height="100%" className="overflow-visible">
            <polyline
              points={trend?.map((point, index) => `${(index / (trend?.length - 1)) * 100},${100 - (point / Math.max(...trend)) * 80}`)?.join(' ')}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`${getChangeColor()} opacity-70 transition-opacity duration-300 hover:opacity-100`}
            />
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
};

export default KPICard;