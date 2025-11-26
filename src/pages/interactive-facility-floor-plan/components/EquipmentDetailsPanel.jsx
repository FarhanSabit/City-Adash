import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EquipmentDetailsPanel = ({ equipment, onClose, onCreateWorkOrder }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!equipment) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'maintenance', label: 'Maintenance', icon: 'Wrench' },
    { id: 'workorders', label: 'Work Orders', icon: 'ClipboardList' },
    { id: 'specifications', label: 'Specifications', icon: 'FileText' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-success bg-success/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'critical': return 'text-error bg-error/10';
      case 'offline': return 'text-muted-foreground bg-muted';
      default: return 'text-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error bg-error/10';
      case 'high': return 'text-warning bg-warning/10';
      case 'medium': return 'text-primary bg-primary/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Status and Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${getStatusColor(equipment?.status)}`}>
            <Icon name="Circle" size={8} className="mr-2 fill-current" />
            {equipment?.status?.charAt(0)?.toUpperCase() + equipment?.status?.slice(1)}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Location</label>
          <p className="text-sm text-foreground mt-1">{equipment?.location}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted rounded-md">
          <div className="text-2xl font-bold text-foreground">{equipment?.uptime}%</div>
          <div className="text-xs text-muted-foreground">Uptime</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-md">
          <div className="text-2xl font-bold text-foreground">{equipment?.activeWorkOrders}</div>
          <div className="text-xs text-muted-foreground">Active Work Orders</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-md">
          <div className="text-2xl font-bold text-foreground">{equipment?.maintenanceScore}/10</div>
          <div className="text-xs text-muted-foreground">Health Score</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Activity</h4>
        <div className="space-y-3">
          {equipment?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-md">
              <Icon name={activity?.icon} size={16} className="text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-foreground">{activity?.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(activity?.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMaintenanceTab = () => (
    <div className="space-y-6">
      {/* Next Maintenance */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-foreground">Next Scheduled Maintenance</h4>
          <Icon name="Calendar" size={16} className="text-primary" />
        </div>
        <p className="text-sm text-foreground">{formatDate(equipment?.nextMaintenance)}</p>
        <p className="text-xs text-muted-foreground mt-1">Preventive maintenance due in 5 days</p>
      </div>

      {/* Maintenance History */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Maintenance History</h4>
        <div className="space-y-3">
          {equipment?.maintenanceHistory?.map((maintenance, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-md">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                maintenance?.type === 'preventive' ? 'bg-success' : 'bg-warning'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{maintenance?.type?.charAt(0)?.toUpperCase() + maintenance?.type?.slice(1)} Maintenance</p>
                  <span className="text-xs text-muted-foreground">{formatDate(maintenance?.date)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{maintenance?.description}</p>
                <p className="text-xs text-muted-foreground mt-1">Technician: {maintenance?.technician}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkOrdersTab = () => (
    <div className="space-y-6">
      {/* Active Work Orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Active Work Orders</h4>
          <Button size="sm" onClick={() => onCreateWorkOrder(equipment)}>
            <Icon name="Plus" size={16} className="mr-2" />
            Create New
          </Button>
        </div>
        
        {equipment?.workOrders?.filter(wo => wo?.status !== 'completed')?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="CheckCircle" size={48} className="mx-auto mb-2 opacity-50" />
            <p>No active work orders</p>
          </div>
        ) : (
          <div className="space-y-3">
            {equipment?.workOrders?.filter(wo => wo?.status !== 'completed')?.map((workOrder, index) => (
              <div key={index} className="p-3 border border-border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">#{workOrder?.id}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(workOrder?.priority)}`}>
                      {workOrder?.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">{workOrder?.status}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground mb-2">{workOrder?.title}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Assigned to: {workOrder?.assignedTo}</span>
                  <span>Created: {formatDate(workOrder?.createdDate)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Completed Work Orders */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Recently Completed</h4>
        <div className="space-y-3">
          {equipment?.workOrders?.filter(wo => wo?.status === 'completed')?.slice(0, 3)?.map((workOrder, index) => (
            <div key={index} className="p-3 bg-muted rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">#{workOrder?.id}</span>
                <span className="text-xs text-success">Completed</span>
              </div>
              <p className="text-sm text-foreground mb-2">{workOrder?.title}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Completed by: {workOrder?.assignedTo}</span>
                <span>{formatDate(workOrder?.completedDate)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSpecificationsTab = () => (
    <div className="space-y-6">
      {/* Basic Specifications */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Basic Information</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Model</label>
            <p className="text-sm text-foreground">{equipment?.specifications?.model || 'N/A'}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Serial Number</label>
            <p className="text-sm text-foreground">{equipment?.specifications?.serialNumber || 'N/A'}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Manufacturer</label>
            <p className="text-sm text-foreground">{equipment?.specifications?.manufacturer || 'N/A'}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Installation Date</label>
            <p className="text-sm text-foreground">{equipment?.specifications?.installationDate ? formatDate(equipment?.specifications?.installationDate) : 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Technical Specifications</h4>
        <div className="space-y-3">
          {equipment?.specifications?.technical?.map((spec, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
              <span className="text-sm text-muted-foreground">{spec?.name}</span>
              <span className="text-sm text-foreground font-medium">{spec?.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Documentation</h4>
        <div className="space-y-2">
          {equipment?.specifications?.documents?.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-2 border border-border rounded">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{doc?.name}</span>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="Download" size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-card border-l border-border shadow-modal z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-foreground">{equipment?.name}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={16} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{equipment?.location}</p>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} className="mx-auto mb-1" />
              <div className="text-xs">{tab?.label}</div>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'maintenance' && renderMaintenanceTab()}
        {activeTab === 'workorders' && renderWorkOrdersTab()}
        {activeTab === 'specifications' && renderSpecificationsTab()}
      </div>
    </div>
  );
};

export default EquipmentDetailsPanel;