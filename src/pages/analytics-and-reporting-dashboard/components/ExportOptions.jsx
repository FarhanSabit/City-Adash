import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = ({ onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);

  const formats = [
    { id: 'pdf', name: 'PDF Document', icon: 'FileText', description: 'Formatted report with charts' },
    { id: 'excel', name: 'Excel Spreadsheet', icon: 'FileSpreadsheet', description: 'Data tables and analysis' },
    { id: 'powerbi', name: 'PowerBI Format', icon: 'BarChart3', description: 'Interactive dashboard' }
  ];

  const handleExport = () => {
    onExport({
      format: selectedFormat,
      options: {
        includeCharts,
        includeSummary,
        includeRawData
      }
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Export Options</h3>
      <div className="space-y-2">
        {formats?.map((format) => (
          <div
            key={format?.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
              selectedFormat === format?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedFormat(format?.id)}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{
                  backgroundColor:
                    selectedFormat === format?.id
                      ? 'var(--color-primary)'
                      : 'var(--color-muted)'
                }}
              >
                <Icon
                  name={format?.icon}
                  size={18}
                  color={
                    selectedFormat === format?.id
                      ? 'var(--color-primary-foreground)'
                      : 'var(--color-muted-foreground)'
                  }
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{format?.name}</div>
                <div className="text-xs text-muted-foreground">{format?.description}</div>
              </div>
              {selectedFormat === format?.id && (
                <Icon name="CheckCircle2" size={18} color="var(--color-primary)" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border space-y-3">
        <h4 className="text-xs font-medium text-muted-foreground uppercase">Include</h4>
        <Checkbox
          label="Charts and Visualizations"
          checked={includeCharts}
          onChange={(e) => setIncludeCharts(e?.target?.checked)}
        />
        <Checkbox
          label="Executive Summary"
          checked={includeSummary}
          onChange={(e) => setIncludeSummary(e?.target?.checked)}
        />
        <Checkbox
          label="Raw Data Tables"
          checked={includeRawData}
          onChange={(e) => setIncludeRawData(e?.target?.checked)}
        />
      </div>
      <Button
        variant="default"
        fullWidth
        onClick={handleExport}
        iconName="Download"
        iconPosition="left"
      >
        Export Report
      </Button>
    </div>
  );
};

export default ExportOptions;