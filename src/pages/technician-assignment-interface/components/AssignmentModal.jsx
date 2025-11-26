import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AssignmentModal = ({ isOpen, onClose, workOrder, technician, onConfirmAssignment }) => {
  const [assignmentData, setAssignmentData] = useState({
    priority: workOrder?.priority || 'Medium',
    estimatedDuration: workOrder?.estimatedDuration || 60,
    notes: '',
    scheduledTime: 'immediate',
    customTime: '',
    notifyTechnician: true,
    requireConfirmation: true
  });

  const priorityOptions = [
    { value: 'Critical', label: 'Critical', description: 'Immediate attention required' },
    { value: 'High', label: 'High', description: 'Complete within 2 hours' },
    { value: 'Medium', label: 'Medium', description: 'Complete within 8 hours' },
    { value: 'Low', label: 'Low', description: 'Complete within 24 hours' }
  ];

  const scheduleOptions = [
    { value: 'immediate', label: 'Assign Immediately' },
    { value: 'next-available', label: 'Next Available Slot' },
    { value: 'custom', label: 'Custom Time' }
  ];

  const handleInputChange = (field, value) => {
    setAssignmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirm = () => {
    const assignment = {
      workOrderId: workOrder?.id,
      technicianId: technician?.id,
      ...assignmentData,
      assignedAt: new Date()?.toISOString(),
      assignedBy: 'Current User' // In real app, get from auth context
    };
    
    onConfirmAssignment(assignment);
    onClose();
  };

  const calculateMatchScore = () => {
    if (!workOrder || !technician) return 0;
    
    let score = 0;
    const maxScore = 100;
    
    // Skill matching (40 points)
    const matchingSkills = workOrder?.requiredSkills?.filter(skill => 
      technician?.skills?.includes(skill)
    );
    score += (matchingSkills?.length / workOrder?.requiredSkills?.length) * 40;
    
    // Workload (30 points)
    const workloadScore = Math.max(0, (100 - technician?.workloadPercentage) / 100 * 30);
    score += workloadScore;
    
    // Location proximity (20 points) - simplified calculation
    score += 15; // Assume good proximity for demo
    
    // Performance history (10 points)
    score += (technician?.completionRate / 100) * 10;
    
    return Math.round(score);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Assign Work Order</h2>
            <p className="text-sm text-muted-foreground">
              Assign work order #{workOrder?.id} to {technician?.name}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Match Score */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Assignment Match Score</span>
              <span className="text-2xl font-bold text-primary">{calculateMatchScore()}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateMatchScore()}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Based on skills, workload, location, and performance history
            </p>
          </div>

          {/* Work Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Work Order Details</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{workOrder?.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{workOrder?.priority} Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">Est. {Math.floor(workOrder?.estimatedDuration / 60)}h {workOrder?.estimatedDuration % 60}m</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Technician Info</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={technician?.avatar}
                    alt={technician?.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-foreground">{technician?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{technician?.currentLocation}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Activity" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{technician?.workloadPercentage}% Workload</span>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Configuration */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Assignment Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Priority Level"
                options={priorityOptions}
                value={assignmentData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
              />

              <Input
                label="Estimated Duration (minutes)"
                type="number"
                value={assignmentData?.estimatedDuration}
                onChange={(e) => handleInputChange('estimatedDuration', parseInt(e?.target?.value))}
                min="15"
                max="480"
              />
            </div>

            <Select
              label="Schedule Assignment"
              options={scheduleOptions}
              value={assignmentData?.scheduledTime}
              onChange={(value) => handleInputChange('scheduledTime', value)}
            />

            {assignmentData?.scheduledTime === 'custom' && (
              <Input
                label="Custom Schedule Time"
                type="datetime-local"
                value={assignmentData?.customTime}
                onChange={(e) => handleInputChange('customTime', e?.target?.value)}
              />
            )}

            <Input
              label="Assignment Notes"
              type="text"
              placeholder="Add any special instructions or notes..."
              value={assignmentData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              description="Optional notes for the technician"
            />

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notifyTechnician"
                  checked={assignmentData?.notifyTechnician}
                  onChange={(e) => handleInputChange('notifyTechnician', e?.target?.checked)}
                  className="rounded border-border"
                />
                <label htmlFor="notifyTechnician" className="text-sm text-foreground">
                  Send notification to technician
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="requireConfirmation"
                  checked={assignmentData?.requireConfirmation}
                  onChange={(e) => handleInputChange('requireConfirmation', e?.target?.checked)}
                  className="rounded border-border"
                />
                <label htmlFor="requireConfirmation" className="text-sm text-foreground">
                  Require technician confirmation
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              <Icon name="UserCheck" size={16} className="mr-2" />
              Confirm Assignment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;