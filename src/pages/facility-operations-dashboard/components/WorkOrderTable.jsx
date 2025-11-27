import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkOrdersTable = ({ workOrders, onStatusChange, onAssign }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'in-progress':
        return 'var(--color-accent)';
      case 'pending':
        return 'var(--color-warning)';
      case 'overdue':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10';
      case 'in-progress':
        return 'bg-accent/10';
      case 'pending':
        return 'bg-warning/10';
      case 'overdue':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return 'AlertCircle';
      case 'high':
        return 'ArrowUp';
      case 'medium':
        return 'Minus';
      default:
        return 'ArrowDown';
    }
  };

  const formatSLA = (minutes) => {
    if (minutes < 0) return <span className="text-error font-medium">Overdue</span>;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const toggleSelection = (id) => {
    setSelectedOrders((prev) =>
      prev?.includes(id) ? prev?.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders?.length === workOrders?.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(workOrders?.map((order) => order?.id));
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border flex-wrap gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="text-lg font-semibold text-foreground whitespace-nowrap">Active Work Orders</h2>
          {selectedOrders?.length > 0 && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary whitespace-nowrap">
              {selectedOrders?.length} selected
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {selectedOrders?.length > 0 && (
            <>
              <Button variant="outline" size="sm" iconName="UserPlus">
                <span className="hidden sm:inline">Bulk Assign</span>
                <span className="sm:hidden">Assign</span>
              </Button>
              <Button variant="outline" size="sm" iconName="Flag">
                <span className="hidden sm:inline">Update Priority</span>
                <span className="sm:hidden">Priority</span>
              </Button>
            </>
          )}
          <Button variant="default" size="sm" iconName="Plus">
            <span className="hidden sm:inline">New Order</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto scrollbar-thin">
        <div className="min-w-full inline-block align-middle">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="w-12 sticky left-0 bg-card z-10">
                  <input
                    type="checkbox"
                    checked={selectedOrders?.length === workOrders?.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-border"
                  />
                </th>
                <th className="sticky left-12 bg-card z-10 whitespace-nowrap min-w-[120px]">Order ID</th>
                <th className="whitespace-nowrap min-w-[180px]">Title</th>
                <th className="whitespace-nowrap min-w-[100px]">Priority</th>
                <th className="whitespace-nowrap min-w-[120px]">Status</th>
                <th className="whitespace-nowrap min-w-[150px]">Assigned To</th>
                <th className="whitespace-nowrap min-w-[150px]">Location</th>
                <th className="whitespace-nowrap min-w-[100px]">SLA Timer</th>
                <th className="sticky right-0 bg-card z-10 whitespace-nowrap min-w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workOrders?.map((order) => (
                <tr key={order?.id}>
                  <td className="sticky left-0 bg-card z-10">
                    <input
                      type="checkbox"
                      checked={selectedOrders?.includes(order?.id)}
                      onChange={() => toggleSelection(order?.id)}
                      className="w-4 h-4 rounded border-border"
                    />
                  </td>
                  <td className="sticky left-12 bg-card z-10">
                    <span className="font-mono text-sm text-primary whitespace-nowrap">{order?.id}</span>
                  </td>
                  <td>
                    <div className="max-w-[180px]">
                      <div className="font-medium text-foreground line-clamp-1 text-sm">{order?.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{order?.description}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <Icon
                        name={getPriorityIcon(order?.priority)}
                        size={14}
                        color={getStatusColor(order?.status)}
                      />
                      <span className="text-sm capitalize">{order?.priority}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusBg(order?.status)}`}
                      style={{ color: getStatusColor(order?.status) }}
                    >
                      {order?.status?.replace('-', ' ')}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-primary">
                          {order?.assignedTo?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <span className="text-sm truncate max-w-[120px]">{order?.assignedTo}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-muted-foreground whitespace-nowrap truncate max-w-[150px] inline-block">{order?.location}</span>
                  </td>
                  <td>
                    <span className="text-sm whitespace-nowrap">{formatSLA(order?.slaMinutes)}</span>
                  </td>
                  <td className="sticky right-0 bg-card z-10">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onStatusChange(order?.id)}
                        className="p-1.5 rounded hover:bg-muted transition-colors"
                        aria-label="Update status"
                      >
                        <Icon name="Edit2" size={16} color="var(--color-muted-foreground)" />
                      </button>
                      <button
                        onClick={() => onAssign(order?.id)}
                        className="p-1.5 rounded hover:bg-muted transition-colors"
                        aria-label="Reassign"
                      >
                        <Icon name="UserPlus" size={16} color="var(--color-muted-foreground)" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkOrdersTable;