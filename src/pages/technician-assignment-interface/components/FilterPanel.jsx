import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, onSaveTemplate, savedTemplates }) => {
  const [activeFilters, setActiveFilters] = useState(filters);
  const [templateName, setTemplateName] = useState('');
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const skillOptions = [
    { value: 'HVAC', label: 'HVAC' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Plumbing', label: 'Plumbing' },
    { value: 'Mechanical', label: 'Mechanical' },
    { value: 'Carpentry', label: 'Carpentry' },
    { value: 'Painting', label: 'Painting' },
    { value: 'Security', label: 'Security' },
    { value: 'Cleaning', label: 'Cleaning' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'building-a', label: 'Building A' },
    { value: 'building-b', label: 'Building B' },
    { value: 'building-c', label: 'Building C' },
    { value: 'parking', label: 'Parking Areas' },
    { value: 'grounds', label: 'Grounds' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'available', label: 'Available' },
    { value: 'busy', label: 'Busy' },
    { value: 'off-duty', label: 'Off Duty' }
  ];

  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(activeFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      priority: 'all',
      skills: [],
      location: 'all',
      technicianStatus: 'all',
      workloadMax: 100,
      partsAvailable: false,
      dateRange: {
        start: '',
        end: ''
      },
      searchQuery: ''
    };
    setActiveFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const handleSaveTemplate = () => {
    if (templateName?.trim()) {
      onSaveTemplate({
        name: templateName,
        filters: activeFilters,
        createdAt: new Date()?.toISOString()
      });
      setTemplateName('');
      setShowSaveTemplate(false);
    }
  };

  const handleLoadTemplate = (template) => {
    setActiveFilters(template?.filters);
    onFiltersChange(template?.filters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Advanced Filters</h2>
            <p className="text-sm text-muted-foreground">
              Configure assignment filters and save templates
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6">
          {/* Saved Templates */}
          {savedTemplates && savedTemplates?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Saved Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {savedTemplates?.map((template) => (
                  <Button
                    key={template?.name}
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadTemplate(template)}
                    className="justify-start"
                  >
                    <Icon name="Bookmark" size={14} className="mr-2" />
                    {template?.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Work Order Filters */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Work Order Filters</h3>
              
              <Select
                label="Priority Level"
                options={priorityOptions}
                value={activeFilters?.priority}
                onChange={(value) => handleFilterChange('priority', value)}
              />

              <Select
                label="Location"
                options={locationOptions}
                value={activeFilters?.location}
                onChange={(value) => handleFilterChange('location', value)}
              />

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Required Skills
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {skillOptions?.map((skill) => (
                    <Checkbox
                      key={skill?.value}
                      label={skill?.label}
                      checked={activeFilters?.skills?.includes(skill?.value)}
                      onChange={(e) => {
                        const newSkills = e?.target?.checked
                          ? [...activeFilters?.skills, skill?.value]
                          : activeFilters?.skills?.filter(s => s !== skill?.value);
                        handleFilterChange('skills', newSkills);
                      }}
                    />
                  ))}
                </div>
              </div>

              <Checkbox
                label="Parts Available Only"
                checked={activeFilters?.partsAvailable}
                onChange={(e) => handleFilterChange('partsAvailable', e?.target?.checked)}
              />
            </div>

            {/* Technician Filters */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Technician Filters</h3>
              
              <Select
                label="Technician Status"
                options={statusOptions}
                value={activeFilters?.technicianStatus}
                onChange={(value) => handleFilterChange('technicianStatus', value)}
              />

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Max Workload: {activeFilters?.workloadMax}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={activeFilters?.workloadMax}
                  onChange={(e) => handleFilterChange('workloadMax', parseInt(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Date and Search Filters */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Date & Search</h3>
              
              <Input
                label="Search Query"
                type="search"
                placeholder="Search work orders, technicians..."
                value={activeFilters?.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e?.target?.value)}
              />

              <Input
                label="Date From"
                type="date"
                value={activeFilters?.dateRange?.start}
                onChange={(e) => handleFilterChange('dateRange', {
                  ...activeFilters?.dateRange,
                  start: e?.target?.value
                })}
              />

              <Input
                label="Date To"
                type="date"
                value={activeFilters?.dateRange?.end}
                onChange={(e) => handleFilterChange('dateRange', {
                  ...activeFilters?.dateRange,
                  end: e?.target?.value
                })}
              />
            </div>
          </div>

          {/* Save Template Section */}
          {showSaveTemplate && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="text-sm font-semibold text-foreground mb-3">Save Filter Template</h3>
              <div className="flex items-center space-x-3">
                <Input
                  placeholder="Template name..."
                  value={templateName}
                  onChange={(e) => setTemplateName(e?.target?.value)}
                  className="flex-1"
                />
                <Button onClick={handleSaveTemplate} disabled={!templateName?.trim()}>
                  Save
                </Button>
                <Button variant="outline" onClick={() => setShowSaveTemplate(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleResetFilters}>
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Reset All
              </Button>
              <Button variant="outline" onClick={() => setShowSaveTemplate(true)}>
                <Icon name="Bookmark" size={16} className="mr-2" />
                Save Template
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleApplyFilters}>
                <Icon name="Filter" size={16} className="mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;