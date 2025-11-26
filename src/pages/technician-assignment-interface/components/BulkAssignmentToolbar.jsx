import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkAssignmentToolbar = ({ 
  selectedWorkOrders, 
  technicians, 
  onBulkAssign, 
  onClearSelection,
  onAutoAssign 
}) => {
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [assignmentMode, setAssignmentMode] = useState('manual');

  const assignmentModeOptions = [
    { value: 'manual', label: 'Manual Assignment', description: 'Assign to selected technician' },
    { value: 'auto-balanced', label: 'Auto-Balanced', description: 'Distribute evenly by workload' },
    { value: 'skill-matched', label: 'Skill-Matched', description: 'Assign based on required skills' },
    { value: 'location-optimized', label: 'Location-Optimized', description: 'Minimize travel time' }
  ];

  const availableTechnicians = technicians?.filter(tech => tech?.status === 'Available')?.map(tech => ({
      value: tech?.id,
      label: `${tech?.name} (${tech?.workloadPercentage}% workload)`,
      description: tech?.currentLocation
    }));

  const handleBulkAssign = () => {
    if (assignmentMode === 'manual' && selectedTechnician) {
      const technician = technicians?.find(t => t?.id === selectedTechnician);
      onBulkAssign(selectedWorkOrders, technician, assignmentMode);
    } else if (assignmentMode !== 'manual') {
      onAutoAssign(selectedWorkOrders, assignmentMode);
    }
  };

  const getAssignmentSummary = () => {
    const totalDuration = selectedWorkOrders?.reduce((sum, wo) => sum + wo?.estimatedDuration, 0);
    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;
    
    return {
      count: selectedWorkOrders?.length,
      duration: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
      priorities: {
        critical: selectedWorkOrders?.filter(wo => wo?.priority === 'Critical')?.length,
        high: selectedWorkOrders?.filter(wo => wo?.priority === 'High')?.length,
        medium: selectedWorkOrders?.filter(wo => wo?.priority === 'Medium')?.length,
        low: selectedWorkOrders?.filter(wo => wo?.priority === 'Low')?.length
      }
    };
  };

  const summary = getAssignmentSummary();

  if (selectedWorkOrders?.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg shadow-modal p-4 z-40 min-w-96">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-semibold text-foreground">
              {summary?.count} Work Orders Selected
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Total: {summary?.duration}
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          <Icon name="X" size={16} />
        </Button>
      </div>
      {/* Priority Summary */}
      <div className="flex items-center space-x-4 mb-4">
        {summary?.priorities?.critical > 0 && (
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-xs text-muted-foreground">{summary?.priorities?.critical} Critical</span>
          </div>
        )}
        {summary?.priorities?.high > 0 && (
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-muted-foreground">{summary?.priorities?.high} High</span>
          </div>
        )}
        {summary?.priorities?.medium > 0 && (
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-xs text-muted-foreground">{summary?.priorities?.medium} Medium</span>
          </div>
        )}
        {summary?.priorities?.low > 0 && (
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-muted-foreground">{summary?.priorities?.low} Low</span>
          </div>
        )}
      </div>
      {/* Assignment Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select
          label="Assignment Mode"
          options={assignmentModeOptions}
          value={assignmentMode}
          onChange={setAssignmentMode}
        />

        {assignmentMode === 'manual' && (
          <Select
            label="Select Technician"
            options={availableTechnicians}
            value={selectedTechnician}
            onChange={setSelectedTechnician}
            placeholder="Choose technician..."
            searchable
          />
        )}
      </div>
      {/* Assignment Preview */}
      {assignmentMode !== 'manual' && (
        <div className="bg-muted p-3 rounded-md mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Auto-Assignment Preview</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {assignmentMode === 'auto-balanced' && 
              `Work orders will be distributed evenly among ${technicians?.filter(t => t?.status === 'Available')?.length} available technicians based on current workload.`
            }
            {assignmentMode === 'skill-matched' && 'Work orders will be assigned to technicians with matching skill requirements and optimal availability.'
            }
            {assignmentMode === 'location-optimized' && 'Assignments will minimize travel time by grouping work orders by location and proximity to technicians.'
            }
          </p>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onClearSelection}>
            Clear Selection
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => console.log('Export selected work orders')}
          >
            <Icon name="Download" size={14} className="mr-1" />
            Export
          </Button>
        </div>
        
        <Button 
          onClick={handleBulkAssign}
          disabled={assignmentMode === 'manual' && !selectedTechnician}
        >
          <Icon name="Users" size={16} className="mr-2" />
          Assign {summary?.count} Work Orders
        </Button>
      </div>
    </div>
  );
};

export default BulkAssignmentToolbar;