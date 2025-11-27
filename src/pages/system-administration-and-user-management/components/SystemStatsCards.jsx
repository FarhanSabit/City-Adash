import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card rounded-lg border border-border p-6 hover-lift">
          <div className="flex items-start justify-between mb-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-lg"
              style={{ backgroundColor: `${stat?.color}15` }}
            >
              <Icon name={stat?.icon} size={24} color={stat?.color} />
            </div>
            {stat?.trend && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                stat?.trend?.direction === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
              }`}>
                <Icon
                  name={stat?.trend?.direction === 'up' ? 'TrendingUp' : 'TrendingDown'}
                  size={12}
                />
                {stat?.trend?.value}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.label}</p>
            {stat?.subtitle && (
              <p className="text-xs text-muted-foreground mt-2">{stat?.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemStatsCards;