import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const WorkOrderConfiguration = () => {
  const [workflowStages, setWorkflowStages] = useState([
    { id: 1, name: 'New Requests', color: '#3B82F6', order: 1, required: true },
    { id: 2, name: 'In Progress', color: '#F59E0B', order: 2, required: true },
    { id: 3, name: 'Awaiting Parts/Approval', color: '#EF4444', order: 3, required: false },
    { id: 4, name: 'Completed & Verified', color: '#10B981', order: 4, required: true }
  ]);

  const [prioritySettings, setPrioritySettings] = useState({
    critical: { color: '#DC2626', slaHours: 2, escalationEnabled: true },
    high: { color: '#EA580C', slaHours: 8, escalationEnabled: true },
    medium: { color: '#CA8A04', slaHours: 24, escalationEnabled: false },
    low: { color: '#16A34A', slaHours: 72, escalationEnabled: false }
  });

  const [autoAssignmentRules, setAutoAssignmentRules] = useState({
    enabled: true,
    skillMatching: true,
    workloadBalancing: true,
    locationPreference: true,
    maxAssignments: 5
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleStageUpdate = (stageId, field, value) => {
    setWorkflowStages(prev => prev?.map(stage => 
      stage?.id === stageId ? { ...stage, [field]: value } : stage
    ));
    setHasChanges(true);
  };

  const handlePriorityUpdate = (priority, field, value) => {
    setPrioritySettings(prev => ({
      ...prev,
      [priority]: { ...prev?.[priority], [field]: value }
    }));
    setHasChanges(true);
  };

  const handleAutoAssignmentUpdate = (field, value) => {
    setAutoAssignmentRules(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const addWorkflowStage = () => {
    const newStage = {
      id: Date.now(),
      name: 'New Stage',
      color: '#6B7280',
      order: workflowStages?.length + 1,
      required: false
    };
    setWorkflowStages(prev => [...prev, newStage]);
    setHasChanges(true);
  };

  const removeWorkflowStage = (stageId) => {
    setWorkflowStages(prev => prev?.filter(stage => stage?.id !== stageId));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving work order configuration:', {
      workflowStages,
      prioritySettings,
      autoAssignmentRules
    });
    setHasChanges(false);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-8">
      {/* Workflow Configuration */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="GitBranch" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Workflow Stages</h3>
              <p className="text-sm text-muted-foreground">Configure work order progression stages</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={addWorkflowStage}
            iconName="Plus"
            iconPosition="left"
            size="sm"
          >
            Add Stage
          </Button>
        </div>

        <div className="space-y-4">
          {workflowStages?.map((stage) => (
            <div key={stage?.id} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3 flex-1">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: stage?.color }}
                />
                <Input
                  value={stage?.name}
                  onChange={(e) => handleStageUpdate(stage?.id, 'name', e?.target?.value)}
                  className="flex-1"
                />
                <Input
                  type="color"
                  value={stage?.color}
                  onChange={(e) => handleStageUpdate(stage?.id, 'color', e?.target?.value)}
                  className="w-16"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  label="Required"
                  checked={stage?.required}
                  onChange={(e) => handleStageUpdate(stage?.id, 'required', e?.target?.checked)}
                />
                {!stage?.required && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeWorkflowStage(stage?.id)}
                    iconName="Trash2"
                    className="text-error hover:text-error"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Priority Configuration */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Flag" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Priority Settings</h3>
            <p className="text-sm text-muted-foreground">Configure priority levels and SLA thresholds</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(prioritySettings)?.map(([priority, settings]) => (
            <div key={priority} className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Icon 
                  name={getPriorityIcon(priority)} 
                  size={20} 
                  style={{ color: settings?.color }}
                />
                <h4 className="text-base font-medium text-foreground capitalize">{priority} Priority</h4>
              </div>
              
              <div className="space-y-4">
                <Input
                  label="SLA Hours"
                  type="number"
                  value={settings?.slaHours}
                  onChange={(e) => handlePriorityUpdate(priority, 'slaHours', parseInt(e?.target?.value))}
                  description="Response time requirement in hours"
                />
                
                <Checkbox
                  label="Enable Escalation"
                  description="Automatically escalate overdue tickets"
                  checked={settings?.escalationEnabled}
                  onChange={(e) => handlePriorityUpdate(priority, 'escalationEnabled', e?.target?.checked)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Auto-Assignment Rules */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="UserCheck" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Auto-Assignment Rules</h3>
            <p className="text-sm text-muted-foreground">Configure automatic technician assignment logic</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Checkbox
              label="Enable Auto-Assignment"
              description="Automatically assign work orders to technicians"
              checked={autoAssignmentRules?.enabled}
              onChange={(e) => handleAutoAssignmentUpdate('enabled', e?.target?.checked)}
            />
            
            <Checkbox
              label="Skill Matching"
              description="Match technician skills to work order requirements"
              checked={autoAssignmentRules?.skillMatching}
              onChange={(e) => handleAutoAssignmentUpdate('skillMatching', e?.target?.checked)}
              disabled={!autoAssignmentRules?.enabled}
            />
            
            <Checkbox
              label="Workload Balancing"
              description="Distribute assignments evenly across technicians"
              checked={autoAssignmentRules?.workloadBalancing}
              onChange={(e) => handleAutoAssignmentUpdate('workloadBalancing', e?.target?.checked)}
              disabled={!autoAssignmentRules?.enabled}
            />
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Location Preference"
              description="Prefer technicians closer to work location"
              checked={autoAssignmentRules?.locationPreference}
              onChange={(e) => handleAutoAssignmentUpdate('locationPreference', e?.target?.checked)}
              disabled={!autoAssignmentRules?.enabled}
            />
            
            <Input
              label="Max Assignments per Technician"
              type="number"
              value={autoAssignmentRules?.maxAssignments}
              onChange={(e) => handleAutoAssignmentUpdate('maxAssignments', parseInt(e?.target?.value))}
              description="Maximum concurrent assignments"
              disabled={!autoAssignmentRules?.enabled}
            />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="flex items-center space-x-2">
          {hasChanges && (
            <>
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <span className="text-sm text-warning">You have unsaved changes</span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setHasChanges(false)}
            disabled={!hasChanges}
          >
            Discard Changes
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!hasChanges}
            iconName="Save"
            iconPosition="left"
          >
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderConfiguration;