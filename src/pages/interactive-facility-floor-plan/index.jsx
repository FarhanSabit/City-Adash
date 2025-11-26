import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import FloorPlanViewer from './components/FloorPlanViewer';

const InteractiveFacilityFloorPlan = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [viewMode, setViewMode] = useState('rooms'); // 'rooms' or 'equipment'

  // Simplified room data focused on visual representation
  const rooms = [
  {
    id: 'R101',
    name: 'Server Room',
    x: 80,
    y: 80,
    width: 180,
    height: 120,
    type: 'technical',
    occupancy: 'High',
    temperature: '18°C',
    status: 'active'
  },
  {
    id: 'R102',
    name: 'Main Office',
    x: 280,
    y: 80,
    width: 220,
    height: 140,
    type: 'office',
    occupancy: 'Medium',
    temperature: '22°C',
    status: 'active'
  },
  {
    id: 'R103',
    name: 'Conference Room',
    x: 520,
    y: 80,
    width: 180,
    height: 120,
    type: 'meeting',
    occupancy: 'Low',
    temperature: '21°C',
    status: 'active'
  },
  {
    id: 'R104',
    name: 'IT Support',
    x: 720,
    y: 80,
    width: 160,
    height: 120,
    type: 'technical',
    occupancy: 'Low',
    temperature: '20°C',
    status: 'active'
  },
  {
    id: 'R105',
    name: 'Storage',
    x: 80,
    y: 220,
    width: 180,
    height: 120,
    type: 'storage',
    occupancy: 'None',
    temperature: '19°C',
    status: 'inactive'
  },
  {
    id: 'R106',
    name: 'Cafeteria',
    x: 280,
    y: 240,
    width: 220,
    height: 140,
    type: 'common',
    occupancy: 'High',
    temperature: '23°C',
    status: 'active'
  },
  {
    id: 'R107',
    name: 'Reception',
    x: 80,
    y: 360,
    width: 180,
    height: 100,
    type: 'office',
    occupancy: 'Medium',
    temperature: '22°C',
    status: 'active'
  },
  {
    id: 'R108',
    name: 'Mechanical Room',
    x: 520,
    y: 220,
    width: 180,
    height: 240,
    type: 'technical',
    occupancy: 'Low',
    temperature: '16°C',
    status: 'active'
  }];


  // Simplified equipment data for basic visualization
  const equipment = [
  {
    id: 'HVAC-001',
    name: 'Main HVAC Unit',
    room: 'R101',
    x: 140,
    y: 110,
    status: 'operational',
    type: 'hvac'
  },
  {
    id: 'HVAC-002',
    name: 'Office HVAC Unit',
    room: 'R102',
    x: 340,
    y: 130,
    status: 'warning',
    type: 'hvac'
  },
  {
    id: 'GEN-001',
    name: 'Emergency Generator',
    room: 'R108',
    x: 540,
    y: 280,
    status: 'operational',
    type: 'power'
  },
  {
    id: 'SEC-001',
    name: 'Security Panel',
    room: 'R107',
    x: 140,
    y: 340,
    status: 'operational',
    type: 'security'
  }];


  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleCloseDetails = () => {
    setSelectedRoom(null);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.key === 'Escape') {
        handleCloseDetails();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-modern">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
        <Header />
      </div>
      
      <main className="pt-16 min-h-screen">
        {/* Page Title */}
        <div className="p-6 border-b border-border bg-card/50">
          <h1 className="text-3xl font-bold text-foreground">Interactive Facility Floor Plan</h1>
          <h2 className="text-foreground text-base font-medium" style={{ fontSize: '16px' }}>Real-time Equipment Monitoring and Space Management</h2>
        </div>

        {/* Simplified Layout - Full Width Floor Plan */}
        <div className="h-screen flex flex-col">
          {/* Floor Plan Viewer */}
          <div className="flex-1 p-6">
            <FloorPlanViewer
              rooms={rooms}
              equipment={equipment}
              selectedRoom={selectedRoom}
              onRoomSelect={handleRoomSelect}
              viewMode={viewMode}
              onViewModeChange={setViewMode} />

          </div>
        </div>

        {/* Simple Room Details Modal */}
        {selectedRoom &&
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-card rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">{selectedRoom?.name}</h2>
                <button
                onClick={handleCloseDetails}
                className="text-muted-foreground hover:text-foreground transition-colors">

                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Room ID</label>
                    <p className="text-lg font-semibold text-primary">{selectedRoom?.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <p className="text-sm text-foreground capitalize">{selectedRoom?.type}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Occupancy</label>
                    <p className="text-sm text-foreground">{selectedRoom?.occupancy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Temperature</label>
                    <p className="text-sm text-foreground">{selectedRoom?.temperature}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                selectedRoom?.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`
                }>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                  selectedRoom?.status === 'active' ? 'bg-success' : 'bg-muted-foreground'}`
                  }></div>
                    {selectedRoom?.status === 'active' ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </main>
    </div>);

};

export default InteractiveFacilityFloorPlan;