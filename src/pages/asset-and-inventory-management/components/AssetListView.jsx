import React from 'react';
import Icon from '../../../components/AppIcon';


const AssetListView = ({ assets, onViewDetails, onScheduleMaintenance, onEdit }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Operational': 'var(--color-success)',
      'Maintenance': 'var(--color-warning)',
      'Critical': 'var(--color-error)',
      'Retired': 'var(--color-muted-foreground)'
    };
    return colors?.[status] || 'var(--color-muted-foreground)';
  };

  const getConditionBadge = (condition) => {
    const badges = {
      'Excellent': 'status-success',
      'Good': 'status-success',
      'Fair': 'status-warning',
      'Poor': 'status-error'
    };
    return badges?.[condition] || 'status-success';
  };

  const isWarrantyExpiring = (warrantyDate) => {
    const expiry = new Date(warrantyDate);
    const today = new Date();
    const daysUntil = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntil <= 90 && daysUntil > 0;
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
              <th>Asset ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Condition</th>
              <th>Last Service</th>
              <th>Next Maintenance</th>
              <th>Warranty</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets?.map((asset) => (
              <tr key={asset?.id}>
                <td>
                  <input type="checkbox" className="rounded border-border" />
                </td>
                <td className="font-medium text-foreground">{asset?.id}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                      <Icon name="Package" size={16} color="var(--color-primary)" />
                    </div>
                    <span className="font-medium text-foreground">{asset?.name}</span>
                  </div>
                </td>
                <td className="text-muted-foreground">{asset?.category}</td>
                <td className="text-foreground">{asset?.location}</td>
                <td>
                  <span
                    className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full text-white"
                    style={{ backgroundColor: getStatusColor(asset?.status) }}
                  >
                    {asset?.status}
                  </span>
                </td>
                <td>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getConditionBadge(asset?.condition)}`}>
                    {asset?.condition}
                  </span>
                </td>
                <td className="text-muted-foreground">
                  {new Date(asset.lastService)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="text-foreground">
                  {new Date(asset.nextMaintenance)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground text-sm">
                      {new Date(asset.warranty)?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                    {isWarrantyExpiring(asset?.warranty) && (
                      <Icon name="AlertCircle" size={14} color="var(--color-warning)" />
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onViewDetails(asset)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      aria-label="View details"
                    >
                      <Icon name="Eye" size={16} color="var(--color-muted-foreground)" />
                    </button>
                    <button
                      onClick={() => onScheduleMaintenance(asset)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      aria-label="Schedule maintenance"
                    >
                      <Icon name="Wrench" size={16} color="var(--color-muted-foreground)" />
                    </button>
                    <button
                      onClick={() => onEdit(asset)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      aria-label="Edit asset"
                    >
                      <Icon name="Edit" size={16} color="var(--color-muted-foreground)" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetListView;