import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const InventoryAnalytics = ({ analyticsData, onRefresh }) => {
  const stockLevelData = [
    { name: 'HVAC', inStock: 45, lowStock: 12, outOfStock: 3 },
    { name: 'Electrical', inStock: 38, lowStock: 8, outOfStock: 2 },
    { name: 'Plumbing', inStock: 52, lowStock: 15, outOfStock: 5 },
    { name: 'Safety', inStock: 28, lowStock: 6, outOfStock: 1 },
    { name: 'General', inStock: 67, lowStock: 18, outOfStock: 4 }
  ];

  const supplierPerformanceData = [
    { name: 'ABC Supply Co', value: 35, color: '#10B981' },
    { name: 'Industrial Parts Ltd', value: 28, color: '#1E40AF' },
    { name: 'Quick Fix Supplies', value: 22, color: '#F59E0B' },
    { name: 'Others', value: 15, color: '#64748B' }
  ];

  const inventoryTrendData = [
    { month: 'Jan', value: 245000 },
    { month: 'Feb', value: 238000 },
    { month: 'Mar', value: 251000 },
    { month: 'Apr', value: 267000 },
    { month: 'May', value: 259000 },
    { month: 'Jun', value: 273000 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(value);
  };

  return (
    <div className="space-y-6">
      {/* Stock Levels by Category - Updated with modern styling */}
      <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-gray-800">Stock Levels by Category</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRefresh} 
            className="h-8 w-8 p-0 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-300">
            <Icon name="RefreshCw" size={14} />
          </Button>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stockLevelData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: '#374151', fontWeight: 500 }}
                axisLine={{ stroke: '#D1D5DB' }}
                angle={-45}
                textAnchor="end"
                height={40}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#374151', fontWeight: 500 }}
                axisLine={{ stroke: '#D1D5DB' }}
                width={30}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 500,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="inStock" stackId="a" fill="#10B981" name="In Stock" radius={[0, 0, 4, 4]} />
              <Bar dataKey="lowStock" stackId="a" fill="#FBBF24" name="Low Stock" />
              <Bar dataKey="outOfStock" stackId="a" fill="#EF4444" name="Out of Stock" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Supplier Distribution - Updated styling */}
      <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition-all duration-300">
        <h4 className="text-lg font-bold text-gray-800 mb-4">Supplier Distribution</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={supplierPerformanceData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={50}
                paddingAngle={3}
                dataKey="value"
              >
                {supplierPerformanceData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 500,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, 'Share']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {supplierPerformanceData?.map((supplier, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: supplier?.color }}
              />
              <span className="text-xs text-gray-800 truncate font-medium">
                {supplier?.name?.split(' ')?.[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6-Month Inventory Trend - Updated styling */}
      <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition-all duration-300">
        <h4 className="text-lg font-bold text-gray-800 mb-4">6-Month Inventory Trend</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={inventoryTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11, fill: '#374151', fontWeight: 500 }}
                axisLine={{ stroke: '#D1D5DB' }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#374151', fontWeight: 500 }}
                axisLine={{ stroke: '#D1D5DB' }}
                tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}K`}
                width={40}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 500,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [formatCurrency(value), 'Inventory Value']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#374151" 
                strokeWidth={3}
                dot={{ fill: '#FBBF24', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#374151', strokeWidth: 2, fill: '#FBBF24' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InventoryAnalytics;