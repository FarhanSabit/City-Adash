import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const WorkOrderGrid = ({ onWorkOrderSelect, selectedWorkOrderId }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'scheduledDate', direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);

  const workOrders = [
    {
      id: 'WO-2025-001',
      asset: 'Chiller Unit #1',
      assetId: 'hvac-001',
      priority: 'critical',
      technician: 'John Martinez',
      status: 'in-progress',
      scheduledDate: '2025-11-20',
      completionPercentage: 45,
      type: 'Preventive',
      estimatedHours: 4,
      actualHours: 2
    },
    {
      id: 'WO-2025-002',
      asset: 'Air Handler #2',
      assetId: 'hvac-002',
      priority: 'high',
      technician: 'Sarah Chen',
      status: 'scheduled',
      scheduledDate: '2025-11-21',
      completionPercentage: 0,
      type: 'Corrective',
      estimatedHours: 3,
      actualHours: 0
    },
    {
      id: 'WO-2025-003',
      asset: 'Water Heater #1',
      assetId: 'plumb-001',
      priority: 'critical',
      technician: 'Mike Johnson',
      status: 'pending-approval',
      scheduledDate: '2025-11-20',
      completionPercentage: 0,
      type: 'Emergency',
      estimatedHours: 6,
      actualHours: 0
    },
    {
      id: 'WO-2025-004',
      asset: 'Generator #1',
      assetId: 'elec-002',
      priority: 'medium',
      technician: 'David Lee',
      status: 'completed',
      scheduledDate: '2025-11-19',
      completionPercentage: 100,
      type: 'Preventive',
      estimatedHours: 2,
      actualHours: 2.5
    },
    {
      id: 'WO-2025-005',
      asset: 'Cooling Tower #1',
      assetId: 'hvac-003',
      priority: 'low',
      technician: 'Emily Rodriguez',
      status: 'scheduled',
      scheduledDate: '2025-11-22',
      completionPercentage: 0,
      type: 'Inspection',
      estimatedHours: 1,
      actualHours: 0
    },
    {
      id: 'WO-2025-006',
      asset: 'Main Transformer',
      assetId: 'elec-001',
      priority: 'high',
      technician: 'John Martinez',
      status: 'in-progress',
      scheduledDate: '2025-11-20',
      completionPercentage: 70,
      type: 'Preventive',
      estimatedHours: 5,
      actualHours: 3.5
    },
    {
      id: 'WO-2025-007',
      asset: 'Pump Station',
      assetId: 'plumb-002',
      priority: 'medium',
      technician: 'Sarah Chen',
      status: 'scheduled',
      scheduledDate: '2025-11-23',
      completionPercentage: 0,
      type: 'Corrective',
      estimatedHours: 4,
      actualHours: 0
    },
    {
      id: 'WO-2025-008',
      asset: 'Rooftop Unit #1',
      assetId: 'hvac-b-001',
      priority: 'low',
      technician: 'Mike Johnson',
      status: 'scheduled',
      scheduledDate: '2025-11-24',
      completionPercentage: 0,
      type: 'Inspection',
      estimatedHours: 2,
      actualHours: 0
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'var(--color-error)',
      high: 'var(--color-warning)',
      medium: 'var(--color-accent)',
      low: 'var(--color-muted-foreground)'
    };
    return colors?.[priority];
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending-approval': 'var(--color-warning)',
      'scheduled': 'var(--color-accent)',
      'in-progress': 'var(--color-primary)',
      'completed': 'var(--color-success)',
      'cancelled': 'var(--color-muted-foreground)'
    };
    return colors?.[status];
  };

  const getStatusLabel = (status) => {
    return status?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ');
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev =>
      prev?.includes(id) ? prev?.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(prev =>
      prev?.length === workOrders?.length ? [] : workOrders?.map(wo => wo?.id)
    );
  };

  return (
    <div className="flex flex-col bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-lg font-semibold text-foreground">Work Orders</h2>
          <Button variant="default" iconName="Plus" iconPosition="left" size="sm">
            New Work Order
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Select
            placeholder="Filter by Status"
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'pending-approval', label: 'Pending Approval' },
              { value: 'scheduled', label: 'Scheduled' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' }
            ]}
            value="all"
            onChange={() => {}}
          />
          <Select
            placeholder="Filter by Priority"
            options={[
              { value: 'all', label: 'All Priorities' },
              { value: 'critical', label: 'Critical' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' }
            ]}
            value="all"
            onChange={() => {}}
          />
          <Select
            placeholder="Filter by Type"
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'preventive', label: 'Preventive' },
              { value: 'corrective', label: 'Corrective' },
              { value: 'emergency', label: 'Emergency' },
              { value: 'inspection', label: 'Inspection' }
            ]}
            value="all"
            onChange={() => {}}
          />
          {selectedRows?.length > 0 && (
            <Button variant="outline" size="sm" iconName="Users">
              Reassign ({selectedRows?.length})
            </Button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead className="sticky top-0 bg-card z-10">
            <tr>
              <th className="w-12">
                <input
                  type="checkbox"
                  checked={selectedRows?.length === workOrders?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="cursor-pointer whitespace-nowrap" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-1">
                  Work Order ID
                  <Icon name="ArrowUpDown" size={14} color="var(--color-muted-foreground)" />
                </div>
              </th>
              <th className="cursor-pointer whitespace-nowrap" onClick={() => handleSort('asset')}>
                <div className="flex items-center gap-1">
                  Asset
                  <Icon name="ArrowUpDown" size={14} color="var(--color-muted-foreground)" />
                </div>
              </th>
              <th className="whitespace-nowrap">Priority</th>
              <th className="whitespace-nowrap">Type</th>
              <th className="whitespace-nowrap">Technician</th>
              <th className="whitespace-nowrap">Status</th>
              <th className="cursor-pointer whitespace-nowrap" onClick={() => handleSort('scheduledDate')}>
                <div className="flex items-center gap-1">
                  Scheduled Date
                  <Icon name="ArrowUpDown" size={14} color="var(--color-muted-foreground)" />
                </div>
              </th>
              <th className="whitespace-nowrap">Progress</th>
              <th className="whitespace-nowrap">Hours</th>
            </tr>
          </thead>
          <tbody>
            {workOrders?.map((wo) => (
              <tr
                key={wo?.id}
                className={`cursor-pointer ${selectedWorkOrderId === wo?.id ? 'bg-primary/5' : ''}`}
                onClick={() => onWorkOrderSelect(wo)}
              >
                <td onClick={(e) => e?.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedRows?.includes(wo?.id)}
                    onChange={() => handleRowSelect(wo?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="font-medium text-primary whitespace-nowrap">{wo?.id}</td>
                <td className="whitespace-nowrap">{wo?.asset}</td>
                <td>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                    style={{
                      backgroundColor: `${getPriorityColor(wo?.priority)}15`,
                      color: getPriorityColor(wo?.priority)
                    }}
                  >
                    <Icon name="AlertCircle" size={12} color={getPriorityColor(wo?.priority)} />
                    {wo?.priority?.charAt(0)?.toUpperCase() + wo?.priority?.slice(1)}
                  </span>
                </td>
                <td className="text-sm whitespace-nowrap">{wo?.type}</td>
                <td className="text-sm whitespace-nowrap">{wo?.technician}</td>
                <td>
                  <span
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                    style={{
                      backgroundColor: `${getStatusColor(wo?.status)}15`,
                      color: getStatusColor(wo?.status)
                    }}
                  >
                    {getStatusLabel(wo?.status)}
                  </span>
                </td>
                <td className="text-sm whitespace-nowrap">{new Date(wo.scheduledDate)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td>
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${wo?.completionPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground w-10 text-right">
                      {wo?.completionPercentage}%
                    </span>
                  </div>
                </td>
                <td className="text-sm text-muted-foreground whitespace-nowrap">
                  {wo?.actualHours}/{wo?.estimatedHours}h
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-border flex items-center justify-between flex-wrap gap-3">
        <div className="text-sm text-muted-foreground">
          Showing {workOrders?.length} work orders
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" iconName="ChevronRight">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderGrid;