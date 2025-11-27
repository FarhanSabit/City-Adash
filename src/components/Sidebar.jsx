import React, { useState, createContext, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);

  // Update CSS custom property when collapse state changes
  React.useEffect(() => {
    const sidebarWidth = isCollapsed ? '72px' : '240px';
    document.documentElement?.style?.setProperty('--sidebar-width', sidebarWidth);
  }, [isCollapsed]);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        isMobileOpen,
        toggleCollapse,
        toggleMobile,
        closeMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};

const Sidebar = () => {
  const location = useLocation();
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/facility-operations-dashboard',
      icon: 'LayoutDashboard',
      badge: null,
    },
    {
      label: 'Work Orders',
      path: '/work-order-management-system',
      icon: 'ClipboardList',
      badge: 12,
    },
    {
      label: 'Tickets',
      path: '/ticket-tracking-and-resolution-hub',
      icon: 'Ticket',
      badge: 5,
    },
    {
      label: 'Assets & Inventory',
      path: '/asset-and-inventory-management',
      icon: 'Package',
      badge: null,
    },
    {
      label: 'Workforce',
      path: '/workforce-scheduling-and-assignment',
      icon: 'Users',
      badge: null,
    },
    {
      label: 'Energy & Utilities',
      path: '/energy-and-utilities-monitoring',
      icon: 'Zap',
      badge: null,
    },
    {
      label: 'AnnexMap',
      path: '/interactive-facility-map-interface',
      icon: 'Map',
      badge: null,
    },
    {
      label: 'Analytics',
      path: '/analytics-and-reporting-dashboard',
      icon: 'BarChart3',
      badge: null,
    },
    {
      label: 'Administration',
      path: '/system-administration-and-user-management',
      icon: 'Settings',
      badge: null,
    },
  ];

  const isActive = (path) => location?.pathname === path;

  return (
    <>
      {isMobileOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="sidebar-header">
          <div className="flex items-center">
            <div className="sidebar-logo">
              <Icon name="Building2" size={24} color="var(--color-primary)" />
            </div>
            {!isCollapsed && (
              <span className="sidebar-logo-text">CityDash</span>
            )}
          </div>
          <button
            onClick={toggleCollapse}
            className="sidebar-toggle-btn hidden lg:flex p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
              size={20}
              color="var(--color-muted-foreground)"
            />
          </button>
        </div>

        <nav className="sidebar-nav scrollbar-thin">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              onClick={closeMobile}
              className={`sidebar-nav-item ${
                isActive(item?.path) ? 'active' : ''
              }`}
              aria-current={isActive(item?.path) ? 'page' : undefined}
              title={isCollapsed ? item?.label : undefined}
            >
              <Icon
                name={item?.icon}
                size={20}
                color={
                  isActive(item?.path)
                    ? 'var(--color-primary)'
                    : 'var(--color-muted-foreground)'
                }
              />
              {!isCollapsed && (
                <>
                  <span className="sidebar-nav-item-text">{item?.label}</span>
                  {item?.badge && (
                    <span className="sidebar-nav-badge">{item?.badge}</span>
                  )}
                </>
              )}
              {isCollapsed && item?.badge && (
                <span className="sidebar-nav-badge">{item?.badge}</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;