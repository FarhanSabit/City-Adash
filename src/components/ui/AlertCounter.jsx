import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const AlertCounter = () => {
  const [alerts, setAlerts] = useState({
    critical: 3,
    warning: 7,
    info: 12,
  });

  const totalAlerts = alerts?.critical + alerts?.warning + alerts?.info;

  const handleAlertClick = () => {
    window.location.href = '/facility-operations-dashboard';
  };

  const getPriorityColor = () => {
    if (alerts?.critical > 0) return 'var(--color-error)';
    if (alerts?.warning > 0) return 'var(--color-warning)';
    return 'var(--color-accent)';
  };

  return (
    <button
      onClick={handleAlertClick}
      className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-all duration-150 hover-lift"
      aria-label={`${totalAlerts} facility alerts`}
    >
      <div className="relative">
        <Icon name="Bell" size={20} color={getPriorityColor()} />
        {totalAlerts > 0 && (
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white rounded-full"
            style={{ backgroundColor: getPriorityColor() }}
          >
            {totalAlerts > 99 ? '99+' : totalAlerts}
          </span>
        )}
      </div>
      <span className="hidden md:inline text-sm font-medium text-foreground">
        Alerts
      </span>
    </button>
  );
};

export default AlertCounter;