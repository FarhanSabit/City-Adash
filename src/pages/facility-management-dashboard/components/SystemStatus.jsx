import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const systemConnections = [
  {
    id: 'erp',
    name: 'ERP System',
    status: 'connected',
    lastSync: new Date(Date.now() - 300000),
    description: 'Financial data synchronization',
    icon: 'Database'
  },
  {
    id: 'cmms',
    name: 'CMMS Integration',
    status: 'connected',
    lastSync: new Date(Date.now() - 600000),
    description: 'Maintenance history import',
    icon: 'Wrench'
  },
  {
    id: 'iot',
    name: 'IoT Sensors',
    status: 'warning',
    lastSync: new Date(Date.now() - 1800000),
    description: '2 sensors offline',
    icon: 'Wifi'
  },
  {
    id: 'notification',
    name: 'Notification Service',
    status: 'connected',
    lastSync: new Date(Date.now() - 120000),
    description: 'SMS/Email delivery',
    icon: 'Bell'
  },
  {
    id: 'backup',
    name: 'Backup System',
    status: 'error',
    lastSync: new Date(Date.now() - 7200000),
    description: 'Last backup failed',
    icon: 'HardDrive'
  }];


  const performanceMetrics = [
  {
    id: 'response-time',
    name: 'Response Time',
    value: '1.2s',
    status: 'good',
    target: '< 3s',
    icon: 'Zap'
  },
  {
    id: 'uptime',
    name: 'System Uptime',
    value: '99.8%',
    status: 'good',
    target: '> 99.5%',
    icon: 'Activity'
  },
  {
    id: 'active-users',
    name: 'Active Users',
    value: '127',
    status: 'normal',
    target: '< 500',
    icon: 'Users'
  },
  {
    id: 'data-usage',
    name: 'Data Usage',
    value: '2.4 GB',
    status: 'normal',
    target: '< 10 GB',
    icon: 'HardDrive'
  }];


  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':case 'good':
        return 'text-success';
      case 'warning':case 'normal':
        return 'text-warning';
      case 'error':case 'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':case 'good':
        return 'CheckCircle';
      case 'warning':case 'normal':
        return 'AlertTriangle';
      case 'error':case 'critical':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'connected':case 'good':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':case 'normal':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error':case 'critical':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
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

  const handleRefreshSystem = (systemId) => {
    console.log('Refreshing system:', systemId);
    // Handle system refresh logic
  };

  const handleViewDetails = (system) => {
    console.log('View system details:', system);
    // Handle navigation to system details
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* System Time & Status Overview */}
      <div className="modern-card rounded-lg p-4 lg:p-6 shadow-modern hover-lift-modern hidden">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h3 className="text-responsive-lg font-semibold text-foreground">System Status</h3>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-responsive-sm font-medium text-foreground">
                {currentTime?.toLocaleTimeString()}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentTime?.toLocaleDateString()}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="hover-glow-yellow">
              <Icon name="RefreshCw" size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {performanceMetrics?.map((metric) =>
          <div key={metric?.id} className="text-center p-3 lg:p-4 rounded-lg bg-card border border-border hover:border-accent/30 transition-all duration-300 hover-lift-modern">
              <div className={`inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full mb-2 lg:mb-3 ${getStatusColor(metric?.status)} transition-transform duration-300 hover:scale-110`}>
                <Icon name={metric?.icon} size={16} className="lg:w-5 lg:h-5" />
              </div>
              <p className="text-responsive-lg font-bold text-foreground mb-1">{metric?.value}</p>
              <p className="text-xs lg:text-sm text-muted-foreground mb-1">{metric?.name}</p>
              <p className="text-xs text-muted-foreground">Target: {metric?.target}</p>
            </div>
          )}
        </div>
      </div>
      {/* System Connections */}
      <div className="modern-card rounded-lg shadow-modern hover-lift-modern">
        <div className="p-4 lg:p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-responsive-lg font-semibold text-foreground">Integration Status</h3>
            <div className="flex items-center space-x-2">
              <span className="text-responsive-sm text-muted-foreground">
                {systemConnections?.filter((s) => s?.status === 'connected')?.length} of {systemConnections?.length} connected
              </span>
              <Button variant="ghost" size="sm" className="hover-glow-yellow">
                <Icon name="Settings" size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {systemConnections?.map((system) =>
          <div key={system?.id} className="p-4 lg:p-5 hover:bg-muted/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 lg:space-x-4 flex-1 min-w-0">
                  <div className="text-muted-foreground transition-transform duration-300 hover:scale-110">
                    <Icon name={system?.icon} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-responsive-sm font-medium text-foreground truncate">{system?.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full border transition-colors duration-300 ${getStatusBadge(system?.status)}`}>
                        {system?.status}
                      </span>
                    </div>
                    <p className="text-xs lg:text-sm text-muted-foreground mb-1">{system?.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Last sync: {formatTimeAgo(system?.lastSync)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-2">
                  <div className={`${getStatusColor(system?.status)} transition-transform duration-300 hover:scale-110`}>
                    <Icon name={getStatusIcon(system?.status)} size={16} />
                  </div>
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRefreshSystem(system?.id)}
                  className="h-8 w-8 hover:bg-accent/10 hover:text-accent transition-all duration-300">

                    <Icon name="RefreshCw" size={14} />
                  </Button>
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewDetails(system)}
                  className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-300">

                    <Icon name="ExternalLink" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 lg:p-5 border-t border-border bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <span className="text-responsive-sm text-muted-foreground">
              System health check completed at {new Date()?.toLocaleTimeString()}
            </span>
            <Button variant="ghost" size="sm" className="hover:bg-accent/10 hover:text-accent transition-all duration-300 self-start sm:self-auto">
              <Icon name="Activity" size={14} className="mr-1" />
              View System Logs
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default SystemStatus;