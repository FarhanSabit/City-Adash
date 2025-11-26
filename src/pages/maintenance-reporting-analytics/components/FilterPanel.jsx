import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState({
    dateRange: currentFilters?.dateRange || '30d',
    facilities: currentFilters?.facilities || [],
    equipmentTypes: currentFilters?.equipmentTypes || [],
    priorities: currentFilters?.priorities || [],
    technicians: currentFilters?.technicians || [],
    costRange: currentFilters?.costRange || { min: '', max: '' },
    customDateRange: currentFilters?.customDateRange || { start: '', end: '' }
  });

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const facilityOptions = [
    { value: 'building_a', label: 'Building A - Main Office' },
    { value: 'building_b', label: 'Building B - Manufacturing' },
    { value: 'building_c', label: 'Building C - Warehouse' },
    { value: 'building_d', label: 'Building D - Research Lab' }
  ];

  const equipmentTypeOptions = [
    { value: 'hvac', label: 'HVAC Systems' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'elevators', label: 'Elevators' },
    { value: 'security', label: 'Security Systems' },
    { value: 'lighting', label: 'Lighting' }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const technicianOptions = [
    { value: 'john_doe', label: 'John Doe' },
    { value: 'jane_smith', label: 'Jane Smith' },
    { value: 'mike_johnson', label: 'Mike Johnson' },
    { value: 'sarah_wilson', label: 'Sarah Wilson' },
    { value: 'david_brown', label: 'David Brown' }
  ];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: '30d',
      facilities: [],
      equipmentTypes: [],
      priorities: [],
      technicians: [],
      costRange: { min: '', max: '' },
      customDateRange: { start: '', end: '' }
    };
    setFilters(resetFilters);
  };

  const handleCheckboxChange = (category, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev?.[category], value]
        : prev?.[category]?.filter(item => item !== value)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Advanced Filters</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Date Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Date Range</h3>
              <Select
                label="Select Period"
                options={dateRangeOptions}
                value={filters?.dateRange}
                onChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
              />
              {filters?.dateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={filters?.customDateRange?.start}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      customDateRange: { ...prev?.customDateRange, start: e?.target?.value }
                    }))}
                  />
                  <Input
                    label="End Date"
                    type="date"
                    value={filters?.customDateRange?.end}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      customDateRange: { ...prev?.customDateRange, end: e?.target?.value }
                    }))}
                  />
                </div>
              )}
            </div>

            {/* Cost Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Cost Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Minimum Cost ($)"
                  type="number"
                  placeholder="0"
                  value={filters?.costRange?.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    costRange: { ...prev?.costRange, min: e?.target?.value }
                  }))}
                />
                <Input
                  label="Maximum Cost ($)"
                  type="number"
                  placeholder="10000"
                  value={filters?.costRange?.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    costRange: { ...prev?.costRange, max: e?.target?.value }
                  }))}
                />
              </div>
            </div>

            {/* Facilities */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Facilities</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {facilityOptions?.map((facility) => (
                  <Checkbox
                    key={facility?.value}
                    label={facility?.label}
                    checked={filters?.facilities?.includes(facility?.value)}
                    onChange={(e) => handleCheckboxChange('facilities', facility?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Equipment Types */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Equipment Types</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {equipmentTypeOptions?.map((equipment) => (
                  <Checkbox
                    key={equipment?.value}
                    label={equipment?.label}
                    checked={filters?.equipmentTypes?.includes(equipment?.value)}
                    onChange={(e) => handleCheckboxChange('equipmentTypes', equipment?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Priorities */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Priority Levels</h3>
              <div className="space-y-2">
                {priorityOptions?.map((priority) => (
                  <Checkbox
                    key={priority?.value}
                    label={priority?.label}
                    checked={filters?.priorities?.includes(priority?.value)}
                    onChange={(e) => handleCheckboxChange('priorities', priority?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Technicians */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Technicians</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {technicianOptions?.map((technician) => (
                  <Checkbox
                    key={technician?.value}
                    label={technician?.label}
                    checked={filters?.technicians?.includes(technician?.value)}
                    onChange={(e) => handleCheckboxChange('technicians', technician?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset All
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;