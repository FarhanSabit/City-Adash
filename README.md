# Facility Maintenance Management System

A comprehensive React-based facility maintenance management application with advanced features for equipment tracking, work order management, and maintenance analytics.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Complete Project Structure

### Root Files

```text
facility-mmis/
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Lock file for exact dependency versions
├── index.html                 # Main HTML entry point
├── .env                       # Environment variables
├── jsconfig.json             # JavaScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── favicon.ico               # Root favicon
├── README.md                 # Project documentation
└── postcss.config.js         # PostCSS configuration
```

### Public Directory Structure

```text
public/
├── _redirects                  # Netlify/hosting redirect rules
├── robots.txt                 # Search engine crawling rules
├── favicon.ico                # Browser tab icon
├── manifest.json              # PWA manifest file
├── file_structure_diagram.md  # Complete project structure documentation
└── assets/
    └── images/
        └── no_image.png       # Default placeholder image
```

### Source Code Structure (src/)

```text
src/
├── App.jsx                    # Main application component
├── index.jsx                  # React entry point
├── Routes.jsx                 # Application routing configuration
│
├── styles/                    # Styling files
│   ├── index.css             # Main CSS file
│   └── tailwind.css          # Tailwind CSS imports
│
├── components/                # Reusable components
│   ├── AppImage.jsx          # Image handling component
│   ├── AppIcon.jsx           # Icon component wrapper
│   ├── ErrorBoundary.jsx     # Error handling wrapper
│   ├── ScrollToTop.jsx       # Scroll behavior component
│   └── ui/                   # UI component library
│       ├── Select.jsx        # Dropdown selection component
│       ├── Checkbox.jsx      # Checkbox input component
│       ├── Button.jsx        # Button component
│       ├── Input.jsx         # Text input component
│       ├── Sidebar.jsx       # Navigation sidebar
│       ├── QuickActionButton.jsx # Action button component
│       └── Header.jsx        # Application header
│
├── pages/                     # Application pages/screens
│   ├── NotFound.jsx          # 404 error page
│   │
│   ├── system-configuration-settings/
│   │   ├── index.jsx         # Main settings page
│   │   └── components/
│   │       ├── IntegrationSettings.jsx
│   │       ├── GeneralSettings.jsx
│   │       ├── EquipmentManagement.jsx
│   │       ├── NotificationRules.jsx
│   │       ├── SecurityPolicies.jsx
│   │       └── WorkOrderConfiguration.jsx
│   │
│   ├── parts-inventory-management/
│   │   ├── index.jsx         # Inventory management main page
│   │   └── components/
│   │       ├── FilterPanel.jsx
│   │       ├── InventoryAnalytics.jsx
│   │       ├── ReorderModal.jsx
│   │       ├── EditPartModal.jsx
│   │       └── InventoryTable.jsx
│   │
│   ├── maintenance-reporting-analytics/
│   │   ├── index.jsx         # Reports and analytics page
│   │   └── components/
│   │       ├── MetricCard.jsx
│   │       ├── FilterPanel.jsx
│   │       ├── ChartWidget.jsx
│   │       ├── KPIGrid.jsx
│   │       ├── ReportsList.jsx
│   │       ├── ExportModal.jsx
│   │       └── ReportBuilder.jsx
│   │
│   ├── user-management-and-permissions/
│   │   ├── index.jsx         # User management page
│   │   └── components/
│   │       ├── RoleManagement.jsx
│   │       ├── UserTable.jsx
│   │       ├── AuditTrail.jsx
│   │       └── PermissionPanel.jsx
│   │
│   ├── interactive-facility-floor-plan/
│   │   ├── index.jsx         # Floor plan visualization page
│   │   └── components/
│   │       ├── EquipmentDetailsPanel.jsx
│   │       ├── FloorPlanViewer.jsx
│   │       └── EquipmentSidebar.jsx
│   │
│   ├── equipment-asset-management/
│   │   ├── index.jsx         # Equipment management page
│   │   └── components/
│   │       ├── EquipmentTable.jsx
│   │       ├── MaintenanceScheduler.jsx
│   │       ├── EquipmentDetailPanel.jsx
│   │       ├── EquipmentFilters.jsx
│   │       └── EquipmentStats.jsx
│   │
│   ├── work-order-details-modal/
│   │   ├── index.jsx         # Work order details modal
│   │   └── components/
│   │       ├── TimelineTab.jsx
│   │       ├── DocumentationTab.jsx
│   │       ├── TechnicalDetailsTab.jsx
│   │       ├── PartsTab.jsx
│   │       └── OverviewTab.jsx
│   │
│   ├── facility-management-dashboard/
│   │   ├── index.jsx         # Main dashboard page
│   │   └── components/
│   │       ├── KPICard.jsx
│   │       ├── WorkOrderChart.jsx
│   │       ├── QuickActions.jsx
│   │       ├── ResourceUtilization.jsx
│   │       ├── SystemStatus.jsx
│   │       └── AlertFeed.jsx
│   │
│   ├── work-order-kanban-board/
│   │   ├── index.jsx         # Kanban board for work orders
│   │   └── components/
│   │       ├── WorkOrderCard.jsx
│   │       ├── FilterSidebar.jsx
│   │       ├── WorkOrderDetailsModal.jsx
│   │       ├── BulkActionToolbar.jsx
│   │       └── KanbanColumn.jsx
│   │
│   └── technician-assignment-interface/
│       ├── index.jsx         # Technician assignment page
│       └── components/
│           ├── WorkOrderCard.jsx
│           ├── AssignmentModal.jsx
│           ├── BulkAssignmentToolbar.jsx
│           ├── FilterPanel.jsx
│           ├── TechnicianCard.jsx
│           └── TechnicianScheduleModal.jsx
│
└── utils/
    └── cn.js                 # Utility functions for class names
```

## 🏗️ Asset Breakdown

### Public Assets

- **favicon.ico**: Browser tab icon (root and public directories)
- **no_image.png**: Default placeholder image for missing assets
- **manifest.json**: Progressive Web App configuration
- **robots.txt**: Search engine optimization file
- **_redirects**: Hosting platform redirect rules

### Configuration Files

- **package.json**: Dependencies, scripts, project metadata
- **tailwind.config.js**: Tailwind CSS customization
- **postcss.config.js**: PostCSS processing configuration
- **jsconfig.json**: JavaScript project settings
- **.env**: Environment variables for API keys and configuration

### Page Structure Summary

- **8 Main Feature Areas** with dedicated pages
- **42 Component Files** for modular functionality
- **7 UI Components** for consistent interface
- **1 Utility Module** for helper functions

### Architecture Pattern

- **Feature-based organization**: Each major feature has its own directory
- **Component isolation**: Each page has its own components subfolder
- **Shared UI library**: Common components in `/components/ui/`
- **Utility separation**: Helper functions in dedicated utils folder

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.

## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## 🙏 Acknowledgments

- Powered by React and Vite
- Styled with Tailwind CSS
