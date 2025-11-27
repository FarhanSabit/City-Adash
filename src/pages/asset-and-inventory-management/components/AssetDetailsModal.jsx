import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssetDetailsModal = ({ asset, onClose, onScheduleMaintenance }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!asset) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'maintenance', label: 'Maintenance History', icon: 'Wrench' },
    { id: 'specifications', label: 'Specifications', icon: 'FileText' },
    { id: 'documents', label: 'Documents', icon: 'Paperclip' }
  ];

  const maintenanceHistory = [
    {
      id: 1,
      date: '2025-10-15',
      type: 'Preventive Maintenance',
      technician: 'John Smith',
      status: 'Completed',
      notes: 'Routine inspection and filter replacement completed successfully.'
    },
    {
      id: 2,
      date: '2025-07-20',
      type: 'Repair',
      technician: 'Sarah Johnson',
      status: 'Completed',
      notes: 'Fixed refrigerant leak and recharged system.'
    },
    {
      id: 3,
      date: '2025-04-10',
      type: 'Preventive Maintenance',
      technician: 'Mike Davis',
      status: 'Completed',
      notes: 'Quarterly maintenance check performed.'
    }
  ];

  const specifications = {
    'Manufacturer': 'Carrier Corporation',
    'Model Number': 'CA-HVAC-2500X',
    'Serial Number': 'SN-2024-45678',
    'Installation Date': '01/15/2023',
    'Capacity': '25 Tons',
    'Power Rating': '230V, 3-Phase',
    'Refrigerant Type': 'R-410A',
    'Dimensions': '48" x 36" x 72"',
    'Weight': '850 lbs'
  };

  const documents = [
    { id: 1, name: 'Installation Manual.pdf', size: '2.4 MB', date: '01/15/2023' },
    { id: 2, name: 'Warranty Certificate.pdf', size: '156 KB', date: '01/15/2023' },
    { id: 3, name: 'Maintenance Schedule.xlsx', size: '89 KB', date: '03/20/2025' },
    { id: 4, name: 'Safety Guidelines.pdf', size: '1.8 MB', date: '01/15/2023' }
  ];

  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden animation-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
              <Icon name="Package" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{asset?.name}</h2>
              <p className="text-sm text-muted-foreground">Asset ID: {asset?.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} color="var(--color-muted-foreground)" />
          </button>
        </div>

        <div className="border-b border-border">
          <div className="flex gap-1 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon
                  name={tab?.icon}
                  size={16}
                  color={activeTab === tab?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                />
                {tab?.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={asset?.image}
                    alt={asset?.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-success/10 text-success">
                      {asset?.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Location</p>
                    <p className="text-sm font-medium text-foreground">{asset?.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Category</p>
                    <p className="text-sm font-medium text-foreground">{asset?.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Condition</p>
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full status-success">
                      {asset?.condition}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Last Service</p>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(asset.lastService)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Next Maintenance</p>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(asset.nextMaintenance)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Warranty Expires</p>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(asset.warranty)?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-4">
              {maintenanceHistory?.map((record) => (
                <div key={record?.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{record?.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(record.date)?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full status-success">
                      {record?.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="User" size={14} color="var(--color-muted-foreground)" />
                    <p className="text-sm text-muted-foreground">{record?.technician}</p>
                  </div>
                  <p className="text-sm text-foreground">{record?.notes}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specifications)?.map(([key, value]) => (
                <div key={key} className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">{key}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-2">
              {documents?.map((doc) => (
                <div key={doc?.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <Icon name="FileText" size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{doc?.name}</p>
                      <p className="text-xs text-muted-foreground">{doc?.size} • {doc?.date}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-card transition-colors">
                    <Icon name="Download" size={18} color="var(--color-muted-foreground)" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="default"
            iconName="Wrench"
            iconPosition="left"
            onClick={() => {
              onScheduleMaintenance(asset);
              onClose();
            }}
          >
            Schedule Maintenance
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsModal;