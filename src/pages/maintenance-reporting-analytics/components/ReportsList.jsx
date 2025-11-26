import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportsList = ({ onCreateReport, onViewReport }) => {
  const [sortBy, setSortBy] = useState('lastModified');
  const [sortOrder, setSortOrder] = useState('desc');

  const savedReports = [
    {
      id: 1,
      name: 'Monthly Equipment Performance',
      description: 'Comprehensive analysis of equipment reliability and maintenance costs',
      type: 'Scheduled',
      lastRun: '2025-01-07 08:00',
      nextRun: '2025-02-07 08:00',
      format: 'PDF',
      status: 'Active',
      createdBy: 'John Smith',
      recipients: 3
    },
    {
      id: 2,
      name: 'Technician Productivity Report',
      description: 'Weekly analysis of technician performance and workload distribution',
      type: 'Scheduled',
      lastRun: '2025-01-06 09:00',
      nextRun: '2025-01-13 09:00',
      format: 'Excel',
      status: 'Active',
      createdBy: 'Sarah Wilson',
      recipients: 5
    },
    {
      id: 3,
      name: 'Cost Analysis Dashboard',
      description: 'Real-time cost tracking and budget variance analysis',
      type: 'Manual',
      lastRun: '2025-01-05 14:30',
      nextRun: null,
      format: 'PDF',
      status: 'Draft',
      createdBy: 'Mike Johnson',
      recipients: 2
    },
    {
      id: 4,
      name: 'SLA Compliance Summary',
      description: 'Service level agreement compliance tracking and trend analysis',
      type: 'Scheduled',
      lastRun: '2025-01-07 06:00',
      nextRun: '2025-01-08 06:00',
      format: 'PowerPoint',
      status: 'Active',
      createdBy: 'David Brown',
      recipients: 8
    },
    {
      id: 5,
      name: 'Inventory Optimization Report',
      description: 'Parts usage analysis and inventory level recommendations',
      type: 'Manual',
      lastRun: '2025-01-04 11:15',
      nextRun: null,
      format: 'CSV',
      status: 'Inactive',
      createdBy: 'Jane Smith',
      recipients: 1
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10';
      case 'Draft': return 'text-warning bg-warning/10';
      case 'Inactive': return 'text-muted-foreground bg-muted';
      default: return 'text-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'Scheduled' ? 'Calendar' : 'FileText';
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'PDF': return 'FileText';
      case 'Excel': return 'FileSpreadsheet';
      case 'PowerPoint': return 'Presentation';
      case 'CSV': return 'Database';
      default: return 'File';
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Saved Reports</h2>
          <Button onClick={onCreateReport} iconName="Plus" iconPosition="left">
            Create Report
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary"
                >
                  <span>Report Name</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Type</th>
              <th className="text-left p-4 font-medium text-foreground">
                <button 
                  onClick={() => handleSort('lastRun')}
                  className="flex items-center space-x-1 hover:text-primary"
                >
                  <span>Last Run</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Next Run</th>
              <th className="text-left p-4 font-medium text-foreground">Format</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Recipients</th>
              <th className="text-left p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedReports?.map((report) => (
              <tr key={report?.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div>
                    <h3 className="font-medium text-foreground">{report?.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{report?.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Created by {report?.createdBy}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getTypeIcon(report?.type)} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{report?.type}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{report?.lastRun}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">
                    {report?.nextRun || 'Manual'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getFormatIcon(report?.format)} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{report?.format}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report?.status)}`}>
                    {report?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{report?.recipients}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewReport(report)}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsList;