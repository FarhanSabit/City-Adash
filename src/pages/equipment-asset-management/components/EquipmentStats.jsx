import React from 'react';
import Icon from '../../../components/AppIcon';

const EquipmentStats = ({ equipment }) => {
  const stats = {
    total: equipment?.length,
    operational: equipment?.filter(e => e?.status === 'operational')?.length,
    warning: equipment?.filter(e => e?.status === 'warning')?.length,
    critical: equipment?.filter(e => e?.status === 'critical')?.length,
    offline: equipment?.filter(e => e?.status === 'offline')?.length,
    maintenanceDue: equipment?.filter(e => {
      const dueDate = new Date(e.nextMaintenance);
      const today = new Date();
      const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      return daysUntilDue <= 7;
    })?.length,
    warrantyExpiring: equipment?.filter(e => {
      const warrantyEnd = new Date(e.warrantyEnd);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((warrantyEnd - today) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    })?.length,
    avgAge: Math.round(
      equipment?.reduce((sum, e) => {
        const installDate = new Date(e.installDate);
        const today = new Date();
        const ageInYears = (today - installDate) / (1000 * 60 * 60 * 24 * 365);
        return sum + ageInYears;
      }, 0) / equipment?.length
    )
  };

  const statCards = [
    {
      title: 'Total Equipment',
      value: stats?.total,
      icon: 'Package',
      color: 'text-slate-700',
      bgColor: 'bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 shadow-lg',
      iconBgColor: 'bg-slate-600'
    },
    {
      title: 'Operational',
      value: stats?.operational,
      icon: 'CheckCircle',
      color: 'text-emerald-700',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 shadow-lg',
      iconBgColor: 'bg-emerald-500',
      percentage: ((stats?.operational / stats?.total) * 100)?.toFixed(1)
    },
    {
      title: 'Warning Status',
      value: stats?.warning,
      icon: 'AlertTriangle',
      color: 'text-amber-700',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 shadow-lg',
      iconBgColor: 'bg-amber-500',
      percentage: ((stats?.warning / stats?.total) * 100)?.toFixed(1)
    },
    {
      title: 'Critical Issues',
      value: stats?.critical,
      icon: 'AlertCircle',
      color: 'text-red-700',
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 shadow-lg',
      iconBgColor: 'bg-red-500',
      percentage: ((stats?.critical / stats?.total) * 100)?.toFixed(1)
    },
    {
      title: 'Offline',
      value: stats?.offline,
      icon: 'XCircle',
      color: 'text-gray-700',
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 shadow-lg',
      iconBgColor: 'bg-gray-500',
      percentage: ((stats?.offline / stats?.total) * 100)?.toFixed(1)
    },
    {
      title: 'Maintenance Due',
      value: stats?.maintenanceDue,
      icon: 'Calendar',
      color: 'text-blue-700',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg',
      iconBgColor: 'bg-blue-500',
      subtitle: 'Next 7 days'
    },
    {
      title: 'Warranty Expiring',
      value: stats?.warrantyExpiring,
      icon: 'Shield',
      color: 'text-purple-700',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 shadow-lg',
      iconBgColor: 'bg-purple-500',
      subtitle: 'Next 30 days'
    },
    {
      title: 'Average Age',
      value: `${stats?.avgAge}y`,
      icon: 'Clock',
      color: 'text-indigo-700',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 shadow-lg',
      iconBgColor: 'bg-indigo-500',
      subtitle: 'Years in service'
    }
  ];

  return (
    <div className="grid grid-cols-8 gap-3 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className={`${stat?.bgColor} rounded-xl p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${stat?.iconBgColor} rounded-lg flex items-center justify-center shadow-sm`}>
              <Icon name={stat?.icon} size={20} className="text-white" />
            </div>
            {stat?.percentage && (
              <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-white/80 ${stat?.color}`}>
                {stat?.percentage}%
              </span>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {stat?.value}
            </h3>
            <p className="text-sm font-medium text-gray-700 mb-1 leading-tight">
              {stat?.title}
            </p>
            {stat?.subtitle && (
              <p className="text-xs text-gray-600">
                {stat?.subtitle}
              </p>
            )}
          </div>

          {/* Trend Indicator */}
          {(stat?.title === 'Operational' || stat?.title === 'Critical Issues') && (
            <div className="flex items-center mt-3 pt-2 border-t border-white/30">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                stat?.title === 'Operational' ? 'bg-emerald-100' : 'bg-red-100'
              }`}>
                <Icon 
                  name={stat?.title === 'Operational' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                  className={stat?.title === 'Operational' ? 'text-emerald-600' : 'text-red-600'} 
                />
              </div>
              <span className={`text-xs ml-2 font-medium leading-tight ${
                stat?.title === 'Operational' ? 'text-emerald-700' : 'text-red-700'
              }`}>
                {stat?.title === 'Operational' ? '+2.3%' : '-1.8%'} from last month
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EquipmentStats;