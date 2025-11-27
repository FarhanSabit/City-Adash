import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const AssetTreePanel = ({ onAssetSelect, selectedAssetId }) => {
  const [expandedNodes, setExpandedNodes] = useState(['building-a', 'hvac-systems']);
  const [filterStatus, setFilterStatus] = useState({
    critical: true,
    maintenance: true,
    operational: true,
    offline: false
  });

  const assetTree = [
    {
      id: 'building-a',
      name: 'Building A - Main Campus',
      type: 'building',
      status: 'operational',
      children: [
        {
          id: 'hvac-systems',
          name: 'HVAC Systems',
          type: 'category',
          status: 'operational',
          children: [
            { id: 'hvac-001', name: 'Chiller Unit #1', type: 'asset', status: 'critical', workOrders: 3 },
            { id: 'hvac-002', name: 'Air Handler #2', type: 'asset', status: 'maintenance', workOrders: 1 },
            { id: 'hvac-003', name: 'Cooling Tower #1', type: 'asset', status: 'operational', workOrders: 0 }
          ]
        },
        {
          id: 'electrical',
          name: 'Electrical Systems',
          type: 'category',
          status: 'operational',
          children: [
            { id: 'elec-001', name: 'Main Transformer', type: 'asset', status: 'operational', workOrders: 0 },
            { id: 'elec-002', name: 'Generator #1', type: 'asset', status: 'maintenance', workOrders: 2 }
          ]
        },
        {
          id: 'plumbing',
          name: 'Plumbing Systems',
          type: 'category',
          status: 'maintenance',
          children: [
            { id: 'plumb-001', name: 'Water Heater #1', type: 'asset', status: 'critical', workOrders: 1 },
            { id: 'plumb-002', name: 'Pump Station', type: 'asset', status: 'operational', workOrders: 0 }
          ]
        }
      ]
    },
    {
      id: 'building-b',
      name: 'Building B - North Wing',
      type: 'building',
      status: 'operational',
      children: [
        {
          id: 'hvac-b',
          name: 'HVAC Systems',
          type: 'category',
          status: 'operational',
          children: [
            { id: 'hvac-b-001', name: 'Rooftop Unit #1', type: 'asset', status: 'operational', workOrders: 0 }
          ]
        }
      ]
    }
  ];

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev =>
      prev?.includes(nodeId)
        ? prev?.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      critical: 'var(--color-error)',
      maintenance: 'var(--color-warning)',
      operational: 'var(--color-success)',
      offline: 'var(--color-muted-foreground)'
    };
    return colors?.[status] || 'var(--color-muted-foreground)';
  };

  const getStatusIcon = (status) => {
    const icons = {
      critical: 'AlertCircle',
      maintenance: 'Wrench',
      operational: 'CheckCircle2',
      offline: 'XCircle'
    };
    return icons?.[status] || 'Circle';
  };

  const shouldShowNode = (node) => {
    if (node?.type === 'asset') {
      return filterStatus?.[node?.status];
    }
    return true;
  };

  const renderTreeNode = (node, level = 0) => {
    if (!shouldShowNode(node)) return null;

    const isExpanded = expandedNodes?.includes(node?.id);
    const hasChildren = node?.children && node?.children?.length > 0;
    const isSelected = selectedAssetId === node?.id;

    return (
      <div key={node?.id} className="select-none">
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ${
            isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground'
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node?.id);
            }
            if (node?.type === 'asset') {
              onAssetSelect(node);
            }
          }}
        >
          {hasChildren && (
            <Icon
              name={isExpanded ? 'ChevronDown' : 'ChevronRight'}
              size={16}
              color="var(--color-muted-foreground)"
            />
          )}
          {!hasChildren && <div className="w-4" />}
          
          <Icon
            name={node?.type === 'building' ? 'Building2' : node?.type === 'category' ? 'Folder' : getStatusIcon(node?.status)}
            size={16}
            color={node?.type === 'asset' ? getStatusColor(node?.status) : 'var(--color-muted-foreground)'}
          />
          
          <span className="flex-1 text-sm font-medium truncate">{node?.name}</span>
          
          {node?.workOrders > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {node?.workOrders}
            </span>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {node?.children?.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Asset Hierarchy</h2>
        
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">Filter by Status</div>
          <Checkbox
            label="Critical"
            size="sm"
            checked={filterStatus?.critical}
            onChange={(e) => setFilterStatus(prev => ({ ...prev, critical: e?.target?.checked }))}
          />
          <Checkbox
            label="Maintenance"
            size="sm"
            checked={filterStatus?.maintenance}
            onChange={(e) => setFilterStatus(prev => ({ ...prev, maintenance: e?.target?.checked }))}
          />
          <Checkbox
            label="Operational"
            size="sm"
            checked={filterStatus?.operational}
            onChange={(e) => setFilterStatus(prev => ({ ...prev, operational: e?.target?.checked }))}
          />
          <Checkbox
            label="Offline"
            size="sm"
            checked={filterStatus?.offline}
            onChange={(e) => setFilterStatus(prev => ({ ...prev, offline: e?.target?.checked }))}
          />
        </div>
      </div>
      <div className="p-2">
        {assetTree?.map(node => renderTreeNode(node))}
      </div>
    </div>
  );
};

export default AssetTreePanel;