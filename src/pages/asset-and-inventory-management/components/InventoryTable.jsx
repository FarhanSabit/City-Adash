import React from 'react';
import Icon from '../../../components/AppIcon';


const InventoryTable = ({ items, onReorder, onAdjust, onViewHistory }) => {
  const getStockStatus = (current, reorder) => {
    if (current === 0) return { label: 'Out of Stock', color: 'var(--color-error)', badge: 'status-error' };
    if (current <= reorder) return { label: 'Low Stock', color: 'var(--color-warning)', badge: 'status-warning' };
    return { label: 'In Stock', color: 'var(--color-success)', badge: 'status-success' };
  };

  const calculateUsageTrend = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'var(--color-error)', text: `+${trend}%` };
    if (trend < 0) return { icon: 'TrendingDown', color: 'var(--color-success)', text: `${trend}%` };
    return { icon: 'Minus', color: 'var(--color-muted-foreground)', text: '0%' };
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-16">
                <input type="checkbox" className="rounded border-border" />
              </th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Status</th>
              <th>Unit Cost</th>
              <th>Total Value</th>
              <th>Supplier</th>
              <th>Usage Trend</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => {
              const status = getStockStatus(item?.currentStock, item?.reorderLevel);
              const trend = calculateUsageTrend(item?.usageTrend);
              
              return (
                <tr key={item?.id}>
                  <td>
                    <input type="checkbox" className="rounded border-border" />
                  </td>
                  <td className="font-medium text-foreground">{item?.code}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center">
                        <Icon name="Box" size={16} color="var(--color-accent)" />
                      </div>
                      <span className="font-medium text-foreground">{item?.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{item?.category}</td>
                  <td>
                    <span className="font-semibold text-foreground">{item?.currentStock}</span>
                    <span className="text-muted-foreground text-sm ml-1">{item?.unit}</span>
                  </td>
                  <td className="text-muted-foreground">{item?.reorderLevel} {item?.unit}</td>
                  <td>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${status?.badge}`}>
                      {status?.label}
                    </span>
                  </td>
                  <td className="text-foreground">${item?.unitCost?.toFixed(2)}</td>
                  <td className="font-medium text-foreground">
                    ${(item?.currentStock * item?.unitCost)?.toFixed(2)}
                  </td>
                  <td className="text-muted-foreground">{item?.supplier}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Icon name={trend?.icon} size={14} color={trend?.color} />
                      <span className="text-sm" style={{ color: trend?.color }}>
                        {trend?.text}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onViewHistory(item)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        aria-label="View history"
                      >
                        <Icon name="History" size={16} color="var(--color-muted-foreground)" />
                      </button>
                      <button
                        onClick={() => onAdjust(item)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        aria-label="Adjust stock"
                      >
                        <Icon name="Edit" size={16} color="var(--color-muted-foreground)" />
                      </button>
                      {item?.currentStock <= item?.reorderLevel && (
                        <button
                          onClick={() => onReorder(item)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                          aria-label="Reorder item"
                        >
                          <Icon name="ShoppingCart" size={16} color="var(--color-warning)" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;