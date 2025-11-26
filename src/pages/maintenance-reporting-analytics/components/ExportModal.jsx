import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    reportName: `Maintenance Report - ${new Date()?.toLocaleDateString()}`,
    includeCharts: true,
    includeRawData: false,
    includeExecutiveSummary: true,
    dateRange: '30d',
    recipients: '',
    schedule: 'once'
  });

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', description: 'Executive summary with charts' },
    { value: 'excel', label: 'Excel Workbook', description: 'Data tables with pivot tables' },
    { value: 'csv', label: 'CSV Data', description: 'Raw data export' },
    { value: 'powerpoint', label: 'PowerPoint', description: 'Presentation slides' }
  ];

  const scheduleOptions = [
    { value: 'once', label: 'Export Once' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleExport = () => {
    onExport(exportConfig);
    onClose();
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf': return 'FileText';
      case 'excel': return 'FileSpreadsheet';
      case 'csv': return 'Database';
      case 'powerpoint': return 'Presentation';
      default: return 'File';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Export Report</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Export Format</h3>
            <div className="grid grid-cols-1 gap-3">
              {formatOptions?.map((format) => (
                <div
                  key={format?.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    exportConfig?.format === format?.value
                      ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setExportConfig(prev => ({ ...prev, format: format?.value }))}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      exportConfig?.format === format?.value ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <Icon name={getFormatIcon(format?.value)} size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{format?.label}</h4>
                      <p className="text-sm text-muted-foreground">{format?.description}</p>
                    </div>
                    {exportConfig?.format === format?.value && (
                      <Icon name="Check" size={20} className="text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Report Configuration</h3>
            <Input
              label="Report Name"
              value={exportConfig?.reportName}
              onChange={(e) => setExportConfig(prev => ({ ...prev, reportName: e?.target?.value }))}
              placeholder="Enter report name"
            />
            
            <div className="space-y-3">
              <Checkbox
                label="Include Charts and Visualizations"
                checked={exportConfig?.includeCharts}
                onChange={(e) => setExportConfig(prev => ({ ...prev, includeCharts: e?.target?.checked }))}
              />
              <Checkbox
                label="Include Raw Data Tables"
                checked={exportConfig?.includeRawData}
                onChange={(e) => setExportConfig(prev => ({ ...prev, includeRawData: e?.target?.checked }))}
              />
              <Checkbox
                label="Include Executive Summary"
                checked={exportConfig?.includeExecutiveSummary}
                onChange={(e) => setExportConfig(prev => ({ ...prev, includeExecutiveSummary: e?.target?.checked }))}
              />
            </div>
          </div>

          {/* Delivery Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Delivery Options</h3>
            <Select
              label="Schedule"
              options={scheduleOptions}
              value={exportConfig?.schedule}
              onChange={(value) => setExportConfig(prev => ({ ...prev, schedule: value }))}
            />
            
            {exportConfig?.schedule !== 'once' && (
              <Input
                label="Email Recipients"
                placeholder="Enter email addresses separated by commas"
                value={exportConfig?.recipients}
                onChange={(e) => setExportConfig(prev => ({ ...prev, recipients: e?.target?.value }))}
                description="Reports will be automatically sent to these recipients"
              />
            )}
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Export Preview</h3>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name={getFormatIcon(exportConfig?.format)} size={16} color="white" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{exportConfig?.reportName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatOptions?.find(f => f?.value === exportConfig?.format)?.label}
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Charts: {exportConfig?.includeCharts ? 'Included' : 'Not included'}</p>
                <p>• Raw Data: {exportConfig?.includeRawData ? 'Included' : 'Not included'}</p>
                <p>• Executive Summary: {exportConfig?.includeExecutiveSummary ? 'Included' : 'Not included'}</p>
                <p>• Schedule: {scheduleOptions?.find(s => s?.value === exportConfig?.schedule)?.label}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport} iconName="Download" iconPosition="left">
            {exportConfig?.schedule === 'once' ? 'Export Now' : 'Schedule Export'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;