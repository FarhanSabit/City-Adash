import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkOrderChart = () => {
  const [chartType, setChartType] = useState('volume');
  const [timeRange, setTimeRange] = useState('7d');

  const volumeData = [
    { name: 'Mon', new: 12, inProgress: 8, completed: 15, total: 35 },
    { name: 'Tue', new: 15, inProgress: 12, completed: 18, total: 45 },
    { name: 'Wed', new: 8, inProgress: 15, completed: 12, total: 35 },
    { name: 'Thu', new: 18, inProgress: 10, completed: 22, total: 50 },
    { name: 'Fri', new: 14, inProgress: 16, completed: 20, total: 50 },
    { name: 'Sat', new: 6, inProgress: 8, completed: 10, total: 24 },
    { name: 'Sun', new: 4, inProgress: 6, completed: 8, total: 18 }
  ];

  const responseTimeData = [
    { name: 'Week 1', avgResponse: 2.5, target: 4.0 },
    { name: 'Week 2', avgResponse: 3.2, target: 4.0 },
    { name: 'Week 3', avgResponse: 2.8, target: 4.0 },
    { name: 'Week 4', avgResponse: 2.1, target: 4.0 },
    { name: 'Week 5', avgResponse: 3.5, target: 4.0 },
    { name: 'Week 6', avgResponse: 2.9, target: 4.0 }
  ];

  const priorityData = [
    { name: 'Critical', value: 8, color: '#DC2626' },
    { name: 'High', value: 24, color: '#D97706' },
    { name: 'Medium', value: 45, color: '#F59E0B' },
    { name: 'Low', value: 23, color: '#059669' }
  ];

  const categoryData = [
    { name: 'HVAC', count: 35, percentage: 35 },
    { name: 'Electrical', count: 28, percentage: 28 },
    { name: 'Plumbing', count: 18, percentage: 18 },
    { name: 'Security', count: 12, percentage: 12 },
    { name: 'General', count: 7, percentage: 7 }
  ];

  const chartOptions = [
    { id: 'volume', label: 'Work Order Volume', icon: 'BarChart3' },
    { id: 'response', label: 'Response Times', icon: 'Clock' },
    { id: 'priority', label: 'Priority Distribution', icon: 'PieChart' },
    { id: 'category', label: 'Category Breakdown', icon: 'Grid3X3' }
  ];

  const timeRangeOptions = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-popover-foreground">
                {entry?.name}: {entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'volume':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="new" stackId="a" fill="var(--color-primary)" name="New" />
              <Bar dataKey="inProgress" stackId="a" fill="var(--color-warning)" name="In Progress" />
              <Bar dataKey="completed" stackId="a" fill="var(--color-success)" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'response':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="avgResponse" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                name="Avg Response Time"
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="var(--color-error)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'priority':
        return (
          <div className="flex items-center justify-center h-80">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {priorityData?.map((item) => (
                <div key={item?.name} className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item?.color }}
                  ></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item?.name}</p>
                    <p className="text-xs text-muted-foreground">{item?.value} tickets</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'category':
        return (
          <div className="space-y-4 p-4">
            {categoryData?.map((category) => (
              <div key={category?.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{category?.name}</span>
                  <span className="text-sm text-muted-foreground">{category?.count} tickets</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${category?.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Work Order Analytics</h3>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground"
            >
              {timeRangeOptions?.map((option) => (
                <option key={option?.id} value={option?.id}>
                  {option?.label}
                </option>
              ))}
            </select>
            <Button variant="ghost" size="sm">
              <Icon name="Download" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {chartOptions?.map((option) => (
            <Button
              key={option?.id}
              variant={chartType === option?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setChartType(option?.id)}
              className="flex items-center space-x-2"
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {renderChart()}
      </div>
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Last updated: {new Date()?.toLocaleString()}
          </span>
          <Button variant="ghost" size="sm">
            <Icon name="RefreshCw" size={14} className="mr-1" />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderChart;