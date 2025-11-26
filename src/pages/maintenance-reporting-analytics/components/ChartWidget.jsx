import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChartWidget = ({ title, type, data, height = 300, showControls = true }) => {
  const [chartType, setChartType] = useState(type);
  const [timeRange, setTimeRange] = useState('7d');

  const colors = ['#1E40AF', '#059669', '#D97706', '#DC2626', '#7C3AED', '#0891B2'];

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { value: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'area', label: 'Area Chart', icon: 'Activity' },
    { value: 'pie', label: 'Pie Chart', icon: 'PieChart' }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
            <YAxis stroke="#64748B" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Bar dataKey="value" fill="#1E40AF" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
            <YAxis stroke="#64748B" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Line type="monotone" dataKey="value" stroke="#1E40AF" strokeWidth={3} dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }} />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
            <YAxis stroke="#64748B" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Area type="monotone" dataKey="value" stroke="#1E40AF" fill="#1E40AF" fillOpacity={0.2} />
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors?.[index % colors?.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }} 
            />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {showControls && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
                {chartTypes?.map((type) => (
                  <Button
                    key={type?.value}
                    variant={chartType === type?.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setChartType(type?.value)}
                    className="h-8 w-8"
                  >
                    <Icon name={type?.icon} size={16} />
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
                {timeRanges?.map((range) => (
                  <Button
                    key={range?.value}
                    variant={timeRange === range?.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTimeRange(range?.value)}
                    className="h-8 px-3 text-xs"
                  >
                    {range?.label}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8">
                <Icon name="MoreHorizontal" size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <div style={{ width: '100%', height: height }}>
          <ResponsiveContainer>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartWidget;