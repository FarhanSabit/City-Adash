import React from 'react';
import Icon from '../../../components/AppIcon';

const TicketStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Tickets',
      value: stats?.total,
      icon: 'Ticket',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Open',
      value: stats?.open,
      icon: 'AlertCircle',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'In Progress',
      value: stats?.inProgress,
      icon: 'Clock',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10',
    },
    {
      label: 'Resolved Today',
      value: stats?.resolvedToday,
      icon: 'CheckCircle',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Overdue',
      value: stats?.overdue,
      icon: 'AlertTriangle',
      color: 'var(--color-error)',
      bgColor: 'bg-error/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-150"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} color={stat?.color} />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
          <div className="text-xs text-muted-foreground">{stat?.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TicketStats;