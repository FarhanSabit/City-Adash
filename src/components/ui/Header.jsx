import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
  {
    label: 'Dashboard',
    path: '/facility-management-dashboard',
    icon: 'BarChart3'
  },
  {
    label: 'Equipment',
    path: '/equipment-asset-management',
    icon: 'Settings'
  },
  {
    label: 'Floor Plan',
    path: '/interactive-facility-floor-plan',
    icon: 'Map'
  },
  {
    label: 'Technicians',
    path: '/technician-assignment-interface',
    icon: 'Users'
  },
  {
    label: 'Inventory',
    path: '/parts-inventory-management',
    icon: 'Package'
  },
  {
    label: 'Reports',
    path: '/maintenance-reporting-analytics',
    icon: 'TrendingUp'
  },
  {
    label: 'Users',
    path: '/user-management-and-permissions',
    icon: 'UserCheck'
  },
  {
    label: 'Settings',
    path: '/system-configuration-settings',
    icon: 'Cog'
  }];


  const notifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Equipment Alert',
    message: 'HVAC Unit #3 requires immediate attention',
    time: '2 min ago',
    priority: 'high'
  },
  {
    id: 2,
    type: 'task',
    title: 'Work Order Assigned',
    message: 'Electrical maintenance task assigned to you',
    time: '15 min ago',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'info',
    title: 'System Update',
    message: 'Maintenance schedule updated for Building A',
    time: '1 hour ago',
    priority: 'low'
  }];


  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
      // Handle search logic here
    }
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    setIsNotificationOpen(false);
    // Handle notification routing logic here
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':return 'text-error';
      case 'medium':return 'text-warning';
      case 'low':return 'text-muted-foreground';
      default:return 'text-foreground';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':return 'AlertTriangle';
      case 'task':return 'CheckSquare';
      case 'info':return 'Info';
      default:return 'Bell';
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path || path === '/facility-management-dashboard' && location?.pathname === '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Building2" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-[22px]">MMIS Revenue</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu - Desktop */}
        <nav className="hidden lg:flex items-center space-x-1 mx-8">
          {navigationItems?.map((item) =>
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            isActivePath(item?.path) ?
            'bg-primary text-primary-foreground shadow-sm' :
            'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`
            }>

              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ?
            <form onSubmit={handleSearch} className="flex items-center">
                <Input
                type="search"
                placeholder="Search work orders, equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-64 h-9"
                autoFocus />

                <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(false)}
                className="ml-2">

                  <Icon name="X" size={16} />
                </Button>
              </form> :

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="h-9 w-9">

                <Icon name="Search" size={18} />
              </Button>
            }
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="h-9 w-9 relative">

              <Icon name="Bell" size={18} />
              {notifications?.length > 0 &&
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {notifications?.length}
                </span>
              }
            </Button>

            {isNotificationOpen &&
            <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-md shadow-modal z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.map((notification) =>
                <div
                  key={notification?.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="p-4 border-b border-border hover:bg-muted cursor-pointer transition-hover">

                      <div className="flex items-start space-x-3">
                        <div className={`mt-1 ${getPriorityColor(notification?.priority)}`}>
                          <Icon name={getNotificationIcon(notification?.type)} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {notification?.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                )}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            }
          </div>

          {/* User Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="h-9 px-3 flex items-center space-x-2">

              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={14} color="white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-foreground">
                John Smith
              </span>
              <Icon name="ChevronDown" size={14} />
            </Button>

            {isProfileOpen &&
            <div className="absolute right-0 top-12 w-56 bg-popover border border-border rounded-md shadow-modal z-50">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">John Smith</p>
                  <p className="text-xs text-muted-foreground">AnnexManager</p>
                </div>
                <div className="py-2">
                  <button
                  onClick={() => handleNavigation('/user-management-and-permissions')}
                  className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-hover">

                    <Icon name="Settings" size={16} className="mr-3" />
                    Settings
                  </button>
                  <button
                  onClick={() => handleNavigation('/system-configuration-settings')}
                  className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-hover">

                    <Icon name="Cog" size={16} className="mr-3" />
                    System Config
                  </button>
                  <div className="border-t border-border my-2"></div>
                  <button
                  onClick={() => console.log('Logout clicked')}
                  className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-hover">

                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            }
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden h-9 w-9"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>

            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={18} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen &&
      <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) =>
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            isActivePath(item?.path) ?
            'bg-primary text-primary-foreground' :
            'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`
            }>

                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
          )}
          </nav>
        </div>
      }
    </header>);

};

export default Header;