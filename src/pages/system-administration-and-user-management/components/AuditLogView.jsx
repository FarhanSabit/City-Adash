import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditLogViewer = ({ logs, onExportLogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const actionOptions = [
    { value: 'all', label: 'All Actions' },
    { value: 'user_created', label: 'User Created' },
    { value: 'user_updated', label: 'User Updated' },
    { value: 'user_deleted', label: 'User Deleted' },
    { value: 'role_changed', label: 'Role Changed' },
    { value: 'permission_modified', label: 'Permission Modified' },
    { value: 'login', label: 'Login' },
    { value: 'logout', label: 'Logout' },
    { value: 'password_changed', label: 'Password Changed' },
    { value: 'settings_updated', label: 'Settings Updated' }
  ];

  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'admin', label: 'Administrators' },
    { value: 'manager', label: 'Managers' },
    { value: 'technician', label: 'Technicians' }
  ];

  const filteredLogs = logs?.filter(log => {
    const matchesSearch = log?.action?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.user?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.details?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesAction = filterAction === 'all' || log?.actionType === filterAction;
    const matchesUser = filterUser === 'all' || log?.userRole === filterUser;
    return matchesSearch && matchesAction && matchesUser;
  });

  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'user_created': return 'UserPlus';
      case 'user_updated': return 'UserCheck';
      case 'user_deleted': return 'UserX';
      case 'role_changed': return 'Shield';
      case 'permission_modified': return 'Key';
      case 'login': return 'LogIn';
      case 'logout': return 'LogOut';
      case 'password_changed': return 'Lock';
      case 'settings_updated': return 'Settings';
      default: return 'Activity';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'var(--color-error)';
      case 'medium': return 'var(--color-warning)';
      case 'low': return 'var(--color-success)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
          <div className="flex-1 w-full lg:w-auto">
            <Input
              type="search"
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Select
              options={actionOptions}
              value={filterAction}
              onChange={setFilterAction}
              placeholder="Filter by action"
              className="w-full sm:w-48"
            />
            <Select
              options={userOptions}
              value={filterUser}
              onChange={setFilterUser}
              placeholder="Filter by user"
              className="w-full sm:w-48"
            />
            <Button
              variant="outline"
              size="default"
              iconName="Download"
              onClick={onExportLogs}
            >
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            type="date"
            label="Start Date"
            value={dateRange?.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e?.target?.value })}
          />
          <Input
            type="date"
            label="End Date"
            value={dateRange?.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e?.target?.value })}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>User</th>
              <th>Details</th>
              <th>IP Address</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs?.map((log) => (
              <tr key={log?.id}>
                <td>
                  <div className="text-sm text-foreground">{log?.timestamp}</div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Icon
                      name={getActionIcon(log?.actionType)}
                      size={16}
                      color="var(--color-primary)"
                    />
                    <span className="text-sm text-foreground">{log?.action}</span>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="text-sm font-medium text-foreground">{log?.user}</div>
                    <div className="text-xs text-muted-foreground">{log?.userId}</div>
                  </div>
                </td>
                <td>
                  <span className="text-sm text-muted-foreground">{log?.details}</span>
                </td>
                <td>
                  <span className="text-sm font-mono text-muted-foreground">{log?.ipAddress}</span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getSeverityColor(log?.severity) }}
                    />
                    <span className="text-sm capitalize text-foreground">{log?.severity}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredLogs?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="FileText" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">No audit logs found matching your criteria</p>
        </div>
      )}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Showing {filteredLogs?.length} of {logs?.length} logs
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft">
            Previous
          </Button>
          <Button variant="outline" size="sm" iconName="ChevronRight" iconPosition="right">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogViewer;