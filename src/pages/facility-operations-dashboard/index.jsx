import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar, { SidebarProvider } from '../../components/Sidebar';
import MobileMenuButton from '../../components/MobileMenuButton';
import AlertCounter from '../../components/ui/AlertCounter';
import FacilitySelector from '../../components/ui/FacilitySelector';
import UserRoleIndicator from '../../components/ui/UserRoleIndicator';
import QuickActionButton from '../../components/ui/QuickActionButton';
import KPICard from './components/KPICard';
import AlertFeed from './components/AlertFeed';
import WorkOrderTable from './components/WorkOrderTable';

import FilterToolbar from './components/FilterToolbar';
import IntegrationStatus from './components/IntegrationStatus';
import KeyboardShortcuts from './components/KeyboardShortcuts';

const FacilityOperationsDashboard = () => {
  const [filters, setFilters] = useState({
    zone: '',
    priority: '',
    department: '',
    status: '',
  });

  const kpiData = [
    {
      id: 1,
      title: 'Maintenance Completion',
      value: '94.2',
      unit: '%',
      trend: 'up',
      trendValue: '+2.4%',
      icon: 'CheckCircle2',
      iconColor: 'var(--color-success)',
    },
    {
      id: 2,
      title: 'Energy Efficiency Score',
      value: '87',
      unit: '/100',
      trend: 'up',
      trendValue: '+5.1%',
      icon: 'Zap',
      iconColor: 'var(--color-accent)',
    },
    {
      id: 3,
      title: 'Active Tickets',
      value: '42',
      unit: 'open',
      trend: 'down',
      trendValue: '-8',
      icon: 'Ticket',
      iconColor: 'var(--color-warning)',
    },
    {
      id: 4,
      title: 'Budget Utilization',
      value: '68',
      unit: '%',
      trend: 'neutral',
      trendValue: '0%',
      icon: 'DollarSign',
      iconColor: 'var(--color-primary)',
    },
  ];

  const alertsData = [
    {
      id: 'ALT-001',
      title: 'HVAC System Failure - Building A',
      description: 'Critical temperature deviation detected in Zone 3. Immediate attention required to prevent equipment damage.',
      priority: 'critical',
      type: 'maintenance',
      location: 'Building A, Floor 3',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 'ALT-002',
      title: 'Energy Consumption Spike',
      description: 'Unusual power usage detected in North Wing. 45% above baseline consumption.',
      priority: 'high',
      type: 'energy',
      location: 'North Wing',
      timestamp: new Date(Date.now() - 900000),
    },
    {
      id: 'ALT-003',
      title: 'Security Access Anomaly',
      description: 'Multiple failed access attempts detected at restricted area entrance.',
      priority: 'high',
      type: 'security',
      location: 'Building C, Basement',
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: 'ALT-004',
      title: 'Water Leak Detection',
      description: 'Moisture sensors triggered in restroom facilities. Potential plumbing issue.',
      priority: 'medium',
      type: 'maintenance',
      location: 'Building B, Floor 2',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 'ALT-005',
      title: 'Fire Alarm System Test Due',
      description: 'Quarterly fire alarm system testing scheduled for tomorrow. Coordination required.',
      priority: 'medium',
      type: 'safety',
      location: 'All Buildings',
      timestamp: new Date(Date.now() - 7200000),
    },
  ];

  const workOrdersData = [
    {
      id: 'WO-2025-1147',
      title: 'HVAC Filter Replacement',
      description: 'Replace air filters in all AHU units on Floor 3',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Michael Chen',
      location: 'Building A, Floor 3',
      slaMinutes: 120,
    },
    {
      id: 'WO-2025-1148',
      title: 'Electrical Panel Inspection',
      description: 'Quarterly safety inspection of main electrical distribution panel',
      priority: 'critical',
      status: 'pending',
      assignedTo: 'Sarah Johnson',
      location: 'Building B, Basement',
      slaMinutes: 45,
    },
    {
      id: 'WO-2025-1149',
      title: 'Plumbing Leak Repair',
      description: 'Fix water leak in restroom facilities reported by staff',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'David Martinez',
      location: 'Building C, Floor 2',
      slaMinutes: 90,
    },
    {
      id: 'WO-2025-1150',
      title: 'Lighting System Upgrade',
      description: 'Install LED lighting fixtures in conference rooms',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Emily Rodriguez',
      location: 'Building A, Floor 4',
      slaMinutes: 240,
    },
    {
      id: 'WO-2025-1151',
      title: 'Door Lock Maintenance',
      description: 'Service and lubricate all electronic door locks',
      priority: 'low',
      status: 'completed',
      assignedTo: 'James Wilson',
      location: 'Building B, All Floors',
      slaMinutes: 480,
    },
    {
      id: 'WO-2025-1152',
      title: 'Fire Extinguisher Inspection',
      description: 'Monthly inspection and pressure check of all fire extinguishers',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Lisa Anderson',
      location: 'All Buildings',
      slaMinutes: 180,
    },
    {
      id: 'WO-2025-1153',
      title: 'Elevator Maintenance',
      description: 'Scheduled quarterly maintenance for passenger elevators',
      priority: 'critical',
      status: 'overdue',
      assignedTo: 'Robert Taylor',
      location: 'Building A, Elevators 1-4',
      slaMinutes: -30,
    },
    {
      id: 'WO-2025-1154',
      title: 'Roof Drainage Cleaning',
      description: 'Clear debris from roof drainage system before rainy season',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Maria Garcia',
      location: 'Building C, Rooftop',
      slaMinutes: 360,
    },
    {
      id: 'WO-2025-1155',
      title: 'Security Camera Adjustment',
      description: 'Realign security cameras in parking area for better coverage',
      priority: 'low',
      status: 'pending',
      assignedTo: 'Kevin Brown',
      location: 'Parking Area, Level 2',
      slaMinutes: 720,
    },
    {
      id: 'WO-2025-1156',
      title: 'HVAC Duct Cleaning',
      description: 'Deep cleaning of air ducts to improve air quality',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Amanda White',
      location: 'Building B, Floor 1',
      slaMinutes: 300,
    },
    {
      id: 'WO-2025-1157',
      title: 'Emergency Exit Sign Replacement',
      description: 'Replace non-functional emergency exit signs',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Thomas Lee',
      location: 'Building A, Stairwells',
      slaMinutes: 60,
    },
    {
      id: 'WO-2025-1158',
      title: 'Landscaping Maintenance',
      description: 'Trim hedges and maintain garden areas',
      priority: 'low',
      status: 'completed',
      assignedTo: 'Jennifer Davis',
      location: 'Grounds, Front Entrance',
      slaMinutes: 600,
    },
    {
      id: 'WO-2025-1159',
      title: 'Water Heater Inspection',
      description: 'Annual inspection and maintenance of water heating systems',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Christopher Moore',
      location: 'Building C, Mechanical Room',
      slaMinutes: 420,
    },
    {
      id: 'WO-2025-1160',
      title: 'Access Control System Update',
      description: 'Update access control software and test all card readers',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Patricia Martinez',
      location: 'All Buildings',
      slaMinutes: 150,
    },
    {
      id: 'WO-2025-1161',
      title: 'Parking Lot Line Painting',
      description: 'Repaint faded parking space lines and directional arrows',
      priority: 'low',
      status: 'pending',
      assignedTo: 'Daniel Thompson',
      location: 'Parking Area, All Levels',
      slaMinutes: 900,
    },
  ];

  const integrationsData = [
    {
      id: 1,
      name: 'CMMS System',
      status: 'connected',
      lastSync: '2 min ago',
    },
    {
      id: 2,
      name: 'ERP Integration',
      status: 'syncing',
      lastSync: 'In progress',
    },
    {
      id: 3,
      name: 'IoT Sensors',
      status: 'connected',
      lastSync: '5 min ago',
    },
  ];

  const savedViews = [
    { id: 1, name: 'Critical Only' },
    { id: 2, name: 'My Assignments' },
    { id: 3, name: 'Overdue Items' },
  ];

  const handleKPIClick = (kpiId) => {
    console.log('KPI clicked:', kpiId);
  };

  const handleAlertAction = (alertId, action) => {
    console.log('Alert action:', alertId, action);
  };

  const handleStatusChange = (orderId) => {
    console.log('Status change:', orderId);
  };

  const handleAssign = (orderId) => {
    console.log('Assign order:', orderId);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  const handleSaveView = () => {
    console.log('Save current view');
  };

  return (
    <SidebarProvider>
      <Helmet>
        <title>AnnexOperations Dashboard - CityDash</title>
        <meta
          name="description"
          content="Comprehensive Annexmanagement dashboard with real-time monitoring, work order tracking, and operational insights"
        />
      </Helmet>
      <div className="dark min-h-screen bg-background overflow-x-hidden">
        <MobileMenuButton />
        <Sidebar />

        <div className="main-content">
          <header className="sticky top-0 z-30 bg-card border-b border-border shadow-sm mb-6">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
                  AnnexOperations Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Real-time Annexmonitoring and management
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 flex-wrap">
                <FacilitySelector />
                <AlertCounter />
                <UserRoleIndicator />
              </div>
            </div>
          </header>

          <div className="space-y-6 px-4 sm:px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiData?.map((kpi) => (
                <KPICard
                  key={kpi?.id}
                  title={kpi?.title}
                  value={kpi?.value}
                  unit={kpi?.unit}
                  trend={kpi?.trend}
                  trendValue={kpi?.trendValue}
                  icon={kpi?.icon}
                  iconColor={kpi?.iconColor}
                  onClick={() => handleKPIClick(kpi?.id)}
                />
              ))}
            </div>

            <IntegrationStatus integrations={integrationsData} />

            <FilterToolbar
              onFilterChange={handleFilterChange}
              savedViews={savedViews}
              onSaveView={handleSaveView}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 min-h-[500px]">
                <AlertFeed alerts={alertsData} onAlertAction={handleAlertAction} />
              </div>
              <div className="lg:col-span-7 min-h-[500px]">
                <WorkOrderTable
                  workOrders={workOrdersData}
                  onStatusChange={handleStatusChange}
                  onAssign={handleAssign}
                />

              </div>
            </div>
          </div>
        </div>

        <QuickActionButton />
        <KeyboardShortcuts />
      </div>
    </SidebarProvider>
  );
};

export default FacilityOperationsDashboard;
