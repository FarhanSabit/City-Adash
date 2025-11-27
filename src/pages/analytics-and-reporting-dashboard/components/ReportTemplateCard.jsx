import React from 'react';
import Icon from '../../../components/AppIcon';


const ReportTemplateCard = ({ template, onSelect, isSelected }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Performance': 'var(--color-primary)',
      'Maintenance': 'var(--color-accent)',
      'Energy': 'var(--color-success)',
      'Financial': 'var(--color-warning)',
      'Compliance': 'var(--color-error)'
    };
    return colors?.[category] || 'var(--color-muted-foreground)';
  };

  return (
    <div
      className={`p-4 rounded-lg border transition-all duration-150 cursor-pointer hover-lift ${
        isSelected
          ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
      }`}
      onClick={() => onSelect(template)}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg"
          style={{ backgroundColor: `${getCategoryColor(template?.category)}15` }}
        >
          <Icon
            name={template?.icon}
            size={20}
            color={getCategoryColor(template?.category)}
          />
        </div>
        {template?.isNew && (
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent">
            New
          </span>
        )}
      </div>
      <h4 className="text-sm font-semibold text-foreground mb-1">
        {template?.name}
      </h4>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {template?.description}
      </p>
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-medium"
          style={{ color: getCategoryColor(template?.category) }}
        >
          {template?.category}
        </span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
          {template?.lastUsed}
        </div>
      </div>
    </div>
  );
};

export default ReportTemplateCard;