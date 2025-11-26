import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TechnicianCard = ({ technician, onAssignWork, onViewSchedule }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-success text-success-foreground';
      case 'busy': return 'bg-warning text-warning-foreground';
      case 'off-duty': return 'bg-muted text-muted-foreground';
      case 'emergency': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getWorkloadColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 70) return 'bg-warning';
    if (percentage >= 50) return 'bg-accent';
    return 'bg-success';
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

  const handleDrop = (e) => {
    e?.preventDefault();
    const workOrderData = e?.dataTransfer?.getData('text/plain');
    if (workOrderData && technician?.status === 'Available') {
      const workOrder = JSON.parse(workOrderData);
      onAssignWork(technician, workOrder);
    }
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    if (technician?.status === 'Available') {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-4 shadow-soft hover:shadow-modal transition-all duration-200 ${
        technician?.status === 'Available' ? 'hover:border-primary' : ''
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={technician?.avatar}
              alt={technician?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(technician?.status)}`}></div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{technician?.name}</h3>
            <p className="text-xs text-muted-foreground">{technician?.role}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(technician?.status)}`}>
          {technician?.status}
        </span>
      </div>
      {/* Location and Contact */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{technician?.currentLocation}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Phone" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{technician?.phone}</span>
        </div>
      </div>
      {/* Skills */}
      <div className="mb-3">
        <div className="flex items-center space-x-1 mb-2">
          <Icon name="Award" size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Skills</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {technician?.skills?.map((skill) => (
            <div key={skill} className="flex items-center space-x-1 bg-muted px-2 py-1 rounded-md">
              <Icon name={getSkillIcon(skill)} size={10} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{skill}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Workload */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-foreground">Workload</span>
          <span className="text-xs text-muted-foreground">{technician?.workloadPercentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getWorkloadColor(technician?.workloadPercentage)}`}
            style={{ width: `${technician?.workloadPercentage}%` }}
          ></div>
        </div>
      </div>
      {/* Current Tasks */}
      <div className="mb-3">
        <div className="flex items-center space-x-1 mb-2">
          <Icon name="CheckSquare" size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Active Tasks</span>
          <span className="text-xs text-muted-foreground">({technician?.activeTasks})</span>
        </div>
        {technician?.currentTask && (
          <div className="bg-muted p-2 rounded-md">
            <p className="text-xs text-foreground font-medium">{technician?.currentTask?.title}</p>
            <p className="text-xs text-muted-foreground">{technician?.currentTask?.location}</p>
          </div>
        )}
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Completion Rate</p>
          <p className="text-sm font-semibold text-foreground">{technician?.completionRate}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Avg Response</p>
          <p className="text-sm font-semibold text-foreground">{technician?.avgResponseTime}</p>
        </div>
      </div>
      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewSchedule(technician)}
          className="flex-1 text-xs"
        >
          <Icon name="Calendar" size={12} className="mr-1" />
          Schedule
        </Button>
        <Button
          variant={technician?.status === 'Available' ? 'default' : 'secondary'}
          size="sm"
          onClick={() => onAssignWork(technician)}
          disabled={technician?.status !== 'Available'}
          className="flex-1 text-xs"
        >
          <Icon name="UserPlus" size={12} className="mr-1" />
          Assign
        </Button>
      </div>
    </div>
  );
};

export default TechnicianCard;