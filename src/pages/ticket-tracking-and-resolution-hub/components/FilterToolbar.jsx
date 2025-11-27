import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ onFilterChange, onSearch, onBulkAction }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'open', label: 'Open' },
    { value: 'in progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'security', label: 'Security' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'it', label: 'IT Support' },
  ];

  const handleSearch = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'priority':
        setSelectedPriority(value);
        break;
      case 'status':
        setSelectedStatus(value);
        break;
      case 'category':
        setSelectedCategory(value);
        break;
    }
    onFilterChange({ priority: selectedPriority, status: selectedStatus, category: selectedCategory, [filterType]: value });
  };

  const handleClearFilters = () => {
    setSelectedPriority('all');
    setSelectedStatus('all');
    setSelectedCategory('all');
    setSearchQuery('');
    onFilterChange({ priority: 'all', status: 'all', category: 'all' });
    onSearch('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 relative">
          <Icon
            name="Search"
            size={18}
            color="var(--color-muted-foreground)"
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search tickets by ID, title, or description..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button
          variant="default"
          size="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => console.log('Create ticket')}
        >
          New Ticket
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[200px]">
          <Select
            options={priorityOptions}
            value={selectedPriority}
            onChange={(value) => handleFilterChange('priority', value)}
            placeholder="Filter by priority"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={(value) => handleFilterChange('status', value)}
            placeholder="Filter by status"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={(value) => handleFilterChange('category', value)}
            placeholder="Filter by category"
          />
        </div>
        <Button
          variant="ghost"
          size="default"
          iconName="X"
          onClick={handleClearFilters}
        >
          Clear
        </Button>
        <Button
          variant="outline"
          size="default"
          iconName={showAdvanced ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          Advanced
        </Button>
      </div>

      {showAdvanced && (
        <div className="pt-4 border-t border-border">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="UserCheck"
              onClick={() => onBulkAction('assign')}
            >
              Bulk Assign
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Tag"
              onClick={() => onBulkAction('categorize')}
            >
              Bulk Categorize
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="AlertCircle"
              onClick={() => onBulkAction('priority')}
            >
              Change Priority
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => onBulkAction('export')}
            >
              Export Selected
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;