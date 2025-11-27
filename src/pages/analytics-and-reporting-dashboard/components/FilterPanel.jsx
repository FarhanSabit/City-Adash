import React from 'react';

import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onApply, onReset }) => {
  const facilityOptions = [
    { value: 'all', label: 'All Facilities' },
    { value: 'FAC-001', label: 'Main Campus' },
    { value: 'FAC-002', label: 'North Wing' },
    { value: 'FAC-003', label: 'South Complex' }
  ];

  const periodOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'operations', label: 'Operations' },
    { value: 'energy', label: 'Energy Management' },
    { value: 'security', label: 'Security' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          iconName="RotateCcw"
          iconSize={14}
        >
          Reset
        </Button>
      </div>
      <Select
        label="Facility"
        options={facilityOptions}
        value={filters?.facility}
        onChange={(value) => onFilterChange('facility', value)}
      />
      <Select
        label="Time Period"
        options={periodOptions}
        value={filters?.period}
        onChange={(value) => onFilterChange('period', value)}
      />
      {filters?.period === 'custom' && (
        <div className="space-y-3">
          <Input
            label="Start Date"
            type="date"
            value={filters?.startDate}
            onChange={(e) => onFilterChange('startDate', e?.target?.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={filters?.endDate}
            onChange={(e) => onFilterChange('endDate', e?.target?.value)}
          />
        </div>
      )}
      <Select
        label="Department"
        options={departmentOptions}
        value={filters?.department}
        onChange={(value) => onFilterChange('department', value)}
      />
      <div className="pt-4 border-t border-border">
        <Button
          variant="default"
          fullWidth
          onClick={onApply}
          iconName="Filter"
          iconPosition="left"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;