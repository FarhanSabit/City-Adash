import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/Sidebar';
import Sidebar from '../../components/Sidebar';
import MobileMenuButton from '../../components/MobileMenuButton';
import AlertCounter from '../../components/ui/AlertCounter';
import FacilitySelector from '../../components/ui/FacilitySelector';
import UserRoleIndicator from '../../components/ui/UserRoleIndicator';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import AssetCard from './components/AssetCard';
import AssetListView from './components/AssetListView';
import InventoryTable from './components/InventoryTable';
import FilterPanel from './components/FilterPanel';
import BulkOperationsBar from './components/BulkOperationsBar';
import AssetDetailsModal from './components/AssetDetailsModal';

const AssetAndInventoryManagement = () => {
  const [activeTab, setActiveTab] = useState('assets');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [savedFilters, setSavedFilters] = useState([]);

  const mockAssets = [
  {
    id: "AST-001",
    name: "Central HVAC Unit A1",
    category: "HVAC Systems",
    location: "Building A - Roof",
    status: "Operational",
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1631142482273-84b859dfaf14",
    imageAlt: "Modern industrial HVAC unit with silver metallic finish installed on commercial building rooftop with blue sky background",
    lastService: "2025-10-15",
    nextMaintenance: "2025-12-15",
    warranty: "2026-01-15"
  },
  {
    id: "AST-002",
    name: "Emergency Generator G1",
    category: "Electrical Equipment",
    location: "Building B - Basement",
    status: "Operational",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1457563186495-42850e8c15d6",
    imageAlt: "Large industrial diesel generator with yellow and black housing in well-lit basement Annexwith concrete floor",
    lastService: "2025-09-20",
    nextMaintenance: "2025-11-25",
    warranty: "2025-09-20"
  },
  {
    id: "AST-003",
    name: "Fire Suppression System",
    category: "Safety Equipment",
    location: "Building A - All Floors",
    status: "Operational",
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1690973692388-239878450c7b",
    imageAlt: "Red fire sprinkler system with chrome pipes and nozzles mounted on white ceiling in modern commercial building",
    lastService: "2025-08-10",
    nextMaintenance: "2025-11-22",
    warranty: "2027-08-10"
  },
  {
    id: "AST-004",
    name: "Water Chiller Unit C2",
    category: "Plumbing Systems",
    location: "Building C - Mechanical Room",
    status: "Maintenance",
    condition: "Fair",
    image: "https://images.unsplash.com/photo-1687150399359-fe0c011af636",
    imageAlt: "Industrial water chiller with blue and silver components showing pipes and control panel in mechanical equipment room",
    lastService: "2025-07-05",
    nextMaintenance: "2025-11-18",
    warranty: "2024-12-31"
  },
  {
    id: "AST-005",
    name: "Network Server Rack SR1",
    category: "IT Infrastructure",
    location: "Building A - Server Room",
    status: "Operational",
    condition: "Excellent",
    image: "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a",
    imageAlt: "Modern server rack with blue LED lights showing multiple network switches and cable management in climate-controlled data center",
    lastService: "2025-10-01",
    nextMaintenance: "2025-12-01",
    warranty: "2026-10-01"
  },
  {
    id: "AST-006",
    name: "Elevator System E1",
    category: "Mechanical Systems",
    location: "Building B - Main Lobby",
    status: "Operational",
    condition: "Good",
    image: "https://images.unsplash.com/photo-1678962737570-f304c1c7524d",
    imageAlt: "Modern stainless steel elevator doors with polished finish and digital floor indicator in corporate building lobby",
    lastService: "2025-09-15",
    nextMaintenance: "2025-11-30",
    warranty: "2026-03-15"
  }];


  const mockInventory = [
  {
    id: "INV-001",
    code: "HVAC-FILTER-001",
    name: "HVAC Air Filters (20x25x1)",
    category: "HVAC Parts",
    currentStock: 45,
    reorderLevel: 20,
    unit: "units",
    unitCost: 12.50,
    supplier: "FilterPro Supply Co.",
    usageTrend: 15
  },
  {
    id: "INV-002",
    code: "ELEC-BULB-LED",
    name: "LED Bulbs (60W Equivalent)",
    category: "Electrical Supplies",
    currentStock: 8,
    reorderLevel: 25,
    unit: "boxes",
    unitCost: 24.99,
    supplier: "Bright Solutions Inc.",
    usageTrend: 22
  },
  {
    id: "INV-003",
    code: "PLUMB-PIPE-001",
    name: "PVC Pipes (2 inch, 10ft)",
    category: "Plumbing Supplies",
    currentStock: 120,
    reorderLevel: 30,
    unit: "pieces",
    unitCost: 8.75,
    supplier: "PlumbMaster Wholesale",
    usageTrend: -5
  },
  {
    id: "INV-004",
    code: "SAFE-EXTNG-001",
    name: "Fire Extinguishers (ABC Type)",
    category: "Safety Equipment",
    currentStock: 0,
    reorderLevel: 10,
    unit: "units",
    unitCost: 45.00,
    supplier: "SafeGuard Equipment",
    usageTrend: 0
  },
  {
    id: "INV-005",
    code: "CLEAN-DISINF-001",
    name: "Industrial Disinfectant (5 Gallon)",
    category: "Cleaning Supplies",
    currentStock: 35,
    reorderLevel: 15,
    unit: "gallons",
    unitCost: 32.50,
    supplier: "CleanTech Distributors",
    usageTrend: 18
  },
  {
    id: "INV-006",
    code: "MAINT-TOOL-001",
    name: "Professional Tool Kit",
    category: "Maintenance Tools",
    currentStock: 12,
    reorderLevel: 5,
    unit: "kits",
    unitCost: 189.99,
    supplier: "ToolMasters Supply",
    usageTrend: -3
  }];


  const handleViewDetails = (asset) => {
    setSelectedAsset(asset);
    setShowDetailsModal(true);
  };

  const handleScheduleMaintenance = (asset) => {
    console.log('Schedule maintenance for:', asset);
  };

  const handleEditAsset = (asset) => {
    console.log('Edit asset:', asset);
  };

  const handleReorder = (item) => {
    console.log('Reorder item:', item);
  };

  const handleAdjustStock = (item) => {
    console.log('Adjust stock for:', item);
  };

  const handleViewHistory = (item) => {
    console.log('View history for:', item);
  };

  const handleApplyFilters = (filters) => {
    console.log('Apply filters:', filters);
  };

  const handleResetFilters = () => {
    console.log('Reset filters');
  };

  const handleSaveFilter = (name, filters) => {
    const newFilter = {
      id: `filter-${Date.now()}`,
      name,
      filters
    };
    setSavedFilters([...savedFilters, newFilter]);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for', selectedAssets?.length, 'items');
  };

  const handleClearSelection = () => {
    setSelectedAssets([]);
  };

  const handleExport = () => {
    console.log('Export data');
  };

  const handleBarcodeScan = () => {
    console.log('Open barcode scanner');
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.ctrlKey && e?.key === 'f') {
        e?.preventDefault();
        document.getElementById('asset-search')?.focus();
      }
      if (e?.ctrlKey && e?.key === 'm') {
        e?.preventDefault();
        console.log('Quick maintenance scheduling');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <SidebarProvider>
      <div className="dark min-h-screen bg-background">
        <MobileMenuButton />
        <Sidebar />

        <div className="main-content">
          <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border mb-6">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <Icon name="Package" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">Asset & Inventory Management</h1>
                  <p className="text-sm text-muted-foreground">Track equipment lifecycle and optimize inventory levels</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FacilitySelector />
                <UserRoleIndicator />
                <AlertCounter />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('assets')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'assets' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted'}`
                  }>

                  <div className="flex items-center gap-2">
                    <Icon
                      name="Package"
                      size={16}
                      color={activeTab === 'assets' ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)'} />

                    Asset Registry
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'inventory' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted'}`
                  }>

                  <div className="flex items-center gap-2">
                    <Icon
                      name="Box"
                      size={16}
                      color={activeTab === 'inventory' ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)'} />

                    Inventory Management
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Scan"
                  iconPosition="left"
                  onClick={handleBarcodeScan}>

                  Scan Barcode
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExport}>

                  Export
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left">

                  Add {activeTab === 'assets' ? 'Asset' : 'Item'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Assets</p>
                  <Icon name="Package" size={18} color="var(--color-primary)" />
                </div>
                <p className="text-2xl font-semibold text-foreground">248</p>
                <p className="text-xs text-success mt-1">+12 this month</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Maintenance Due</p>
                  <Icon name="AlertTriangle" size={18} color="var(--color-warning)" />
                </div>
                <p className="text-2xl font-semibold text-foreground">18</p>
                <p className="text-xs text-warning mt-1">7 overdue</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Low Stock Items</p>
                  <Icon name="TrendingDown" size={18} color="var(--color-error)" />
                </div>
                <p className="text-2xl font-semibold text-foreground">5</p>
                <p className="text-xs text-error mt-1">Reorder required</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <Icon name="DollarSign" size={18} color="var(--color-success)" />
                </div>
                <p className="text-2xl font-semibold text-foreground">$2.4M</p>
                <p className="text-xs text-success mt-1">+5.2% YoY</p>
              </div>
            </div>

            <FilterPanel
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
              savedFilters={savedFilters}
              onSaveFilter={handleSaveFilter} />


            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-md">
                <Input
                  id="asset-search"
                  type="search"
                  placeholder={`Search ${activeTab === 'assets' ? 'assets' : 'inventory'}... (Ctrl+F)`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)} />

              </div>

              {activeTab === 'assets' &&
              <div className="flex items-center gap-2">
                  <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`
                  }
                  aria-label="Grid view">

                    <Icon name="Grid3x3" size={18} color={viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />
                  </button>
                  <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`
                  }
                  aria-label="List view">

                    <Icon name="List" size={18} color={viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />
                  </button>
                </div>
              }
            </div>

            {activeTab === 'assets' &&
            <>
                {viewMode === 'grid' ?
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockAssets?.map((asset) =>
                <AssetCard
                  key={asset?.id}
                  asset={asset}
                  onViewDetails={handleViewDetails}
                  onScheduleMaintenance={handleScheduleMaintenance}
                  onEdit={handleEditAsset} />

                )}
                  </div> :

              <AssetListView
                assets={mockAssets}
                onViewDetails={handleViewDetails}
                onScheduleMaintenance={handleScheduleMaintenance}
                onEdit={handleEditAsset} />

              }
              </>
            }

            {activeTab === 'inventory' &&
            <InventoryTable
              items={mockInventory}
              onReorder={handleReorder}
              onAdjust={handleAdjustStock}
              onViewHistory={handleViewHistory} />

            }
          </div>
        </div>

        <BulkOperationsBar
          selectedCount={selectedAssets?.length}
          onBulkAction={handleBulkAction}
          onClearSelection={handleClearSelection} />

        {showDetailsModal && (
          <AssetDetailsModal
            asset={selectedAsset}
            onClose={() => setShowDetailsModal(false)}
            onScheduleMaintenance={handleScheduleMaintenance} />
        )}

        <QuickActionButton />
      </div>
    </SidebarProvider>
  );
};

export default AssetAndInventoryManagement;