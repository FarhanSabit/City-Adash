import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';

// Import components
import ChartWidget from './components/ChartWidget';
import ReportBuilder from './components/ReportBuilder';
import FilterPanel from './components/FilterPanel';
import ExportModal from './components/ExportModal';
import KPIGrid from './components/KPIGrid';
import ReportsList from './components/ReportsList';

const MaintenanceReportingAnalytics = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('30d');
  const [isReportBuilderOpen, setIsReportBuilderOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Mock chart data
  const workOrderTrendsData = [
  { name: 'Jan', value: 145 },
  { name: 'Feb', value: 132 },
  { name: 'Mar', value: 158 },
  { name: 'Apr', value: 142 },
  { name: 'May', value: 167 },
  { name: 'Jun', value: 153 },
  { name: 'Jul', value: 171 }];


  const equipmentReliabilityData = [
  { name: 'HVAC', value: 94.2 },
  { name: 'Electrical', value: 97.8 },
  { name: 'Plumbing', value: 89.5 },
  { name: 'Elevators', value: 96.1 },
  { name: 'Security', value: 98.3 },
  { name: 'Lighting', value: 92.7 }];


  const costAnalysisData = [
  { name: 'Labor', value: 45.2 },
  { name: 'Parts', value: 32.8 },
  { name: 'Contractors', value: 15.3 },
  { name: 'Equipment', value: 6.7 }];


  const technicianPerformanceData = [
  { name: 'John Doe', value: 87.5 },
  { name: 'Jane Smith', value: 92.3 },
  { name: 'Mike Johnson', value: 85.1 },
  { name: 'Sarah Wilson', value: 94.7 },
  { name: 'David Brown', value: 88.9 }];


  const timeRangeOptions = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '1y', label: 'Last Year' }];


  const tabs = [
  { id: 'dashboard', label: 'Analytics Dashboard', icon: 'BarChart3' },
  { id: 'reports', label: 'Saved Reports', icon: 'FileText' },
  { id: 'builder', label: 'Report Builder', icon: 'Settings' }];


  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    console.log('Applied filters:', filters);
  };

  const handleExport = (config) => {
    console.log('Export configuration:', config);
    // Handle export logic here
  };

  const handleSaveReport = (reportConfig) => {
    console.log('Saved report:', reportConfig);
    // Handle save report logic here
  };

  const handleViewReport = (report) => {
    console.log('View report:', report);
    // Handle view report logic here
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    console.log('Search query:', searchQuery);
  };

  useEffect(() => {
    document.title = 'Maintenance Reporting & Analytics - FacilityPro';
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="p-8 space-y-8">
          {/* Page Header with Elegant Design */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-3">
                <h1 className="font-bold text-gradient text-3xl">Maintenance Reporting & Analytics</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Comprehensive business intelligence platform for maintenance operations performance with real-time insights and predictive analytics
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <form onSubmit={handleSearch} className="flex items-center space-x-3">
                  <Input
                    type="search"
                    placeholder="Search reports, metrics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="input-elegant w-80 text-sm" />

                  <Button type="submit" className="btn-elegant">
                    <Icon name="Search" size={18} />
                  </Button>
                </form>
                <Button
                  onClick={() => setIsFilterPanelOpen(true)}
                  className="btn-elegant"
                  iconName="Filter"
                  iconPosition="left">

                  Filters
                </Button>
                <Button
                  onClick={() => setIsExportModalOpen(true)}
                  className="btn-elegant"
                  iconName="Download"
                  iconPosition="left">

                  Export
                </Button>
              </div>
            </div>

            {/* Enhanced Tabs with Glassmorphism */}
            <div className="glass-card rounded-2xl p-2">
              <div className="flex items-center space-x-2">
                {tabs?.map((tab) =>
                <Button
                  key={tab?.id}
                  variant={activeTab === tab?.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-smooth font-medium ${
                  activeTab === tab?.id ?
                  'bg-primary text-white shadow-glow' :
                  'hover:bg-white/50 hover-lift'}`
                  }>

                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' &&
          <div className="space-y-10">
              {/* Time Range Selector */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Performance Overview</h2>
                <div className="glass-card rounded-xl p-1">
                  <Select
                  options={timeRangeOptions}
                  value={timeRange}
                  onChange={setTimeRange}
                  className="w-48 border-0 bg-transparent" />

                </div>
              </div>

              {/* Enhanced KPI Grid */}
              <div className="card-elegant">
                <KPIGrid timeRange={timeRange} />
              </div>

              {/* Charts Grid with Enhanced Design */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card-elegant hover-glow">
                  <ChartWidget
                  title="Work Order Trends"
                  type="line"
                  data={workOrderTrendsData}
                  height={320} />

                </div>
                <div className="card-elegant hover-glow">
                  <ChartWidget
                  title="Equipment Reliability (%)"
                  type="bar"
                  data={equipmentReliabilityData}
                  height={320} />

                </div>
                <div className="card-elegant hover-glow">
                  <ChartWidget
                  title="Cost Distribution"
                  type="pie"
                  data={costAnalysisData}
                  height={320} />

                </div>
                <div className="card-elegant hover-glow">
                  <ChartWidget
                  title="Technician Performance"
                  type="bar"
                  data={technicianPerformanceData}
                  height={320} />

                </div>
              </div>

              {/* Enhanced Predictive Analytics Section */}
              <div className="card-premium">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">Predictive Analytics</h3>
                    <p className="text-muted-foreground">AI-powered insights for proactive maintenance planning</p>
                  </div>
                  <Button className="btn-elegant">
                    <Icon name="RefreshCw" size={18} className="mr-2" />
                    Refresh Predictions
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="glass-card rounded-2xl p-6 hover-lift border-l-4 border-l-warning">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                        <Icon name="AlertTriangle" size={24} className="text-warning" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">Equipment Risk</h4>
                        <p className="text-sm text-warning font-medium">High Priority</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      HVAC Unit #7 shows 78% probability of failure within 30 days based on performance analytics
                    </p>
                    <Button variant="outline" size="sm" className="hover-lift">
                      View Detailed Analysis
                    </Button>
                  </div>
                  <div className="glass-card rounded-2xl p-6 hover-lift border-l-4 border-l-primary">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon name="TrendingUp" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">Budget Forecast</h4>
                        <p className="text-sm text-primary font-medium">Q2 2025 Projection</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Projected 12% increase in maintenance costs for Q2 2025 due to equipment aging patterns
                    </p>
                    <Button variant="outline" size="sm" className="hover-lift">
                      View Budget Forecast
                    </Button>
                  </div>
                  <div className="glass-card rounded-2xl p-6 hover-lift border-l-4 border-l-success">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                        <Icon name="CheckCircle" size={24} className="text-success" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">Optimization</h4>
                        <p className="text-sm text-success font-medium">Cost Savings Available</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Optimized preventive maintenance scheduling can reduce operational costs by 15%
                    </p>
                    <Button variant="outline" size="sm" className="hover-lift">
                      Implement Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          }

          {/* Reports Tab */}
          {activeTab === 'reports' &&
          <div className="space-y-8">
              <div className="card-elegant">
                <ReportsList
                onCreateReport={() => setIsReportBuilderOpen(true)}
                onViewReport={handleViewReport} />

              </div>
            </div>
          }

          {/* Builder Tab */}
          {activeTab === 'builder' &&
          <div className="space-y-8">
              <div className="card-premium text-center py-16">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <Icon name="BarChart3" size={40} className="text-primary" />
                </div>
                <h3 className="text-3xl font-semibold text-foreground mb-4">Custom Report Builder</h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                  Create sophisticated custom reports with intuitive drag-and-drop chart creation, 
                  advanced data source selection, and automated scheduling for executive delivery.
                </p>
                <Button
                onClick={() => setIsReportBuilderOpen(true)}
                iconName="Plus"
                iconPosition="left"
                size="lg"
                className="btn-elegant text-lg px-8 py-4">

                  Create New Report
                </Button>
              </div>

              {/* Enhanced Quick Templates */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Report Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                {
                  title: 'Executive Summary',
                  description: 'High-level KPIs and strategic trends for executive review and board presentations',
                  icon: 'FileText',
                  color: 'primary',
                  accent: 'border-l-primary'
                },
                {
                  title: 'Technician Performance',
                  description: 'Comprehensive individual and team performance metrics with productivity insights',
                  icon: 'Users',
                  color: 'success',
                  accent: 'border-l-success'
                },
                {
                  title: 'Cost Analysis',
                  description: 'Detailed financial breakdown, budget variance analysis and ROI calculations',
                  icon: 'DollarSign',
                  color: 'warning',
                  accent: 'border-l-warning'
                },
                {
                  title: 'Equipment Health',
                  description: 'Asset reliability metrics, maintenance history and predictive failure analysis',
                  icon: 'Activity',
                  color: 'error',
                  accent: 'border-l-error'
                },
                {
                  title: 'SLA Compliance',
                  description: 'Service level agreement tracking with client satisfaction and performance metrics',
                  icon: 'Target',
                  color: 'secondary',
                  accent: 'border-l-secondary'
                },
                {
                  title: 'Inventory Report',
                  description: 'Parts usage analysis, stock level optimization and procurement recommendations',
                  icon: 'Package',
                  color: 'primary',
                  accent: 'border-l-accent'
                }]?.
                map((template, index) =>
                <div key={index} className={`card-elegant hover-glow cursor-pointer border-l-4 ${template?.accent}`}>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-${template?.color}/10 shadow-soft`}>
                        <Icon name={template?.icon} size={28} className={`text-${template?.color}`} />
                      </div>
                      <h4 className="font-semibold text-foreground text-xl mb-3">{template?.title}</h4>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{template?.description}</p>
                      <Button variant="outline" size="sm" fullWidth className="hover-lift">
                        Use Template
                      </Button>
                    </div>
                )}
                </div>
              </div>
            </div>
          }
        </div>
      </main>
      {/* Enhanced Modals */}
      <ReportBuilder
        isOpen={isReportBuilderOpen}
        onClose={() => setIsReportBuilderOpen(false)}
        onSave={handleSaveReport} />

      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={appliedFilters} />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport} />

      <QuickActionButton />
    </div>);

};

export default MaintenanceReportingAnalytics;