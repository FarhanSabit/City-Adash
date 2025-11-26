import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReorderModal = ({ isOpen, onClose, part, onSubmitReorder }) => {
  const [reorderData, setReorderData] = useState({
    quantity: part?.reorderLevel * 2 || 0,
    supplier: part?.supplier || '',
    priority: 'normal',
    notes: '',
    expectedDelivery: ''
  });

  const priorityOptions = [
    { value: 'urgent', label: 'Urgent (1-2 days)' },
    { value: 'normal', label: 'Normal (5-7 days)' },
    { value: 'low', label: 'Low Priority (2-3 weeks)' }
  ];

  const supplierOptions = [
    { value: 'ABC Supply Co', label: 'ABC Supply Co' },
    { value: 'Industrial Parts Ltd', label: 'Industrial Parts Ltd' },
    { value: 'Quick Fix Supplies', label: 'Quick Fix Supplies' },
    { value: 'Premium Components', label: 'Premium Components' }
  ];

  const handleInputChange = (field, value) => {
    setReorderData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmitReorder({
      partId: part?.id,
      ...reorderData
    });
    onClose();
  };

  const calculateTotalCost = () => {
    return part ? part?.unitCost * reorderData?.quantity : 0;
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
      <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="ShoppingCart" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Reorder Part</h2>
              <p className="text-sm text-muted-foreground">Create purchase order for inventory replenishment</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8">
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Part Information */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Part Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Part Number</span>
                <p className="font-medium text-foreground">{part?.partNumber}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Description</span>
                <p className="font-medium text-foreground">{part?.description}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Current Stock</span>
                <p className="font-medium text-foreground">{part?.currentStock} units</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Reorder Level</span>
                <p className="font-medium text-foreground">{part?.reorderLevel} units</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Unit Cost</span>
                <p className="font-medium text-foreground">{formatCurrency(part?.unitCost)}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Category</span>
                <p className="font-medium text-foreground">{part?.category}</p>
              </div>
            </div>
          </div>

          {/* Reorder Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Reorder Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Quantity to Order"
                type="number"
                value={reorderData?.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e?.target?.value) || 0)}
                required
                min="1"
                description={`Recommended: ${part?.reorderLevel * 2} units`}
              />
              
              <Select
                label="Supplier"
                options={supplierOptions}
                value={reorderData?.supplier}
                onChange={(value) => handleInputChange('supplier', value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Priority"
                options={priorityOptions}
                value={reorderData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
                required
              />
              
              <Input
                label="Expected Delivery Date"
                type="date"
                value={reorderData?.expectedDelivery}
                onChange={(e) => handleInputChange('expectedDelivery', e?.target?.value)}
                min={new Date()?.toISOString()?.split('T')?.[0]}
              />
            </div>

            <Input
              label="Notes"
              type="textarea"
              value={reorderData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              placeholder="Additional notes or special requirements..."
              rows={3}
            />
          </div>

          {/* Cost Summary */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Cost Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Unit Cost:</span>
                <span className="text-sm text-foreground">{formatCurrency(part?.unitCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Quantity:</span>
                <span className="text-sm text-foreground">{reorderData?.quantity} units</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="font-medium text-foreground">Total Cost:</span>
                <span className="font-medium text-foreground">{formatCurrency(calculateTotalCost())}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" iconName="ShoppingCart" iconPosition="left">
              Create Purchase Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReorderModal;