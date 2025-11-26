import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Image from '../../../components/AppImage';

const EquipmentDetailPanel = ({ equipment, isOpen, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  if (!equipment || !isOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'specifications', label: 'Specifications', icon: 'Settings' },
    { id: 'maintenance', label: 'Maintenance History', icon: 'History' },
    { id: 'workorders', label: 'Work Orders', icon: 'Clipboard' },
    { id: 'parts', label: 'Parts & Inventory', icon: 'Package' },
    { id: 'compliance', label: 'Compliance', icon: 'Shield' },
    { id: 'documents', label: 'Documents', icon: 'FileText' }
  ];

  const maintenanceHistory = [
    {
      id: 1,
      date: '2025-01-15',
      type: 'Preventive Maintenance',
      technician: 'Mike Johnson',
      description: 'Quarterly HVAC system inspection and filter replacement',
      status: 'completed',
      cost: 450.00,
      parts: ['Air Filter - HEPA', 'Lubricant Oil']
    },
    {
      id: 2,
      date: '2024-12-10',
      type: 'Corrective Maintenance',
      technician: 'Sarah Wilson',
      description: 'Replaced faulty temperature sensor',
      status: 'completed',
      cost: 275.00,
      parts: ['Temperature Sensor Model TX-100']
    },
    {
      id: 3,
      date: '2024-11-05',
      type: 'Emergency Repair',
      technician: 'David Chen',
      description: 'Fixed refrigerant leak in cooling coil',
      status: 'completed',
      cost: 850.00,
      parts: ['Cooling Coil Gasket', 'R-410A Refrigerant']
    }
  ];

  const workOrders = [
    {
      id: 'WO-2025-001',
      title: 'Annual HVAC Inspection',
      priority: 'medium',
      status: 'scheduled',
      assignedTo: 'Mike Johnson',
      dueDate: '2025-02-15',
      description: 'Comprehensive annual inspection and maintenance'
    },
    {
      id: 'WO-2025-002',
      title: 'Filter Replacement',
      priority: 'low',
      status: 'pending',
      assignedTo: 'Unassigned',
      dueDate: '2025-02-01',
      description: 'Replace air filters in all zones'
    }
  ];

  const partsInventory = [
    {
      id: 1,
      name: 'Air Filter - HEPA',
      partNumber: 'AF-HEPA-001',
      inStock: 12,
      minStock: 5,
      cost: 45.00,
      supplier: 'HVAC Supply Co.'
    },
    {
      id: 2,
      name: 'Temperature Sensor',
      partNumber: 'TS-TX-100',
      inStock: 3,
      minStock: 2,
      cost: 125.00,
      supplier: 'Sensor Tech Inc.'
    },
    {
      id: 3,
      name: 'Cooling Coil Gasket',
      partNumber: 'CCG-STD-001',
      inStock: 1,
      minStock: 3,
      cost: 85.00,
      supplier: 'Industrial Parts Ltd.'
    }
  ];

  const complianceRecords = [
    {
      id: 1,
      regulation: 'OSHA Safety Standards',
      lastInspection: '2024-12-15',
      nextInspection: '2025-06-15',
      status: 'compliant',
      inspector: 'Safety Compliance Corp.'
    },
    {
      id: 2,
      regulation: 'EPA Environmental Standards',
      lastInspection: '2024-11-20',
      nextInspection: '2025-11-20',
      status: 'compliant',
      inspector: 'Environmental Audit LLC'
    },
    {
      id: 3,
      regulation: 'Local Building Code',
      lastInspection: '2024-10-10',
      nextInspection: '2025-10-10',
      status: 'action_required',
      inspector: 'City Building Department'
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'Installation Manual',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      category: 'Manual'
    },
    {
      id: 2,
      name: 'Warranty Certificate',
      type: 'PDF',
      size: '1.1 MB',
      uploadDate: '2024-01-15',
      category: 'Warranty'
    },
    {
      id: 3,
      name: 'Maintenance Photos',
      type: 'ZIP',
      size: '15.7 MB',
      uploadDate: '2025-01-15',
      category: 'Photos'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      case 'offline': return 'text-muted-foreground';
      case 'compliant': return 'text-success';
      case 'action_required': return 'text-warning';
      case 'completed': return 'text-success';
      case 'scheduled': return 'text-primary';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...equipment });
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Equipment Image */}
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden">
          <Image
            src={equipment?.image || `https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop`}
            alt={equipment?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground">{equipment?.name}</h3>
          <p className="text-muted-foreground">{equipment?.model}</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              equipment?.status === 'operational' ? 'bg-success/10 text-success' :
              equipment?.status === 'warning' ? 'bg-warning/10 text-warning' :
              equipment?.status === 'critical'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
            }`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></div>
              {equipment?.status?.charAt(0)?.toUpperCase() + equipment?.status?.slice(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              Asset ID: {equipment?.assetId}
            </span>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Location</label>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{equipment?.location}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Installation Date</label>
            <p className="text-sm text-foreground mt-1">
              {new Date(equipment.installDate)?.toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Manufacturer</label>
            <p className="text-sm text-foreground mt-1">{equipment?.manufacturer}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Serial Number</label>
            <p className="text-sm text-foreground mt-1 font-mono">{equipment?.serialNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Warranty Status</label>
            <p className={`text-sm mt-1 font-medium ${
              new Date(equipment.warrantyEnd) > new Date() ? 'text-success' : 'text-error'
            }`}>
              {new Date(equipment.warrantyEnd) > new Date() ? 'Active' : 'Expired'}
              <span className="text-muted-foreground font-normal ml-2">
                (Until {new Date(equipment.warrantyEnd)?.toLocaleDateString()})
              </span>
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Next Maintenance</label>
            <p className="text-sm text-foreground mt-1">
              {new Date(equipment.nextMaintenance)?.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* IoT Sensor Data */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Real-time Sensor Data</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">72°F</div>
            <div className="text-sm text-muted-foreground">Temperature</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">45%</div>
            <div className="text-sm text-muted-foreground">Humidity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">85%</div>
            <div className="text-sm text-muted-foreground">Efficiency</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSpecificationsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Power Rating</label>
            <p className="text-sm text-foreground mt-1">{equipment?.specifications?.powerRating || '50 kW'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Voltage</label>
            <p className="text-sm text-foreground mt-1">{equipment?.specifications?.voltage || '480V'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Cooling Capacity</label>
            <p className="text-sm text-foreground mt-1">{equipment?.specifications?.coolingCapacity || '15 Tons'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Refrigerant Type</label>
            <p className="text-sm text-foreground mt-1">{equipment?.specifications?.refrigerant || 'R-410A'}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Dimensions</label>
            <p className="text-sm text-foreground mt-1">{equipment?.specifications?.dimensions || '48" x 36" x 72"'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Weight</label>
            <p className="text-sm text-foreground mt-1">{equipment?.specifications?.weight || '850 lbs'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Operating Range</label>
            <p className="text-sm text-foreground mt-1">{equipment?.specifications?.operatingRange || '-10°F to 120°F'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Energy Rating</label>
            <p className="text-sm text-foreground mt-1">{equipment?.specifications?.energyRating || 'SEER 16'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMaintenanceTab = () => (
    <div className="space-y-4">
      {maintenanceHistory?.map((record) => (
        <div key={record?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="font-medium text-foreground">{record?.type}</h4>
                <span className={`text-sm font-medium ${getStatusColor(record?.status)}`}>
                  {record?.status?.charAt(0)?.toUpperCase() + record?.status?.slice(1)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{record?.description}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Date: {new Date(record.date)?.toLocaleDateString()}</span>
                <span>Technician: {record?.technician}</span>
                <span>Cost: ${record?.cost?.toFixed(2)}</span>
              </div>
              {record?.parts && record?.parts?.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm font-medium text-foreground">Parts Used:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {record?.parts?.map((part, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                        {part}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="ExternalLink" size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWorkOrdersTab = () => (
    <div className="space-y-4">
      {workOrders?.map((order) => (
        <div key={order?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="font-medium text-foreground">{order?.title}</h4>
                <span className={`text-sm font-medium ${getPriorityColor(order?.priority)}`}>
                  {order?.priority?.charAt(0)?.toUpperCase() + order?.priority?.slice(1)}
                </span>
                <span className={`text-sm font-medium ${getStatusColor(order?.status)}`}>
                  {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{order?.description}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>ID: {order?.id}</span>
                <span>Assigned: {order?.assignedTo}</span>
                <span>Due: {new Date(order.dueDate)?.toLocaleDateString()}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="ExternalLink" size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPartsTab = () => (
    <div className="space-y-4">
      {partsInventory?.map((part) => (
        <div key={part?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{part?.name}</h4>
              <p className="text-sm text-muted-foreground">Part #: {part?.partNumber}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span className={`font-medium ${part?.inStock <= part?.minStock ? 'text-warning' : 'text-success'}`}>
                  In Stock: {part?.inStock}
                </span>
                <span className="text-muted-foreground">Min: {part?.minStock}</span>
                <span className="text-foreground">Cost: ${part?.cost?.toFixed(2)}</span>
                <span className="text-muted-foreground">Supplier: {part?.supplier}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {part?.inStock <= part?.minStock && (
                <Button variant="outline" size="sm">
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  Reorder
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderComplianceTab = () => (
    <div className="space-y-4">
      {complianceRecords?.map((record) => (
        <div key={record?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="font-medium text-foreground">{record?.regulation}</h4>
                <span className={`text-sm font-medium ${getStatusColor(record?.status)}`}>
                  {record?.status === 'action_required' ? 'Action Required' : 'Compliant'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Last Inspection:</span>
                  <p>{new Date(record.lastInspection)?.toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium">Next Inspection:</span>
                  <p>{new Date(record.nextInspection)?.toLocaleDateString()}</p>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Inspector:</span>
                  <p>{record?.inspector}</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="FileText" size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-4">
      {documents?.map((doc) => (
        <div key={doc?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{doc?.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{doc?.type}</span>
                  <span>{doc?.size}</span>
                  <span>Uploaded: {new Date(doc.uploadDate)?.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Icon name="Download" size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Eye" size={16} />
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        <Icon name="Upload" size={16} className="mr-2" />
        Upload Document
      </Button>
    </div>
  );

  return (
    <div className="fixed inset-y-0 right-0 w-1/2 bg-card border-l border-border shadow-modal z-50 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Equipment Details</h2>
            <p className="text-sm text-muted-foreground">{equipment?.assetId}</p>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Icon name="Edit2" size={16} className="mr-2" />
                Edit
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Save
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'specifications' && renderSpecificationsTab()}
          {activeTab === 'maintenance' && renderMaintenanceTab()}
          {activeTab === 'workorders' && renderWorkOrdersTab()}
          {activeTab === 'parts' && renderPartsTab()}
          {activeTab === 'compliance' && renderComplianceTab()}
          {activeTab === 'documents' && renderDocumentsTab()}
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetailPanel;