import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/Sidebar';
import Sidebar from '../../components/Sidebar';
import MobileMenuButton from '../../components/MobileMenuButton';
import AlertCounter from '../../components/ui/AlertCounter';
import FacilitySelector from '../../components/ui/FacilitySelector';
import UserRoleIndicator from '../../components/ui/UserRoleIndicator';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import ReportTemplateCard from './components/ReportTemplateCard';
import DataSourceSelector from './components/DataSourceSelector';
import SavedReportItem from './components/SavedReportItem';
import ChartVisualization from './components/ChartVisualization';
import FilterPanel from './components/FilterPanel';
import ExportOptions from './components/ExportOptions';
import KPICard from './components/KPICard';
import DataTable from './components/DataTable';

const AnalyticsAndReportingDashboard = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedSources, setSelectedSources] = useState(['WO-001', 'TK-001', 'AS-001']);
  const [activeView, setActiveView] = useState('builder');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [filters, setFilters] = useState({
    facility: 'all',
    period: 'month',
    department: 'all',
    startDate: '',
    endDate: ''
  });

  const reportTemplates = [
    {
      id: 'RPT-001',
      name: 'Facility Performance Overview',
      description: 'Comprehensive analysis of facility operations, maintenance efficiency, and resource utilization',
      category: 'Performance',
      icon: 'BarChart3',
      lastUsed: '2 hours ago',
      isNew: false
    },
    {
      id: 'RPT-002',
      name: 'Maintenance Cost Analysis',
      description: 'Detailed breakdown of maintenance expenses, labor costs, and budget variance tracking',
      category: 'Financial',
      icon: 'DollarSign',
      lastUsed: 'Yesterday',
      isNew: false
    },
    {
      id: 'RPT-003',
      name: 'Energy Consumption Report',
      description: 'Energy usage patterns, cost trends, and efficiency recommendations across all facilities',
      category: 'Energy',
      icon: 'Zap',
      lastUsed: '3 days ago',
      isNew: true
    },
    {
      id: 'RPT-004',
      name: 'Work Order Analytics',
      description: 'Work order completion rates, response times, and technician performance metrics',
      category: 'Maintenance',
      icon: 'ClipboardList',
      lastUsed: 'Last week',
      isNew: false
    },
    {
      id: 'RPT-005',
      name: 'Compliance Dashboard',
      description: 'Regulatory compliance status, audit findings, and corrective action tracking',
      category: 'Compliance',
      icon: 'Shield',
      lastUsed: '2 weeks ago',
      isNew: true
    },
    {
      id: 'RPT-006',
      name: 'Asset Lifecycle Report',
      description: 'Asset age analysis, depreciation tracking, and replacement planning recommendations',
      category: 'Performance',
      icon: 'Package',
      lastUsed: 'Last month',
      isNew: false
    }
  ];

  const dataSources = [
    {
      id: 'WO-001',
      name: 'Work Orders',
      category: 'Facility Data',
      recordCount: 15847,
      status: 'connected'
    },
    {
      id: 'TK-001',
      name: 'Tickets',
      category: 'Facility Data',
      recordCount: 8923,
      status: 'connected'
    },
    {
      id: 'AS-001',
      name: 'Assets',
      category: 'Facility Data',
      recordCount: 3456,
      status: 'connected'
    },
    {
      id: 'EN-001',
      name: 'Energy',
      category: 'Facility Data',
      recordCount: 52341,
      status: 'connected'
    },
    {
      id: 'WF-001',
      name: 'Workforce',
      category: 'Facility Data',
      recordCount: 287,
      status: 'connected'
    },
    {
      id: 'FN-001',
      name: 'Financial',
      category: 'External Systems',
      recordCount: 12456,
      status: 'connected'
    },
    {
      id: 'CM-001',
      name: 'Compliance',
      category: 'External Systems',
      recordCount: 1834,
      status: 'warning'
    }
  ];

  const savedReports = [
    {
      id: 'SR-001',
      name: 'Q4 Performance Summary',
      format: 'PDF',
      lastModified: '2 hours ago',
      size: '2.4 MB'
    },
    {
      id: 'SR-002',
      name: 'Monthly Maintenance Costs',
      format: 'Excel',
      lastModified: 'Yesterday',
      size: '1.8 MB'
    },
    {
      id: 'SR-003',
      name: 'Energy Efficiency Dashboard',
      format: 'PowerBI',
      lastModified: '3 days ago',
      size: '5.2 MB'
    },
    {
      id: 'SR-004',
      name: 'Annual Compliance Report',
      format: 'PDF',
      lastModified: 'Last week',
      size: '3.1 MB'
    }
  ];

  const kpiData = [
    {
      id: 'KPI-001',
      label: 'Total Work Orders',
      value: '1,847',
      trend: 12.5,
      comparison: 'last month',
      icon: 'ClipboardList',
      color: 'var(--color-primary)'
    },
    {
      id: 'KPI-002',
      label: 'Avg Response Time',
      value: '2.3 hrs',
      trend: -8.2,
      comparison: 'last month',
      icon: 'Clock',
      color: 'var(--color-success)'
    },
    {
      id: 'KPI-003',
      label: 'Energy Savings',
      value: '$45.2K',
      trend: 15.8,
      comparison: 'last quarter',
      icon: 'Zap',
      color: 'var(--color-accent)'
    },
    {
      id: 'KPI-004',
      label: 'Compliance Rate',
      value: '98.5%',
      trend: 2.1,
      comparison: 'last audit',
      icon: 'Shield',
      color: 'var(--color-warning)'
    }
  ];

  const performanceChartData = [
    { month: 'Jan', workOrders: 145, tickets: 89, completion: 92 },
    { month: 'Feb', workOrders: 168, tickets: 102, completion: 88 },
    { month: 'Mar', workOrders: 192, tickets: 115, completion: 94 },
    { month: 'Apr', workOrders: 178, tickets: 98, completion: 91 },
    { month: 'May', workOrders: 205, tickets: 124, completion: 96 },
    { month: 'Jun', workOrders: 189, tickets: 107, completion: 93 }
  ];

  const costBreakdownData = [
    { name: 'Labor', value: 45000 },
    { name: 'Materials', value: 28000 },
    { name: 'Equipment', value: 18000 },
    { name: 'Contractors', value: 15000 },
    { name: 'Other', value: 8000 }
  ];

  const energyTrendData = [
    { month: 'Jan', consumption: 12500, cost: 3750 },
    { month: 'Feb', consumption: 11800, cost: 3540 },
    { month: 'Mar', consumption: 10900, cost: 3270 },
    { month: 'Apr', consumption: 9800, cost: 2940 },
    { month: 'May', consumption: 10200, cost: 3060 },
    { month: 'Jun', consumption: 11500, cost: 3450 }
  ];

  const tableData = [
    {
      facility: 'Main Campus',
      workOrders: 487,
      avgResponse: '2.1 hrs',
      completion: '94%',
      cost: '$28,450'
    },
    {
      facility: 'North Wing',
      workOrders: 356,
      avgResponse: '2.5 hrs',
      completion: '91%',
      cost: '$21,230'
    },
    {
      facility: 'South Complex',
      workOrders: 423,
      avgResponse: '2.3 hrs',
      completion: '93%',
      cost: '$25,680'
    },
    {
      facility: 'East Facility',
      workOrders: 298,
      avgResponse: '2.8 hrs',
      completion: '89%',
      cost: '$18,920'
    }
  ];

  const tableColumns = [
    { key: 'facility', label: 'Facility', sortable: true },
    { key: 'workOrders', label: 'Work Orders', sortable: true },
    { key: 'avgResponse', label: 'Avg Response', sortable: true },
    { key: 'completion', label: 'Completion Rate', sortable: true },
    { key: 'cost', label: 'Total Cost', sortable: true }
  ];

  const handleSourceToggle = (sourceId) => {
    setSelectedSources((prev) =>
      prev?.includes(sourceId) ? prev?.filter((id) => id !== sourceId) : [...prev, sourceId]
    );
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setLastRefresh(new Date());
    console.log('Applying filters:', filters);
  };

  const handleResetFilters = () => {
    setFilters({
      facility: 'all',
      period: 'month',
      department: 'all',
      startDate: '',
      endDate: ''
    });
  };

  const handleExport = (exportConfig) => {
    console.log('Exporting report:', exportConfig);
  };

  const handleOpenReport = (report) => {
    console.log('Opening report:', report);
  };

  const handleDeleteReport = (report) => {
    console.log('Deleting report:', report);
  };

  const handleScheduleReport = (report) => {
    console.log('Scheduling report:', report);
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  useEffect(() => {
    document.title = 'Analytics & Reporting Dashboard - FacilityPro';
  }, []);

  return (
    <SidebarProvider>
      <div className="dark min-h-screen bg-background">
        <MobileMenuButton />
        <Sidebar />

        <div className="main-content">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-card border-b border-border mb-6 -mx-6 -mt-6 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  Analytics & Reporting Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Transform facility data into actionable insights
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FacilitySelector />
                <AlertCounter />
                <UserRoleIndicator />
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  iconName="RefreshCw"
                  iconSize={16}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </header>

          {/* View Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-border">
            <button
              onClick={() => setActiveView('builder')}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeView === 'builder' ?'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Report Builder
              {activeView === 'builder' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeView === 'dashboard' ?'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Analytics Dashboard
              {activeView === 'dashboard' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {activeView === 'builder' ? (
            <div className="grid grid-cols-12 gap-6">
              {/* Left Panel - Templates & Sources */}
              <div className="col-span-12 lg:col-span-3 space-y-6">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h2 className="text-sm font-semibold text-foreground mb-4">
                    Report Templates
                  </h2>
                  <div className="space-y-3">
                    {reportTemplates?.map((template) => (
                      <ReportTemplateCard
                        key={template?.id}
                        template={template}
                        onSelect={setSelectedTemplate}
                        isSelected={selectedTemplate?.id === template?.id}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h2 className="text-sm font-semibold text-foreground mb-4">Data Sources</h2>
                  <DataSourceSelector
                    sources={dataSources}
                    selectedSources={selectedSources}
                    onSourceToggle={handleSourceToggle}
                  />
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h2 className="text-sm font-semibold text-foreground mb-4">Saved Reports</h2>
                  <div className="space-y-2">
                    {savedReports?.map((report) => (
                      <SavedReportItem
                        key={report?.id}
                        report={report}
                        onOpen={handleOpenReport}
                        onDelete={handleDeleteReport}
                        onSchedule={handleScheduleReport}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Panel - Workspace */}
              <div className="col-span-12 lg:col-span-6 space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        {selectedTemplate?.name || 'Select a Template'}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Last updated: {lastRefresh?.toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" iconName="Settings" iconSize={14}>
                        Configure
                      </Button>
                      <Button variant="default" size="sm" iconName="Play" iconSize={14}>
                        Generate
                      </Button>
                    </div>
                  </div>

                  {selectedTemplate ? (
                    <div className="space-y-6">
                      <div className="h-80 border border-border rounded-lg p-4">
                        <ChartVisualization
                          type="bar"
                          data={performanceChartData}
                          config={{
                            title: 'Performance Metrics',
                            xKey: 'month',
                            bars: [
                              { dataKey: 'workOrders' },
                              { dataKey: 'tickets' },
                              { dataKey: 'completion' }
                            ]
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-64 border border-border rounded-lg p-4">
                          <ChartVisualization
                            type="pie"
                            data={costBreakdownData}
                            config={{
                              title: 'Cost Breakdown',
                              valueKey: 'value'
                            }}
                          />
                        </div>
                        <div className="h-64 border border-border rounded-lg p-4">
                          <ChartVisualization
                            type="line"
                            data={energyTrendData}
                            config={{
                              title: 'Energy Trends',
                              xKey: 'month',
                              lines: [{ dataKey: 'consumption' }, { dataKey: 'cost' }]
                            }}
                          />
                        </div>
                      </div>

                      <DataTable data={tableData} columns={tableColumns} title="Facility Performance" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-96 text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                        <Icon name="BarChart3" size={32} color="var(--color-muted-foreground)" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No Template Selected
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Choose a report template from the left panel to start building your custom
                        analytics report
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Panel - Filters & Export */}
              <div className="col-span-12 lg:col-span-3 space-y-6">
                <div className="bg-card border border-border rounded-lg p-4">
                  <FilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onApply={handleApplyFilters}
                    onReset={handleResetFilters}
                  />
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <ExportOptions onExport={handleExport} />
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-4">
                    Integration Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Database" size={16} color="var(--color-success)" />
                        <span className="text-sm text-foreground">Facility Systems</span>
                      </div>
                      <span className="text-xs text-success">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Cloud" size={16} color="var(--color-success)" />
                        <span className="text-sm text-foreground">External APIs</span>
                      </div>
                      <span className="text-xs text-success">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Server" size={16} color="var(--color-warning)" />
                        <span className="text-sm text-foreground">Analytics Engine</span>
                      </div>
                      <span className="text-xs text-warning">Syncing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData?.map((kpi) => (
                  <KPICard key={kpi?.id} kpi={kpi} />
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Performance Trends
                  </h3>
                  <div className="h-80">
                    <ChartVisualization
                      type="bar"
                      data={performanceChartData}
                      config={{
                        title: 'Performance Metrics',
                        xKey: 'month',
                        bars: [
                          { dataKey: 'workOrders' },
                          { dataKey: 'tickets' },
                          { dataKey: 'completion' }
                        ]
                      }}
                    />
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Energy Consumption
                  </h3>
                  <div className="h-80">
                    <ChartVisualization
                      type="line"
                      data={energyTrendData}
                      config={{
                        title: 'Energy Trends',
                        xKey: 'month',
                        lines: [{ dataKey: 'consumption' }, { dataKey: 'cost' }]
                      }}
                    />
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Cost Distribution</h3>
                  <div className="h-80">
                    <ChartVisualization
                      type="pie"
                      data={costBreakdownData}
                      config={{
                        title: 'Cost Breakdown',
                        valueKey: 'value'
                      }}
                    />
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Predictive Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                      <div className="flex items-start gap-3">
                        <Icon name="TrendingUp" size={20} color="var(--color-success)" />
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            Efficiency Improvement
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Work order completion rate projected to increase by 8% next quarter
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                      <div className="flex items-start gap-3">
                        <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            Maintenance Alert
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            3 assets approaching end of lifecycle - replacement planning recommended
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <div className="flex items-start gap-3">
                        <Icon name="Zap" size={20} color="var(--color-accent)" />
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            Energy Optimization
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Potential savings of $12K identified through consumption pattern analysis
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <DataTable data={tableData} columns={tableColumns} title="Facility Performance Summary" />
            </div>
          )}
        </div>

        <QuickActionButton />
      </div>
    </SidebarProvider>
  );
};

export default AnalyticsAndReportingDashboard;