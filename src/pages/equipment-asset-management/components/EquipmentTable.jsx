import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';



const EquipmentTable = ({ 
  equipment, 
  onEquipmentSelect, 
  selectedEquipment, 
  onBulkAction,
  onSort,
  sortConfig 
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const statusOptions = [
    { value: 'operational', label: 'Operational' },
    { value: 'warning', label: 'Warning' },
    { value: 'critical', label: 'Critical' },
    { value: 'offline', label: 'Offline' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-success text-success-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-error text-error-foreground';
      case 'offline': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getWarrantyStatus = (warrantyEnd) => {
    const today = new Date();
    const endDate = new Date(warrantyEnd);
    const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return { status: 'Expired', color: 'text-error' };
    if (daysLeft < 30) return { status: 'Expiring Soon', color: 'text-warning' };
    return { status: 'Active', color: 'text-success' };
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(equipment?.map(item => item?.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems?.filter(item => item !== id));
    }
  };

  const handleCellEdit = (equipmentId, field, currentValue) => {
    setEditingCell(`${equipmentId}-${field}`);
    setEditValue(currentValue);
  };

  const handleCellSave = (equipmentId, field) => {
    // Handle save logic here
    console.log('Saving:', equipmentId, field, editValue);
    setEditingCell(null);
    setEditValue('');
  };

  const handleSort = (field) => {
    onSort(field);
  };

  const getSortIcon = (field) => {
    if (sortConfig?.field !== field) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const columns = [
    { key: 'assetId', label: 'Asset ID', sortable: true },
    { key: 'name', label: 'Equipment Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'installDate', label: 'Install Date', sortable: true },
    { key: 'warrantyStatus', label: 'Warranty', sortable: false },
    { key: 'maintenanceSchedule', label: 'Next Maintenance', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedItems?.length > 0 && (
        <div className="bg-accent/10 border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedItems?.length} item{selectedItems?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('maintenance', selectedItems)}
              >
                <Icon name="Calendar" size={16} className="mr-2" />
                Schedule Maintenance
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('status', selectedItems)}
              >
                <Icon name="Settings" size={16} className="mr-2" />
                Update Status
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('export', selectedItems)}
              >
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedItems?.length === equipment?.length && equipment?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              {columns?.map((column) => (
                <th key={column?.key} className="px-4 py-3 text-left">
                  {column?.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(column?.key)}
                      className="h-auto p-0 font-medium text-foreground hover:text-primary"
                    >
                      {column?.label}
                      <Icon 
                        name={getSortIcon(column?.key)} 
                        size={14} 
                        className="ml-1" 
                      />
                    </Button>
                  ) : (
                    <span className="font-medium text-foreground">{column?.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {equipment?.map((item) => {
              const warrantyInfo = getWarrantyStatus(item?.warrantyEnd);
              
              return (
                <tr 
                  key={item?.id}
                  className={`hover:bg-muted/30 transition-hover cursor-pointer ${
                    selectedEquipment?.id === item?.id ? 'bg-accent/10' : ''
                  }`}
                  onClick={() => onEquipmentSelect(item)}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems?.includes(item?.id)}
                      onChange={(e) => {
                        e?.stopPropagation();
                        handleSelectItem(item?.id, e?.target?.checked);
                      }}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-primary font-medium">
                      {item?.assetId}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                        <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item?.name}</p>
                        <p className="text-sm text-muted-foreground">{item?.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">{item?.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={14} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{item?.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">
                      {new Date(item.installDate)?.toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${warrantyInfo?.color}`}>
                      {warrantyInfo?.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={14} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {new Date(item.nextMaintenance)?.toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></div>
                      {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          console.log('Edit equipment:', item?.id);
                        }}
                        className="h-8 w-8"
                      >
                        <Icon name="Edit2" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          console.log('View history:', item?.id);
                        }}
                        className="h-8 w-8"
                      >
                        <Icon name="History" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          console.log('More options:', item?.id);
                        }}
                        className="h-8 w-8"
                      >
                        <Icon name="MoreVertical" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Empty State */}
      {equipment?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Equipment Found</h3>
          <p className="text-muted-foreground mb-4">
            No equipment matches your current filters.
          </p>
          <Button variant="outline">
            <Icon name="Plus" size={16} className="mr-2" />
            Add Equipment
          </Button>
        </div>
      )}
    </div>
  );
};

export default EquipmentTable;