import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const FilterPanel = ({ onApplyFilters, onResetFilters, savedFilters, onSaveFilter }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const [filters, setFilters] = useState({
    assetType: '',
    location: '',
    status: '',
    condition: '',
    maintenanceStatus: '',
    warrantyStatus: '',
    dateRange: ''
  });

  const assetTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'hvac', label: 'HVAC Systems' },
    { value: 'electrical', label: 'Electrical Equipment' },
    { value: 'plumbing', label: 'Plumbing Systems' },
    { value: 'safety', label: 'Safety Equipment' },
    { value: 'it', label: 'IT Infrastructure' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'building-a', label: 'Building A' },
    { value: 'building-b', label: 'Building B' },
    { value: 'building-c', label: 'Building C' },
    { value: 'warehouse', label: 'Warehouse' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'operational', label: 'Operational' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'critical', label: 'Critical' },
    { value: 'retired', label: 'Retired' }
  ];

  const conditionOptions = [
    { value: '', label: 'All Conditions' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ];

  const maintenanceStatusOptions = [
    { value: '', label: 'All Maintenance' },
    { value: 'due-soon', label: 'Due Soon (7 days)' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Recently Completed' }
  ];

  const warrantyStatusOptions = [
    { value: '', label: 'All Warranty' },
    { value: 'active', label: 'Active' },
    { value: 'expiring', label: 'Expiring Soon (90 days)' },
    { value: 'expired', label: 'Expired' }
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
      assetType: '',
      location: '',
      status: '',
      condition: '',
      maintenanceStatus: '',
      warrantyStatus: '',
      dateRange: ''
    };
    setFilters(resetFilters);
    onResetFilters();
  };

  const handleSaveFilter = () => {
    if (filterName?.trim()) {
      onSaveFilter(filterName, filters);
      setFilterName('');
      setShowSaveDialog(false);
    }
  };

  const activeFilterCount = Object.values(filters)?.filter(v => v !== '')?.length;

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="text-base font-semibold text-foreground">Advanced Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
        >
          <Icon
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            size={20}
            color="var(--color-muted-foreground)"
          />
        </button>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Asset Type"
              options={assetTypeOptions}
              value={filters?.assetType}
              onChange={(value) => handleFilterChange('assetType', value)}
            />
            <Select
              label="Location"
              options={locationOptions}
              value={filters?.location}
              onChange={(value) => handleFilterChange('location', value)}
            />
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
            <Select
              label="Condition"
              options={conditionOptions}
              value={filters?.condition}
              onChange={(value) => handleFilterChange('condition', value)}
            />
            <Select
              label="Maintenance Status"
              options={maintenanceStatusOptions}
              value={filters?.maintenanceStatus}
              onChange={(value) => handleFilterChange('maintenanceStatus', value)}
            />
            <Select
              label="Warranty Status"
              options={warrantyStatusOptions}
              value={filters?.warrantyStatus}
              onChange={(value) => handleFilterChange('warrantyStatus', value)}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Save"
                iconPosition="left"
                onClick={() => setShowSaveDialog(true)}
              >
                Save Filter Set
              </Button>
              {savedFilters && savedFilters?.length > 0 && (
                <Select
                  placeholder="Load saved filter..."
                  options={savedFilters?.map(f => ({ value: f?.id, label: f?.name }))}
                  value=""
                  onChange={(value) => {
                    const saved = savedFilters?.find(f => f?.id === value);
                    if (saved) setFilters(saved?.filters);
                  }}
                  className="w-48"
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Check"
                iconPosition="left"
                onClick={handleApply}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6 animation-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">Save Filter Set</h3>
            <Input
              label="Filter Set Name"
              placeholder="e.g., Critical HVAC Assets"
              value={filterName}
              onChange={(e) => setFilterName(e?.target?.value)}
              className="mb-4"
            />
            <div className="flex items-center gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowSaveDialog(false);
                  setFilterName('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveFilter}
                disabled={!filterName?.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;