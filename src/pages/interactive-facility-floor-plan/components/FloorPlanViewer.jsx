import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloorPlanViewer = ({
  rooms,
  equipment,
  selectedRoom,
  onRoomSelect,
  viewMode,
  onViewModeChange
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showOccupancy, setShowOccupancy] = useState(false);
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  const minZoom = 0.5;
  const maxZoom = 3;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, maxZoom));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, minZoom));
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (e?.target === svgRef?.current || e?.target?.closest('.room')) {
      setIsDragging(true);
      setDragStart({
        x: e?.clientX - pan?.x,
        y: e?.clientY - pan?.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e?.clientX - dragStart?.x,
        y: e?.clientY - dragStart?.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e?.preventDefault();
    const delta = e?.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.max(minZoom, Math.min(maxZoom, prev + delta)));
  };

  useEffect(() => {
    const container = containerRef?.current;
    if (container) {
      container?.addEventListener('wheel', handleWheel, { passive: false });
      return () => container?.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const getRoomColor = (type, status) => {
    if (status === 'inactive') return '#F3F4F6';

    switch (type) {
      case 'technical':return '#DBEAFE'; // blue-100
      case 'office':return '#ECFDF5'; // green-50
      case 'meeting':return '#FEF3C7'; // amber-100
      case 'storage':return '#F3E8FF'; // purple-100
      case 'common':return '#FCE7F3'; // pink-100
      default:return '#F8FAFC'; // slate-50
    }
  };

  const getOccupancyColor = (occupancy) => {
    switch (occupancy?.toLowerCase()) {
      case 'high':return '#FEE2E2'; // red-100
      case 'medium':return '#FEF3C7'; // amber-100
      case 'low':return '#ECFDF5'; // green-50
      case 'none':return '#F3F4F6'; // gray-100
      default:return '#F8FAFC';
    }
  };

  const getEquipmentIcon = (type) => {
    switch (type) {
      case 'hvac':return 'Wind';
      case 'power':return 'Zap';
      case 'security':return 'Shield';
      default:return 'Settings';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':return '#22c55e';
      case 'warning':return '#f59e0b';
      case 'critical':return '#ef4444';
      case 'offline':return '#64748B';
      default:return '#64748B';
    }
  };

  const handleRoomClick = (room) => {
    onRoomSelect(room);
  };

  return (
    <div className="flex-1 relative overflow-hidden rounded-xl bg-white shadow-modern-lg">
      {/* Modern Control Panel */}
      <div className="absolute top-6 right-6 z-10 flex flex-col space-y-6">
        {/* View Mode Toggle */}
        <div className="glass-card p-4 rounded-lg">
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold text-foreground">View Mode</h3>
            <div className="flex flex-col space-y-2">
              <Button
                variant={viewMode === 'rooms' ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange('rooms')}
                className="justify-start text-sm">

                <Icon name="Home" size={16} className="mr-2" />
                Rooms
              </Button>
              <Button
                variant={viewMode === 'equipment' ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange('equipment')}
                className="justify-start text-sm">

                <Icon name="Settings" size={16} className="mr-2" />
                Equipment
              </Button>
            </div>
          </div>
        </div>
        
        {/* Zoom Controls */}
        <div className="glass-card p-4 rounded-lg hidden">
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Zoom</h3>
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                className="h-8 w-full justify-center">

                <Icon name="Plus" size={16} />
              </Button>
              <div className="text-xs text-center text-muted-foreground py-1 font-medium">
                {Math.round(zoom * 100)}%
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                className="h-8 w-full justify-center">

                <Icon name="Minus" size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetView}
                className="h-8 w-full justify-center text-xs"
                title="Reset View">

                Reset
              </Button>
            </div>
          </div>
        </div>
        
        {/* Occupancy Toggle - Enhanced spacing and styling */}
        <div className="glass-card p-4 rounded-lg">
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <Icon name="Users" size={16} className="mr-2 text-primary" />
              Occupancy
            </h3>
            <div className="space-y-2">
              <Button
                variant={showOccupancy ? "default" : "outline"}
                size="sm"
                onClick={() => setShowOccupancy(!showOccupancy)}
                className="w-full justify-start text-sm">

                <span className="mr-2">
                  {showOccupancy ? 'Hide' : 'Show'}
                </span>
                Occupancy
              </Button>
              {showOccupancy &&
              <div className="text-xs text-muted-foreground px-2 py-1 bg-primary/5 rounded">
                  Equipment & Operational view active
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      {/* Floor Plan Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center p-8"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>

        <div className="floor-plan-content overflow-hidden">
          <svg
            ref={svgRef}
            width="960"
            height="480"
            viewBox="0 0 960 480"
            className="block"
            style={{
              transform: `translate(${pan?.x}px, ${pan?.y}px) scale(${zoom})`,
              transformOrigin: 'center center'
            }}>

            {/* Clean Background Grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F3F4F6" strokeWidth="1" opacity="0.5" />
              </pattern>
            </defs>
            
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Rooms */}
            {rooms?.map((room) =>
            <g key={room?.id} className="room cursor-pointer">
                <rect
                x={room?.x}
                y={room?.y}
                width={room?.width}
                height={room?.height}
                fill={showOccupancy ? getOccupancyColor(room?.occupancy) : getRoomColor(room?.type, room?.status)}
                stroke={selectedRoom?.id === room?.id ? '#374151' : '#D1D5DB'}
                strokeWidth={selectedRoom?.id === room?.id ? '3' : '2'}
                rx="12"
                className="transition-all duration-300 hover:stroke-primary hover:stroke-3"
                onClick={() => handleRoomClick(room)} />

                
                {/* Room Labels */}
                <text
                x={room?.x + room?.width / 2}
                y={room?.y + 35}
                textAnchor="middle"
                className="text-lg font-bold fill-current text-foreground pointer-events-none"
                style={{ fontSize: '20px', fontWeight: '700' }}>

                  {room?.id}
                </text>
                <text
                x={room?.x + room?.width / 2}
                y={room?.y + 55}
                textAnchor="middle"
                className="text-sm fill-current text-muted-foreground pointer-events-none"
                style={{ fontSize: '14px', fontWeight: '500' }}>

                  {room?.name}
                </text>
                
                {/* Room Info */}
                {showOccupancy &&
              <text
                x={room?.x + room?.width / 2}
                y={room?.y + 75}
                textAnchor="middle"
                className="text-xs fill-current text-muted-foreground pointer-events-none"
                style={{ fontSize: '12px', fontWeight: '500' }}>

                    {room?.occupancy} Occupancy
                  </text>
              }
                
                {/* Temperature Display */}
                <text
                x={room?.x + room?.width - 15}
                y={room?.y + 20}
                textAnchor="middle"
                className="text-xs fill-current text-muted-foreground pointer-events-none"
                style={{ fontSize: '11px' }}>

                  {room?.temperature}
                </text>
                
                {/* Status Indicator */}
                <circle
                cx={room?.x + 15}
                cy={room?.y + 15}
                r="6"
                fill={room?.status === 'active' ? '#22c55e' : '#6B7280'}
                className="pointer-events-none" />

              </g>
            )}

            {/* Equipment Icons - Only show in equipment mode */}
            {viewMode === 'equipment' && equipment?.map((item) =>
            <g
              key={item?.id}
              className="equipment-item"
              style={{ transform: `translate(${item?.x}px, ${item?.y}px)` }}>

                <circle
                cx="0"
                cy="0"
                r="20"
                fill="#FFFFFF"
                stroke={getStatusColor(item?.status)}
                strokeWidth="3"
                className="drop-shadow-sm" />

                
                {/* Equipment Icon */}
                <text
                x="0"
                y="0"
                textAnchor="middle"
                className="text-xs font-bold fill-current pointer-events-none"
                style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  fill: getStatusColor(item?.status)
                }}>

                  {item?.id?.split('-')?.[1]}
                </text>
                
                {/* Equipment Name */}
                <text
                x="0"
                y="35"
                textAnchor="middle"
                className="text-xs fill-current text-foreground pointer-events-none"
                style={{ fontSize: '11px', fontWeight: '500' }}>

                  {item?.name}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
      {/* Modern Legend */}
      <div className="absolute bottom-6 left-6 glass-card p-6 rounded-lg">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-primary" />
          {showOccupancy ? 'Occupancy Levels' : 'Room Types'}
        </h3>
        <div className="space-y-3">
          {showOccupancy ?
          <>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded bg-red-100 border border-red-200"></div>
                <span className="text-sm text-foreground">High Occupancy</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded bg-amber-100 border border-amber-200"></div>
                <span className="text-sm text-foreground">Medium Occupancy</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded bg-green-50 border border-green-200"></div>
                <span className="text-sm text-foreground">Low Occupancy</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200"></div>
                <span className="text-sm text-foreground">No Occupancy</span>
              </div>
            </> :

          <>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded bg-blue-100 border border-blue-200"></div>
                <span className="text-sm text-foreground">Technical</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded bg-green-50 border border-green-200"></div>
                <span className="text-sm text-foreground">Office</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded bg-amber-100 border border-amber-200"></div>
                <span className="text-sm text-foreground">Meeting</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded bg-purple-100 border border-purple-200"></div>
                <span className="text-sm text-foreground">Storage</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded bg-pink-100 border border-pink-200"></div>
                <span className="text-sm text-foreground">Common Area</span>
              </div>
            </>
          }
        </div>
      </div>
      {/* Quick Info Panel */}
      <div className="absolute bottom-6 right-6 glass-card p-4 rounded-lg max-w-xs">
        <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">{rooms?.length}</div>
            <div className="text-xs text-muted-foreground">Total Rooms</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">
              {rooms?.filter((r) => r?.status === 'active')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">{equipment?.length}</div>
            <div className="text-xs text-muted-foreground">Equipment</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">
              {equipment?.filter((e) => e?.status === 'operational')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Operational</div>
          </div>
        </div>
      </div>
    </div>);

};

export default FloorPlanViewer;