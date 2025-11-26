import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MaintenanceScheduler = ({ isOpen, onClose, equipment, onSchedule }) => {
  const [scheduleData, setScheduleData] = useState({
    equipmentId: equipment?.id || '',
    maintenanceType: '',
    priority: 'medium',
    scheduledDate: '',
    estimatedDuration: '',
    assignedTechnician: '',
    description: '',
    parts: [],
    instructions: '',
    recurring: false,
    recurringInterval: '',
    recurringUnit: 'months'
  });

  const maintenanceTypes = [
    { value: 'preventive', label: 'Preventive Maintenance' },
    { value: 'corrective', label: 'Corrective Maintenance' },
    { value: 'predictive', label: 'Predictive Maintenance' },
    { value: 'emergency', label: 'Emergency Repair' },
    { value: 'inspection', label: 'Inspection' },
    { value: 'calibration', label: 'Calibration' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'lubrication', label: 'Lubrication' }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const technicianOptions = [
    { value: 'mike_johnson', label: 'Mike Johnson - HVAC Specialist' },
    { value: 'sarah_wilson', label: 'Sarah Wilson - Electrical' },
    { value: 'david_chen', label: 'David Chen - Mechanical' },
    { value: 'lisa_brown', label: 'Lisa Brown - General Maintenance' },
    { value: 'auto_assign', label: 'Auto-assign based on availability' }
  ];

  const durationOptions = [
    { value: '1', label: '1 hour' },
    { value: '2', label: '2 hours' },
    { value: '4', label: '4 hours' },
    { value: '8', label: '8 hours (Full day)' },
    { value: '16', label: '2 days' },
    { value: '24', label: '3 days' },
    { value: 'custom', label: 'Custom duration' }
  ];

  const recurringUnitOptions = [
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' },
    { value: 'years', label: 'Years' }
  ];

  const commonParts = [
    { id: 1, name: 'Air Filter - HEPA', partNumber: 'AF-HEPA-001' },
    { id: 2, name: 'Temperature Sensor', partNumber: 'TS-TX-100' },
    { id: 3, name: 'Cooling Coil Gasket', partNumber: 'CCG-STD-001' },
    { id: 4, name: 'Lubricant Oil', partNumber: 'LO-SYN-001' },
    { id: 5, name: 'Belt Drive', partNumber: 'BD-V-001' }
  ];

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setScheduleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePartToggle = (part) => {
    setScheduleData(prev => ({
      ...prev,
      parts: prev?.parts?.find(p => p?.id === part?.id)
        ? prev?.parts?.filter(p => p?.id !== part?.id)
        : [...prev?.parts, part]
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSchedule(scheduleData);
    onClose();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getMaintenanceTypeIcon = (type) => {
    switch (type) {
      case 'preventive': return 'Calendar';
      case 'corrective': return 'Wrench';
      case 'predictive': return 'TrendingUp';
      case 'emergency': return 'AlertTriangle';
      case 'inspection': return 'Search';
      case 'calibration': return 'Settings';
      case 'cleaning': return 'Droplets';
      case 'lubrication': return 'Droplet';
      default: return 'Tool';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Schedule Maintenance</h2>
              {equipment && (
                <p className="text-sm text-muted-foreground">
                  {equipment?.name} - {equipment?.assetId}
                </p>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
                  
                  <Select
                    label="Maintenance Type"
                    required
                    options={maintenanceTypes}
                    value={scheduleData?.maintenanceType}
                    onChange={(value) => handleInputChange('maintenanceType', value)}
                  />

                  <Select
                    label="Priority"
                    required
                    options={priorityOptions}
                    value={scheduleData?.priority}
                    onChange={(value) => handleInputChange('priority', value)}
                  />

                  <Input
                    type="datetime-local"
                    label="Scheduled Date & Time"
                    required
                    value={scheduleData?.scheduledDate}
                    onChange={(e) => handleInputChange('scheduledDate', e?.target?.value)}
                  />

                  <Select
                    label="Estimated Duration"
                    required
                    options={durationOptions}
                    value={scheduleData?.estimatedDuration}
                    onChange={(value) => handleInputChange('estimatedDuration', value)}
                  />

                  {scheduleData?.estimatedDuration === 'custom' && (
                    <Input
                      type="number"
                      label="Custom Duration (hours)"
                      placeholder="Enter hours"
                      onChange={(e) => handleInputChange('customDuration', e?.target?.value)}
                    />
                  )}
                </div>

                {/* Assignment */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Assignment</h3>
                  
                  <Select
                    label="Assigned Technician"
                    required
                    options={technicianOptions}
                    value={scheduleData?.assignedTechnician}
                    onChange={(value) => handleInputChange('assignedTechnician', value)}
                  />

                  {scheduleData?.assignedTechnician && scheduleData?.assignedTechnician !== 'auto_assign' && (
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="User" size={16} color="white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {technicianOptions?.find(t => t?.value === scheduleData?.assignedTechnician)?.label}
                          </p>
                          <p className="text-xs text-success">Available</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recurring Schedule */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={scheduleData?.recurring}
                      onChange={(e) => handleInputChange('recurring', e?.target?.checked)}
                      className="rounded border-border"
                    />
                    <label htmlFor="recurring" className="text-sm font-medium text-foreground">
                      Recurring Maintenance
                    </label>
                  </div>

                  {scheduleData?.recurring && (
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        label="Repeat Every"
                        placeholder="1"
                        value={scheduleData?.recurringInterval}
                        onChange={(e) => handleInputChange('recurringInterval', e?.target?.value)}
                      />
                      <Select
                        label="Unit"
                        options={recurringUnitOptions}
                        value={scheduleData?.recurringUnit}
                        onChange={(value) => handleInputChange('recurringUnit', value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe the maintenance work to be performed..."
                      value={scheduleData?.description}
                      onChange={(e) => handleInputChange('description', e?.target?.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any special instructions or safety requirements..."
                      value={scheduleData?.instructions}
                      onChange={(e) => handleInputChange('instructions', e?.target?.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Parts Required */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Parts Required</h3>
                  
                  <div className="space-y-2">
                    {commonParts?.map((part) => (
                      <div
                        key={part?.id}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                          scheduleData?.parts?.find(p => p?.id === part?.id)
                            ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/30'
                        }`}
                        onClick={() => handlePartToggle(part)}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={scheduleData?.parts?.find(p => p?.id === part?.id) !== undefined}
                            onChange={() => handlePartToggle(part)}
                            className="rounded border-border"
                          />
                          <div>
                            <p className="text-sm font-medium text-foreground">{part?.name}</p>
                            <p className="text-xs text-muted-foreground">{part?.partNumber}</p>
                          </div>
                        </div>
                        <Icon name="Package" size={16} className="text-muted-foreground" />
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add Custom Part
                  </Button>
                </div>

                {/* AI Recommendations */}
                <div className="bg-accent/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Sparkles" size={16} className="text-accent" />
                    <h4 className="font-medium text-foreground">AI Recommendations</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      • Based on equipment history, consider checking belt tension
                    </p>
                    <p className="text-muted-foreground">
                      • Temperature sensor calibration recommended
                    </p>
                    <p className="text-muted-foreground">
                      • Filter replacement due in 2 weeks
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getMaintenanceTypeIcon(scheduleData?.maintenanceType)} 
                  size={16} 
                  className="text-muted-foreground" 
                />
                <span className="text-sm text-muted-foreground">
                  {maintenanceTypes?.find(t => t?.value === scheduleData?.maintenanceType)?.label || 'Select type'}
                </span>
              </div>
              {scheduleData?.priority && (
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    scheduleData?.priority === 'critical' ? 'bg-error' :
                    scheduleData?.priority === 'high' ? 'bg-warning' :
                    scheduleData?.priority === 'medium'? 'bg-primary' : 'bg-success'
                  }`}></div>
                  <span className={`text-sm font-medium ${getPriorityColor(scheduleData?.priority)}`}>
                    {scheduleData?.priority?.charAt(0)?.toUpperCase() + scheduleData?.priority?.slice(1)} Priority
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                <Icon name="Calendar" size={16} className="mr-2" />
                Schedule Maintenance
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceScheduler;