import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';

// Import components
import WorkOrderCard from './components/WorkOrderCard';
import TechnicianCard from './components/TechnicianCard';
import AssignmentModal from './components/AssignmentModal';
import FilterPanel from './components/FilterPanel';
import BulkAssignmentToolbar from './components/BulkAssignmentToolbar';
import TechnicianScheduleModal from './components/TechnicianScheduleModal';

const TechnicianAssignmentInterface = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedWorkOrders, setSelectedWorkOrders] = useState([]);
  const [assignmentModal, setAssignmentModal] = useState({ isOpen: false, workOrder: null, technician: null });
  const [scheduleModal, setScheduleModal] = useState({ isOpen: false, technician: null });
  const [filterPanel, setFilterPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('priority');
  const [filters, setFilters] = useState({
    priority: 'all',
    skills: [],
    location: 'all',
    technicianStatus: 'all',
    workloadMax: 100,
    partsAvailable: false,
    dateRange: { start: '', end: '' },
    searchQuery: ''
  });

  // Mock data for unassigned work orders
  const [unassignedWorkOrders] = useState([
    {
      id: 'WO-2025-001',
      title: 'HVAC System Malfunction',
      description: 'Air conditioning unit in Building A, Floor 3 is not cooling properly. Temperature readings show 78°F when set to 72°F.',
      location: 'Building A - Floor 3 - Room 301',
      priority: 'High',
      requiredSkills: ['HVAC', 'Electrical'],
      estimatedDuration: 120,
      partsAvailable: true,
      timeElapsed: '2h 15m',
      createdAt: '2025-01-07T08:30:00Z',
      reportedBy: 'Sarah Johnson'
    },
    {
      id: 'WO-2025-002',
      title: 'Plumbing Leak Emergency',
      description: 'Water leak detected in the main conference room ceiling. Immediate attention required to prevent damage to equipment.',
      location: 'Building B - Floor 2 - Conference Room',
      priority: 'Critical',
      requiredSkills: ['Plumbing'],
      estimatedDuration: 90,
      partsAvailable: false,
      timeElapsed: '45m',
      createdAt: '2025-01-07T10:15:00Z',
      reportedBy: 'Mike Chen'
    },
    {
      id: 'WO-2025-003',
      title: 'Electrical Outlet Repair',
      description: 'Multiple electrical outlets in the break room are not functioning. Staff unable to use kitchen appliances.',
      location: 'Building A - Floor 1 - Break Room',
      priority: 'Medium',
      requiredSkills: ['Electrical'],
      estimatedDuration: 60,
      partsAvailable: true,
      timeElapsed: '1h 30m',
      createdAt: '2025-01-07T09:00:00Z',
      reportedBy: 'Lisa Wang'
    },
    {
      id: 'WO-2025-004',
      title: 'Security Camera Maintenance',
      description: 'Routine maintenance and cleaning of security cameras in parking area. Scheduled preventive maintenance.',
      location: 'Parking Area - North Side',
      priority: 'Low',
      requiredSkills: ['Security', 'Electrical'],
      estimatedDuration: 45,
      partsAvailable: true,
      timeElapsed: '30m',
      createdAt: '2025-01-07T11:00:00Z',
      reportedBy: 'System Automated'
    },
    {
      id: 'WO-2025-005',
      title: 'Door Lock Malfunction',
      description: 'Electronic door lock on main entrance is intermittently failing. Security concern requires immediate attention.',
      location: 'Building A - Main Entrance',
      priority: 'High',
      requiredSkills: ['Security', 'Electrical'],
      estimatedDuration: 75,
      partsAvailable: true,
      timeElapsed: '1h 45m',
      createdAt: '2025-01-07T08:45:00Z',
      reportedBy: 'Security Team'
    },
    {
      id: 'WO-2025-006',
      title: 'Lighting Fixture Replacement',
      description: 'Several LED light fixtures in the hallway are flickering and need replacement. Affecting visibility and safety.',
      location: 'Building B - Floor 1 - Main Hallway',
      priority: 'Medium',
      requiredSkills: ['Electrical'],
      estimatedDuration: 90,
      partsAvailable: false,
      timeElapsed: '3h 20m',
      createdAt: '2025-01-07T07:30:00Z',
      reportedBy: 'Facilities Team'
    }
  ]);

  // Mock data for technicians
  const [technicians] = useState([
    {
      id: 'TECH-001',
      name: 'John Martinez',
      role: 'Senior HVAC Technician',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'Available',
      skills: ['HVAC', 'Electrical', 'Mechanical'],
      currentLocation: 'Building A - Floor 2',
      phone: '(555) 123-4567',
      workloadPercentage: 45,
      activeTasks: 2,
      currentTask: {
        title: 'Generator Inspection',
        location: 'Building A - Basement'
      },
      completionRate: 94,
      avgResponseTime: '12m',
      certifications: ['EPA 608', 'NATE Certified'],
      shiftStart: '08:00',
      shiftEnd: '17:00'
    },
    {
      id: 'TECH-002',
      name: 'Sarah Thompson',
      role: 'Electrical Specialist',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'Busy',
      skills: ['Electrical', 'Security', 'Lighting'],
      currentLocation: 'Building B - Floor 3',
      phone: '(555) 234-5678',
      workloadPercentage: 78,
      activeTasks: 3,
      currentTask: {
        title: 'Electrical Panel Upgrade',
        location: 'Building B - Floor 3'
      },
      completionRate: 97,
      avgResponseTime: '8m',
      certifications: ['Master Electrician', 'OSHA 30'],
      shiftStart: '07:00',
      shiftEnd: '16:00'
    },
    {
      id: 'TECH-003',
      name: 'Mike Rodriguez',
      role: 'Plumbing Technician',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'Available',
      skills: ['Plumbing', 'Mechanical'],
      currentLocation: 'Building A - Floor 1',
      phone: '(555) 345-6789',
      workloadPercentage: 32,
      activeTasks: 1,
      currentTask: {
        title: 'Pipe Maintenance',
        location: 'Building A - Basement'
      },
      completionRate: 89,
      avgResponseTime: '15m',
      certifications: ['Licensed Plumber', 'Backflow Prevention'],
      shiftStart: '08:00',
      shiftEnd: '17:00'
    },
    {
      id: 'TECH-004',
      name: 'Emily Chen',
      role: 'Multi-Skilled Technician',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'Available',
      skills: ['HVAC', 'Electrical', 'Plumbing', 'Carpentry'],
      currentLocation: 'Building C - Floor 1',
      phone: '(555) 456-7890',
      workloadPercentage: 55,
      activeTasks: 2,
      currentTask: null,
      completionRate: 92,
      avgResponseTime: '10m',
      certifications: ['Multi-Trade Certified', 'Safety Certified'],
      shiftStart: '09:00',
      shiftEnd: '18:00'
    },
    {
      id: 'TECH-005',
      name: 'David Wilson',
      role: 'Security Systems Specialist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      status: 'Off-Duty',
      skills: ['Security', 'Electrical', 'Network'],
      currentLocation: 'Off-Site',
      phone: '(555) 567-8901',
      workloadPercentage: 0,
      activeTasks: 0,
      currentTask: null,
      completionRate: 96,
      avgResponseTime: '7m',
      certifications: ['Security+', 'Network+'],
      shiftStart: '22:00',
      shiftEnd: '06:00'
    },
    {
      id: 'TECH-006',
      name: 'Lisa Anderson',
      role: 'Maintenance Coordinator',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      status: 'Available',
      skills: ['Mechanical', 'Carpentry', 'Painting'],
      currentLocation: 'Building B - Floor 1',
      phone: '(555) 678-9012',
      workloadPercentage: 25,
      activeTasks: 1,
      currentTask: {
        title: 'Preventive Maintenance',
        location: 'Building B - Mechanical Room'
      },
      completionRate: 88,
      avgResponseTime: '18m',
      certifications: ['Facilities Management', 'HVAC Basics'],
      shiftStart: '08:30',
      shiftEnd: '17:30'
    }
  ]);

  const [savedTemplates] = useState([
    {
      name: 'Critical Only',
      filters: {
        priority: 'critical',
        skills: [],
        location: 'all',
        technicianStatus: 'available',
        workloadMax: 80,
        partsAvailable: false,
        dateRange: { start: '', end: '' },
        searchQuery: ''
      }
    },
    {
      name: 'HVAC Specialists',
      filters: {
        priority: 'all',
        skills: ['HVAC'],
        location: 'all',
        technicianStatus: 'available',
        workloadMax: 70,
        partsAvailable: false,
        dateRange: { start: '', end: '' },
        searchQuery: ''
      }
    }
  ]);

  const sortOptions = [
    { value: 'priority', label: 'Priority' },
    { value: 'time', label: 'Time Created' },
    { value: 'location', label: 'Location' },
    { value: 'duration', label: 'Duration' }
  ];

  // Filter and sort work orders
  const filteredWorkOrders = unassignedWorkOrders?.filter(wo => {
    if (filters?.priority !== 'all' && wo?.priority?.toLowerCase() !== filters?.priority) return false;
    if (filters?.location !== 'all' && !wo?.location?.toLowerCase()?.includes(filters?.location)) return false;
    if (filters?.skills?.length > 0 && !filters?.skills?.some(skill => wo?.requiredSkills?.includes(skill))) return false;
    if (filters?.partsAvailable && !wo?.partsAvailable) return false;
    if (searchQuery && !wo?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) && 
        !wo?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())) return false;
    return true;
  })?.sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
      case 'time':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'duration':
        return b?.estimatedDuration - a?.estimatedDuration;
      default:
        return 0;
    }
  });

  // Filter technicians
  const filteredTechnicians = technicians?.filter(tech => {
    if (filters?.technicianStatus !== 'all' && tech?.status?.toLowerCase() !== filters?.technicianStatus) return false;
    if (tech?.workloadPercentage > filters?.workloadMax) return false;
    return true;
  });

  const handleWorkOrderSelect = (workOrder) => {
    setSelectedWorkOrders(prev => {
      const isSelected = prev?.some(wo => wo?.id === workOrder?.id);
      if (isSelected) {
        return prev?.filter(wo => wo?.id !== workOrder?.id);
      } else {
        return [...prev, workOrder];
      }
    });
  };

  const handleAssignWork = (technician, workOrder = null) => {
    if (workOrder) {
      setAssignmentModal({ isOpen: true, workOrder, technician });
    } else {
      // Handle assignment without specific work order
      console.log('Assign work to technician:', technician?.name);
    }
  };

  const handleConfirmAssignment = (assignment) => {
    console.log('Assignment confirmed:', assignment);
    // In real app, this would make API call to assign work order
    
    // Remove assigned work order from unassigned list
    // setUnassignedWorkOrders(prev => prev.filter(wo => wo.id !== assignment.workOrderId));
    
    // Show success notification
    alert(`Work order ${assignment?.workOrderId} assigned to technician successfully!`);
  };

  const handleBulkAssign = (workOrders, technician, mode) => {
    console.log('Bulk assign:', { workOrders, technician, mode });
    alert(`${workOrders?.length} work orders assigned using ${mode} mode!`);
    setSelectedWorkOrders([]);
  };

  const handleAutoAssign = (workOrders, mode) => {
    console.log('Auto assign:', { workOrders, mode });
    alert(`${workOrders?.length} work orders auto-assigned using ${mode} mode!`);
    setSelectedWorkOrders([]);
  };

  const handleViewSchedule = (technician) => {
    setScheduleModal({ isOpen: true, technician });
  };

  const handleSaveTemplate = (template) => {
    console.log('Save template:', template);
    alert(`Filter template "${template?.name}" saved successfully!`);
  };

  // Auto-assignment suggestions
  const getAutoAssignmentSuggestions = () => {
    return filteredWorkOrders?.slice(0, 3)?.map(wo => {
      const availableTechs = filteredTechnicians?.filter(t => t?.status === 'Available');
      const bestMatch = availableTechs?.reduce((best, tech) => {
        const skillMatch = wo?.requiredSkills?.filter(skill => tech?.skills?.includes(skill))?.length;
        const workloadScore = (100 - tech?.workloadPercentage) / 100;
        const score = (skillMatch / wo?.requiredSkills?.length) * 0.7 + workloadScore * 0.3;
        
        return score > (best?.score || 0) ? { ...tech, score } : best;
      }, null);

      return { workOrder: wo, suggestedTechnician: bestMatch };
    });
  };

  const suggestions = getAutoAssignmentSuggestions();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Technician Assignment Interface</h1>
              <p className="text-muted-foreground mt-1">
                Optimize workforce allocation through intelligent skill matching and workload balancing
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setFilterPanel(true)}>
                <Icon name="Filter" size={16} className="mr-2" />
                Advanced Filters
              </Button>
              <Button>
                <Icon name="Zap" size={16} className="mr-2" />
                Auto-Assign All
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Unassigned Orders</p>
                  <p className="text-2xl font-bold text-foreground">{filteredWorkOrders?.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Technicians</p>
                  <p className="text-2xl font-bold text-foreground">
                    {technicians?.filter(t => t?.status === 'Available')?.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-error" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Critical Priority</p>
                  <p className="text-2xl font-bold text-foreground">
                    {filteredWorkOrders?.filter(wo => wo?.priority === 'Critical')?.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold text-foreground">11m</p>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-Assignment Suggestions */}
          {suggestions?.length > 0 && (
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Lightbulb" size={20} className="text-accent" />
                <h3 className="font-semibold text-foreground">Smart Assignment Suggestions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {suggestions?.map((suggestion, index) => (
                  <div key={index} className="bg-card border border-border rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        #{suggestion?.workOrder?.id}
                      </span>
                      <span className="text-xs text-accent font-medium">
                        {Math.round(suggestion?.suggestedTechnician?.score * 100)}% match
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {suggestion?.workOrder?.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground">
                        → {suggestion?.suggestedTechnician?.name}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAssignWork(suggestion?.suggestedTechnician, suggestion?.workOrder)}
                        className="text-xs h-6"
                      >
                        Assign
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search and Sort Controls */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search work orders, locations, descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full"
              />
            </div>
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by..."
              className="w-48"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Unassigned Work Orders - Left Panel (40%) */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      Unassigned Work Orders ({filteredWorkOrders?.length})
                    </h2>
                    <Button variant="outline" size="sm">
                      <Icon name="RefreshCw" size={14} className="mr-1" />
                      Refresh
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredWorkOrders?.map((workOrder) => (
                    <div key={workOrder?.id} className="relative">
                      <div className="absolute top-2 left-2 z-10">
                        <input
                          type="checkbox"
                          checked={selectedWorkOrders?.some(wo => wo?.id === workOrder?.id)}
                          onChange={() => handleWorkOrderSelect(workOrder)}
                          className="rounded border-border"
                        />
                      </div>
                      <WorkOrderCard
                        workOrder={workOrder}
                        onAssign={(wo) => handleAssignWork(null, wo)}
                      />
                    </div>
                  ))}
                  
                  {filteredWorkOrders?.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">All Caught Up!</h3>
                      <p className="text-muted-foreground">No unassigned work orders match your current filters.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Technician Grid - Right Panel (60%) */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      Technician Availability ({filteredTechnicians?.length})
                    </h2>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-success rounded-full"></div>
                          <span className="text-muted-foreground">Available</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-warning rounded-full"></div>
                          <span className="text-muted-foreground">Busy</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-muted rounded-full"></div>
                          <span className="text-muted-foreground">Off-Duty</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {filteredTechnicians?.map((technician) => (
                      <TechnicianCard
                        key={technician?.id}
                        technician={technician}
                        onAssignWork={handleAssignWork}
                        onViewSchedule={handleViewSchedule}
                      />
                    ))}
                  </div>
                  
                  {filteredTechnicians?.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Technicians Found</h3>
                      <p className="text-muted-foreground">No technicians match your current filter criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modals and Overlays */}
      <AssignmentModal
        isOpen={assignmentModal?.isOpen}
        onClose={() => setAssignmentModal({ isOpen: false, workOrder: null, technician: null })}
        workOrder={assignmentModal?.workOrder}
        technician={assignmentModal?.technician}
        onConfirmAssignment={handleConfirmAssignment}
      />
      <TechnicianScheduleModal
        isOpen={scheduleModal?.isOpen}
        onClose={() => setScheduleModal({ isOpen: false, technician: null })}
        technician={scheduleModal?.technician}
      />
      <FilterPanel
        isOpen={filterPanel}
        onClose={() => setFilterPanel(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onSaveTemplate={handleSaveTemplate}
        savedTemplates={savedTemplates}
      />
      <BulkAssignmentToolbar
        selectedWorkOrders={selectedWorkOrders}
        technicians={filteredTechnicians}
        onBulkAssign={handleBulkAssign}
        onClearSelection={() => setSelectedWorkOrders([])}
        onAutoAssign={handleAutoAssign}
      />
      <QuickActionButton />
    </div>
  );
};

export default TechnicianAssignmentInterface;