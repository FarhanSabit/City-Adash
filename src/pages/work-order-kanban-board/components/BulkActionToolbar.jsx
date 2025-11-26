import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionToolbar = ({ 
  selectedCount, 
  onClearSelection, 
  onBulkAction,
  userRole = 'technician' 
}) => {
  const [showActions, setShowActions] = useState(false);
  const [bulkAssignTechnician, setBulkAssignTechnician] = useState('');

  const technicianOptions = [
    { value: 'john-smith', label: 'John Smith' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'mike-wilson', label: 'Mike Wilson' },
    { value: 'lisa-brown', label: 'Lisa Brown' }
  ];

  const statusOptions = [
    { value: 'new', label: 'New Requests' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'awaiting-parts', label: 'Awaiting Parts' },
    { value: 'awaiting-approval', label: 'Awaiting Approval' },
    { value: 'completed', label: 'Completed' }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const handleBulkAction = (action, value = null) => {
    onBulkAction?.(action, value);
    setShowActions(false);
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-card border border-border rounded-lg shadow-modal p-4 min-w-96">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="CheckSquare" size={16} color="white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedCount} work {selectedCount === 1 ? 'order' : 'orders'} selected
              </p>
              <p className="text-xs text-muted-foreground">
                Choose an action to apply to all selected items
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {!showActions ? (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowActions(true)}
            >
              <Icon name="Settings" size={14} className="mr-2" />
              Bulk Actions
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('export')}
            >
              <Icon name="Download" size={14} className="mr-2" />
              Export
            </Button>
            
            {userRole === 'supervisor' && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('approve')}
                >
                  <Icon name="CheckCircle" size={14} className="mr-2" />
                  Approve All
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                >
                  <Icon name="Trash2" size={14} className="mr-2" />
                  Delete
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Assign Technician */}
            <div>
              <Select
                label="Assign Technician"
                options={technicianOptions}
                value={bulkAssignTechnician}
                onChange={setBulkAssignTechnician}
                placeholder="Select technician..."
              />
              <Button
                variant="default"
                size="sm"
                onClick={() => handleBulkAction('assign', bulkAssignTechnician)}
                disabled={!bulkAssignTechnician}
                className="mt-2"
              >
                Assign to {selectedCount} work {selectedCount === 1 ? 'order' : 'orders'}
              </Button>
            </div>

            {/* Change Status */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Change Status
              </label>
              <div className="flex flex-wrap gap-2">
                {statusOptions?.map((status) => (
                  <Button
                    key={status.value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('status', status.value)}
                  >
                    {status.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Change Priority */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Change Priority
              </label>
              <div className="flex flex-wrap gap-2">
                {priorityOptions?.map((priority) => (
                  <Button
                    key={priority?.value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('priority', priority?.value)}
                    className={
                      priority?.value === 'critical' ? 'border-error text-error' :
                      priority?.value === 'high' ? 'border-warning text-warning' :
                      priority?.value === 'medium'? 'border-accent text-accent' : 'border-success text-success'
                    }
                  >
                    {priority?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Additional Actions */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Other Actions
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('duplicate')}
                >
                  <Icon name="Copy" size={14} className="mr-2" />
                  Duplicate
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('archive')}
                >
                  <Icon name="Archive" size={14} className="mr-2" />
                  Archive
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('print')}
                >
                  <Icon name="Printer" size={14} className="mr-2" />
                  Print
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowActions(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActionToolbar;