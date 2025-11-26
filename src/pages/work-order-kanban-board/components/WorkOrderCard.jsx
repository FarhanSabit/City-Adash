import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WorkOrderCard = ({ 
  workOrder, 
  onDragStart, 
  onDragEnd, 
  onSelect, 
  isSelected, 
  onOpenDetails,
  userRole = 'technician'
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'new': return 'Plus';
      case 'in progress': return 'Clock';
      case 'awaiting parts': return 'Package';
      case 'awaiting approval': return 'CheckCircle2';
      case 'completed': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const formatElapsedTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffHours = Math.floor((now - created) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    onDragStart?.(e, workOrder);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    onDragEnd?.(e, workOrder);
  };

  const handleCardClick = (e) => {
    if (e?.ctrlKey || e?.metaKey) {
      onSelect?.(workOrder?.id);
    } else {
      onOpenDetails?.(workOrder);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleCardClick}
      className={`bg-card border border-border rounded-lg p-4 mb-3 cursor-pointer transition-all duration-200 hover:shadow-modal ${
        isDragging ? 'opacity-50 rotate-2 scale-105' : ''
      } ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-mono text-muted-foreground">
            #{workOrder?.id}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(workOrder?.priority)}`}>
            {workOrder?.priority}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon(workOrder?.status)} 
            size={16} 
            className="text-muted-foreground" 
          />
          {workOrder?.hasAttachments && (
            <Icon name="Paperclip" size={14} className="text-muted-foreground" />
          )}
        </div>
      </div>
      {/* Title and Description */}
      <div className="mb-3">
        <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-2">
          {workOrder?.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {workOrder?.description}
        </p>
      </div>
      {/* Location and Room */}
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="MapPin" size={14} className="text-muted-foreground" />
        <span className="text-xs text-muted-foreground">
          {workOrder?.location} - Room {workOrder?.room}
        </span>
      </div>
      {/* Technician and Time */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {workOrder?.assignedTechnician ? (
            <>
              <Image
                src={workOrder?.assignedTechnician?.avatar}
                alt={workOrder?.assignedTechnician?.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-xs text-foreground">
                {workOrder?.assignedTechnician?.name}
              </span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground">Unassigned</span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {formatElapsedTime(workOrder?.createdAt)}
        </span>
      </div>
      {/* Parts Status */}
      {workOrder?.partsRequired && (
        <div className="flex items-center space-x-2 mb-3">
          <Icon 
            name="Package" 
            size={14} 
            className={workOrder?.partsAvailable ? 'text-success' : 'text-warning'} 
          />
          <span className={`text-xs ${workOrder?.partsAvailable ? 'text-success' : 'text-warning'}`}>
            {workOrder?.partsAvailable ? 'Parts Available' : 'Parts Pending'}
          </span>
        </div>
      )}
      {/* Cost Information (Supervisor Only) */}
      {userRole === 'supervisor' && workOrder?.estimatedCost && (
        <div className="flex items-center justify-between mb-3 p-2 bg-muted rounded">
          <span className="text-xs text-muted-foreground">Est. Cost:</span>
          <span className="text-xs font-medium text-foreground">
            ${workOrder?.estimatedCost?.toFixed(2)}
          </span>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center space-x-1">
          {workOrder?.status === 'Awaiting Approval' && userRole === 'supervisor' && (
            <>
              <Button
                variant="success"
                size="xs"
                onClick={(e) => {
                  e?.stopPropagation();
                  console.log('Approve work order:', workOrder?.id);
                }}
              >
                Approve
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={(e) => {
                  e?.stopPropagation();
                  console.log('Reject work order:', workOrder?.id);
                }}
              >
                Reject
              </Button>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="xs"
            onClick={(e) => {
              e?.stopPropagation();
              console.log('Edit work order:', workOrder?.id);
            }}
          >
            <Icon name="Edit2" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={(e) => {
              e?.stopPropagation();
              onOpenDetails?.(workOrder);
            }}
          >
            <Icon name="ExternalLink" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderCard;