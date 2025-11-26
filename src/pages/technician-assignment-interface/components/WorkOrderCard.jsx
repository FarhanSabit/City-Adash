import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkOrderCard = ({ workOrder, onAssign, isDragging = false }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSkillIcon = (skill) => {
    const skillIcons = {
      'HVAC': 'Wind',
      'Electrical': 'Zap',
      'Plumbing': 'Droplets',
      'Mechanical': 'Wrench',
      'Carpentry': 'Hammer',
      'Painting': 'Paintbrush',
      'Security': 'Shield',
      'Cleaning': 'Sparkles'
    };
    return skillIcons?.[skill] || 'Tool';
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-4 shadow-soft hover:shadow-modal transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50 rotate-2 scale-105' : ''
      }`}
      draggable
      onDragStart={(e) => {
        e?.dataTransfer?.setData('text/plain', JSON.stringify(workOrder));
        e.dataTransfer.effectAllowed = 'move';
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">#{workOrder?.id}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(workOrder?.priority)}`}>
            {workOrder?.priority}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{workOrder?.timeElapsed}</span>
        </div>
      </div>
      {/* Location */}
      <div className="flex items-center space-x-2 mb-2">
        <Icon name="MapPin" size={16} className="text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">{workOrder?.location}</span>
      </div>
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {workOrder?.description}
      </p>
      {/* Required Skills */}
      <div className="flex flex-wrap gap-1 mb-3">
        {workOrder?.requiredSkills?.map((skill) => (
          <div key={skill} className="flex items-center space-x-1 bg-muted px-2 py-1 rounded-md">
            <Icon name={getSkillIcon(skill)} size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{skill}</span>
          </div>
        ))}
      </div>
      {/* Duration and Parts */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          <Icon name="Timer" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Est. {formatDuration(workOrder?.estimatedDuration)}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon 
            name={workOrder?.partsAvailable ? "CheckCircle" : "AlertCircle"} 
            size={14} 
            className={workOrder?.partsAvailable ? "text-success" : "text-warning"} 
          />
          <span className={`text-xs ${workOrder?.partsAvailable ? "text-success" : "text-warning"}`}>
            {workOrder?.partsAvailable ? "Parts Ready" : "Parts Pending"}
          </span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('View details:', workOrder?.id)}
          className="text-xs"
        >
          <Icon name="Eye" size={14} className="mr-1" />
          Details
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onAssign(workOrder)}
          className="text-xs"
        >
          <Icon name="UserPlus" size={14} className="mr-1" />
          Assign
        </Button>
      </div>
    </div>
  );
};

export default WorkOrderCard;