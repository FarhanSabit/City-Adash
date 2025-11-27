import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import EquipmentPopup from './EquipmentPopup';

const FacilityMapCanvas = ({ selectedFloor, activeLayers, onEquipmentClick }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const mockEquipmentData = [
    {
      id: 1,
      name: 'HVAC Unit A-101',
      icon: 'Wind',
      status: 'operational',
      location: 'Ground Floor - Zone A',
      assetId: 'HVAC-A101',
      lastMaintenance: '11/15/2025',
      nextMaintenance: '12/15/2025',
      position: { x: 25, y: 30 },
      alerts: []
    },
    {
      id: 2,
      name: 'Electrical Panel EP-205',
      icon: 'Zap',
      status: 'warning',
      location: 'Ground Floor - Zone B',
      assetId: 'EP-205',
      lastMaintenance: '10/20/2025',
      nextMaintenance: '11/25/2025',
      position: { x: 60, y: 45 },
      alerts: ['Voltage fluctuation detected']
    },
    {
      id: 3,
      name: 'Fire Alarm Panel FA-012',
      icon: 'Flame',
      status: 'critical',
      location: 'Ground Floor - Main Lobby',
      assetId: 'FA-012',
      lastMaintenance: '09/10/2025',
      nextMaintenance: '11/22/2025',
      position: { x: 40, y: 70 },
      alerts: ['Battery backup low', 'Sensor malfunction in Zone C']
    },
    {
      id: 4,
      name: 'Water Pump WP-089',
      icon: 'Droplet',
      status: 'operational',
      location: 'Ground Floor - Utility Room',
      assetId: 'WP-089',
      lastMaintenance: '11/10/2025',
      nextMaintenance: '01/10/2026',
      position: { x: 75, y: 25 },
      alerts: []
    }
  ];

  const handleEquipmentClick = (equipment, event) => {
    const rect = event?.currentTarget?.getBoundingClientRect();
    setPopupPosition({
      x: rect?.left + rect?.width / 2,
      y: rect?.top
    });
    setSelectedEquipment(equipment);
    onEquipmentClick(equipment);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'var(--color-success)';
      case 'warning': return 'var(--color-warning)';
      case 'critical': return 'var(--color-error)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="relative w-full h-full bg-muted/20 rounded-lg overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      {/* Floor Plan Outline */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Main Building Outline */}
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="0.5"
        />
        
        {/* Interior Walls */}
        <line x1="10" y1="50" x2="90" y2="50" stroke="var(--color-border)" strokeWidth="0.3" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="var(--color-border)" strokeWidth="0.3" />
        
        {/* Zone Labels */}
        <text x="30" y="30" fontSize="3" fill="var(--color-muted-foreground)" textAnchor="middle">Zone A</text>
        <text x="70" y="30" fontSize="3" fill="var(--color-muted-foreground)" textAnchor="middle">Zone B</text>
        <text x="30" y="70" fontSize="3" fill="var(--color-muted-foreground)" textAnchor="middle">Zone C</text>
        <text x="70" y="70" fontSize="3" fill="var(--color-muted-foreground)" textAnchor="middle">Zone D</text>
      </svg>
      {/* Equipment Markers */}
      {activeLayers?.includes('equipment') && mockEquipmentData?.map((equipment) => (
        <button
          key={equipment?.id}
          onClick={(e) => handleEquipmentClick(equipment, e)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-150"
          style={{
            left: `${equipment?.position?.x}%`,
            top: `${equipment?.position?.y}%`
          }}
        >
          <div className="relative">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg"
              style={{ backgroundColor: getStatusColor(equipment?.status) }}
            >
              <Icon name={equipment?.icon} size={20} color="white" />
            </div>
            {equipment?.alerts?.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-error rounded-full">
                {equipment?.alerts?.length}
              </span>
            )}
          </div>
        </button>
      ))}
      {/* Work Order Markers */}
      {activeLayers?.includes('workOrders') && (
        <>
          <button
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '35%', top: '55%' }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent shadow-lg">
              <Icon name="Wrench" size={18} color="white" />
            </div>
          </button>
          <button
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '65%', top: '60%' }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent shadow-lg">
              <Icon name="Wrench" size={18} color="white" />
            </div>
          </button>
        </>
      )}
      {/* Sensor Markers */}
      {activeLayers?.includes('sensors') && (
        <>
          {[
            { x: 20, y: 20 }, { x: 45, y: 20 }, { x: 80, y: 20 },
            { x: 20, y: 80 }, { x: 45, y: 80 }, { x: 80, y: 80 }
          ]?.map((pos, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos?.x}%`, top: `${pos?.y}%` }}
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 border-2 border-primary">
                <Icon name="Radio" size={12} color="var(--color-primary)" />
              </div>
            </div>
          ))}
        </>
      )}
      {/* Equipment Popup */}
      {selectedEquipment && (
        <div
          className="fixed"
          style={{
            left: `${popupPosition?.x}px`,
            top: `${popupPosition?.y - 20}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <EquipmentPopup
            equipment={selectedEquipment}
            onClose={() => setSelectedEquipment(null)}
            onCreateWorkOrder={(eq) => {
              console.log('Create work order for:', eq);
              setSelectedEquipment(null);
            }}
          />
        </div>
      )}
      {/* Floor Info */}
      <div className="absolute top-4 left-4 px-4 py-2 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-lg">
        <div className="text-xs text-muted-foreground">Current Floor</div>
        <div className="text-sm font-semibold text-foreground">{selectedFloor?.name || 'Ground Floor'}</div>
      </div>
      {/* Compass */}
      <div className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 bg-card/90 backdrop-blur-sm border border-border rounded-full shadow-lg">
        <Icon name="Compass" size={20} color="var(--color-primary)" />
      </div>
    </div>
  );
};

export default FacilityMapCanvas;