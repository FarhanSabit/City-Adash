import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataSourceSelector = ({ sources, selectedSources, onSourceToggle }) => {
  const [expandedCategories, setExpandedCategories] = useState(['Facility Data']);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev?.includes(category)
        ? prev?.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const getSourceIcon = (type) => {
    const icons = {
      'Work Orders': 'ClipboardList',
      'Tickets': 'Ticket',
      'Assets': 'Package',
      'Energy': 'Zap',
      'Workforce': 'Users',
      'Financial': 'DollarSign',
      'Compliance': 'Shield'
    };
    return icons?.[type] || 'Database';
  };

  const groupedSources = sources?.reduce((acc, source) => {
    if (!acc?.[source?.category]) {
      acc[source.category] = [];
    }
    acc?.[source?.category]?.push(source);
    return acc;
  }, {});

  return (
    <div className="space-y-2">
      {Object.entries(groupedSources)?.map(([category, categorySources]) => (
        <div key={category} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleCategory(category)}
            className="w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <span className="text-sm font-medium text-foreground">{category}</span>
            <Icon
              name={expandedCategories?.includes(category) ? 'ChevronDown' : 'ChevronRight'}
              size={16}
              color="var(--color-muted-foreground)"
            />
          </button>
          {expandedCategories?.includes(category) && (
            <div className="p-2 space-y-1">
              {categorySources?.map((source) => (
                <div
                  key={source?.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted/30 transition-colors"
                >
                  <Checkbox
                    checked={selectedSources?.includes(source?.id)}
                    onChange={() => onSourceToggle(source?.id)}
                  />
                  <Icon
                    name={getSourceIcon(source?.name)}
                    size={16}
                    color="var(--color-muted-foreground)"
                  />
                  <div className="flex-1">
                    <div className="text-sm text-foreground">{source?.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {source?.recordCount?.toLocaleString()} records
                    </div>
                  </div>
                  {source?.status === 'connected' ? (
                    <Icon name="CheckCircle2" size={14} color="var(--color-success)" />
                  ) : (
                    <Icon name="AlertCircle" size={14} color="var(--color-warning)" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DataSourceSelector;