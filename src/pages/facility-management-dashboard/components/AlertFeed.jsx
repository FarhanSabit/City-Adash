import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertFeed = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'HVAC System Failure',
      message: 'Unit #3 in Building A has stopped responding. Temperature rising rapidly.',
      location: 'Building A - Floor 2',
      timestamp: new Date(Date.now() - 300000),
      priority: 'critical',
      acknowledged: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Generator Maintenance Due',
      message: 'Backup generator requires scheduled maintenance within 48 hours.',
      location: 'Building B - Basement',
      timestamp: new Date(Date.now() - 900000),
      priority: 'high',
      acknowledged: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Work Order Completed',
      message: 'Elevator maintenance in Building C has been completed successfully.',
      location: 'Building C - All Floors',
      timestamp: new Date(Date.now() - 1800000),
      priority: 'low',
      acknowledged: true
    },
    {
      id: 4,
      type: 'warning',
      title: 'Parts Inventory Low',
      message: 'HVAC filters are running low. Only 5 units remaining in stock.',
      location: 'Central Warehouse',
      timestamp: new Date(Date.now() - 3600000),
      priority: 'medium',
      acknowledged: false
    }
  ]);

  const handleAcknowledge = (alertId) => {
    setAlerts(alerts?.map(alert => 
      alert?.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleViewDetails = (alert) => {
    console.log('View alert details:', alert);
    // Navigate to relevant page based on alert type
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (priority) => {
    switch (priority) {
      case 'critical': return 'border-l-error bg-error/5';
      case 'high': return 'border-l-warning bg-warning/5';
      case 'medium': return 'border-l-accent bg-accent/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const getIconColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className="modern-card rounded-lg shadow-modern hover-lift-modern animate-fade-up">
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-responsive-lg font-semibold text-foreground">Real-time Alerts</h3>
          <div className="flex items-center space-x-2">
            <span className="text-responsive-sm text-muted-foreground">
              {alerts?.filter(a => !a?.acknowledged)?.length} unread
            </span>
            <Button variant="ghost" size="sm" className="hover-glow-yellow">
              <Icon name="Settings" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto scrollbar-modern">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`border-l-4 p-4 lg:p-5 border-b border-border last:border-b-0 transition-all duration-300 hover:bg-muted/20 ${getAlertColor(alert?.priority)} ${
              alert?.acknowledged ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`mt-1 ${getIconColor(alert?.priority)} transition-transform duration-300 hover:scale-110`}>
                <Icon name={getAlertIcon(alert?.type)} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-responsive-sm font-medium text-foreground truncate">
                    {alert?.title}
                  </h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {formatTimeAgo(alert?.timestamp)}
                  </span>
                </div>
                
                <p className="text-responsive-sm text-muted-foreground mb-3 leading-relaxed">
                  {alert?.message}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Icon name="MapPin" size={12} className="mr-1 flex-shrink-0" />
                    {alert?.location}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    {!alert?.acknowledged && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAcknowledge(alert?.id)}
                        className="text-xs h-8 px-3 hover:bg-accent/10 hover:text-accent transition-all duration-300"
                      >
                        Acknowledge
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(alert)}
                      className="text-xs h-8 px-3 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 lg:p-5 border-t border-border bg-muted/10">
        <Button variant="ghost" className="w-full text-responsive-sm hover:bg-accent/10 hover:text-accent transition-all duration-300">
          View All Alerts
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AlertFeed;