import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/Sidebar';
import Sidebar from '../../components/Sidebar';
import MobileMenuButton from '../../components/MobileMenuButton';
import AlertCounter from '../../components/ui/AlertCounter';
import FacilitySelector from '../../components/ui/FacilitySelector';
import UserRoleIndicator from '../../components/ui/UserRoleIndicator';
import QuickActionButton from '../../components/ui/QuickActionButton';
import MetricCard from './components/MetricCard';
import ConsumptionChart from './components/ConsumptionChart';
import AlertCard from './components/AlertCard';
import CostAnalysisChart from './components/CostAnalysisChart';
import UtilityBreakdown from './components/UtilityBreakdown';
import EquipmentEfficiency from './components/EquipmentEfficiency';
import FilterPanel from './components/FilterPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EnergyAndUtilitiesMonitoring = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const metricsData = [
    {
      title: "Current Usage",
      value: "1,247",
      unit: "kWh",
      change: "+5.2%",
      changeType: "negative",
      icon: "Zap",
      iconColor: "var(--color-primary)",
      trend: true
    },
    {
      title: "Monthly Cost",
      value: "$48,250",
      unit: "USD",
      change: "-8.1%",
      changeType: "positive",
      icon: "DollarSign",
      iconColor: "var(--color-success)",
      trend: true
    },
    {
      title: "Efficiency Rating",
      value: "87.3",
      unit: "%",
      change: "+2.4%",
      changeType: "positive",
      icon: "TrendingUp",
      iconColor: "var(--color-accent)",
      trend: true
    },
    {
      title: "Carbon Footprint",
      value: "24.8",
      unit: "tons CO₂",
      change: "-12.5%",
      changeType: "positive",
      icon: "Leaf",
      iconColor: "var(--color-success)",
      trend: true
    }
  ];

  const consumptionData = [
    { time: "00:00", consumption: 850, baseline: 900 },
    { time: "03:00", consumption: 720, baseline: 800 },
    { time: "06:00", consumption: 980, baseline: 950 },
    { time: "09:00", consumption: 1450, baseline: 1400 },
    { time: "12:00", consumption: 1680, baseline: 1600 },
    { time: "15:00", consumption: 1520, baseline: 1550 },
    { time: "18:00", consumption: 1380, baseline: 1450 },
    { time: "21:00", consumption: 1120, baseline: 1200 }
  ];

  const costAnalysisData = [
    { period: "Week 1", actualCost: 11200, budgetedCost: 12000, savings: 800 },
    { period: "Week 2", actualCost: 10800, budgetedCost: 12000, savings: 1200 },
    { period: "Week 3", actualCost: 12400, budgetedCost: 12000, savings: -400 },
    { period: "Week 4", actualCost: 11850, budgetedCost: 12000, savings: 150 }
  ];

  const utilityBreakdownData = [
    { name: "Electricity", value: 45200, percentage: 52, cost: 22600 },
    { name: "HVAC", value: 21800, percentage: 25, cost: 10900 },
    { name: "Lighting", value: 12400, percentage: 14, cost: 6200 },
    { name: "Water", value: 5200, percentage: 6, cost: 2600 },
    { name: "Natural Gas", value: 2600, percentage: 3, cost: 1300 }
  ];

  const equipmentData = [
    {
      id: "EQ-001",
      name: "Chiller Unit A",
      location: "Building A - Basement",
      icon: "Wind",
      efficiency: 92,
      status: "optimal",
      currentLoad: 145,
      maxLoad: 200,
      runtime: 18.5,
      alerts: []
    },
    {
      id: "EQ-002",
      name: "Boiler System B",
      location: "Building B - Mechanical Room",
      icon: "Flame",
      efficiency: 78,
      status: "warning",
      currentLoad: 168,
      maxLoad: 180,
      runtime: 22.3,
      alerts: ["Operating above optimal efficiency threshold"]
    },
    {
      id: "EQ-003",
      name: "Lighting Control Panel",
      location: "Building A - Floor 3",
      icon: "Lightbulb",
      efficiency: 95,
      status: "optimal",
      currentLoad: 42,
      maxLoad: 80,
      runtime: 12.8,
      alerts: []
    },
    {
      id: "EQ-004",
      name: "Air Handler Unit C",
      location: "Building C - Roof",
      icon: "Fan",
      efficiency: 65,
      status: "critical",
      currentLoad: 95,
      maxLoad: 120,
      runtime: 24.0,
      alerts: ["Efficiency below 70% - maintenance required"]
    }
  ];

  const alertsData = [
    {
      id: "ALT-001",
      severity: "critical",
      title: "Abnormal Consumption Spike Detected",
      description: "Building A electricity usage exceeded baseline by 45% in the last hour. Immediate investigation recommended.",
      location: "Building A - Floor 2",
      metric: "1,847 kWh (45% above baseline)",
      timestamp: new Date(Date.now() - 15 * 60000)
    },
    {
      id: "ALT-002",
      severity: "warning",
      title: "HVAC System Operating Below Efficiency",
      description: "Chiller Unit B efficiency dropped to 68%. Schedule maintenance to prevent further degradation.",
      location: "Building B - Mechanical Room",
      metric: "68% efficiency (target: 85%)",
      timestamp: new Date(Date.now() - 45 * 60000)
    },
    {
      id: "ALT-003",
      severity: "warning",
      title: "Budget Threshold Approaching",
      description: "Monthly energy costs at 92% of allocated budget with 8 days remaining in billing cycle.",
      location: "All Facilities",
      metric: "$55,200 / $60,000 budget",
      timestamp: new Date(Date.now() - 2 * 3600000)
    },
    {
      id: "ALT-004",
      severity: "info",
      title: "Peak Demand Period Starting",
      description: "Utility rates will increase by 35% during peak hours (2:00 PM - 8:00 PM). Consider load shifting.",
      location: "All Facilities",
      metric: "Rate: $0.18/kWh → $0.24/kWh",
      timestamp: new Date(Date.now() - 4 * 3600000)
    },
    {
      id: "ALT-005",
      severity: "info",
      title: "Renewable Energy Generation Active",
      description: "Solar panels generating 420 kW, offsetting 28% of current facility consumption.",
      location: "Building A - Rooftop",
      metric: "420 kW generation",
      timestamp: new Date(Date.now() - 6 * 3600000)
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'consumption', label: 'Consumption', icon: 'Activity' },
    { id: 'cost', label: 'Cost Analysis', icon: 'DollarSign' },
    { id: 'equipment', label: 'Equipment', icon: 'Settings' }
  ];

  const handleApplyFilters = (filters) => {
    console.log('Applying filters:', filters);
  };

  const handleResetFilters = () => {
    console.log('Resetting filters');
  };

  const handleExportData = () => {
    console.log('Exporting energy data');
  };

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="main-content flex items-center justify-center">
            <div className="text-center">
              <Icon name="Loader2" size={48} color="var(--color-primary)" className="animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading energy monitoring data...</p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="dark min-h-screen bg-background">
        <Sidebar />
        <MobileMenuButton />
        
        <div className="main-content">
          <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border mb-6">
            <div className="flex items-center justify-between py-4">
              <div>
                <h1 className="text-2xl font-semibold text-foreground mb-1">Energy & Utilities Monitoring</h1>
                <p className="text-sm text-muted-foreground">Real-time consumption tracking and cost optimization</p>
              </div>
              <div className="flex items-center gap-3">
                <AlertCounter />
                <FacilitySelector />
                <UserRoleIndicator />
                <Button variant="default" iconName="Download" iconPosition="left" onClick={handleExportData}>
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metricsData?.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            <FilterPanel onApplyFilters={handleApplyFilters} onResetFilters={handleResetFilters} />

            <div className="bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 p-2 border-b border-border overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} color={activeTab === tab?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />
                    {tab?.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <ConsumptionChart data={consumptionData} title="Real-Time Energy Consumption" type="line" />
                  <CostAnalysisChart data={costAnalysisData} />
                </div>
                <div className="space-y-6">
                  <UtilityBreakdown data={utilityBreakdownData} />
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Active Alerts</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-error/10 text-error font-medium">
                        {alertsData?.length} Active
                      </span>
                    </div>
                    <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin">
                      {alertsData?.map((alert) => (
                        <AlertCard key={alert?.id} alert={alert} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'consumption' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ConsumptionChart data={consumptionData} title="Hourly Consumption Trends" type="area" />
                <ConsumptionChart data={consumptionData} title="Consumption vs Baseline" type="bar" />
                <div className="lg:col-span-2">
                  <UtilityBreakdown data={utilityBreakdownData} />
                </div>
              </div>
            )}

            {activeTab === 'cost' && (
              <div className="space-y-6">
                <CostAnalysisChart data={costAnalysisData} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Cost Breakdown by Facility</h3>
                    <div className="space-y-4">
                      {[
                        { name: "Building A - Main Campus", cost: 18500, percentage: 38 },
                        { name: "Building B - North Wing", cost: 14200, percentage: 29 },
                        { name: "Building C - South Complex", cost: 10800, percentage: 22 },
                        { name: "Building D - East Facility", cost: 4750, percentage: 11 }
                      ]?.map((facility, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-foreground font-medium">{facility?.name}</span>
                            <span className="text-foreground font-semibold">${facility?.cost?.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-primary transition-all duration-300"
                              style={{ width: `${facility?.percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">{facility?.percentage}% of total cost</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <UtilityBreakdown data={utilityBreakdownData} />
                </div>
              </div>
            )}

            {activeTab === 'equipment' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EquipmentEfficiency equipment={equipmentData} />
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Equipment Status Summary</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-success/10">
                        <Icon name="CheckCircle2" size={32} color="var(--color-success)" className="mx-auto mb-2" />
                        <p className="text-2xl font-semibold text-success">2</p>
                        <p className="text-xs text-muted-foreground">Optimal</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-warning/10">
                        <Icon name="AlertCircle" size={32} color="var(--color-warning)" className="mx-auto mb-2" />
                        <p className="text-2xl font-semibold text-warning">1</p>
                        <p className="text-xs text-muted-foreground">Warning</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-error/10">
                        <Icon name="AlertTriangle" size={32} color="var(--color-error)" className="mx-auto mb-2" />
                        <p className="text-2xl font-semibold text-error">1</p>
                        <p className="text-xs text-muted-foreground">Critical</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Maintenance Schedule</h3>
                    <div className="space-y-3">
                      {[
                        { equipment: "Chiller Unit A", date: "Nov 25, 2025", type: "Preventive" },
                        { equipment: "Boiler System B", date: "Nov 22, 2025", type: "Corrective" },
                        { equipment: "Air Handler C", date: "Nov 21, 2025", type: "Emergency" }
                      ]?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <div>
                            <p className="text-sm font-medium text-foreground">{item?.equipment}</p>
                            <p className="text-xs text-muted-foreground">{item?.date}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            item?.type === 'Emergency' ? 'bg-error/10 text-error' :
                            item?.type === 'Corrective'? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
                          }`}>
                            {item?.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <QuickActionButton />
      </div>
    </SidebarProvider>
  );
};

export default EnergyAndUtilitiesMonitoring;