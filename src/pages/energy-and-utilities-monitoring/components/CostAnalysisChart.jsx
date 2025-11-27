import React, { useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const CostAnalysisChart = ({ data }) => {
  const [viewMode, setViewMode] = useState('daily');

  const viewModes = [
    { value: 'daily', label: 'Daily', icon: 'Calendar' },
    { value: 'weekly', label: 'Weekly', icon: 'CalendarDays' },
    { value: 'monthly', label: 'Monthly', icon: 'CalendarRange' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs mb-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry?.color }} />
                <span className="text-muted-foreground">{entry?.name}:</span>
              </div>
              <span className="font-medium text-foreground">${entry?.value?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Cost Analysis</h3>
          <p className="text-sm text-muted-foreground">Energy costs vs budget allocation</p>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {viewModes?.map((mode) => (
            <button
              key={mode?.value}
              onClick={() => setViewMode(mode?.value)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 ${
                viewMode === mode?.value ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:bg-card/50'
              }`}
            >
              <Icon name={mode?.icon} size={14} color={viewMode === mode?.value ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />
              {mode?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-80" aria-label="Cost analysis chart">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="period" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
            <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="actualCost" fill="var(--color-primary)" name="Actual Cost" radius={[4, 4, 0, 0]} />
            <Bar dataKey="budgetedCost" fill="var(--color-secondary)" name="Budgeted Cost" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="savings" stroke="var(--color-success)" strokeWidth={2} dot={{ fill: 'var(--color-success)', r: 4 }} name="Savings" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
          <p className="text-xl font-semibold text-foreground">$48,250</p>
          <p className="text-xs text-success flex items-center justify-center gap-1 mt-1">
            <Icon name="TrendingDown" size={12} color="var(--color-success)" />
            8% vs last period
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Budget Remaining</p>
          <p className="text-xl font-semibold text-foreground">$11,750</p>
          <p className="text-xs text-muted-foreground mt-1">19.6% of budget</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Projected Savings</p>
          <p className="text-xl font-semibold text-success">$4,820</p>
          <p className="text-xs text-success flex items-center justify-center gap-1 mt-1">
            <Icon name="TrendingUp" size={12} color="var(--color-success)" />
            12% efficiency gain
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysisChart;