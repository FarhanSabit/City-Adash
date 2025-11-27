import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WorkOrderCreationModal = ({ isOpen, onClose, equipment, location }) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: '',
    category: '',
    assignee: '',
    description: ''
  });

  if (!isOpen) return null;

  const priorityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const categoryOptions = [
    { value: 'hvac', label: 'HVAC' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'structural', label: 'Structural' },
    { value: 'safety', label: 'Safety' }
  ];

  const assigneeOptions = [
    { value: 'tech1', label: 'John Martinez - HVAC Specialist' },
    { value: 'tech2', label: 'Sarah Chen - Electrical Engineer' },
    { value: 'tech3', label: 'Mike Johnson - General Maintenance' },
    { value: 'tech4', label: 'Emily Rodriguez - Plumbing Expert' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    console.log('Work order created:', formData);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin animation-fade-in">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Icon name="Plus" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Create Work Order</h2>
                <p className="text-xs text-muted-foreground">
                  {equipment ? `For ${equipment?.name}` : location ? `At ${location}` : 'New maintenance request'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon name="X" size={20} color="var(--color-muted-foreground)" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <Input
              label="Work Order Title"
              type="text"
              placeholder="Brief description of the issue"
              required
              value={formData?.title}
              onChange={(e) => setFormData({ ...formData, title: e?.target?.value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Priority Level"
                placeholder="Select priority"
                required
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => setFormData({ ...formData, priority: value })}
              />

              <Select
                label="Category"
                placeholder="Select category"
                required
                options={categoryOptions}
                value={formData?.category}
                onChange={(value) => setFormData({ ...formData, category: value })}
              />
            </div>

            <Select
              label="Assign To"
              placeholder="Select technician"
              required
              searchable
              options={assigneeOptions}
              value={formData?.assignee}
              onChange={(value) => setFormData({ ...formData, assignee: value })}
            />

            {equipment && (
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name={equipment?.icon} size={20} color="var(--color-primary)" />
                  <span className="text-sm font-semibold text-foreground">Equipment Details</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Asset ID:</span>
                    <span className="ml-2 font-mono text-foreground">{equipment?.assetId}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <span className="ml-2 text-foreground">{equipment?.location}</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Detailed description of the issue and required actions..."
                required
                value={formData?.description}
                onChange={(e) => setFormData({ ...formData, description: e?.target?.value })}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                iconName="Check"
                iconPosition="left"
                fullWidth
              >
                Create Work Order
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WorkOrderCreationModal;