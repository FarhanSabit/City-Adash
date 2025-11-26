import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [activeSection, setActiveSection] = useState('operations');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationSections = [
    {
      id: 'operations',
      label: 'Operations',
      icon: 'Wrench',
      items: [
        {
          label: 'Work Order Board',
          path: '/work-order-kanban-board',
          icon: 'Kanban',
          badge: 12
        },
        {
          label: 'Floor Plans',
          path: '/interactive-facility-floor-plan',
          icon: 'Map',
          badge: null
        },
        {
          label: 'Technician Assignment',
          path: '/technician-assignment-interface',
          icon: 'Users',
          badge: 3
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      items: [
        {
          label: 'Dashboard',
          path: '/facility-management-dashboard',
          icon: 'LayoutDashboard',
          badge: null
        }
      ]
    },
    {
      id: 'assets',
      label: 'Assets',
      icon: 'Package',
      items: [
        {
          label: 'Parts Inventory',
          path: '/parts-inventory-management',
          icon: 'Archive',
          badge: 2
        }
      ]
    }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
      // Handle search logic here
    }
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const handleItemClick = (item) => {
    console.log('Navigation item clicked:', item);
    // Handle navigation logic here
  };

  return (
    <aside className={`fixed left-0 top-0 h-full bg-card border-r border-border shadow-soft z-40 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-72'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Building2" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">FacilityPro</span>
                <span className="text-xs text-muted-foreground">Enterprise Management</span>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mx-auto">
              <Icon name="Building2" size={20} color="white" />
            </div>
          )}

          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className={`h-8 w-8 ${isCollapsed ? 'mx-auto mt-2' : ''}`}
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          )}
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4 border-b border-border">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="flex-1 h-9"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(false)}
                  className="h-9 w-9"
                >
                  <Icon name="X" size={16} />
                </Button>
              </form>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsSearchOpen(true)}
                className="w-full justify-start h-9 text-muted-foreground"
              >
                <Icon name="Search" size={16} className="mr-2" />
                Search...
              </Button>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navigationSections?.map((section) => (
              <div key={section?.id} className="space-y-1">
                <Button
                  variant="ghost"
                  onClick={() => handleSectionClick(section?.id)}
                  className={`w-full justify-start h-10 ${
                    activeSection === section?.id ? 'bg-muted text-primary' : 'text-foreground hover:bg-muted'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                >
                  <Icon name={section?.icon} size={18} className={isCollapsed ? '' : 'mr-3'} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{section?.label}</span>
                      <Icon 
                        name={activeSection === section?.id ? "ChevronDown" : "ChevronRight"} 
                        size={16} 
                      />
                    </>
                  )}
                </Button>

                {/* Section Items */}
                {!isCollapsed && activeSection === section?.id && (
                  <div className="ml-6 space-y-1 animate-slide-in">
                    {section?.items?.map((item) => (
                      <Button
                        key={item?.path}
                        variant="ghost"
                        onClick={() => handleItemClick(item)}
                        className="w-full justify-start h-9 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <Icon name={item?.icon} size={16} className="mr-3" />
                        <span className="flex-1 text-left">{item?.label}</span>
                        {item?.badge && (
                          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                            {item?.badge}
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Collapsed Section Items */}
                {isCollapsed && (
                  <div className="space-y-1">
                    {section?.items?.map((item) => (
                      <div key={item?.path} className="relative group">
                        <Button
                          variant="ghost"
                          onClick={() => handleItemClick(item)}
                          className="w-full h-10 px-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                          <Icon name={item?.icon} size={18} />
                          {item?.badge && (
                            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                              {item?.badge}
                            </span>
                          )}
                        </Button>
                        
                        {/* Tooltip */}
                        <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-popover border border-border rounded-md shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
                          <span className="text-sm text-popover-foreground">{item?.label}</span>
                          {item?.badge && (
                            <span className="ml-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                              {item?.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">John Smith</p>
                <p className="text-xs text-muted-foreground truncate">Facility Manager</p>
              </div>
            )}
            {!isCollapsed && (
              <Button variant="ghost" size="sm" className="h-8 w-8">
                <Icon name="MoreVertical" size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;