import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import KPICard from './components/KPICard';
import AlertFeed from './components/AlertFeed';
import ResourceUtilization from './components/ResourceUtilization';
import WorkOrderChart from './components/WorkOrderChart';
import QuickActions from './components/QuickActions';
import SystemStatus from './components/SystemStatus';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FacilityManagementDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Mock KPI data
  const kpiData = [
  {
    title: 'Active Work Orders',
    value: '127',
    change: '+12%',
    changeType: 'positive',
    icon: 'Clipboard',
    color: 'primary',
    trend: [45, 52, 48, 61, 55, 67, 73, 69, 76, 82, 85, 89]
  },
  {
    title: 'Completion Rate',
    value: '94.2%',
    change: '+2.1%',
    changeType: 'positive',
    icon: 'CheckCircle',
    color: 'success',
    trend: [88, 89, 91, 90, 92, 93, 91, 94, 95, 93, 94, 94.2]
  },
  {
    title: 'Avg Response Time',
    value: '2.4h',
    change: '-0.3h',
    changeType: 'positive',
    icon: 'Clock',
    color: 'warning',
    trend: [3.2, 3.0, 2.8, 2.9, 2.7, 2.5, 2.6, 2.4, 2.3, 2.5, 2.4, 2.4]
  },
  {
    title: 'Equipment Uptime',
    value: '99.1%',
    change: '-0.2%',
    changeType: 'negative',
    icon: 'Activity',
    color: 'error',
    trend: [99.5, 99.3, 99.4, 99.2, 99.0, 99.1, 99.3, 99.1, 98.9, 99.0, 99.1, 99.1]
  },
  {
    title: 'Cost Savings',
    value: '$24.5K',
    change: '+8.3%',
    changeType: 'positive',
    icon: 'DollarSign',
    color: 'success',
    trend: [18, 19, 20, 21, 22, 21, 23, 24, 23, 24, 25, 24.5]
  },
  {
    title: 'Technician Utilization',
    value: '78%',
    change: '+5%',
    changeType: 'positive',
    icon: 'Users',
    color: 'primary',
    trend: [70, 72, 74, 73, 75, 76, 74, 77, 78, 76, 78, 78]
  }];


  const dateRangeOptions = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '1y', label: 'Last Year' }];


  const handleExportData = () => {
    console.log('Exporting dashboard data...');
    // Handle export functionality
  };

  const handleRefreshData = () => {
    setLastUpdated(new Date());
    console.log('Refreshing dashboard data...');
    // Handle manual refresh
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  return (
    <div className="min-h-screen bg-gradient-modern">
      <Header />
      <main className="pt-16">
        <div className="w-full px-4 py-6 animate-fade-up">
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8">
            <div className="animate-slide-right">
              <h1 className="font-bold text-foreground mb-2 text-3xl">Market Master Dashboard</h1>
              <p className="text-responsive-base text-muted-foreground">
                Comprehensive operational oversight and performance analytics
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e?.target?.value)}
                className="input-modern text-responsive-sm min-w-[140px]">
                {dateRangeOptions?.map((option) =>
                <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                )}
              </select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAutoRefresh}
                className={`btn-outline-modern ${autoRefresh ? 'border-accent text-accent' : ''} text-responsive-sm`}>
                <Icon name={autoRefresh ? "Play" : "Pause"} size={16} className="mr-2" />
                <span className="hidden sm:inline">Auto Refresh</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshData}
                className="btn-outline-modern text-responsive-sm">
                <Icon name="RefreshCw" size={16} className="mr-2" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportData}
                className="btn-outline-modern text-responsive-sm">
                <Icon name="Download" size={16} className="mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>

          {/* Last Updated Info */}
          <div className="modern-card rounded-lg p-4 mb-6 animate-scale-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-responsive-sm text-muted-foreground">
                  Last updated: {lastUpdated?.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-responsive-sm text-success font-medium">Live Data</span>
              </div>
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid-kpi gap-4 lg:gap-6 mb-8">
            {kpiData?.map((kpi, index) =>
            <KPICard
              key={index}
              title={kpi?.title}
              value={kpi?.value}
              change={kpi?.change}
              changeType={kpi?.changeType}
              icon={kpi?.icon}
              color={kpi?.color}
              trend={kpi?.trend} />
            )}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {/* Left Column - Charts and Analytics */}
            <div className="xl:col-span-2 space-y-6 lg:space-y-8">
              <WorkOrderChart />
              <QuickActions />
            </div>

            {/* Right Column - Alerts and Status */}
            <div className="space-y-6 lg:space-y-8">
              <AlertFeed />
              <SystemStatus />
            </div>
          </div>

          {/* Resource Utilization Section */}
          <div className="mb-8">
            <ResourceUtilization />
          </div>

          {/* Footer Info */}
          <div className="modern-card rounded-lg p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-responsive-sm text-muted-foreground">System Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Database" size={16} className="text-success" />
                  <span className="text-responsive-sm text-muted-foreground">Data Synced</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Wifi" size={16} className="text-success" />
                  <span className="text-responsive-sm text-muted-foreground">Connected</span>
                </div>
              </div>
              
              <div className="text-responsive-sm text-muted-foreground">
                © {new Date()?.getFullYear()} FacilityPro Enterprise Management
              </div>
            </div>
          </div>
        </div>
      </main>
      <QuickActionButton />
    </div>);
};

export default FacilityManagementDashboard;