import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceUtilization = () => {
  const technicianData = [
    {
      id: 1,
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      status: 'available',
      currentTasks: 2,
      maxTasks: 5,
      specialties: ['HVAC', 'Electrical'],
      location: 'Building A'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      status: 'busy',
      currentTasks: 4,
      maxTasks: 4,
      specialties: ['Plumbing', 'General'],
      location: 'Building B'
    },
    {
      id: 3,
      name: 'David Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      status: 'on-break',
      currentTasks: 1,
      maxTasks: 5,
      specialties: ['Security', 'Electronics'],
      location: 'Building C'
    },
    {
      id: 4,
      name: 'Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      status: 'available',
      currentTasks: 1,
      maxTasks: 4,
      specialties: ['HVAC', 'Mechanical'],
      location: 'Building A'
    }
  ];

  const inventoryData = [
    {
      id: 1,
      name: 'HVAC Filters',
      currentStock: 5,
      minStock: 10,
      maxStock: 50,
      status: 'low',
      lastOrdered: '2025-01-02',
      supplier: 'FilterCorp'
    },
    {
      id: 2,
      name: 'LED Bulbs',
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      status: 'good',
      lastOrdered: '2024-12-15',
      supplier: 'LightTech'
    },
    {
      id: 3,
      name: 'Electrical Cables',
      currentStock: 2,
      minStock: 5,
      maxStock: 25,
      status: 'critical',
      lastOrdered: '2024-12-20',
      supplier: 'ElectroSupply'
    },
    {
      id: 4,
      name: 'Plumbing Fittings',
      currentStock: 18,
      minStock: 15,
      maxStock: 40,
      status: 'good',
      lastOrdered: '2024-12-28',
      supplier: 'PlumbPro'
    }
  ];

  const budgetData = {
    totalBudget: 125000,
    spent: 87500,
    remaining: 37500,
    monthlyBurn: 12500,
    projectedOverrun: 0,
    categories: [
      { name: 'Labor', budget: 50000, spent: 35000, percentage: 70 },
      { name: 'Parts', budget: 40000, spent: 28000, percentage: 70 },
      { name: 'Equipment', budget: 25000, spent: 18000, percentage: 72 },
      { name: 'Emergency', budget: 10000, spent: 6500, percentage: 65 }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'busy': return 'bg-warning text-warning-foreground';
      case 'on-break': return 'bg-accent text-accent-foreground';
      case 'offline': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getInventoryStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'low': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getInventoryIcon = (status) => {
    switch (status) {
      case 'good': return 'CheckCircle';
      case 'low': return 'AlertTriangle';
      case 'critical': return 'AlertCircle';
      default: return 'Package';
    }
  };

  const calculateUtilization = (current, max) => {
    return Math.round((current / max) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Technician Availability */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Technician Availability</h3>
          <Button variant="ghost" size="sm">
            <Icon name="Users" size={16} className="mr-2" />
            Manage Team
          </Button>
        </div>

        <div className="space-y-4">
          {technicianData?.map((tech) => (
            <div key={tech?.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="relative">
                <img
                  src={tech?.avatar}
                  alt={tech?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(tech?.status)}`}></div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">{tech?.name}</h4>
                  <span className="text-xs text-muted-foreground">{tech?.location}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Workload</span>
                      <span className="text-xs text-muted-foreground">
                        {tech?.currentTasks}/{tech?.maxTasks}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${calculateUtilization(tech?.currentTasks, tech?.maxTasks)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {tech?.specialties?.map((specialty) => (
                      <span
                        key={specialty}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Parts Inventory */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Parts Inventory</h3>
          <Button variant="ghost" size="sm">
            <Icon name="Package" size={16} className="mr-2" />
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {inventoryData?.map((item) => (
            <div key={item?.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={getInventoryStatusColor(item?.status)}>
                  <Icon name={getInventoryIcon(item?.status)} size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{item?.name}</h4>
                  <p className="text-xs text-muted-foreground">Supplier: {item?.supplier}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getInventoryStatusColor(item?.status)}`}>
                    {item?.currentStock}
                  </span>
                  <span className="text-xs text-muted-foreground">/ {item?.maxStock}</span>
                </div>
                <div className="w-16 bg-muted rounded-full h-1 mt-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      item?.status === 'critical' ? 'bg-error' :
                      item?.status === 'low' ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${(item?.currentStock / item?.maxStock) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Budget Tracking */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Budget Tracking</h3>
          <Button variant="ghost" size="sm">
            <Icon name="DollarSign" size={16} className="mr-2" />
            View Reports
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                ${budgetData?.totalBudget?.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Budget</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">
                ${budgetData?.spent?.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">
                ${budgetData?.remaining?.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>

          <div className="space-y-3">
            {budgetData?.categories?.map((category) => (
              <div key={category?.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{category?.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ${category?.spent?.toLocaleString()} / ${category?.budget?.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      category?.percentage > 90 ? 'bg-error' :
                      category?.percentage > 75 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${category?.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceUtilization;