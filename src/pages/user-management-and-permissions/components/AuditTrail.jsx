import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditTrail = ({ auditLogs, onExportAudit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'login', label: 'Login/Logout' },
    { value: 'permission', label: 'Permission Changes' },
    { value: 'user', label: 'User Management' },
    { value: 'role', label: 'Role Changes' },
    { value: 'system', label: 'System Changes' }
  ];

  const dateRanges = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' }
  ];

  const filteredLogs = auditLogs?.filter(log => {
    const matchesSearch = log?.action?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         log?.user?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         log?.details?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesType = filterType === 'all' || log?.type === filterType;
    return matchesSearch && matchesType;
  });

  const getActionIcon = (type) => {
    switch (type) {
      case 'login': return 'LogIn';
      case 'logout': return 'LogOut';
      case 'permission': return 'Key';
      case 'user': return 'User';
      case 'role': return 'Shield';
      case 'system': return 'Settings';
      default: return 'Activity';
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'login': return 'text-success';
      case 'logout': return 'text-muted-foreground';
      case 'permission': return 'text-warning';
      case 'user': return 'text-primary';
      case 'role': return 'text-accent';
      case 'system': return 'text-error';
      default: return 'text-foreground';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleString();
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Audit Trail</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Track all user management and permission changes
            </p>
          </div>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={onExportAudit}
          >
            Export Audit Log
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search audit logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>
          <Select
            options={actionTypes}
            value={filterType}
            onChange={setFilterType}
            placeholder="Filter by action"
            className="w-48"
          />
          <Select
            options={dateRanges}
            value={dateRange}
            onChange={setDateRange}
            placeholder="Date range"
            className="w-48"
          />
        </div>
      </div>
      {/* Audit Log List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredLogs?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredLogs?.map((log) => (
              <div key={log?.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className={`mt-1 ${getActionColor(log?.type)}`}>
                    <Icon name={getActionIcon(log?.type)} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{log?.action}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(log?.severity)}`}>
                          {log?.severity}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatTimestamp(log?.timestamp)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      by <span className="font-medium text-foreground">{log?.user}</span>
                      {log?.targetUser && (
                        <span> on user <span className="font-medium text-foreground">{log?.targetUser}</span></span>
                      )}
                    </div>
                    <div className="text-sm text-foreground">{log?.details}</div>
                    {log?.changes && (
                      <div className="mt-2 p-2 bg-muted/50 rounded text-xs font-mono">
                        <div className="text-muted-foreground mb-1">Changes:</div>
                        {Object.entries(log?.changes)?.map(([key, value]) => (
                          <div key={key} className="text-foreground">
                            <span className="text-muted-foreground">{key}:</span> {JSON.stringify(value)}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">
                        IP: {log?.ipAddress} • Session: {log?.sessionId}
                      </div>
                      {log?.riskScore && (
                        <div className="text-xs">
                          Risk Score: <span className={`font-medium ${
                            log?.riskScore >= 7 ? 'text-error' : 
                            log?.riskScore >= 4 ? 'text-warning' : 'text-success'
                          }`}>
                            {log?.riskScore}/10
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Audit Logs Found</h3>
            <p className="text-sm text-muted-foreground">
              No audit logs match your current search criteria
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {filteredLogs?.length} of {auditLogs?.length} audit entries
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Low Risk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;