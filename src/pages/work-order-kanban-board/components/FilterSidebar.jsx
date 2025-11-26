import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  onSavePreset, 
  savedPresets = [] 
}) => {
  const [presetName, setPresetName] = useState('');
  const [showSavePreset, setShowSavePreset] = useState(false);

  const priorityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const technicianOptions = [
    { value: 'john-smith', label: 'John Smith' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'mike-wilson', label: 'Mike Wilson' },
    { value: 'lisa-brown', label: 'Lisa Brown' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const locationOptions = [
    { value: 'building-a', label: 'Building A' },
    { value: 'building-b', label: 'Building B' },
    { value: 'building-c', label: 'Building C' },
    { value: 'parking-garage', label: 'Parking Garage' },
    { value: 'outdoor-areas', label: 'Outdoor Areas' }
  ];

  const issueTypeOptions = [
    { value: 'hvac', label: 'HVAC Systems' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'security', label: 'Security Systems' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'elevator', label: 'Elevator' },
    { value: 'general', label: 'General Maintenance' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange?.({
      ...filters,
      [key]: value
    });
  };

  const handleClearFilters = () => {
    onFiltersChange?.({
      search: '',
      priority: [],
      technician: [],
      location: [],
      issueType: [],
      dateRange: { start: '', end: '' },
      partsRequired: false,
      overdue: false
    });
  };

  const handleSavePreset = () => {
    if (presetName?.trim()) {
      onSavePreset?.({
        name: presetName,
        filters: { ...filters }
      });
      setPresetName('');
      setShowSavePreset(false);
    }
  };

  const handleLoadPreset = (preset) => {
    onFiltersChange?.(preset?.filters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.search) count++;
    if (filters?.priority?.length > 0) count++;
    if (filters?.technician?.length > 0) count++;
    if (filters?.location?.length > 0) count++;
    if (filters?.issueType?.length > 0) count++;
    if (filters?.dateRange?.start || filters?.dateRange?.end) count++;
    if (filters?.partsRequired) count++;
    if (filters?.overdue) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black/50 lg:hidden"
        onClick={onClose}
      />
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-modal overflow-y-auto lg:relative lg:w-full lg:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-foreground" />
            <h3 className="font-medium text-foreground">Filters</h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <Input
              label="Search Work Orders"
              type="search"
              placeholder="Search by ID, title, description..."
              value={filters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
            />
          </div>

          {/* Priority Filter */}
          <div>
            <Select
              label="Priority"
              multiple
              searchable
              options={priorityOptions}
              value={filters?.priority || []}
              onChange={(value) => handleFilterChange('priority', value)}
              placeholder="Select priorities..."
            />
          </div>

          {/* Technician Filter */}
          <div>
            <Select
              label="Assigned Technician"
              multiple
              searchable
              options={technicianOptions}
              value={filters?.technician || []}
              onChange={(value) => handleFilterChange('technician', value)}
              placeholder="Select technicians..."
            />
          </div>

          {/* Location Filter */}
          <div>
            <Select
              label="Location"
              multiple
              searchable
              options={locationOptions}
              value={filters?.location || []}
              onChange={(value) => handleFilterChange('location', value)}
              placeholder="Select locations..."
            />
          </div>

          {/* Issue Type Filter */}
          <div>
            <Select
              label="Issue Type"
              multiple
              searchable
              options={issueTypeOptions}
              value={filters?.issueType || []}
              onChange={(value) => handleFilterChange('issueType', value)}
              placeholder="Select issue types..."
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                placeholder="Start date"
                value={filters?.dateRange?.start || ''}
                onChange={(e) => handleFilterChange('dateRange', {
                  ...filters?.dateRange,
                  start: e?.target?.value
                })}
              />
              <Input
                type="date"
                placeholder="End date"
                value={filters?.dateRange?.end || ''}
                onChange={(e) => handleFilterChange('dateRange', {
                  ...filters?.dateRange,
                  end: e?.target?.value
                })}
              />
            </div>
          </div>

          {/* Additional Filters */}
          <div className="space-y-3">
            <Checkbox
              label="Parts Required"
              checked={filters?.partsRequired || false}
              onChange={(e) => handleFilterChange('partsRequired', e?.target?.checked)}
            />
            <Checkbox
              label="Overdue Items"
              checked={filters?.overdue || false}
              onChange={(e) => handleFilterChange('overdue', e?.target?.checked)}
            />
          </div>

          {/* Saved Presets */}
          {savedPresets?.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Saved Presets
              </label>
              <div className="space-y-2">
                {savedPresets?.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadPreset(preset)}
                    className="w-full justify-start"
                  >
                    <Icon name="Bookmark" size={14} className="mr-2" />
                    {preset?.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Save Preset */}
          <div>
            {showSavePreset ? (
              <div className="space-y-2">
                <Input
                  label="Preset Name"
                  placeholder="Enter preset name..."
                  value={presetName}
                  onChange={(e) => setPresetName(e?.target?.value)}
                />
                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSavePreset}
                    disabled={!presetName?.trim()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowSavePreset(false);
                      setPresetName('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSavePreset(true)}
                className="w-full"
                disabled={getActiveFilterCount() === 0}
              >
                <Icon name="Bookmark" size={14} className="mr-2" />
                Save Current Filters
              </Button>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1"
              disabled={getActiveFilterCount() === 0}
            >
              Clear All
            </Button>
            <Button
              variant="default"
              onClick={onClose}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;