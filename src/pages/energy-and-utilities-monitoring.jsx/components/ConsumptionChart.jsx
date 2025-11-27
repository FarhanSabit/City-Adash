import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';


const ConsumptionChart = ({ data, title, type = 'line' }) => {
  const [chartType, setChartType] = useState(type);
  const [timeRange, setTimeRange] = useState('24h');

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const chartTypes = [
    { value: 'line', icon: 'TrendingUp', label: 'Line' },
    { value: 'area', icon: 'Activity', label: 'Area' },
    { value: 'bar', icon: 'BarChart3', label: 'Bar' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry?.color }} />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">{entry?.value} kWh</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
            <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="consumption" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorConsumption)" name="Consumption" />
            <Area type="monotone" dataKey="baseline" stroke="var(--color-secondary)" fillOpacity={0.2} fill="var(--color-secondary)" name="Baseline" />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
            <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="consumption" fill="var(--color-primary)" name="Consumption" radius={[4, 4, 0, 0]} />
            <Bar dataKey="baseline" fill="var(--color-secondary)" name="Baseline" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
            <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="consumption" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: 'var(--color-primary)', r: 4 }} name="Consumption" />
            <Line type="monotone" dataKey="baseline" stroke="var(--color-secondary)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: 'var(--color-secondary)', r: 4 }} name="Baseline" />
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {chartTypes?.map((ct) => (
              <button
                key={ct?.value}
                onClick={() => setChartType(ct?.value)}
                className={`flex items-center justify-center w-8 h-8 rounded transition-colors duration-150 ${
                  chartType === ct?.value ? 'bg-card shadow-sm' : 'hover:bg-card/50'
                }`}
                title={ct?.label}
              >
                <Icon name={ct?.icon} size={16} color={chartType === ct?.value ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {timeRanges?.map((tr) => (
              <button
                key={tr?.value}
                onClick={() => setTimeRange(tr?.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 ${
                  timeRange === tr?.value ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:bg-card/50'
                }`}
              >
                {tr?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-80" aria-label={`${title} chart`}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConsumptionChart;