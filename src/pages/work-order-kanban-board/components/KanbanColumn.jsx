import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import WorkOrderCard from './WorkOrderCard';

const KanbanColumn = ({ 
  title, 
  status, 
  workOrders, 
  onDrop, 
  onDragOver, 
  selectedCards, 
  onSelectCard, 
  onOpenDetails,
  userRole 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const getColumnIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'new': return 'Inbox';
      case 'in progress': return 'Clock';
      case 'awaiting parts': return 'Package';
      case 'awaiting approval': return 'CheckCircle2';
      case 'completed': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getColumnColor = (status) => {
    switch (status.toLowerCase()) {
      case 'new': return 'text-blue-600';
      case 'in progress': return 'text-amber-600';
      case 'awaiting parts': return 'text-orange-600';
      case 'awaiting approval': return 'text-purple-600';
      case 'completed': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
    onDragOver?.(e);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    onDrop?.(e, status);
  };

  const handleSelectAll = () => {
    const allIds = workOrders?.map(wo => wo?.id);
    allIds?.forEach(id => onSelectCard?.(id));
  };

  const handleClearSelection = () => {
    const selectedInColumn = workOrders?.filter(wo => selectedCards?.includes(wo?.id));
    selectedInColumn?.forEach(wo => onSelectCard?.(wo?.id));
  };

  const selectedInColumn = workOrders?.filter(wo => selectedCards?.includes(wo?.id))?.length;

  return (
    <div className="flex flex-col h-full bg-muted/30 rounded-lg border border-border">
      {/* Column Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card rounded-t-lg">
        <div className="flex items-center space-x-3">
          <Icon 
            name={getColumnIcon(status)} 
            size={20} 
            className={getColumnColor(status)} 
          />
          <div>
            <h3 className="font-medium text-foreground">{title}</h3>
            <span className="text-sm text-muted-foreground">
              {workOrders?.length} {workOrders?.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {selectedInColumn > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-xs text-primary font-medium">
                {selectedInColumn} selected
              </span>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleClearSelection}
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="xs"
            onClick={handleSelectAll}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="CheckSquare" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="xs"
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex-1 p-4 overflow-y-auto transition-all duration-200 ${
          isDragOver ? 'bg-primary/10 border-2 border-dashed border-primary' : ''
        }`}
        style={{ minHeight: '500px', maxHeight: 'calc(100vh - 300px)' }}
      >
        {workOrders?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <Icon name="Inbox" size={32} className="text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No work orders</p>
            <p className="text-xs text-muted-foreground">
              Drag items here or create new ones
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {workOrders?.map((workOrder) => (
              <WorkOrderCard
                key={workOrder?.id}
                workOrder={workOrder}
                isSelected={selectedCards?.includes(workOrder?.id)}
                onSelect={onSelectCard}
                onOpenDetails={onOpenDetails}
                userRole={userRole}
              />
            ))}
          </div>
        )}

        {/* Drop Indicator */}
        {isDragOver && (
          <div className="mt-4 p-4 border-2 border-dashed border-primary rounded-lg bg-primary/5">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Icon name="Plus" size={16} />
              <span className="text-sm font-medium">Drop here to move</span>
            </div>
          </div>
        )}
      </div>
      {/* Column Footer */}
      <div className="p-3 border-t border-border bg-card rounded-b-lg">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center text-muted-foreground hover:text-foreground"
          onClick={() => console.log('Add new work order to', status)}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Add Work Order
        </Button>
      </div>
    </div>
  );
};

export default KanbanColumn;