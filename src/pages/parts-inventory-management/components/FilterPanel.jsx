import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onApplyFilters, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    categories: [],
    suppliers: [],
    stockStatus: [],
    priceRange: { min: '', max: '' },
    location: '',
    compatibility: '',
    dateRange: { start: '', end: '' }
  });

  const categoryOptions = [
    { value: 'HVAC', label: 'HVAC Parts' },
    { value: 'Electrical', label: 'Electrical Components' },
    { value: 'Plumbing', label: 'Plumbing Supplies' },
    { value: 'Safety', label: 'Safety Equipment' },
    { value: 'General', label: 'General Maintenance' },
    { value: 'Tools', label: 'Tools & Equipment' }
  ];

  const supplierOptions = [
    { value: 'ABC Supply Co', label: 'ABC Supply Co' },
    { value: 'Industrial Parts Ltd', label: 'Industrial Parts Ltd' },
    { value: 'Quick Fix Supplies', label: 'Quick Fix Supplies' },
    { value: 'Premium Components', label: 'Premium Components' },
    { value: 'Local Hardware', label: 'Local Hardware Store' }
  ];

  const stockStatusOptions = [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'reorder-required', label: 'Reorder Required' }
  ];

  const handleCategoryChange = (category, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      categories: checked 
        ? [...prev?.categories, category]
        : prev?.categories?.filter(c => c !== category)
    }));
  };

  const handleSupplierChange = (supplier, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      suppliers: checked 
        ? [...prev?.suppliers, supplier]
        : prev?.suppliers?.filter(s => s !== supplier)
    }));
  };

  const handleStockStatusChange = (status, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      stockStatus: checked 
        ? [...prev?.stockStatus, status]
        : prev?.stockStatus?.filter(s => s !== status)
    }));
  };

  const handlePriceRangeChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev?.priceRange,
        [field]: value
      }
    }));
  };

  const handleDateRangeChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev?.dateRange,
        [field]: value
      }
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      categories: [],
      suppliers: [],
      stockStatus: [],
      priceRange: { min: '', max: '' },
      location: '',
      compatibility: '',
      dateRange: { start: '', end: '' }
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.categories?.length > 0) count++;
    if (localFilters?.suppliers?.length > 0) count++;
    if (localFilters?.stockStatus?.length > 0) count++;
    if (localFilters?.priceRange?.min || localFilters?.priceRange?.max) count++;
    if (localFilters?.location) count++;
    if (localFilters?.compatibility) count++;
    if (localFilters?.dateRange?.start || localFilters?.dateRange?.end) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center shadow-sm">
              <Icon name="Filter" size={22} className="text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Advanced Filters</h2>
              <p className="text-sm text-gray-600 mt-1">
                {getActiveFilterCount() > 0 
                  ? `${getActiveFilterCount()} filter${getActiveFilterCount() > 1 ? 's' : ''} active`
                  : 'Refine your inventory search'
                }
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose} 
            className="h-10 w-10 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 text-lg">Categories</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto bg-white rounded-lg p-4 border border-gray-200">
                {categoryOptions?.map((category) => (
                  <Checkbox
                    key={category?.value}
                    label={category?.label}
                    checked={localFilters?.categories?.includes(category?.value)}
                    onChange={(e) => handleCategoryChange(category?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Suppliers */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 text-lg">Suppliers</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto bg-white rounded-lg p-4 border border-gray-200">
                {supplierOptions?.map((supplier) => (
                  <Checkbox
                    key={supplier?.value}
                    label={supplier?.label}
                    checked={localFilters?.suppliers?.includes(supplier?.value)}
                    onChange={(e) => handleSupplierChange(supplier?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 text-lg">Stock Status</h3>
              <div className="space-y-3 bg-white rounded-lg p-4 border border-gray-200">
                {stockStatusOptions?.map((status) => (
                  <Checkbox
                    key={status?.value}
                    label={status?.label}
                    checked={localFilters?.stockStatus?.includes(status?.value)}
                    onChange={(e) => handleStockStatusChange(status?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 text-lg">Price Range</h3>
              <div className="grid grid-cols-2 gap-4 bg-white rounded-lg p-4 border border-gray-200">
                <Input
                  label="Min Price ($)"
                  type="number"
                  step="0.01"
                  value={localFilters?.priceRange?.min}
                  onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
                  placeholder="0.00"
                  className="bg-gray-50 border-gray-200 focus:border-yellow-400 focus:ring-yellow-200"
                />
                <Input
                  label="Max Price ($)"
                  type="number"
                  step="0.01"
                  value={localFilters?.priceRange?.max}
                  onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
                  placeholder="999.99"
                  className="bg-gray-50 border-gray-200 focus:border-yellow-400 focus:ring-yellow-200"
                />
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Input
              label="Storage Location"
              type="text"
              value={localFilters?.location}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, location: e?.target?.value }))}
              placeholder="e.g., Warehouse A, Shelf 3B"
              className="bg-white border-gray-200 focus:border-yellow-400 focus:ring-yellow-200"
            />

            <Input
              label="Equipment Compatibility"
              type="text"
              value={localFilters?.compatibility}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, compatibility: e?.target?.value }))}
              placeholder="Compatible equipment or model"
              className="bg-white border-gray-200 focus:border-yellow-400 focus:ring-yellow-200"
            />
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-lg">Last Updated Date Range</h3>
            <div className="grid grid-cols-2 gap-4 bg-white rounded-lg p-4 border border-gray-200">
              <Input
                label="Start Date"
                type="date"
                value={localFilters?.dateRange?.start}
                onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
                className="bg-gray-50 border-gray-200 focus:border-yellow-400 focus:ring-yellow-200"
              />
              <Input
                label="End Date"
                type="date"
                value={localFilters?.dateRange?.end}
                onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
                min={localFilters?.dateRange?.start}
                className="bg-gray-50 border-gray-200 focus:border-yellow-400 focus:ring-yellow-200"
              />
            </div>
          </div>

          {/* Quick Filter Presets */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-lg">Quick Filters</h3>
            <div className="flex flex-wrap gap-3 bg-white rounded-lg p-4 border border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStockStatusChange('reorder-required', true)}
                className="bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border-red-200 text-red-700 hover:text-red-800 transition-all duration-200"
              >
                Reorder Required
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStockStatusChange('out-of-stock', true)}
                className="bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border-orange-200 text-orange-700 hover:text-orange-800 transition-all duration-200"
              >
                Out of Stock
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCategoryChange('HVAC', true)}
                className="bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-blue-700 hover:text-blue-800 transition-all duration-200"
              >
                HVAC Parts Only
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handlePriceRangeChange('min', '100');
                  handlePriceRangeChange('max', '');
                }}
                className="bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-200 text-green-700 hover:text-green-800 transition-all duration-200"
              >
                High Value Items ($100+)
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-xl">
          <Button 
            variant="outline" 
            onClick={handleClearFilters}
            className="bg-white hover:bg-red-50 border-gray-200 text-gray-700 hover:text-red-700 hover:border-red-300 transition-all duration-200">
            Clear All Filters
          </Button>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="bg-white hover:bg-gray-50 border-gray-200 text-gray-700 transition-all duration-200">
              Cancel
            </Button>
            <Button 
              onClick={handleApplyFilters} 
              iconName="Filter" 
              iconPosition="left"
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white shadow-sm hover:shadow-md transition-all duration-200">
              Apply Filters ({getActiveFilterCount()})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;