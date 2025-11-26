import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import SystemConfigurationSettings from './pages/system-configuration-settings';
import PartsInventoryManagement from './pages/parts-inventory-management';
import MaintenanceReportingAnalytics from './pages/maintenance-reporting-analytics';
import UserManagementAndPermissions from './pages/user-management-and-permissions';
import InteractiveFacilityFloorPlan from './pages/interactive-facility-floor-plan';
import EquipmentAssetManagement from './pages/equipment-asset-management';
import WorkOrderDetailsModal from './pages/work-order-details-modal';
import FacilityManagementDashboard from './pages/facility-management-dashboard';
import TechnicianAssignmentInterface from './pages/technician-assignment-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Update default route to facility-management-dashboard */}
        <Route path="/" element={<FacilityManagementDashboard />} />
        <Route path="/system-configuration-settings" element={<SystemConfigurationSettings />} />
        <Route path="/parts-inventory-management" element={<PartsInventoryManagement />} />
        <Route path="/maintenance-reporting-analytics" element={<MaintenanceReportingAnalytics />} />
        <Route path="/user-management-and-permissions" element={<UserManagementAndPermissions />} />
        <Route path="/interactive-facility-floor-plan" element={<InteractiveFacilityFloorPlan />} />
        <Route path="/equipment-asset-management" element={<EquipmentAssetManagement />} />
        <Route path="/work-order-details-modal" element={<WorkOrderDetailsModal />} />
        <Route path="/facility-management-dashboard" element={<FacilityManagementDashboard />} />
        <Route path="/technician-assignment-interface" element={<TechnicianAssignmentInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
