import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EquipmentFilters = ({ onFilterChange, onSearch, onExport, onAddEquipment }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    location: '',
    warrantyStatus: '',
    maintenanceStatus: '',
    dateRange: ''
  });
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'operational', label: 'Operational' },
    { value: 'warning', label: 'Warning' },
    { value: 'critical', label: 'Critical' },
    { value: 'offline', label: 'Offline' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'hvac', label: 'HVAC Systems' },
    { value: 'generator', label: 'Generators' },
    { value: 'elevator', label: 'Elevators' },
    { value: 'security', label: 'Security Systems' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'fire_safety', label: 'Fire Safety' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'building_a', label: 'Building A' },
    { value: 'building_b', label: 'Building B' },
    { value: 'building_c', label: 'Building C' },
    { value: 'parking_garage', label: 'Parking Garage' },
    { value: 'mechanical_room', label: 'Mechanical Room' },
    { value: 'rooftop', label: 'Rooftop' },
    { value: 'basement', label: 'Basement' }
  ];

  const warrantyOptions = [
    { value: '', label: 'All Warranty Status' },
    { value: 'active', label: 'Active Warranty' },
    { value: 'expiring', label: 'Expiring Soon (30 days)' },
    { value: 'expired', label: 'Expired' }
  ];

  const maintenanceOptions = [
    { value: '', label: 'All Maintenance Status' },
    { value: 'due', label: 'Maintenance Due' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Recently Completed' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: '',
      type: '',
      location: '',
      warrantyStatus: '',
      maintenanceStatus: '',
      dateRange: ''
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    onFilterChange(clearedFilters);
    onSearch('');
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value !== '')?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6 mb-6">
      {/* Main Filter Row */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search equipment, models, locations..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Status"
          className="w-40"
        />

        <Select
          options={typeOptions}
          value={filters?.type}
          onChange={(value) => handleFilterChange('type', value)}
          placeholder="Type"
          className="w-40"
        />

        <Select
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => handleFilterChange('location', value)}
          placeholder="Location"
          className="w-40"
        />

        {/* Advanced Filters Toggle */}
        <Button
          variant="outline"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="relative"
        >
          <Icon name="Filter" size={16} className="mr-2" />
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getActiveFilterCount()}
            </span>
          )}
          <Icon 
            name={isAdvancedOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="ml-2" 
          />
        </Button>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onExport}>
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>
          <Button onClick={onAddEquipment}>
            <Icon name="Plus" size={16} className="mr-2" />
            Add Equipment
          </Button>
        </div>
      </div>
      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="border-t border-border pt-4 space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <Select
              label="Warranty Status"
              options={warrantyOptions}
              value={filters?.warrantyStatus}
              onChange={(value) => handleFilterChange('warrantyStatus', value)}
            />

            <Select
              label="Maintenance Status"
              options={maintenanceOptions}
              value={filters?.maintenanceStatus}
              onChange={(value) => handleFilterChange('maintenanceStatus', value)}
            />

            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full"
              >
                <Icon name="X" size={16} className="mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Custom Date Range */}
          {filters?.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <Input
                type="date"
                label="Start Date"
                onChange={(e) => console.log('Start date:', e?.target?.value)}
              />
              <Input
                type="date"
                label="End Date"
                onChange={(e) => console.log('End date:', e?.target?.value)}
              />
            </div>
          )}

          {/* Saved Filters */}
          <div className="flex items-center space-x-2 pt-4 border-t border-border">
            <span className="text-sm font-medium text-foreground">Saved Filters:</span>
            <Button variant="ghost" size="sm">
              <Icon name="Bookmark" size={14} className="mr-1" />
              Critical Equipment
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Bookmark" size={14} className="mr-1" />
              Maintenance Due
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Bookmark" size={14} className="mr-1" />
              HVAC Systems
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Plus" size={14} className="mr-1" />
              Save Current
            </Button>
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="flex items-center space-x-2 pt-4 border-t border-border">
          <span className="text-sm font-medium text-foreground">Active Filters:</span>
          {Object.entries(filters)?.map(([key, value]) => {
            if (!value) return null;
            
            const getFilterLabel = (key, value) => {
              switch (key) {
                case 'status':
                  return statusOptions?.find(opt => opt?.value === value)?.label || value;
                case 'type':
                  return typeOptions?.find(opt => opt?.value === value)?.label || value;
                case 'location':
                  return locationOptions?.find(opt => opt?.value === value)?.label || value;
                case 'warrantyStatus':
                  return warrantyOptions?.find(opt => opt?.value === value)?.label || value;
                case 'maintenanceStatus':
                  return maintenanceOptions?.find(opt => opt?.value === value)?.label || value;
                case 'dateRange':
                  return dateRangeOptions?.find(opt => opt?.value === value)?.label || value;
                default:
                  return value;
              }
            };

            return (
              <span
                key={key}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
              >
                {getFilterLabel(key, value)}
                <button
                  onClick={() => handleFilterChange(key, '')}
                  className="ml-2 hover:text-primary/80"
                >
                  <Icon name="X" size={14} />
                </button>
              </span>
            );
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default EquipmentFilters;