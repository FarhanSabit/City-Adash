import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedReportItem = ({ report, onOpen, onDelete, onSchedule }) => {
  const getFormatIcon = (format) => {
    const icons = {
      'PDF': 'FileText',
      'Excel': 'FileSpreadsheet',
      'PowerBI': 'BarChart3'
    };
    return icons?.[format] || 'File';
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-150 group">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
        <Icon name={getFormatIcon(report?.format)} size={18} color="var(--color-primary)" />
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-medium text-foreground truncate">{report?.name}</h5>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{report?.lastModified}</span>
          <span>•</span>
          <span>{report?.size}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOpen(report)}
          iconName="Eye"
          iconSize={16}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onSchedule(report)}
          iconName="Calendar"
          iconSize={16}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(report)}
          iconName="Trash2"
          iconSize={16}
        />
      </div>
    </div>
  );
};

export default SavedReportItem;