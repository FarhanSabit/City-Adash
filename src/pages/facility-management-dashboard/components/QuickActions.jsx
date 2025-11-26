import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActionItems = [
    {
      id: 'create-work-order',
      title: 'Create Work Order',
      description: 'Submit new maintenance request',
      icon: 'Plus',
      color: 'bg-primary text-primary-foreground',
      route: '/work-order-kanban-board',
      shortcut: 'Ctrl+N'
    },
    {
      id: 'view-floor-plan',
      title: 'View Floor Plans',
      description: 'Interactive facility overview',
      icon: 'Map',
      color: 'bg-success text-success-foreground',
      route: '/interactive-facility-floor-plan',
      shortcut: 'Ctrl+M'
    },
    {
      id: 'assign-technician',
      title: 'Assign Technician',
      description: 'Manage team assignments',
      icon: 'Users',
      color: 'bg-warning text-warning-foreground',
      route: '/technician-assignment-interface',
      shortcut: 'Ctrl+T'
    },
    {
      id: 'equipment-status',
      title: 'Equipment Status',
      description: 'Monitor asset health',
      icon: 'Settings',
      color: 'bg-accent text-accent-foreground',
      route: '/equipment-asset-management',
      shortcut: 'Ctrl+E'
    },
    {
      id: 'inventory-check',
      title: 'Parts Inventory',
      description: 'Check stock levels',
      icon: 'Package',
      color: 'bg-secondary text-secondary-foreground',
      route: '/parts-inventory-management',
      shortcut: 'Ctrl+I'
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Analytics and insights',
      icon: 'FileText',
      color: 'bg-muted text-muted-foreground',
      route: '/maintenance-reporting-analytics',
      shortcut: 'Ctrl+R'
    }
  ];

  const handleActionClick = (action) => {
    console.log('Quick action clicked:', action);
    // Handle navigation or action execution
    if (action?.route) {
      window.location.href = action?.route;
    }
  };

  return (
    <div className="modern-card rounded-lg p-4 lg:p-6 shadow-modern hover-lift-modern animate-fade-up">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-responsive-lg font-semibold text-foreground">Quick Actions</h3>
        <Button variant="ghost" size="sm" className="hover-glow-yellow">
          <Icon name="Settings" size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {quickActionItems?.map((action) => (
          <div
            key={action?.id}
            onClick={() => handleActionClick(action)}
            className="group relative p-4 lg:p-5 rounded-lg border border-border hover:border-accent/50 hover:shadow-modern-lg transition-all duration-300 cursor-pointer bg-card hover:bg-muted/30 hover-lift-modern"
          >
            <div className="flex items-start space-x-3 lg:space-x-4">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center ${action?.color} group-hover:scale-110 transition-transform duration-300 shadow-modern`}>
                <Icon name={action?.icon} size={20} className="lg:w-6 lg:h-6" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-responsive-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300 mb-1">
                  {action?.title}
                </h4>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed mb-2">
                  {action?.description}
                </p>
                
                {action?.shortcut && (
                  <div className="mt-2 lg:mt-3">
                    <span className="text-xs bg-muted/80 text-muted-foreground px-2 py-1 rounded border transition-colors duration-300 group-hover:border-accent/30">
                      {action?.shortcut}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
              <Icon name="ArrowUpRight" size={14} className="text-muted-foreground group-hover:text-accent" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 lg:mt-6 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <span className="text-responsive-sm text-muted-foreground">
            Keyboard shortcuts enabled
          </span>
          <Button variant="ghost" size="sm" className="text-xs hover:bg-accent/10 hover:text-accent transition-all duration-300 self-start sm:self-auto">
            <Icon name="Keyboard" size={14} className="mr-1" />
            View All Shortcuts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;