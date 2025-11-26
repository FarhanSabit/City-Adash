import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const EquipmentManagement = () => {
  const [equipmentCategories, setEquipmentCategories] = useState([
    { id: 1, name: 'HVAC Systems', icon: 'Wind', color: '#3B82F6', maintenanceInterval: 30 },
    { id: 2, name: 'Generators', icon: 'Zap', color: '#F59E0B', maintenanceInterval: 90 },
    { id: 3, name: 'Elevators', icon: 'ArrowUpDown', color: '#8B5CF6', maintenanceInterval: 7 },
    { id: 4, name: 'Security Systems', icon: 'Shield', color: '#EF4444', maintenanceInterval: 60 },
    { id: 5, name: 'Lighting', icon: 'Lightbulb', color: '#10B981', maintenanceInterval: 180 },
    { id: 6, name: 'Plumbing', icon: 'Droplets', color: '#06B6D4', maintenanceInterval: 120 }
  ]);

  const [iotThresholds, setIotThresholds] = useState({
    temperature: { min: 68, max: 78, unit: '°F' },
    humidity: { min: 30, max: 60, unit: '%' },
    pressure: { min: 14.5, max: 15.5, unit: 'PSI' },
    vibration: { max: 10, unit: 'mm/s' },
    power: { max: 1000, unit: 'W' }
  });

  const [maintenanceSettings, setMaintenanceSettings] = useState({
    autoScheduling: true,
    predictiveMaintenance: true,
    emergencyOverride: true,
    notificationLeadTime: 7,
    workOrderGeneration: true
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleCategoryUpdate = (categoryId, field, value) => {
    setEquipmentCategories(prev => prev?.map(category => 
      category?.id === categoryId ? { ...category, [field]: value } : category
    ));
    setHasChanges(true);
  };

  const handleThresholdUpdate = (sensor, field, value) => {
    setIotThresholds(prev => ({
      ...prev,
      [sensor]: { ...prev?.[sensor], [field]: parseFloat(value) || 0 }
    }));
    setHasChanges(true);
  };

  const handleMaintenanceSettingUpdate = (field, value) => {
    setMaintenanceSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const addEquipmentCategory = () => {
    const newCategory = {
      id: Date.now(),
      name: 'New Category',
      icon: 'Settings',
      color: '#6B7280',
      maintenanceInterval: 30
    };
    setEquipmentCategories(prev => [...prev, newCategory]);
    setHasChanges(true);
  };

  const removeEquipmentCategory = (categoryId) => {
    setEquipmentCategories(prev => prev?.filter(category => category?.id !== categoryId));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving equipment management settings:', {
      equipmentCategories,
      iotThresholds,
      maintenanceSettings
    });
    setHasChanges(false);
  };

  const iconOptions = [
    { value: 'Wind', label: 'Wind' },
    { value: 'Zap', label: 'Zap' },
    { value: 'ArrowUpDown', label: 'Arrow Up Down' },
    { value: 'Shield', label: 'Shield' },
    { value: 'Lightbulb', label: 'Lightbulb' },
    { value: 'Droplets', label: 'Droplets' },
    { value: 'Settings', label: 'Settings' },
    { value: 'Wrench', label: 'Wrench' },
    { value: 'Cog', label: 'Cog' }
  ];

  return (
    <div className="space-y-8">
      {/* Equipment Categories */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Equipment Categories</h3>
              <p className="text-sm text-muted-foreground">Configure equipment types and maintenance intervals</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={addEquipmentCategory}
            iconName="Plus"
            iconPosition="left"
            size="sm"
          >
            Add Category
          </Button>
        </div>

        <div className="space-y-4">
          {equipmentCategories?.map((category) => (
            <div key={category?.id} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3 flex-1">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${category?.color}20` }}
                >
                  <Icon name={category?.icon} size={20} style={{ color: category?.color }} />
                </div>
                
                <Input
                  value={category?.name}
                  onChange={(e) => handleCategoryUpdate(category?.id, 'name', e?.target?.value)}
                  className="flex-1"
                />
                
                <Select
                  options={iconOptions}
                  value={category?.icon}
                  onChange={(value) => handleCategoryUpdate(category?.id, 'icon', value)}
                  className="w-32"
                />
                
                <Input
                  type="color"
                  value={category?.color}
                  onChange={(e) => handleCategoryUpdate(category?.id, 'color', e?.target?.value)}
                  className="w-16"
                />
                
                <Input
                  type="number"
                  value={category?.maintenanceInterval}
                  onChange={(e) => handleCategoryUpdate(category?.id, 'maintenanceInterval', parseInt(e?.target?.value))}
                  className="w-24"
                  placeholder="Days"
                />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEquipmentCategory(category?.id)}
                iconName="Trash2"
                className="text-error hover:text-error"
              />
            </div>
          ))}
        </div>
      </div>
      {/* IoT Sensor Thresholds */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">IoT Sensor Thresholds</h3>
            <p className="text-sm text-muted-foreground">Configure alert thresholds for sensor monitoring</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(iotThresholds)?.map(([sensor, settings]) => (
            <div key={sensor} className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Thermometer" size={18} className="text-muted-foreground" />
                <h4 className="text-base font-medium text-foreground capitalize">{sensor}</h4>
                <span className="text-sm text-muted-foreground">({settings?.unit})</span>
              </div>
              
              <div className="space-y-3">
                {settings?.min !== undefined && (
                  <Input
                    label="Minimum"
                    type="number"
                    value={settings?.min}
                    onChange={(e) => handleThresholdUpdate(sensor, 'min', e?.target?.value)}
                    step="0.1"
                  />
                )}
                
                <Input
                  label={settings?.min !== undefined ? "Maximum" : "Threshold"}
                  type="number"
                  value={settings?.max}
                  onChange={(e) => handleThresholdUpdate(sensor, 'max', e?.target?.value)}
                  step="0.1"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Maintenance Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Maintenance Settings</h3>
            <p className="text-sm text-muted-foreground">Configure automated maintenance scheduling</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Auto-Scheduling"
              description="Automatically schedule preventive maintenance"
              checked={maintenanceSettings?.autoScheduling}
              onChange={(e) => handleMaintenanceSettingUpdate('autoScheduling', e?.target?.checked)}
            />
            
            <Checkbox
              label="Predictive Maintenance"
              description="Use AI to predict equipment failures"
              checked={maintenanceSettings?.predictiveMaintenance}
              onChange={(e) => handleMaintenanceSettingUpdate('predictiveMaintenance', e?.target?.checked)}
            />
            
            <Checkbox
              label="Emergency Override"
              description="Allow emergency maintenance to override schedules"
              checked={maintenanceSettings?.emergencyOverride}
              onChange={(e) => handleMaintenanceSettingUpdate('emergencyOverride', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Auto Work Order Generation"
              description="Automatically create work orders for scheduled maintenance"
              checked={maintenanceSettings?.workOrderGeneration}
              onChange={(e) => handleMaintenanceSettingUpdate('workOrderGeneration', e?.target?.checked)}
            />
            
            <Input
              label="Notification Lead Time (Days)"
              type="number"
              value={maintenanceSettings?.notificationLeadTime}
              onChange={(e) => handleMaintenanceSettingUpdate('notificationLeadTime', parseInt(e?.target?.value))}
              description="Days before maintenance to send notifications"
            />
          </div>
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
            onClick={() => setHasChanges(false)}
            disabled={!hasChanges}
          >
            Discard Changes
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

export default EquipmentManagement;