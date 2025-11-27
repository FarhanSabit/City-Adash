import React, { useState } from 'react';

import Sidebar, { SidebarProvider } from '../../components/Sidebar';
import MobileMenuButton from '../../components/MobileMenuButton';
import AlertCounter from '../../components/ui/AlertCounter';
import FacilitySelector from '../../components/ui/FacilitySelector';
import UserRoleIndicator from '../../components/ui/UserRoleIndicator';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import FloorSelector from './components/FloorSelector';
import LayerControls from './components/LayerControls';
import MapLegend from './components/MapLegend';
import MapToolbar from './components/MapToolbar';
import SearchPanel from './components/SearchPanel';
import HeatMapOverlay from './components/HeatMapOverlay';
import WorkOrderCreationModal from './components/WorkOrderCreationModal';
import FacilityMapCanvas from './components/FacilityMapCanvas';

const InteractiveFacilityMapInterface = () => {
  const [selectedFloor, setSelectedFloor] = useState({
    id: 'G',
    name: 'Ground Floor',
    zones: 24,
    alerts: 3
  });
  const [activeLayers, setActiveLayers] = useState(['equipment', 'workOrders', 'sensors']);
  const [activeTool, setActiveTool] = useState('select');
  const [heatMapType, setHeatMapType] = useState('energy');
  const [isHeatMapActive, setIsHeatMapActive] = useState(false);
  const [isWorkOrderModalOpen, setIsWorkOrderModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);

  const handleLayerToggle = (layerId, isChecked) => {
    if (isChecked) {
      setActiveLayers([...activeLayers, layerId]);
    } else {
      setActiveLayers(activeLayers?.filter(id => id !== layerId));
    }
  };

  const handleHeatMapToggle = (type) => {
    if (heatMapType === type && isHeatMapActive) {
      setIsHeatMapActive(false);
    } else {
      setHeatMapType(type);
      setIsHeatMapActive(true);
    }
  };

  const handleSearchResult = (result) => {
    console.log('Navigate to:', result);
  };

  const handleCreateWorkOrder = (equipment = null) => {
    setSelectedEquipment(equipment);
    setIsWorkOrderModalOpen(true);
  };

  const handleEquipmentClick = (equipment) => {
    setSelectedEquipment(equipment);
  };

  return (
    <SidebarProvider>
      <div className="dark min-h-screen bg-background">
        <Sidebar />
        <MobileMenuButton />

        {/* Top Navigation Bar */}
        <div className="fixed top-0 right-0 left-0 lg:left-60 h-16 bg-card border-b border-border z-30 px-6">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon name="Map" size={24} color="var(--color-primary)" />
                <h1 className="text-lg font-semibold text-foreground">AnnexMap</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AlertCounter />
              <FacilitySelector />
              <UserRoleIndicator />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content pt-16">
          <div className="flex gap-4 h-[calc(100vh-7rem)]">
            {/* Left Control Panel */}
            <div className={`transition-all duration-300 ${isLeftPanelCollapsed ? 'w-12' : 'w-80'} flex-shrink-0`}>
              {isLeftPanelCollapsed ? (
                <button
                  onClick={() => setIsLeftPanelCollapsed(false)}
                  className="w-12 h-12 flex items-center justify-center bg-card border border-border rounded-lg hover:bg-muted transition-colors"
                  aria-label="Expand control panel"
                >
                  <Icon name="ChevronRight" size={20} color="var(--color-muted-foreground)" />
                </button>
              ) : (
                <div className="h-full flex flex-col gap-4 overflow-y-auto scrollbar-thin pr-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-foreground">Map Controls</h2>
                    <button
                      onClick={() => setIsLeftPanelCollapsed(true)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors"
                      aria-label="Collapse control panel"
                    >
                      <Icon name="ChevronLeft" size={16} color="var(--color-muted-foreground)" />
                    </button>
                  </div>

                  <SearchPanel onSearchResult={handleSearchResult} />
                  <FloorSelector selectedFloor={selectedFloor} onFloorChange={setSelectedFloor} />
                  <LayerControls activeLayers={activeLayers} onLayerToggle={handleLayerToggle} />
                  <HeatMapOverlay type={heatMapType} isActive={isHeatMapActive} onToggle={handleHeatMapToggle} />
                  <MapLegend />
                </div>
              )}
            </div>

            {/* Map Canvas */}
            <div className="flex-1 relative">
              <FacilityMapCanvas
                selectedFloor={selectedFloor}
                activeLayers={activeLayers}
                onEquipmentClick={handleEquipmentClick}
              />

              {/* Keyboard Shortcuts Info */}
              <div className="absolute bottom-4 left-4 px-4 py-3 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-lg">
                <div className="text-xs font-semibold text-foreground mb-2">Keyboard Shortcuts</div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div><kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">WASD</kbd> Navigate</div>
                  <div><kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">+/-</kbd> Zoom</div>
                  <div><kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground">1-9</kbd> Toggle Layers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Toolbar */}
          <MapToolbar
            onToolSelect={setActiveTool}
            activeTool={activeTool}
            onCreateWorkOrder={() => handleCreateWorkOrder()}
          />

          {/* Work Order Creation Modal */}
          <WorkOrderCreationModal
            isOpen={isWorkOrderModalOpen}
            onClose={() => {
              setIsWorkOrderModalOpen(false);
              setSelectedEquipment(null);
            }}
            equipment={selectedEquipment}
            location={selectedFloor ? { floor: selectedFloor?.name, floorId: selectedFloor?.id } : null}
          />

          {/* Quick Action Button */}
          <QuickActionButton />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default InteractiveFacilityMapInterface;