import React, { useState } from 'react';
import Sidebar, { SidebarProvider } from '../../components/Sidebar';
import MobileMenuButton from '../../components/MobileMenuButton';
import AlertCounter from '../../components/ui/AlertCounter';
import FacilitySelector from '../../components/ui/FacilitySelector';
import UserRoleIndicator from '../../components/ui/UserRoleIndicator';
import QuickActionButton from '../../components/ui/QuickActionButton';
import AssetTreePanel from './components/AssetTreePanel';
import WorkOrderGrid from './components/WorkOrderGrid';
import WorkOrderDetailPanel from './components/WorkOrderDetailPanel';

const WorkOrderManagementSystem = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
  };

  const handleWorkOrderSelect = (workOrder) => {
    setSelectedWorkOrder(workOrder);
  };

  return (
    <SidebarProvider>
      <div className="dark min-h-screen bg-background">
        <MobileMenuButton />
        <Sidebar />

        <div className="main-content">
          <header className="sticky top-0 z-30 bg-card border-b border-border mb-6 -mx-6 -mt-6 px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-shrink-0 min-w-0">
                <h1 className="text-2xl font-semibold text-foreground">Work Order Management</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Comprehensive maintenance workflow and asset tracking
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <FacilitySelector />
                <AlertCounter />
                <UserRoleIndicator />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-6">
            <div className="lg:col-span-3">
              <AssetTreePanel
                onAssetSelect={handleAssetSelect}
                selectedAssetId={selectedAsset?.id}
              />
            </div>

            <div className="lg:col-span-5">
              <WorkOrderGrid
                onWorkOrderSelect={handleWorkOrderSelect}
                selectedWorkOrderId={selectedWorkOrder?.id}
              />
            </div>

            <div className="lg:col-span-4">
              <WorkOrderDetailPanel workOrder={selectedWorkOrder} />
            </div>
          </div>
        </div>

        <QuickActionButton />
      </div>
    </SidebarProvider>
  );
};

export default WorkOrderManagementSystem;