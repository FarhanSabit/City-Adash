import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    businessHours: {
      start: '08:00',
      end: '18:00',
      timezone: 'America/New_York'
    },
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    defaultPriority: 'medium',
    autoAssignment: true,
    maintenanceWindow: '02:00'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'UTC', label: 'Coordinated Universal Time (UTC)' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US Format)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (International)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO Format)' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'critical', label: 'Critical Priority' }
  ];

  const handleInputChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }));
    }
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving general settings:', settings);
    setHasChanges(false);
    // Handle save logic here
  };

  const handleReset = () => {
    setSettings({
      businessHours: {
        start: '08:00',
        end: '18:00',
        timezone: 'America/New_York'
      },
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      defaultPriority: 'medium',
      autoAssignment: true,
      maintenanceWindow: '02:00'
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-8">
      {/* Business Hours Configuration */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Business Hours</h3>
            <p className="text-sm text-muted-foreground">Configure operational hours and timezone settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Start Time"
            type="time"
            value={settings?.businessHours?.start}
            onChange={(e) => handleInputChange('businessHours.start', e?.target?.value)}
            description="Daily operation start time"
          />
          
          <Input
            label="End Time"
            type="time"
            value={settings?.businessHours?.end}
            onChange={(e) => handleInputChange('businessHours.end', e?.target?.value)}
            description="Daily operation end time"
          />

          <Select
            label="Timezone"
            options={timezoneOptions}
            value={settings?.businessHours?.timezone}
            onChange={(value) => handleInputChange('businessHours.timezone', value)}
            description="Primary facility timezone"
          />
        </div>
      </div>
      {/* System Defaults */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">System Defaults</h3>
            <p className="text-sm text-muted-foreground">Configure default values and formatting preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Currency Format"
            options={currencyOptions}
            value={settings?.currency}
            onChange={(value) => handleInputChange('currency', value)}
            description="Default currency for cost calculations"
          />

          <Select
            label="Date Format"
            options={dateFormatOptions}
            value={settings?.dateFormat}
            onChange={(value) => handleInputChange('dateFormat', value)}
            description="System-wide date display format"
          />

          <Select
            label="Default Work Order Priority"
            options={priorityOptions}
            value={settings?.defaultPriority}
            onChange={(value) => handleInputChange('defaultPriority', value)}
            description="Default priority for new work orders"
          />

          <Input
            label="Maintenance Window"
            type="time"
            value={settings?.maintenanceWindow}
            onChange={(e) => handleInputChange('maintenanceWindow', e?.target?.value)}
            description="Daily system maintenance time"
          />
        </div>
      </div>
      {/* Automation Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Automation Settings</h3>
            <p className="text-sm text-muted-foreground">Configure automated system behaviors</p>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Enable Auto-Assignment"
            description="Automatically assign work orders to available technicians based on skills and workload"
            checked={settings?.autoAssignment}
            onChange={(e) => handleInputChange('autoAssignment', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="flex items-center space-x-2">
          {hasChanges && (
            <>
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <span className="text-sm text-warning">You have unsaved changes</span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset Changes
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!hasChanges}
            iconName="Save"
            iconPosition="left"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;