import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WorkOrderDetailsModal = ({ workOrder, isOpen, onClose, onSave, userRole = 'technician' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(workOrder || {});

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'technical', label: 'Technical Details', icon: 'Settings' },
    { id: 'parts', label: 'Parts & Materials', icon: 'Package' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'documentation', label: 'Documentation', icon: 'Camera' }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { value: 'new', label: 'New Requests' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'awaiting-parts', label: 'Awaiting Parts' },
    { value: 'awaiting-approval', label: 'Awaiting Approval' },
    { value: 'completed', label: 'Completed' }
  ];

  const technicianOptions = [
    { value: 'john-smith', label: 'John Smith' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'mike-wilson', label: 'Mike Wilson' },
    { value: 'lisa-brown', label: 'Lisa Brown' }
  ];

  const mockTimeline = [
    {
      id: 1,
      action: 'Work order created',
      user: 'System',
      timestamp: '2025-01-07T08:30:00Z',
      details: 'Initial work order submission'
    },
    {
      id: 2,
      action: 'Assigned to technician',
      user: 'Sarah Johnson',
      timestamp: '2025-01-07T09:15:00Z',
      details: 'Assigned to John Smith based on expertise'
    },
    {
      id: 3,
      action: 'Status updated',
      user: 'John Smith',
      timestamp: '2025-01-07T10:00:00Z',
      details: 'Changed status to In Progress'
    }
  ];

  const mockParts = [
    {
      id: 1,
      name: 'HVAC Filter - MERV 13',
      partNumber: 'HF-M13-20X25',
      quantity: 2,
      unitCost: 45.99,
      status: 'available',
      supplier: 'HVAC Supply Co.'
    },
    {
      id: 2,
      name: 'Thermostat Wire - 18/8',
      partNumber: 'TW-18-8-100',
      quantity: 1,
      unitCost: 89.50,
      status: 'ordered',
      supplier: 'Electrical Depot'
    }
  ];

  const handleSave = () => {
    onSave?.(formData);
    setEditMode(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString();
  };

  if (!isOpen || !workOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Work Order #{workOrder?.id}
              </h2>
              <p className="text-sm text-muted-foreground">
                {workOrder?.title}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              workOrder?.priority === 'critical' ? 'bg-error text-error-foreground' :
              workOrder?.priority === 'high' ? 'bg-warning text-warning-foreground' :
              workOrder?.priority === 'medium' ? 'bg-accent text-accent-foreground' :
              'bg-success text-success-foreground'
            }`}>
              {workOrder?.priority}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {!editMode ? (
              <Button
                variant="outline"
                onClick={() => setEditMode(true)}
              >
                <Icon name="Edit2" size={16} className="mr-2" />
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditMode(false);
                    setFormData(workOrder);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </>
            )}
            
            <Button
              variant="ghost"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {editMode ? (
                    <Input
                      label="Title"
                      value={formData?.title || ''}
                      onChange={(e) => handleInputChange('title', e?.target?.value)}
                    />
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Title
                      </label>
                      <p className="text-sm text-muted-foreground">{workOrder?.title}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  {editMode ? (
                    <Select
                      label="Priority"
                      options={priorityOptions}
                      value={formData?.priority || ''}
                      onChange={(value) => handleInputChange('priority', value)}
                    />
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Priority
                      </label>
                      <p className={`text-sm font-medium ${getPriorityColor(workOrder?.priority)}`}>
                        {workOrder?.priority}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                {editMode ? (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full p-3 border border-border rounded-md bg-input text-foreground"
                      rows={4}
                      value={formData?.description || ''}
                      onChange={(e) => handleInputChange('description', e?.target?.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Description
                    </label>
                    <p className="text-sm text-muted-foreground">{workOrder?.description}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Location
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {workOrder?.location} - Room {workOrder?.room}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Status
                  </label>
                  <p className="text-sm text-muted-foreground">{workOrder?.status}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Created
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {formatTimestamp(workOrder?.createdAt)}
                  </p>
                </div>
              </div>

              {workOrder?.assignedTechnician && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Assigned Technician
                  </label>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={workOrder?.assignedTechnician?.avatar}
                      alt={workOrder?.assignedTechnician?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {workOrder?.assignedTechnician?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {workOrder?.assignedTechnician?.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'parts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Parts & Materials</h3>
                <Button variant="outline" size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add Part
                </Button>
              </div>

              <div className="space-y-4">
                {mockParts?.map((part) => (
                  <div key={part?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{part?.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        part?.status === 'available' ? 'bg-success text-success-foreground' :
                        part?.status === 'ordered' ? 'bg-warning text-warning-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {part?.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Part #:</span>
                        <p className="font-mono">{part?.partNumber}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quantity:</span>
                        <p>{part?.quantity}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Unit Cost:</span>
                        <p>${part?.unitCost}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Supplier:</span>
                        <p>{part?.supplier}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">Activity Timeline</h3>
              
              <div className="space-y-4">
                {mockTimeline?.map((event) => (
                  <div key={event.id} className="flex space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Clock" size={16} color="white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground">{event.action}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(event.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{event.details}</p>
                      <p className="text-xs text-muted-foreground">by {event.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documentation' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Documentation</h3>
                <Button variant="outline" size="sm">
                  <Icon name="Camera" size={16} className="mr-2" />
                  Add Photo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3]?.map((index) => (
                  <div key={index} className="border border-border rounded-lg overflow-hidden">
                    <Image
                      src={`https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop`}
                      alt={`Documentation photo ${index}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        Before repair - {index}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded by John Smith • 2 hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkOrderDetailsModal;