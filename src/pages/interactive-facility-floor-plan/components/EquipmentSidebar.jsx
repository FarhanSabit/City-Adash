import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EquipmentSidebar = ({
  equipment,
  selectedEquipment,
  onEquipmentSelect,
  onEquipmentFilter,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange
}) => {
  const [expandedCategories, setExpandedCategories] = useState({
    hvac: true,
    generators: false,
    elevators: false,
    security: false,
    lighting: false,
    plumbing: false
  });

  const categories = [
  { id: 'hvac', label: 'HVAC Systems', icon: 'Wind', count: 0 },
  { id: 'generators', label: 'Generators', icon: 'Zap', count: 0 },
  { id: 'elevators', label: 'Elevators', icon: 'ArrowUpDown', count: 0 },
  { id: 'security', label: 'Security', icon: 'Shield', count: 0 },
  { id: 'lighting', label: 'Lighting', icon: 'Lightbulb', count: 0 },
  { id: 'plumbing', label: 'Plumbing', icon: 'Droplets', count: 0 }];


  const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'operational', label: 'Operational' },
  { value: 'warning', label: 'Warning' },
  { value: 'critical', label: 'Critical' },
  { value: 'offline', label: 'Offline' }];


  const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  ...categories?.map((cat) => ({ value: cat?.id, label: cat?.label }))];


  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':return 'text-success';
      case 'warning':return 'text-warning';
      case 'critical':return 'text-error';
      case 'offline':return 'text-muted-foreground';
      default:return 'text-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':return 'CheckCircle';
      case 'warning':return 'AlertTriangle';
      case 'critical':return 'AlertCircle';
      case 'offline':return 'XCircle';
      default:return 'Circle';
    }
  };

  const filteredEquipment = useMemo(() => {
    return equipment?.filter((item) => {
      const matchesSearch = item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item?.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item?.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [equipment, searchQuery, statusFilter, categoryFilter]);

  const equipmentByCategory = useMemo(() => {
    const grouped = {};
    categories?.forEach((cat) => {
      grouped[cat.id] = filteredEquipment?.filter((item) => item?.category === cat?.id);
    });
    return grouped;
  }, [filteredEquipment]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev?.[categoryId]
    }));
  };

  const handleEquipmentClick = (equipmentItem) => {
    onEquipmentSelect(equipmentItem);
  };

  return (
    <div className="w-full h-full bg-card flex flex-col scrollbar-modern">
      {/* Header - Enhanced with Modern Styling */}
      <div className="px-6 py-6 border-b border-border bg-muted/20">
        <h2 className="text-xl text-foreground mb-6 font-bold">Equipment Monitor</h2>
        
        {/* Search - Optimized Input Design */}
        <div className="mb-5">
          <Input
            type="search"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full input-modern" />
        </div>

        {/* Filters - Better Visual Hierarchy */}
        <div className="space-y-5">
          <Select
            label="Status Filter"
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusFilterChange} />
          
          <Select
            label="Category Filter"
            options={categoryOptions}
            value={categoryFilter}
            onChange={onCategoryFilterChange} />
        </div>
      </div>
      
      {/* Equipment List - Optimized Spacing */}
      <div className="flex-1 overflow-y-auto scrollbar-modern">
        {categories?.map((category) => {
          const categoryEquipment = equipmentByCategory?.[category?.id] || [];
          const categoryCount = categoryEquipment?.length;

          if (categoryCount === 0 && categoryFilter !== 'all') return null;

          return (
            <div key={category?.id} className="border-b border-border/30">
              <Button
                variant="ghost"
                onClick={() => toggleCategory(category?.id)}
                className="w-full justify-start px-6 py-5 h-auto hover:bg-muted/60 rounded-none transition-all duration-200">
                <Icon name={category?.icon} size={18} className="mr-3 text-primary" />
                <span className="flex-1 text-left font-semibold text-foreground">{category?.label}</span>
                <span className="text-sm text-muted-foreground mr-3 bg-muted px-3 py-1 rounded-full font-medium">
                  {categoryCount}
                </span>
                <Icon
                  name={expandedCategories?.[category?.id] ? "ChevronDown" : "ChevronRight"}
                  size={16}
                  className="text-muted-foreground transition-transform duration-200" />
              </Button>
              
              {expandedCategories?.[category?.id] &&
                <div className="pb-3 bg-muted/5">
                  {categoryEquipment?.length === 0 ?
                    <div className="px-6 py-4 text-sm text-muted-foreground">
                      No equipment found
                    </div> :
                    categoryEquipment?.map((item) =>
                      <div
                        key={item?.id}
                        onClick={() => handleEquipmentClick(item)}
                        className={`mx-4 mb-3 p-4 rounded-lg cursor-pointer transition-all duration-200 border equipment-card ${
                          selectedEquipment?.id === item?.id ?
                            'equipment-card selected' : 'hover:border-border bg-background'}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-primary bg-primary/10 px-2 py-1 rounded">
                              {item?.identifier}
                            </span>
                            <span className="font-medium text-sm truncate">{item?.name}</span>
                          </div>
                          <div className={`flex-shrink-0 ${getStatusColor(item?.status)} ${
                            item?.status === 'critical' ? 'animate-pulse' : ''}`}>
                            <Icon name={getStatusIcon(item?.status)} size={16} />
                          </div>
                        </div>
                        
                        <div className="text-xs opacity-90 mb-2 flex items-center">
                          <Icon name="MapPin" size={12} className="inline mr-2 flex-shrink-0" />
                          <span className="truncate">{item?.location}</span>
                        </div>
                        
                        {item?.activeWorkOrders > 0 &&
                          <div className="text-xs opacity-90 mb-2 flex items-center">
                            <Icon name="Wrench" size={12} className="inline mr-2 flex-shrink-0" />
                            <span>{item?.activeWorkOrders} active work order{item?.activeWorkOrders !== 1 ? 's' : ''}</span>
                          </div>
                        }
                        
                        {item?.lastMaintenance &&
                          <div className="text-xs opacity-90 flex items-center">
                            <Icon name="Calendar" size={12} className="inline mr-2 flex-shrink-0" />
                            <span>Last: {new Date(item.lastMaintenance)?.toLocaleDateString()}</span>
                          </div>
                        }
                      </div>
                    )
                  }
                </div>
              }
            </div>);
        })}
      </div>
      
      {/* Status Summary - Enhanced Modern Design */}
      <div className="px-6 py-6 border-t border-border status-summary">
        <h3 className="text-sm font-semibold text-foreground mb-5">Status Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-success/5 transition-colors">
            <div className="w-3 h-3 rounded-full bg-success flex-shrink-0 shadow-sm"></div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-success">
                {equipment?.filter((e) => e?.status === 'operational')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Operational</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-warning/5 transition-colors">
            <div className="w-3 h-3 rounded-full bg-warning flex-shrink-0 shadow-sm"></div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-warning">
                {equipment?.filter((e) => e?.status === 'warning')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Warning</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-error/5 transition-colors">
            <div className="w-3 h-3 rounded-full bg-error flex-shrink-0 shadow-sm animate-pulse"></div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-error">
                {equipment?.filter((e) => e?.status === 'critical')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20 transition-colors">
            <div className="w-3 h-3 rounded-full bg-muted-foreground flex-shrink-0 shadow-sm"></div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-muted-foreground">
                {equipment?.filter((e) => e?.status === 'offline')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Offline</div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};

export default EquipmentSidebar;