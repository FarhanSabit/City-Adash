import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportBuilder = ({ isOpen, onClose, onSave }) => {
  const [reportConfig, setReportConfig] = useState({
    name: '',
    description: '',
    chartType: 'bar',
    dataSource: 'work_orders',
    metrics: [],
    filters: [],
    schedule: 'manual'
  });

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'area', label: 'Area Chart' },
    { value: 'table', label: 'Data Table' }
  ];

  const dataSources = [
    { value: 'work_orders', label: 'Work Orders' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'technicians', label: 'Technicians' },
    { value: 'costs', label: 'Costs & Budget' },
    { value: 'inventory', label: 'Inventory' }
  ];

  const availableMetrics = [
    { value: 'count', label: 'Count' },
    { value: 'avg_completion_time', label: 'Average Completion Time' },
    { value: 'total_cost', label: 'Total Cost' },
    { value: 'sla_compliance', label: 'SLA Compliance %' },
    { value: 'first_call_resolution', label: 'First Call Resolution %' }
  ];

  const scheduleOptions = [
    { value: 'manual', label: 'Manual' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleSave = () => {
    if (reportConfig?.name && reportConfig?.dataSource && reportConfig?.metrics?.length > 0) {
      onSave(reportConfig);
      onClose();
      setReportConfig({
        name: '',
        description: '',
        chartType: 'bar',
        dataSource: 'work_orders',
        metrics: [],
        filters: [],
        schedule: 'manual'
      });
    }
  };

  const addMetric = (metric) => {
    if (!reportConfig?.metrics?.includes(metric)) {
      setReportConfig(prev => ({
        ...prev,
        metrics: [...prev?.metrics, metric]
      }));
    }
  };

  const removeMetric = (metric) => {
    setReportConfig(prev => ({
      ...prev,
      metrics: prev?.metrics?.filter(m => m !== metric)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Custom Report Builder</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
            <Input
              label="Report Name"
              placeholder="Enter report name"
              value={reportConfig?.name}
              onChange={(e) => setReportConfig(prev => ({ ...prev, name: e?.target?.value }))}
              required
            />
            <Input
              label="Description"
              placeholder="Brief description of the report"
              value={reportConfig?.description}
              onChange={(e) => setReportConfig(prev => ({ ...prev, description: e?.target?.value }))}
            />
          </div>

          {/* Data Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Data Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Data Source"
                options={dataSources}
                value={reportConfig?.dataSource}
                onChange={(value) => setReportConfig(prev => ({ ...prev, dataSource: value }))}
              />
              <Select
                label="Chart Type"
                options={chartTypes}
                value={reportConfig?.chartType}
                onChange={(value) => setReportConfig(prev => ({ ...prev, chartType: value }))}
              />
            </div>
          </div>

          {/* Metrics Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Metrics</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableMetrics?.map((metric) => (
                <div
                  key={metric?.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    reportConfig?.metrics?.includes(metric?.value)
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => 
                    reportConfig?.metrics?.includes(metric?.value)
                      ? removeMetric(metric?.value)
                      : addMetric(metric?.value)
                  }
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric?.label}</span>
                    {reportConfig?.metrics?.includes(metric?.value) && (
                      <Icon name="Check" size={16} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Schedule</h3>
            <Select
              label="Report Schedule"
              options={scheduleOptions}
              value={reportConfig?.schedule}
              onChange={(value) => setReportConfig(prev => ({ ...prev, schedule: value }))}
            />
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Preview</h3>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Name:</strong> {reportConfig?.name || 'Untitled Report'}</p>
                <p><strong>Data Source:</strong> {dataSources?.find(ds => ds?.value === reportConfig?.dataSource)?.label}</p>
                <p><strong>Chart Type:</strong> {chartTypes?.find(ct => ct?.value === reportConfig?.chartType)?.label}</p>
                <p><strong>Metrics:</strong> {reportConfig?.metrics?.length} selected</p>
                <p><strong>Schedule:</strong> {scheduleOptions?.find(so => so?.value === reportConfig?.schedule)?.label}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!reportConfig?.name || !reportConfig?.dataSource || reportConfig?.metrics?.length === 0}
          >
            Create Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;