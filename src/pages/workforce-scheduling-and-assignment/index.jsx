import React, { useState } from 'react';
import Sidebar, { SidebarProvider } from '../../components/Sidebar';
import MobileMenuButton from '../../components/MobileMenuButton';
import AlertCounter from '../../components/ui/AlertCounter';
import FacilitySelector from '../../components/ui/FacilitySelector';
import UserRoleIndicator from '../../components/ui/UserRoleIndicator';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import StaffCard from './components/StaffCard';
import ScheduleGrid from './components/ScheduleGrid';
import TaskQueue from './components/TaskQueue';
import StaffDetailsModal from './components/StaffDetailsModal';
import AssignmentModal from './components/AssignmentModal';

const WorkforceSchedulingAndAssignment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showStaffDetails, setShowStaffDetails] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const staffMembers = [
  {
    id: 'EMP-001',
    name: 'Michael Rodriguez',
    role: 'Senior HVAC Technician',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18b4141a4-1763296078437.png",
    avatarAlt: 'Professional headshot of Hispanic man with short black hair wearing navy blue work uniform',
    status: 'available',
    skills: ['HVAC', 'Electrical', 'Plumbing', 'Refrigeration'],
    activeAssignments: 2,
    hoursThisWeek: 32,
    employeeId: 'EMP-001',
    email: 'michael.rodriguez@mmis_dash.com',
    phone: '+1 (555) 123-4567',
    department: 'Mechanical Systems',
    shift: 'Day Shift (8:00 AM - 4:00 PM)',
    certifications: [
    { name: 'EPA Universal Certification', expiry: '12/2025' },
    { name: 'OSHA 30-Hour Safety', expiry: '06/2026' }],

    completedTasks: 156,
    recentActivity: [
    { description: 'Completed HVAC maintenance in Building A', timestamp: '2 hours ago' },
    { description: 'Started emergency repair in Zone 3', timestamp: '5 hours ago' }]

  },
  {
    id: 'EMP-002',
    name: 'Sarah Chen',
    role: 'Electrical Systems Specialist',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d186e7c9-1763299921952.png",
    avatarAlt: 'Professional headshot of Asian woman with long black hair wearing white collared shirt',
    status: 'busy',
    skills: ['Electrical', 'Automation', 'Fire Safety', 'Security Systems'],
    activeAssignments: 4,
    hoursThisWeek: 38,
    employeeId: 'EMP-002',
    email: 'sarah.chen@mmis_dash.com',
    phone: '+1 (555) 234-5678',
    department: 'Electrical Systems',
    shift: 'Day Shift (8:00 AM - 4:00 PM)',
    certifications: [
    { name: 'Master Electrician License', expiry: '03/2026' },
    { name: 'Fire Alarm Systems Certification', expiry: '09/2025' }],

    completedTasks: 203,
    recentActivity: [
    { description: 'Installed new lighting system in Conference Room B', timestamp: '1 hour ago' },
    { description: 'Inspected electrical panel in Building C', timestamp: '4 hours ago' }]

  },
  {
    id: 'EMP-003',
    name: 'James Wilson',
    role: 'Plumbing Technician',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc78c630-1763296946525.png",
    avatarAlt: 'Professional headshot of Caucasian man with gray hair wearing blue work shirt',
    status: 'available',
    skills: ['Plumbing', 'Water Systems', 'Drainage', 'Backflow Prevention'],
    activeAssignments: 1,
    hoursThisWeek: 28,
    employeeId: 'EMP-003',
    email: 'james.wilson@mmis_dash.com',
    phone: '+1 (555) 345-6789',
    department: 'Plumbing & Water Systems',
    shift: 'Day Shift (8:00 AM - 4:00 PM)',
    certifications: [
    { name: 'Master Plumber License', expiry: '08/2026' },
    { name: 'Backflow Prevention Certification', expiry: '11/2025' }],

    completedTasks: 178,
    recentActivity: [
    { description: 'Fixed water leak in Restroom 2B', timestamp: '3 hours ago' },
    { description: 'Performed routine inspection of water heaters', timestamp: '6 hours ago' }]

  },
  {
    id: 'EMP-004',
    name: 'Emily Thompson',
    role: 'Building Automation Specialist',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1de93534e-1763301290608.png",
    avatarAlt: 'Professional headshot of Caucasian woman with blonde hair wearing gray blazer',
    status: 'available',
    skills: ['BMS', 'SCADA', 'IoT', 'Energy Management'],
    activeAssignments: 3,
    hoursThisWeek: 35,
    employeeId: 'EMP-004',
    email: 'emily.thompson@mmis_dash.com',
    phone: '+1 (555) 456-7890',
    department: 'Building Automation',
    shift: 'Day Shift (8:00 AM - 4:00 PM)',
    certifications: [
    { name: 'BMS Certified Professional', expiry: '04/2026' },
    { name: 'IoT Systems Integration', expiry: '07/2025' }],

    completedTasks: 142,
    recentActivity: [
    { description: 'Optimized HVAC automation schedule', timestamp: '2 hours ago' },
    { description: 'Updated BMS software in Building D', timestamp: '5 hours ago' }]

  },
  {
    id: 'EMP-005',
    name: 'David Martinez',
    role: 'General Maintenance Technician',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14928abeb-1763294351318.png",
    avatarAlt: 'Professional headshot of Hispanic man with mustache wearing green work uniform',
    status: 'offline',
    skills: ['General Maintenance', 'Carpentry', 'Painting', 'Minor Repairs'],
    activeAssignments: 0,
    hoursThisWeek: 40,
    employeeId: 'EMP-005',
    email: 'david.martinez@mmis_dash.com',
    phone: '+1 (555) 567-8901',
    department: 'General Maintenance',
    shift: 'Night Shift (4:00 PM - 12:00 AM)',
    certifications: [
    { name: 'OSHA 10-Hour Safety', expiry: '10/2025' },
    { name: 'Forklift Operator Certification', expiry: '02/2026' }],

    completedTasks: 234,
    recentActivity: [
    { description: 'Completed painting in Office Suite 5', timestamp: '8 hours ago' },
    { description: 'Repaired door lock in Conference Room A', timestamp: '10 hours ago' }]

  },
  {
    id: 'EMP-006',
    name: 'Lisa Anderson',
    role: 'Facilities Coordinator',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17cdc4ce1-1763297858042.png",
    avatarAlt: 'Professional headshot of African American woman with curly hair wearing white blouse',
    status: 'available',
    skills: ['Coordination', 'Scheduling', 'Vendor Management', 'Documentation'],
    activeAssignments: 5,
    hoursThisWeek: 36,
    employeeId: 'EMP-006',
    email: 'lisa.anderson@mmis_dash.com',
    phone: '+1 (555) 678-9012',
    department: 'Facilities Management',
    shift: 'Day Shift (8:00 AM - 4:00 PM)',
    certifications: [
    { name: 'Certified AnnexManager (CFM)', expiry: '05/2026' },
    { name: 'Project Management Professional', expiry: '12/2025' }],

    completedTasks: 189,
    recentActivity: [
    { description: 'Coordinated vendor inspection schedule', timestamp: '1 hour ago' },
    { description: 'Updated maintenance documentation', timestamp: '4 hours ago' }]

  }];


  const taskQueue = [
  {
    id: 'TASK-001',
    title: 'HVAC System Inspection - Building A',
    location: 'Building A - Rooftop',
    priority: 'critical',
    status: 'unassigned',
    requiredSkills: ['HVAC', 'Electrical'],
    estimatedHours: 4,
    dueDate: '11/21/2025'
  },
  {
    id: 'TASK-002',
    title: 'Emergency Lighting Repair',
    location: 'Building C - Floor 3',
    priority: 'high',
    status: 'unassigned',
    requiredSkills: ['Electrical', 'Fire Safety'],
    estimatedHours: 2,
    dueDate: '11/20/2025'
  },
  {
    id: 'TASK-003',
    title: 'Water Heater Maintenance',
    location: 'Building B - Basement',
    priority: 'medium',
    status: 'assigned',
    requiredSkills: ['Plumbing', 'Water Systems'],
    estimatedHours: 3,
    dueDate: '11/22/2025'
  },
  {
    id: 'TASK-004',
    title: 'BMS Software Update',
    location: 'Building D - Control Room',
    priority: 'medium',
    status: 'unassigned',
    requiredSkills: ['BMS', 'Automation'],
    estimatedHours: 5,
    dueDate: '11/23/2025'
  },
  {
    id: 'TASK-005',
    title: 'Door Lock Replacement',
    location: 'Building A - Floor 2',
    priority: 'low',
    status: 'in-progress',
    requiredSkills: ['General Maintenance', 'Security Systems'],
    estimatedHours: 1,
    dueDate: '11/24/2025'
  },
  {
    id: 'TASK-006',
    title: 'Fire Alarm System Test',
    location: 'All Buildings',
    priority: 'high',
    status: 'unassigned',
    requiredSkills: ['Fire Safety', 'Electrical'],
    estimatedHours: 6,
    dueDate: '11/21/2025'
  }];


  const scheduleData = {
    'Monday-08:00': [
    { assignee: 'Michael R.', title: 'HVAC Inspection', priority: 'critical' }],

    'Monday-10:00': [
    { assignee: 'Sarah C.', title: 'Electrical Panel Check', priority: 'high' }],

    'Tuesday-08:00': [
    { assignee: 'James W.', title: 'Plumbing Maintenance', priority: 'medium' }],

    'Tuesday-14:00': [
    { assignee: 'Emily T.', title: 'BMS Configuration', priority: 'medium' }],

    'Wednesday-10:00': [
    { assignee: 'Michael R.', title: 'Refrigeration Service', priority: 'high' },
    { assignee: 'Sarah C.', title: 'Lighting Upgrade', priority: 'low' }],

    'Thursday-08:00': [
    { assignee: 'James W.', title: 'Water System Inspection', priority: 'medium' }],

    'Friday-14:00': [
    { assignee: 'Emily T.', title: 'Energy Audit', priority: 'low' }]

  };

  const handleStaffAssign = (staff) => {
    setSelectedStaff(staff);
    setShowAssignmentModal(true);
  };

  const handleStaffDetails = (staff) => {
    setSelectedStaff(staff);
    setShowStaffDetails(true);
  };

  const handleTaskAssign = (task) => {
    setSelectedTask(task);
    setShowAssignmentModal(true);
  };

  const handleTaskDetails = (task) => {
    setSelectedTask(task);
    console.log('View task details:', task);
  };

  const handleTaskClick = (task) => {
    console.log('Schedule task clicked:', task);
  };

  const handleCellClick = (day, time) => {
    console.log('Schedule cell clicked:', day, time);
  };

  const handleConfirmAssignment = (assignmentData) => {
    console.log('Assignment confirmed:', assignmentData);
    setShowAssignmentModal(false);
    setSelectedTask(null);
    setSelectedStaff(null);
  };

  const filteredStaff = staffMembers?.filter((staff) => {
    const matchesSearch = staff?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    staff?.role?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || staff?.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || staff?.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <SidebarProvider>
      <div className="dark min-h-screen bg-background">
        <Sidebar />
        <MobileMenuButton />

        <div className="main-content">
          <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border mb-6 -mx-6 -mt-6 px-6 py-4 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                  Workforce Scheduling
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage staff assignments and optimize workforce allocation
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
                      viewMode === 'grid' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="LayoutGrid" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
                      viewMode === 'list' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>
                <FacilitySelector />
                <AlertCounter />
                <UserRoleIndicator />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                  <Icon name="Users" size={24} color="var(--color-primary)" />
                </div>
                <div className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                  +3
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">24</div>
              <div className="text-sm text-muted-foreground">Total Staff</div>
            </div>

            <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-success/10">
                  <Icon name="CheckCircle" size={24} color="var(--color-success)" />
                </div>
                <div className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                  75%
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">18</div>
              <div className="text-sm text-muted-foreground">Active Now</div>
            </div>

            <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-warning/10">
                  <Icon name="Clock" size={24} color="var(--color-warning)" />
                </div>
                <div className="px-2 py-1 rounded-full bg-warning/10 text-warning text-xs font-semibold">
                  94%
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">856</div>
              <div className="text-sm text-muted-foreground">Hours This Week</div>
            </div>

            <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10">
                  <Icon name="TrendingUp" size={24} color="var(--color-accent)" />
                </div>
                <div className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                  +12%
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">94%</div>
              <div className="text-sm text-muted-foreground">Utilization Rate</div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-3 space-y-4">
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-foreground">Staff Directory</h2>
                  <Button variant="ghost" size="icon" iconName="Filter" />
                </div>

                <Input
                  type="search"
                  placeholder="Search staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="mb-4" />

                <div className="space-y-3 mb-4">
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e?.target?.value)}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                    <option value="all">All Departments</option>
                    <option value="Mechanical Systems">Mechanical Systems</option>
                    <option value="Electrical Systems">Electrical Systems</option>
                    <option value="Plumbing & Water Systems">Plumbing & Water Systems</option>
                    <option value="Building Automation">Building Automation</option>
                    <option value="General Maintenance">General Maintenance</option>
                    <option value="Facilities Management">Facilities Management</option>
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e?.target?.value)}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground py-3 px-2 bg-muted/30 rounded-lg">
                  <span className="font-medium">Total: {filteredStaff?.length}</span>
                  <span className="font-medium">
                    Available: {filteredStaff?.filter((s) => s?.status === 'available')?.length}
                  </span>
                </div>
              </div>

              <div className="space-y-3 max-h-[calc(100vh-550px)] overflow-y-auto scrollbar-thin pr-1">
                {filteredStaff?.map((staff) =>
                <StaffCard
                  key={staff?.id}
                  staff={staff}
                  onAssign={handleStaffAssign}
                  onViewDetails={handleStaffDetails} />
                )}
              </div>
            </div>

            <div className="xl:col-span-6">
              <ScheduleGrid
                scheduleData={scheduleData}
                onTaskClick={handleTaskClick}
                onCellClick={handleCellClick} />
            </div>

            <div className="xl:col-span-3">
              <TaskQueue
                tasks={taskQueue}
                onAssignTask={handleTaskAssign}
                onTaskDetails={handleTaskDetails} />
            </div>
          </div>
        </div>

        <QuickActionButton />

        {showStaffDetails &&
        <StaffDetailsModal
          staff={selectedStaff}
          onClose={() => {
            setShowStaffDetails(false);
            setSelectedStaff(null);
          }} />
        }

        {showAssignmentModal &&
        <AssignmentModal
          task={selectedTask || taskQueue?.[0]}
          staff={staffMembers}
          onClose={() => {
            setShowAssignmentModal(false);
            setSelectedTask(null);
            setSelectedStaff(null);
          }}
          onConfirm={handleConfirmAssignment} />
        }
      </div>
    </SidebarProvider>
  );
};

export default WorkforceSchedulingAndAssignment;