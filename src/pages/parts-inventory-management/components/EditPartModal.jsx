import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EditPartModal = ({ isOpen, onClose, part, onSubmitEdit }) => {
  const [editData, setEditData] = useState({
    partNumber: '',
    description: '',
    category: '',
    currentStock: 0,
    reorderLevel: 0,
    unitCost: 0,
    supplier: '',
    location: '',
    compatibility: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (part) {
      setEditData({
        partNumber: part?.partNumber || '',
        description: part?.description || '',
        category: part?.category || '',
        currentStock: part?.currentStock || 0,
        reorderLevel: part?.reorderLevel || 0,
        unitCost: part?.unitCost || 0,
        supplier: part?.supplier || '',
        location: part?.location || '',
        compatibility: part?.compatibility || '',
        notes: part?.notes || ''
      });
      setErrors({});
    }
  }, [part]);

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

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!editData?.partNumber?.trim()) {
      newErrors.partNumber = 'Part number is required';
    }

    if (!editData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!editData?.category) {
      newErrors.category = 'Category is required';
    }

    if (editData?.currentStock < 0) {
      newErrors.currentStock = 'Stock cannot be negative';
    }

    if (editData?.reorderLevel < 0) {
      newErrors.reorderLevel = 'Reorder level cannot be negative';
    }

    if (editData?.unitCost <= 0) {
      newErrors.unitCost = 'Unit cost must be greater than 0';
    }

    if (!editData?.supplier) {
      newErrors.supplier = 'Supplier is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onSubmitEdit({
        id: part?.id,
        ...editData,
        currentStock: parseInt(editData?.currentStock),
        reorderLevel: parseInt(editData?.reorderLevel),
        unitCost: parseFloat(editData?.unitCost)
      });
      onClose();
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  if (!isOpen || !part) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Edit" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Edit Part</h2>
              <p className="text-sm text-muted-foreground">Update part information and inventory details</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8">
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Part Number"
                type="text"
                value={editData?.partNumber}
                onChange={(e) => handleInputChange('partNumber', e?.target?.value)}
                error={errors?.partNumber}
                required
                placeholder="e.g., HVAC-001"
              />
              
              <Select
                label="Category"
                options={categoryOptions}
                value={editData?.category}
                onChange={(value) => handleInputChange('category', value)}
                error={errors?.category}
                required
              />
            </div>

            <Input
              label="Description"
              type="text"
              value={editData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              error={errors?.description}
              required
              placeholder="Detailed part description"
            />

            <Input
              label="Equipment Compatibility"
              type="text"
              value={editData?.compatibility}
              onChange={(e) => handleInputChange('compatibility', e?.target?.value)}
              placeholder="Compatible equipment models or systems"
            />
          </div>

          {/* Inventory Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Inventory Details</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Current Stock"
                type="number"
                value={editData?.currentStock}
                onChange={(e) => handleInputChange('currentStock', e?.target?.value)}
                error={errors?.currentStock}
                required
                min="0"
              />
              
              <Input
                label="Reorder Level"
                type="number"
                value={editData?.reorderLevel}
                onChange={(e) => handleInputChange('reorderLevel', e?.target?.value)}
                error={errors?.reorderLevel}
                required
                min="0"
                description="Minimum stock before reordering"
              />
              
              <Input
                label="Unit Cost ($)"
                type="number"
                step="0.01"
                value={editData?.unitCost}
                onChange={(e) => handleInputChange('unitCost', e?.target?.value)}
                error={errors?.unitCost}
                required
                min="0.01"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Primary Supplier"
                options={supplierOptions}
                value={editData?.supplier}
                onChange={(value) => handleInputChange('supplier', value)}
                error={errors?.supplier}
                required
              />
              
              <Input
                label="Storage Location"
                type="text"
                value={editData?.location}
                onChange={(e) => handleInputChange('location', e?.target?.value)}
                placeholder="e.g., Warehouse A, Shelf 3B"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Additional Information</h3>
            
            <Input
              label="Notes"
              type="textarea"
              value={editData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              placeholder="Additional notes, specifications, or special handling instructions..."
              rows={3}
            />
          </div>

          {/* Cost Summary */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Inventory Value</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Current Stock Value</span>
                <p className="font-medium text-foreground">
                  {formatCurrency(editData?.currentStock * editData?.unitCost)}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Reorder Value</span>
                <p className="font-medium text-foreground">
                  {formatCurrency(editData?.reorderLevel * editData?.unitCost)}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Unit Cost</span>
                <p className="font-medium text-foreground">
                  {formatCurrency(editData?.unitCost)}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" iconName="Save" iconPosition="left">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPartModal;