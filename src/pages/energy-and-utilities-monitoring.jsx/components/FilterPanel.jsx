import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ onApplyFilters, onResetFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    facility: '',
    utilityType: '',
    dateRange: '',
    costCenter: '',
    threshold: ''
  });

  const facilityOptions = [
    { value: 'all', label: 'All Facilities' },
    { value: 'main', label: 'Main Campus - Building A' },
    { value: 'north', label: 'North Wing - Building B' },
    { value: 'south', label: 'South Complex - Building C' },
    { value: 'east', label: 'East Facility - Building D' }
  ];

  const utilityOptions = [
    { value: 'all', label: 'All Utilities' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'water', label: 'Water' },
    { value: 'gas', label: 'Natural Gas' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'lighting', label: 'Lighting' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const costCenterOptions = [
    { value: 'all', label: 'All Cost Centers' },
    { value: 'operations', label: 'Operations' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'admin', label: 'Administration' },
    { value: 'production', label: 'Production' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    setIsExpanded(false);
  };

  const handleReset = () => {
    const resetFilters = {
      facility: '',
      utilityType: '',
      dateRange: '',
      costCenter: '',
      threshold: ''
    };
    setFilters(resetFilters);
    onResetFilters();
  };

  const activeFilterCount = Object.values(filters)?.filter(v => v !== '')?.length;

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">Advanced Filters</h3>
            {activeFilterCount > 0 && (
              <p className="text-xs text-muted-foreground">{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</p>
            )}
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors duration-150"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} color="var(--color-primary)" />
        </button>
      </div>
      {isExpanded && (
        <div className="border-t border-border p-4 space-y-4 animation-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Facility Zone"
              options={facilityOptions}
              value={filters?.facility}
              onChange={(value) => handleFilterChange('facility', value)}
              placeholder="Select facility"
            />
            <Select
              label="Utility Type"
              options={utilityOptions}
              value={filters?.utilityType}
              onChange={(value) => handleFilterChange('utilityType', value)}
              placeholder="Select utility"
            />
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              placeholder="Select range"
            />
            <Select
              label="Cost Center"
              options={costCenterOptions}
              value={filters?.costCenter}
              onChange={(value) => handleFilterChange('costCenter', value)}
              placeholder="Select cost center"
            />
            <Input
              label="Consumption Threshold"
              type="number"
              placeholder="Enter kWh threshold"
              value={filters?.threshold}
              onChange={(e) => handleFilterChange('threshold', e?.target?.value)}
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
            <Button variant="ghost" onClick={handleReset}>
              Reset All
            </Button>
            <Button variant="default" onClick={handleApply} iconName="Check" iconPosition="left">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;