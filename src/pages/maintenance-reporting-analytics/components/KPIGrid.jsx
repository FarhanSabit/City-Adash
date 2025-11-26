import React from 'react';
import MetricCard from './MetricCard';

const KPIGrid = ({ timeRange = '30d' }) => {
  const kpiData = [
    {
      title: 'Mean Time To Repair (MTTR)',
      value: '4.2 hrs',
      change: '+12%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'primary'
    },
    {
      title: 'First Call Resolution Rate',
      value: '87.3%',
      change: '+5.2%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'SLA Compliance',
      value: '94.1%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'Target',
      color: 'primary'
    },
    {
      title: 'Average Cost Per Work Order',
      value: '$342',
      change: '-8.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'success'
    },
    {
      title: 'Equipment Uptime',
      value: '98.7%',
      change: '+0.8%',
      changeType: 'positive',
      icon: 'Activity',
      color: 'success'
    },
    {
      title: 'Preventive Maintenance Ratio',
      value: '73.2%',
      change: '+15.3%',
      changeType: 'positive',
      icon: 'Shield',
      color: 'primary'
    },
    {
      title: 'Technician Utilization',
      value: '82.4%',
      change: '+3.7%',
      changeType: 'positive',
      icon: 'Users',
      color: 'warning'
    },
    {
      title: 'Parts Availability',
      value: '91.8%',
      change: '-2.3%',
      changeType: 'negative',
      icon: 'Package',
      color: 'warning'
    }
  ];

  return (
    <div className="grid grid-cols-8 gap-4 overflow-x-auto">
      {kpiData?.map((kpi, index) => (
        <MetricCard
          key={index}
          title={kpi?.title}
          value={kpi?.value}
          change={kpi?.change}
          changeType={kpi?.changeType}
          icon={kpi?.icon}
          color={kpi?.color}
        />
      ))}
    </div>
  );
};

export default KPIGrid;