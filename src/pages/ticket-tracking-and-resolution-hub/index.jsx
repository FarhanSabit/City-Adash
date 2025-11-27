import React, { useState, useEffect } from 'react';

import Sidebar, { SidebarProvider, useSidebar } from '../../components/Sidebar';
import MobileMenuButton from '../../components/MobileMenuButton';
import AlertCounter from '../../components/ui/AlertCounter';
import FacilitySelector from '../../components/ui/FacilitySelector';
import UserRoleIndicator from '../../components/ui/UserRoleIndicator';
import QuickActionButton from '../../components/ui/QuickActionButton';
import TicketCard from './components/TicketCard';
import TicketDetailPanel from './components/TicketDetailPanel';
import FilterToolbar from './components/FilterToolbar';
import TicketStats from './components/TicketStats';

const TicketTrackingAndResolutionHub = () => {
  const { isCollapsed } = useSidebar();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  const mockTickets = [
  {
    id: "TKT-2025-001",
    title: "HVAC System Not Cooling - Conference Room A",
    description: "The air conditioning unit in Conference Room A has stopped cooling. Room temperature has risen to 78°F. Multiple meetings scheduled today require immediate attention.",
    reporter: "Sarah Johnson",
    category: "HVAC",
    priority: "Critical",
    status: "Open",
    assignedTo: "Mike Rodriguez",
    createdDate: "11/20/2025 08:15 AM",
    slaHoursRemaining: 2,
    attachments: [
    {
      url: "https://images.unsplash.com/photo-1733397315165-dca1ba4927ae",
      alt: "Modern office conference room with large wooden table, black leather chairs, and wall-mounted air conditioning unit showing temperature display"
    },
    {
      url: "https://images.unsplash.com/photo-1725454782221-58be5645c232",
      alt: "Close-up view of white HVAC thermostat control panel mounted on beige wall showing temperature settings and control buttons"
    }],

    timeline: [
    {
      icon: "Plus",
      action: "Ticket created",
      user: "Sarah Johnson",
      timestamp: "11/20/2025 08:15 AM"
    },
    {
      icon: "UserCheck",
      action: "Assigned to Mike Rodriguez",
      user: "System",
      timestamp: "11/20/2025 08:17 AM"
    },
    {
      icon: "MessageSquare",
      action: "Technician acknowledged",
      user: "Mike Rodriguez",
      timestamp: "11/20/2025 08:25 AM"
    }],

    comments: [
    {
      user: "Mike Rodriguez",
      timestamp: "11/20/2025 08:25 AM",
      text: "On my way to Conference Room A. Will diagnose the issue and provide update within 30 minutes."
    }]

  },
  {
    id: "TKT-2025-002",
    title: "Flickering Lights in Hallway B - 3rd Floor",
    description: "Multiple fluorescent lights in the 3rd floor Hallway B are flickering intermittently. Creating discomfort for employees and potential safety hazard.",
    reporter: "David Chen",
    category: "Electrical",
    priority: "High",
    status: "In Progress",
    assignedTo: "Lisa Anderson",
    createdDate: "11/20/2025 07:45 AM",
    slaHoursRemaining: 6,
    attachments: [
    {
      url: "https://images.unsplash.com/photo-1698653223322-0d4776c51071",
      alt: "Modern office hallway with white walls, recessed ceiling lights, and polished floor showing fluorescent lighting fixtures"
    }],

    timeline: [
    {
      icon: "Plus",
      action: "Ticket created",
      user: "David Chen",
      timestamp: "11/20/2025 07:45 AM"
    },
    {
      icon: "UserCheck",
      action: "Assigned to Lisa Anderson",
      user: "System",
      timestamp: "11/20/2025 07:50 AM"
    },
    {
      icon: "Wrench",
      action: "Work started",
      user: "Lisa Anderson",
      timestamp: "11/20/2025 08:00 AM"
    }],

    comments: [
    {
      user: "Lisa Anderson",
      timestamp: "11/20/2025 08:00 AM",
      text: "Inspecting the ballasts and wiring. Will replace faulty components."
    }]

  },
  {
    id: "TKT-2025-003",
    title: "Water Leak Under Sink - Kitchen Area",
    description: "Small water leak detected under the main kitchen sink. Dripping slowly but needs immediate attention to prevent water damage.",
    reporter: "Emily Martinez",
    category: "Plumbing",
    priority: "High",
    status: "Open",
    assignedTo: null,
    createdDate: "11/20/2025 09:00 AM",
    slaHoursRemaining: 4,
    attachments: [
    {
      url: "https://images.unsplash.com/photo-1589173956745-70a6c22b1b09",
      alt: "Commercial kitchen stainless steel sink with chrome faucet and visible plumbing pipes underneath showing water connection points"
    }],

    timeline: [
    {
      icon: "Plus",
      action: "Ticket created",
      user: "Emily Martinez",
      timestamp: "11/20/2025 09:00 AM"
    }],

    comments: []
  },
  {
    id: "TKT-2025-004",
    title: "Door Lock Malfunction - Server Room",
    description: "Electronic door lock on server room is not responding to access cards. Security concern requires immediate attention.",
    reporter: "Robert Taylor",
    category: "Security",
    priority: "Critical",
    status: "In Progress",
    assignedTo: "James Wilson",
    createdDate: "11/20/2025 06:30 AM",
    slaHoursRemaining: 1,
    attachments: [
    {
      url: "https://images.unsplash.com/photo-1696186973402-639776a171d8",
      alt: "Modern electronic door lock system with keypad and card reader mounted on white door frame in office building"
    }],

    timeline: [
    {
      icon: "Plus",
      action: "Ticket created",
      user: "Robert Taylor",
      timestamp: "11/20/2025 06:30 AM"
    },
    {
      icon: "UserCheck",
      action: "Assigned to James Wilson",
      user: "System",
      timestamp: "11/20/2025 06:35 AM"
    },
    {
      icon: "Wrench",
      action: "Work started",
      user: "James Wilson",
      timestamp: "11/20/2025 07:00 AM"
    }],

    comments: [
    {
      user: "James Wilson",
      timestamp: "11/20/2025 07:00 AM",
      text: "Testing the card reader and checking power supply. May need to replace the control unit."
    }]

  },
  {
    id: "TKT-2025-005",
    title: "Restroom Cleaning Required - 2nd Floor",
    description: "Routine cleaning needed for 2nd floor restrooms. Paper towel dispensers need refilling and general sanitization required.",
    reporter: "Maria Garcia",
    category: "Cleaning",
    priority: "Medium",
    status: "Open",
    assignedTo: "Carlos Mendez",
    createdDate: "11/20/2025 08:30 AM",
    slaHoursRemaining: 12,
    attachments: [],
    timeline: [
    {
      icon: "Plus",
      action: "Ticket created",
      user: "Maria Garcia",
      timestamp: "11/20/2025 08:30 AM"
    },
    {
      icon: "UserCheck",
      action: "Assigned to Carlos Mendez",
      user: "System",
      timestamp: "11/20/2025 08:35 AM"
    }],

    comments: []
  },
  {
    id: "TKT-2025-006",
    title: "Network Connectivity Issues - East Wing",
    description: "Multiple workstations in East Wing experiencing intermittent network connectivity. Affecting productivity of 15+ employees.",
    reporter: "Kevin Brown",
    category: "IT",
    priority: "High",
    status: "In Progress",
    assignedTo: "Rachel Kim",
    createdDate: "11/20/2025 07:00 AM",
    slaHoursRemaining: 5,
    attachments: [
    {
      url: "https://images.unsplash.com/photo-1689830641394-9215be527e44",
      alt: "Modern office workspace with multiple computer workstations, monitors, and network cables showing IT infrastructure setup"
    }],

    timeline: [
    {
      icon: "Plus",
      action: "Ticket created",
      user: "Kevin Brown",
      timestamp: "11/20/2025 07:00 AM"
    },
    {
      icon: "UserCheck",
      action: "Assigned to Rachel Kim",
      user: "System",
      timestamp: "11/20/2025 07:05 AM"
    },
    {
      icon: "Wrench",
      action: "Work started",
      user: "Rachel Kim",
      timestamp: "11/20/2025 07:30 AM"
    }],

    comments: [
    {
      user: "Rachel Kim",
      timestamp: "11/20/2025 07:30 AM",
      text: "Checking network switches and testing connections. Will update shortly."
    }]

  },
  {
    id: "TKT-2025-007",
    title: "Elevator Making Unusual Noise - Building A",
    description: "Elevator #2 in Building A is making grinding noise during operation. Safety inspection recommended before continued use.",
    reporter: "Jennifer Lee",
    category: "HVAC",
    priority: "Critical",
    status: "Open",
    assignedTo: null,
    createdDate: "11/20/2025 09:15 AM",
    slaHoursRemaining: 3,
    attachments: [],
    timeline: [
    {
      icon: "Plus",
      action: "Ticket created",
      user: "Jennifer Lee",
      timestamp: "11/20/2025 09:15 AM"
    }],

    comments: []
  },
  {
    id: "TKT-2025-008",
    title: "Broken Window Blind - Office 305",
    description: "Window blind in Office 305 is stuck and won't lower. Causing glare on computer screens during afternoon hours.",
    reporter: "Thomas Anderson",
    category: "Electrical",
    priority: "Low",
    status: "Open",
    assignedTo: "Mike Rodriguez",
    createdDate: "11/19/2025 04:30 PM",
    slaHoursRemaining: 24,
    attachments: [
    {
      url: "https://images.unsplash.com/photo-1695874310821-95200754dbb3",
      alt: "Modern office interior with large windows, white venetian blinds, and natural sunlight streaming through creating shadow patterns"
    }],

    timeline: [
    {
      icon: "Plus",
      action: "Ticket created",
      user: "Thomas Anderson",
      timestamp: "11/19/2025 04:30 PM"
    },
    {
      icon: "UserCheck",
      action: "Assigned to Mike Rodriguez",
      user: "System",
      timestamp: "11/19/2025 04:35 PM"
    }],

    comments: []
  },
  {
    id: "TKT-2025-009",
    title: "Coffee Machine Not Working - Break Room",
    description: "Main coffee machine in break room is not powering on. Display shows error code E-03. Affecting employee morale.",
    reporter: "Amanda White",
    category: "Electrical",
    priority: "Medium",
    status: "Resolved",
    assignedTo: "Lisa Anderson",
    createdDate: "11/19/2025 08:00 AM",
    slaHoursRemaining: 0,
    attachments: [],
    timeline: [
    {
      icon: "Plus",
      action: "Ticket created",
      user: "Amanda White",
      timestamp: "11/19/2025 08:00 AM"
    },
    {
      icon: "UserCheck",
      action: "Assigned to Lisa Anderson",
      user: "System",
      timestamp: "11/19/2025 08:05 AM"
    },
    {
      icon: "Wrench",
      action: "Work started",
      user: "Lisa Anderson",
      timestamp: "11/19/2025 09:00 AM"
    },
    {
      icon: "CheckCircle",
      action: "Ticket resolved",
      user: "Lisa Anderson",
      timestamp: "11/19/2025 10:30 AM"
    }],

    comments: [
    {
      user: "Lisa Anderson",
      timestamp: "11/19/2025 10:30 AM",
      text: "Reset the machine and cleared the error code. Tested multiple brew cycles - working perfectly now."
    }]

  },
  {
    id: "TKT-2025-010",
    title: "Parking Lot Light Out - Section C",
    description: "Two parking lot lights in Section C are not functioning. Creating dark spots and potential security concern during evening hours.",
    reporter: "Michael Scott",
    category: "Electrical",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "James Wilson",
    createdDate: "11/19/2025 06:00 PM",
    slaHoursRemaining: 18,
    attachments: [
    {
      url: "https://images.unsplash.com/photo-1648635305580-ea64385c1555",
      alt: "Commercial parking lot at dusk with tall LED light poles illuminating parked cars and marked parking spaces"
    }],

    timeline: [
    {
      icon: "Plus",
      action: "Ticket created",
      user: "Michael Scott",
      timestamp: "11/19/2025 06:00 PM"
    },
    {
      icon: "UserCheck",
      action: "Assigned to James Wilson",
      user: "System",
      timestamp: "11/19/2025 06:05 PM"
    },
    {
      icon: "Wrench",
      action: "Work started",
      user: "James Wilson",
      timestamp: "11/20/2025 07:00 AM"
    }],

    comments: [
    {
      user: "James Wilson",
      timestamp: "11/20/2025 07:00 AM",
      text: "Ordered replacement bulbs. Will install this afternoon."
    }]

  }];


  const ticketStats = {
    total: 10,
    open: 5,
    inProgress: 4,
    resolvedToday: 1,
    overdue: 2
  };

  useEffect(() => {
    setTickets(mockTickets);
    setFilteredTickets(mockTickets);
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...tickets];

    if (filters?.priority !== 'all') {
      filtered = filtered?.filter(
        (ticket) => ticket?.priority?.toLowerCase() === filters?.priority?.toLowerCase()
      );
    }

    if (filters?.status !== 'all') {
      filtered = filtered?.filter(
        (ticket) => ticket?.status?.toLowerCase() === filters?.status?.toLowerCase()
      );
    }

    if (filters?.category !== 'all') {
      filtered = filtered?.filter(
        (ticket) => ticket?.category?.toLowerCase() === filters?.category?.toLowerCase()
      );
    }

    setFilteredTickets(filtered);
  };

  const handleSearch = (query) => {
    if (!query?.trim()) {
      setFilteredTickets(tickets);
      return;
    }

    const searchLower = query?.toLowerCase();
    let filtered = tickets?.filter(
      (ticket) =>
      ticket?.id?.toLowerCase()?.includes(searchLower) ||
      ticket?.title?.toLowerCase()?.includes(searchLower) ||
      ticket?.description?.toLowerCase()?.includes(searchLower) ||
      ticket?.reporter?.toLowerCase()?.includes(searchLower)
    );

    setFilteredTickets(filtered);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action);
  };

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    setShowDetailPanel(true);
  };

  return (
    <SidebarProvider>
      <div className="dark min-h-screen bg-background">
        <MobileMenuButton />
        <Sidebar />

        <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <header className="sticky top-0 z-30 bg-card border-b border-border mb-6 -mx-6 px-6 py-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  Ticket Tracking & Resolution Hub
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage and resolve Annexissues efficiently
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <AlertCounter />
                <FacilitySelector />
                <UserRoleIndicator />
              </div>
            </div>
          </header>

          <div className="space-y-6">
            <TicketStats stats={ticketStats} />

            <FilterToolbar
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              onBulkAction={handleBulkAction} />


            <div className="grid lg:grid-cols-[1fr_400px] gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Active Tickets ({filteredTickets?.length})
                  </h2>
                </div>

                <div className="space-y-3">
                  {filteredTickets?.map((ticket) => (
                    <TicketCard
                      key={ticket?.id}
                      ticket={ticket}
                      isSelected={selectedTicket?.id === ticket?.id}
                      onClick={() => handleTicketSelect(ticket)}
                    />
                  ))}
                </div>
              </div>

              <div className={`${showDetailPanel ? 'block' : 'hidden lg:block'} lg:sticky lg:top-24 h-[calc(100vh-120px)]`}>
                <div className="bg-card border border-border rounded-lg h-full overflow-hidden">
                  <TicketDetailPanel
                    ticket={selectedTicket}
                    onClose={() => setShowDetailPanel(false)} />

                </div>
              </div>
            </div>
          </div>
        </div>

        <QuickActionButton />
      </div>
    </SidebarProvider>
  );
};

export default TicketTrackingAndResolutionHub;