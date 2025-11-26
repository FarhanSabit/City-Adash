import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import KanbanColumn from './components/KanbanColumn';

import BulkActionToolbar from './components/BulkActionToolbar';
import WorkOrderDetailsModal from './components/WorkOrderDetailsModal';

const WorkOrderKanbanBoard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [userRole] = useState('supervisor'); // Mock user role
  const [filters, setFilters] = useState({
    search: '',
    priority: [],
    technician: [],
    location: [],
    issueType: [],
    dateRange: { start: '', end: '' },
    partsRequired: false,
    overdue: false
  });

  // Mock work orders data
  const [workOrders, setWorkOrders] = useState([
    {
      id: 'WO-2025-001',
      title: 'HVAC System Maintenance - Building A',
      description: 'Routine maintenance check for HVAC Unit #3. System showing temperature fluctuations and unusual noise levels.',
      status: 'New',
      priority: 'High',
      location: 'Building A',
      room: '301',
      createdAt: '2025-01-07T08:30:00Z',
      assignedTechnician: {
        name: 'John Smith',
        email: 'john.smith@facility.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      partsRequired: true,
      partsAvailable: false,
      estimatedCost: 450.00,
      hasAttachments: true
    },
    {
      id: 'WO-2025-002',
      title: 'Electrical Panel Inspection',
      description: 'Monthly safety inspection of main electrical panel in basement. Check for loose connections and proper grounding.',
      status: 'In Progress',
      priority: 'Medium',
      location: 'Building B',
      room: 'B01',
      createdAt: '2025-01-06T14:15:00Z',
      assignedTechnician: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@facility.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      partsRequired: false,
      partsAvailable: true,
      estimatedCost: 125.00,
      hasAttachments: false
    },
    {
      id: 'WO-2025-003',
      title: 'Plumbing Leak Repair - Restroom',
      description: 'Water leak detected under sink in women\'s restroom. Requires immediate attention to prevent water damage.',
      status: 'Awaiting Parts',
      priority: 'Critical',
      location: 'Building A',
      room: '205',
      createdAt: '2025-01-05T11:45:00Z',
      assignedTechnician: {
        name: 'Mike Wilson',
        email: 'mike.wilson@facility.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      partsRequired: true,
      partsAvailable: false,
      estimatedCost: 275.50,
      hasAttachments: true
    },
    {
      id: 'WO-2025-004',
      title: 'Security Camera Maintenance',
      description: 'Quarterly maintenance of security camera system. Clean lenses and check recording functionality.',
      status: 'Awaiting Approval',
      priority: 'Low',
      location: 'Building C',
      room: 'Lobby',
      createdAt: '2025-01-04T09:20:00Z',
      assignedTechnician: {
        name: 'Lisa Brown',
        email: 'lisa.brown@facility.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      partsRequired: false,
      partsAvailable: true,
      estimatedCost: 85.00,
      hasAttachments: false
    },
    {
      id: 'WO-2025-005',
      title: 'Elevator Annual Inspection',
      description: 'Annual safety inspection and certification of passenger elevator. Required by state regulations.',
      status: 'Completed',
      priority: 'High',
      location: 'Building A',
      room: 'Elevator 1',
      createdAt: '2025-01-03T13:00:00Z',
      assignedTechnician: {
        name: 'John Smith',
        email: 'john.smith@facility.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      partsRequired: true,
      partsAvailable: true,
      estimatedCost: 1250.00,
      hasAttachments: true
    },
    {
      id: 'WO-2025-006',
      title: 'Lighting Fixture Replacement',
      description: 'Replace burned out LED fixtures in conference room. Multiple units need replacement.',
      status: 'New',
      priority: 'Medium',
      location: 'Building B',
      room: '402',
      createdAt: '2025-01-07T10:15:00Z',
      assignedTechnician: null,
      partsRequired: true,
      partsAvailable: true,
      estimatedCost: 320.00,
      hasAttachments: false
    }
  ]);

  const columns = [
    { title: 'New Requests', status: 'New' },
    { title: 'In Progress', status: 'In Progress' },
    { title: 'Awaiting Parts/Approval', status: 'Awaiting Parts' },
    { title: 'Completed & Verified', status: 'Completed' }
  ];

  // Filter work orders based on current filters
  const filteredWorkOrders = workOrders?.filter(wo => {
    if (filters?.search && !wo?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
        !wo?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !wo?.id?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.priority?.length > 0 && !filters?.priority?.includes(wo?.priority?.toLowerCase())) {
      return false;
    }
    if (filters?.technician?.length > 0) {
      const technicianMatch = wo?.assignedTechnician ? 
        filters?.technician?.includes(wo?.assignedTechnician?.name?.toLowerCase()?.replace(' ', '-')) :
        filters?.technician?.includes('unassigned');
      if (!technicianMatch) return false;
    }
    if (filters?.location?.length > 0 && !filters?.location?.includes(wo?.location?.toLowerCase()?.replace(' ', '-'))) {
      return false;
    }
    if (filters?.partsRequired && !wo?.partsRequired) {
      return false;
    }
    return true;
  });

  const getWorkOrdersByStatus = (status) => {
    return filteredWorkOrders?.filter(wo => {
      if (status === 'Awaiting Parts') {
        return wo?.status === 'Awaiting Parts' || wo?.status === 'Awaiting Approval';
      }
      return wo?.status === status;
    });
  };

  const handleCardSelect = (cardId) => {
    setSelectedCards(prev => 
      prev?.includes(cardId) 
        ? prev?.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleClearSelection = () => {
    setSelectedCards([]);
  };

  const handleOpenDetails = (workOrder) => {
    setSelectedWorkOrder(workOrder);
    setDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsModalOpen(false);
    setSelectedWorkOrder(null);
  };

  const handleSaveWorkOrder = (updatedWorkOrder) => {
    setWorkOrders(prev => 
      prev?.map(wo => wo?.id === updatedWorkOrder?.id ? updatedWorkOrder : wo)
    );
  };

  const handleDragStart = (e, workOrder) => {
    e?.dataTransfer?.setData('text/plain', JSON.stringify(workOrder));
  };

  const handleDrop = (e, newStatus) => {
    e?.preventDefault();
    const workOrderData = JSON.parse(e?.dataTransfer?.getData('text/plain'));
    
    setWorkOrders(prev => 
      prev?.map(wo => 
        wo?.id === workOrderData?.id 
          ? { ...wo, status: newStatus }
          : wo
      )
    );
  };

  const handleBulkAction = (action, value) => {
    console.log('Bulk action:', action, 'Value:', value, 'Selected:', selectedCards);
    
    switch (action) {
      case 'assign':
        setWorkOrders(prev => 
          prev?.map(wo => 
            selectedCards?.includes(wo?.id)
              ? { ...wo, assignedTechnician: { name: value, email: `${value}@facility.com` } }
              : wo
          )
        );
        break;
      case 'status':
        setWorkOrders(prev => 
          prev?.map(wo => 
            selectedCards?.includes(wo?.id)
              ? { ...wo, status: value }
              : wo
          )
        );
        break;
      case 'priority':
        setWorkOrders(prev => 
          prev?.map(wo => 
            selectedCards?.includes(wo?.id)
              ? { ...wo, priority: value }
              : wo
          )
        );
        break;
      default:
        break;
    }
    
    setSelectedCards([]);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    setFilters(prev => ({ ...prev, search: searchQuery }));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.key === 'Escape') {
        setSelectedCards([]);
        setFilterSidebarOpen(false);
        setDetailsModalOpen(false);
      }
      if (e?.key === 'f' && (e?.ctrlKey || e?.metaKey)) {
        e?.preventDefault();
        setFilterSidebarOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="bg-card border-b border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Work Order Kanban Board</h1>
                <p className="text-muted-foreground">
                  Manage and track facility maintenance workflows
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setFilterSidebarOpen(true)}
                >
                  <Icon name="Filter" size={16} className="mr-2" />
                  Filters
                  {(filters?.priority?.length > 0 || filters?.technician?.length > 0 || filters?.search) && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </Button>
                
                <Button variant="default">
                  <Icon name="Plus" size={16} className="mr-2" />
                  New Work Order
                </Button>
              </div>
            </div>

            {/* Search and Quick Filters */}
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="flex-1 max-w-md">
                <Input
                  type="search"
                  placeholder="Search work orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </form>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={filters?.priority?.includes('critical') ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const newPriority = filters?.priority?.includes('critical')
                      ? filters?.priority?.filter(p => p !== 'critical')
                      : [...filters?.priority, 'critical'];
                    setFilters(prev => ({ ...prev, priority: newPriority }));
                  }}
                >
                  Critical
                </Button>
                
                <Button
                  variant={filters?.partsRequired ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, partsRequired: !prev?.partsRequired }))}
                >
                  Parts Required
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location?.reload()}
                >
                  <Icon name="RefreshCw" size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-280px)]">
              {columns?.map((column) => (
                <KanbanColumn
                  key={column?.status}
                  title={column?.title}
                  status={column?.status}
                  workOrders={getWorkOrdersByStatus(column?.status)}
                  onDrop={handleDrop}
                  onDragOver={(e) => e?.preventDefault()}
                  selectedCards={selectedCards}
                  onSelectCard={handleCardSelect}
                  onOpenDetails={handleOpenDetails}
                  userRole={userRole}
                />
              ))}
            </div>
          </div>

          {/* Statistics Bar */}
          <div className="bg-card border-t border-border p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-6">
                <span>Total: {filteredWorkOrders?.length} work orders</span>
                <span>New: {getWorkOrdersByStatus('New')?.length}</span>
                <span>In Progress: {getWorkOrdersByStatus('In Progress')?.length}</span>
                <span>Awaiting: {getWorkOrdersByStatus('Awaiting Parts')?.length}</span>
                <span>Completed: {getWorkOrdersByStatus('Completed')?.length}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Live updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bulk Action Toolbar */}
      <BulkActionToolbar
        selectedCount={selectedCards?.length}
        onClearSelection={handleClearSelection}
        onBulkAction={handleBulkAction}
        userRole={userRole}
      />
      {/* Work Order Details Modal */}
      <WorkOrderDetailsModal
        workOrder={selectedWorkOrder}
        isOpen={detailsModalOpen}
        onClose={handleCloseDetails}
        onSave={handleSaveWorkOrder}
        userRole={userRole}
      />
      {/* Quick Action Button */}
      <QuickActionButton />
    </div>
  );
};

export default WorkOrderKanbanBoard;