import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import { SidebarProvider } from './components/Sidebar';
import WorkOrderManagementSystem from './pages/work-order-management-system';
import WorkforceSchedulingAndAssignment from './pages/workforce-scheduling-and-assignment';
import AnalyticsAndReportingDashboard from './pages/analytics-and-reporting-dashboard';
import InteractiveFacilityMapInterface from './pages/interactive-facility-map-interface';
import SystemAdministrationAndUserManagement from './pages/system-administration-and-user-management';
import EnergyAndUtilitiesMonitoring from './pages/energy-and-utilities-monitoring';
import TicketTrackingHub from './pages/ticket-tracking-and-resolution-hub/components';
import AssetAndInventoryManagement from './pages/asset-and-inventory-management';
import FacilityOperationsDashboard from './pages/facility-operations-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <SidebarProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<FacilityOperationsDashboard />} />
            <Route path="/work-order-management-system" element={<WorkOrderManagementSystem />} />
            <Route path="/workforce-scheduling-and-assignment" element={<WorkforceSchedulingAndAssignment />} />
            <Route path="/analytics-and-reporting-dashboard" element={<AnalyticsAndReportingDashboard />} />
            <Route path="/interactive-facility-map-interface" element={<InteractiveFacilityMapInterface />} />
            <Route path="/system-administration-and-user-management" element={<SystemAdministrationAndUserManagement />} />
            <Route path="/energy-and-utilities-monitoring" element={<EnergyAndUtilitiesMonitoring />} />
            <Route path="/ticket-tracking-and-resolution-hub" element={<TicketTrackingHub />} />
            <Route path="/asset-and-inventory-management" element={<AssetAndInventoryManagement />} />
            <Route path="/facility-operations-dashboard" element={<FacilityOperationsDashboard />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </SidebarProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;