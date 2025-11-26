import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import InventoryTable from './components/InventoryTable';
import InventoryAnalytics from './components/InventoryAnalytics';
import ReorderModal from './components/ReorderModal';
import EditPartModal from './components/EditPartModal';
import FilterPanel from './components/FilterPanel';

import Button from '../../components/ui/Button';

const PartsInventoryManagement = () => {
  const [selectedParts, setSelectedParts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ field: 'partNumber', direction: 'asc' });
  const [reorderModalOpen, setReorderModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [filters, setFilters] = useState({});

  const [parts, setParts] = useState([
    {
      id: 1,
      partNumber: 'HVAC-001',
      description: 'Air Filter - High Efficiency HEPA 20x25x4',
      category: 'HVAC',
      currentStock: 15,
      reservedQuantity: 3,
      reorderLevel: 20,
      unitCost: 45.99,
      supplier: 'ABC Supply Co',
      supplierRating: 4.5,
      location: 'Warehouse A, Shelf 3B',
      compatibility: 'Carrier 58MCA, Trane XE80',
      lastUpdated: '2025-01-05',
      notes: 'Premium grade filter for critical HVAC systems'
    },
    {
      id: 2,
      partNumber: 'ELE-205',
      description: 'Circuit Breaker - 20A Single Pole GFCI',
      category: 'Electrical',
      currentStock: 8,
      reservedQuantity: 2,
      reorderLevel: 15,
      unitCost: 28.50,
      supplier: 'Industrial Parts Ltd',
      supplierRating: 4.2,
      location: 'Warehouse B, Bin 12',
      compatibility: 'Square D QO Series, Siemens QP',
      lastUpdated: '2025-01-03',
      notes: 'GFCI protection for wet locations'
    },
    {
      id: 3,
      partNumber: 'PLB-089',
      description: 'Ball Valve - 2 inch Brass Full Port',
      category: 'Plumbing',
      currentStock: 0,
      reservedQuantity: 0,
      reorderLevel: 10,
      unitCost: 67.25,
      supplier: 'Quick Fix Supplies',
      supplierRating: 3.8,
      location: 'Warehouse A, Shelf 1C',
      compatibility: 'Standard NPT threading',
      lastUpdated: '2025-01-02',
      notes: 'Heavy duty brass construction'
    },
    {
      id: 4,
      partNumber: 'SAF-012',
      description: 'Emergency Exit Sign - LED Battery Backup',
      category: 'Safety',
      currentStock: 25,
      reservedQuantity: 1,
      reorderLevel: 8,
      unitCost: 89.99,
      supplier: 'Premium Components',
      supplierRating: 4.7,
      location: 'Warehouse C, Rack 5',
      compatibility: 'Universal mounting',
      lastUpdated: '2025-01-04',
      notes: '90-minute battery backup, UL listed'
    },
    {
      id: 5,
      partNumber: 'GEN-156',
      description: 'Motor Oil - 15W-40 Diesel Engine 5 Gallon',
      category: 'General',
      currentStock: 12,
      reservedQuantity: 4,
      reorderLevel: 6,
      unitCost: 156.75,
      supplier: 'ABC Supply Co',
      supplierRating: 4.5,
      location: 'Warehouse D, Floor Storage',
      compatibility: 'Caterpillar, Cummins, Detroit Diesel',
      lastUpdated: '2025-01-06',
      notes: 'Heavy duty diesel engine oil'
    },
    {
      id: 6,
      partNumber: 'HVAC-078',
      description: 'Thermostat - Programmable Digital 7-Day',
      category: 'HVAC',
      currentStock: 6,
      reservedQuantity: 1,
      reorderLevel: 12,
      unitCost: 124.50,
      supplier: 'Industrial Parts Ltd',
      supplierRating: 4.2,
      location: 'Warehouse A, Shelf 2A',
      compatibility: 'Honeywell, White-Rodgers compatible',
      lastUpdated: '2025-01-01',
      notes: 'WiFi enabled with mobile app control'
    }]
  );

  const analyticsData = {
    totalValue: 273450,
    reorderRequired: 18,
    totalParts: 245,
    turnoverRate: 4.2,
    carryingCost: 12750
  };

  const handleSelectPart = (partId) => {
    setSelectedParts((prev) =>
      prev?.includes(partId) ?
        prev?.filter((id) => id !== partId) :
        [...prev, partId]
    );
  };

  const handleSelectAll = () => {
    setSelectedParts((prev) =>
      prev?.length === parts?.length ? [] : parts?.map((part) => part?.id)
    );
  };

  const handleSort = (field) => {
    setSortConfig((prev) => ({
      field,
      direction: prev?.field === field && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleReorderPart = (part) => {
    setSelectedPart(part);
    setReorderModalOpen(true);
  };

  const handleEditPart = (part) => {
    setSelectedPart(part);
    setEditModalOpen(true);
  };

  const handleSubmitReorder = (reorderData) => {
    console.log('Reorder submitted:', reorderData);
    // Handle reorder logic here
    setReorderModalOpen(false);
    setSelectedPart(null);
  };

  const handleSubmitEdit = (editData) => {
    console.log('Edit submitted:', editData);
    setParts((prev) => prev?.map((part) =>
      part?.id === editData?.id ? { ...part, ...editData } : part
    ));
    setEditModalOpen(false);
    setSelectedPart(null);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    console.log('Filters cleared');
  };

  const handleRefreshAnalytics = () => {
    console.log('Analytics refreshed');
  };

  const sortedParts = React.useMemo(() => {
    const sorted = [...parts]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.field];
      const bValue = b?.[sortConfig?.field];

      if (typeof aValue === 'string') {
        return sortConfig?.direction === 'asc' ?
          aValue?.localeCompare(bValue) :
          bValue?.localeCompare(aValue);
      }

      return sortConfig?.direction === 'asc' ?
        aValue - bValue :
        bValue - aValue;
    });

    return sorted;
  }, [parts, sortConfig]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
      <Header />
      <main className="pt-16">
        <div className="p-4">
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Parts Inventory Management</h1>
                <p className="text-gray-600 text-sm mt-2 max-w-2xl">
                  Optimize parts availability and procurement workflows to minimize work order delays
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Filter"
                  iconPosition="left"
                  size="sm"
                  onClick={() => setFilterPanelOpen(true)}
                  className="bg-gray-50 hover:bg-yellow-50 border-gray-300 text-gray-700 hover:text-yellow-700 shadow-sm transition-all duration-300 hover:border-yellow-400">
                  Advanced Filters
                </Button>
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  size="sm"
                  className="bg-gray-50 hover:bg-yellow-50 border-gray-300 text-gray-700 hover:text-yellow-700 shadow-sm transition-all duration-300 hover:border-yellow-400">
                  Import Parts
                </Button>
                <Button
                  iconName="Plus"
                  iconPosition="left"
                  size="sm"
                  className="bg-gray-800 hover:bg-gray-900 text-white shadow-sm transition-all duration-300 hover:shadow-md">
                  Add New Part
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 auto-rows-auto">
            
            <div className="xl:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-700 font-semibold uppercase tracking-wider">Total Inventory Value</span>
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 text-xl font-bold">$</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  ${analyticsData?.totalValue?.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">+5.2% from last month</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-700 font-semibold uppercase tracking-wider">Parts Requiring Reorder</span>
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <span className="text-yellow-600 text-xl font-bold">!</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {analyticsData?.reorderRequired}
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full">7.3% of total</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-700 font-semibold uppercase tracking-wider">Inventory Turnover</span>
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 text-xl font-bold">↻</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {analyticsData?.turnoverRate}x
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">Optimal range</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-700 font-semibold uppercase tracking-wider">Carrying Cost</span>
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <span className="text-gray-600 text-xl">🚚</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  ${analyticsData?.carryingCost?.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-full">Monthly average</span>
                </div>
              </div>
            </div>

            <div className="xl:col-span-4">
              <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="ShoppingCart" 
                    iconPosition="left" 
                    className="text-sm justify-start bg-white hover:bg-yellow-50 border-gray-300 text-gray-700 hover:text-yellow-700 hover:border-yellow-400 transition-all duration-300">
                    Generate PO
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="FileText" 
                    iconPosition="left" 
                    className="text-sm justify-start bg-white hover:bg-yellow-50 border-gray-300 text-gray-700 hover:text-yellow-700 hover:border-yellow-400 transition-all duration-300">
                    Report
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="AlertCircle" 
                    iconPosition="left" 
                    className="text-sm justify-start bg-white hover:bg-yellow-50 border-gray-300 text-gray-700 hover:text-yellow-700 hover:border-yellow-400 transition-all duration-300">
                    Low Stock
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="BarChart3" 
                    iconPosition="left" 
                    className="text-sm justify-start bg-white hover:bg-yellow-50 border-gray-300 text-gray-700 hover:text-yellow-700 hover:border-yellow-400 transition-all duration-300">
                    Cost Analysis
                  </Button>
                </div>
              </div>
            </div>

            <div className="xl:col-span-8">
              <InventoryTable
                parts={sortedParts}
                selectedParts={selectedParts}
                onSelectPart={handleSelectPart}
                onSelectAll={handleSelectAll}
                onSort={handleSort}
                sortConfig={sortConfig}
                onReorderPart={handleReorderPart}
                onEditPart={handleEditPart} />
            </div>

            <div className="xl:col-span-4">
              <InventoryAnalytics
                analyticsData={analyticsData}
                onRefresh={handleRefreshAnalytics} />
            </div>
          </div>
        </div>
      </main>

      <ReorderModal
        isOpen={reorderModalOpen}
        onClose={() => {
          setReorderModalOpen(false);
          setSelectedPart(null);
        }}
        part={selectedPart}
        onSubmitReorder={handleSubmitReorder} />

      <EditPartModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedPart(null);
        }}
        part={selectedPart}
        onSubmitEdit={handleSubmitEdit} />

      <FilterPanel
        isOpen={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters} />

      <QuickActionButton />
    </div>
  );
};

export default PartsInventoryManagement;