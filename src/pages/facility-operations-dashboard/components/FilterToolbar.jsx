import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterToolbar = ({ onFilterChange, savedViews, onSaveView }) => {
  const [activeFilters, setActiveFilters] = useState({
    zone: '',
    priority: '',
    department: '',
    status: '',
  });

  const zoneOptions = [
    { value: '', label: 'All Zones' },
    { value: 'building-a', label: 'Building A' },
    { value: 'building-b', label: 'Building B' },
    { value: 'building-c', label: 'Building C' },
    { value: 'parking', label: 'Parking Area' },
    { value: 'grounds', label: 'Grounds' },
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'security', label: 'Security' },
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = { zone: '', priority: '', department: '', status: '' };
    setActiveFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(activeFilters)?.some((value) => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Icon name="Filter" size={18} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-foreground whitespace-nowrap">Filters:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
            <div className="w-full sm:w-auto sm:min-w-[180px] sm:max-w-[200px]">
              <Select
                options={zoneOptions}
                value={activeFilters?.zone}
                onChange={(value) => handleFilterChange('zone', value)}
                placeholder="Select zone"
              />
            </div>

            <div className="w-full sm:w-auto sm:min-w-[180px] sm:max-w-[200px]">
              <Select
                options={priorityOptions}
                value={activeFilters?.priority}
                onChange={(value) => handleFilterChange('priority', value)}
                placeholder="Select priority"
              />
            </div>

            <div className="w-full sm:w-auto sm:min-w-[180px] sm:max-w-[200px]">
              <Select
                options={departmentOptions}
                value={activeFilters?.department}
                onChange={(value) => handleFilterChange('department', value)}
                placeholder="Select department"
              />
            </div>

            <div className="w-full sm:w-auto sm:min-w-[180px] sm:max-w-[200px]">
              <Select
                options={statusOptions}
                value={activeFilters?.status}
                onChange={(value) => handleFilterChange('status', value)}
                placeholder="Select status"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" iconName="X" onClick={clearFilters}>
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
            <Button variant="outline" size="sm" iconName="Save" onClick={onSaveView}>
              <span className="hidden md:inline">Save View</span>
              <span className="md:hidden">Save</span>
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              <span className="hidden md:inline">Export</span>
            </Button>
          </div>
        </div>
        {savedViews?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Saved Views:</span>
            {savedViews?.map((view) => (
              <button
                key={view?.id}
                className="px-3 py-1 text-xs font-medium rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors whitespace-nowrap"
              >
                {view?.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterToolbar;