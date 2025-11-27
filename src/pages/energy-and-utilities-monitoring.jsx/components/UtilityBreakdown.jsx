import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';


const UtilityBreakdown = ({ data }) => {
  const COLORS = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-warning)',
    'var(--color-success)',
    'var(--color-secondary)'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-1">{data?.name}</p>
          <p className="text-xs text-muted-foreground">
            {data?.value?.toLocaleString()} kWh ({data?.payload?.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Utility Breakdown</h3>
        <p className="text-sm text-muted-foreground">Energy consumption by utility type</p>
      </div>
      <div className="w-full h-64" aria-label="Utility breakdown pie chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3 mt-6 pt-6 border-t border-border">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS?.[index % COLORS?.length] }} />
              <div>
                <p className="text-sm font-medium text-foreground">{item?.name}</p>
                <p className="text-xs text-muted-foreground">{item?.value?.toLocaleString()} kWh</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{item?.percentage}%</p>
              <p className="text-xs text-muted-foreground">${item?.cost?.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UtilityBreakdown;