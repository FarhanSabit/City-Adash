import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';

// Import all configuration components
import GeneralSettings from './components/GeneralSettings';
import WorkOrderConfiguration from './components/WorkOrderConfiguration';
import EquipmentManagement from './components/EquipmentManagement';
import NotificationRules from './components/NotificationRules';
import IntegrationSettings from './components/IntegrationSettings';
import SecurityPolicies from './components/SecurityPolicies';

const SystemConfigurationSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const configurationTabs = [
  {
    id: 'general',
    label: 'General Settings',
    icon: 'Settings',
    description: 'System-wide configuration and defaults',
    component: GeneralSettings
  },
  {
    id: 'workflow',
    label: 'Work Order Config',
    icon: 'GitBranch',
    description: 'Work order workflows and priorities',
    component: WorkOrderConfiguration
  },
  {
    id: 'equipment',
    label: 'Equipment Management',
    icon: 'Package',
    description: 'Asset categories and maintenance settings',
    component: EquipmentManagement
  },
  {
    id: 'notifications',
    label: 'Notification Rules',
    icon: 'Bell',
    description: 'Email templates and escalation rules',
    component: NotificationRules
  },
  {
    id: 'integrations',
    label: 'Integration Settings',
    icon: 'Link',
    description: 'External system connections and APIs',
    component: IntegrationSettings
  },
  {
    id: 'security',
    label: 'Security Policies',
    icon: 'Shield',
    description: 'Authentication and compliance settings',
    component: SecurityPolicies
  }];


  const activeTabData = configurationTabs?.find((tab) => tab?.id === activeTab);
  const ActiveComponent = activeTabData?.component;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleExportConfig = () => {
    console.log('Exporting system configuration...');
    // Handle configuration export logic here
  };

  const handleImportConfig = () => {
    console.log('Importing system configuration...');
    // Handle configuration import logic here
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
      console.log('Resetting to default configuration...');
      // Handle reset to defaults logic here
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl items-center justify-center hidden">
                  <Icon name="Cog" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">System Configuration</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage system-wide settings and operational parameters
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleImportConfig}
                  iconName="Upload"
                  iconPosition="left">

                  Import Config
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportConfig}
                  iconName="Download"
                  iconPosition="left">

                  Export Config
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleResetToDefaults}
                  iconName="RotateCcw"
                  iconPosition="left">

                  Reset to Defaults
                </Button>
              </div>
            </div>
          </div>

          {/* Configuration Tabs */}
          <div className="bg-card border border-border rounded-lg shadow-soft">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex overflow-x-auto">
                {configurationTabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => handleTabChange(tab?.id)}
                  className={`flex items-center space-x-3 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab?.id ?
                  'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'}`
                  }>

                    <Icon name={tab?.icon} size={18} />
                    <div className="text-left">
                      <div className="font-medium">{tab?.label}</div>
                      <div className="text-xs text-muted-foreground hidden lg:block">
                        {tab?.description}
                      </div>
                    </div>
                  </button>
                )}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>

          {/* System Status Footer */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">System Status</p>
                  <p className="text-xs text-success">Operational</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Database" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Database</p>
                  <p className="text-xs text-primary">Connected</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={16} className="text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Last Backup</p>
                  <p className="text-xs text-warning">2 hours ago</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Active Users</p>
                  <p className="text-xs text-accent">127 online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <QuickActionButton />
    </div>);

};

export default SystemConfigurationSettings;