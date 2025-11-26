import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import EquipmentTable from './components/EquipmentTable';
import EquipmentDetailPanel from './components/EquipmentDetailPanel';
import EquipmentFilters from './components/EquipmentFilters';
import MaintenanceScheduler from './components/MaintenanceScheduler';
import EquipmentStats from './components/EquipmentStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EquipmentAssetManagement = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    location: '',
    warrantyStatus: '',
    maintenanceStatus: '',
    dateRange: ''
  });
  const [sortConfig, setSortConfig] = useState({
    field: 'name',
    direction: 'asc'
  });

  // Mock equipment data
  const mockEquipment = [
    {
      id: 1,
      assetId: 'HVAC-001',
      name: 'Central Air Handler Unit 1',
      model: 'Carrier 50TCQ012',
      type: 'hvac',
      location: 'Building A - Mechanical Room',
      installDate: '2020-03-15',
      warrantyEnd: '2025-03-15',
      nextMaintenance: '2025-02-15',
      status: 'operational',
      manufacturer: 'Carrier Corporation',
      serialNumber: 'CAR2020-HVAC-001',
      icon: 'Wind',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop',
      specifications: {
        powerRating: '50 kW',
        voltage: '480V',
        coolingCapacity: '15 Tons',
        refrigerant: 'R-410A',
        dimensions: '48" x 36" x 72"',
        weight: '850 lbs',
        operatingRange: '-10°F to 120°F',
        energyRating: 'SEER 16'
      }
    },
    {
      id: 2,
      assetId: 'GEN-001',
      name: 'Emergency Generator 1',
      model: 'Caterpillar C32',
      type: 'generator',
      location: 'Building A - Generator Room',
      installDate: '2019-08-20',
      warrantyEnd: '2024-08-20',
      nextMaintenance: '2025-01-30',
      status: 'warning',
      manufacturer: 'Caterpillar Inc.',
      serialNumber: 'CAT2019-GEN-001',
      icon: 'Zap',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      assetId: 'ELEV-001',
      name: 'Passenger Elevator 1',
      model: 'Otis Gen2',
      type: 'elevator',
      location: 'Building A - Lobby',
      installDate: '2021-01-10',
      warrantyEnd: '2026-01-10',
      nextMaintenance: '2025-02-01',
      status: 'operational',
      manufacturer: 'Otis Elevator Company',
      serialNumber: 'OTIS2021-ELEV-001',
      icon: 'ArrowUpDown',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      assetId: 'SEC-001',
      name: 'Access Control System',
      model: 'HID VertX V1000',
      type: 'security',
      location: 'Building A - Main Entrance',
      installDate: '2022-06-15',
      warrantyEnd: '2025-06-15',
      nextMaintenance: '2025-03-01',
      status: 'operational',
      manufacturer: 'HID Global',
      serialNumber: 'HID2022-SEC-001',
      icon: 'Shield',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
    },
    {
      id: 5,
      assetId: 'HVAC-002',
      name: 'Rooftop Unit 2',
      model: 'Trane Voyager',
      type: 'hvac',
      location: 'Building B - Rooftop',
      installDate: '2018-11-30',
      warrantyEnd: '2023-11-30',
      nextMaintenance: '2025-01-25',
      status: 'critical',
      manufacturer: 'Trane Technologies',
      serialNumber: 'TRA2018-HVAC-002',
      icon: 'Wind',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop'
    },
    {
      id: 6,
      assetId: 'LIGHT-001',
      name: 'LED Lighting System',
      model: 'Philips SmartBright',
      type: 'lighting',
      location: 'Building A - All Floors',
      installDate: '2023-02-14',
      warrantyEnd: '2028-02-14',
      nextMaintenance: '2025-08-14',
      status: 'operational',
      manufacturer: 'Signify (Philips)',
      serialNumber: 'PHI2023-LIGHT-001',
      icon: 'Lightbulb',
      image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop'
    },
    {
      id: 7,
      assetId: 'PLUMB-001',
      name: 'Water Heater System',
      model: 'Rheem Marathon',
      type: 'plumbing',
      location: 'Building A - Basement',
      installDate: '2020-09-05',
      warrantyEnd: '2025-09-05',
      nextMaintenance: '2025-03-15',
      status: 'operational',
      manufacturer: 'Rheem Manufacturing',
      serialNumber: 'RHE2020-PLUMB-001',
      icon: 'Droplets',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
    },
    {
      id: 8,
      assetId: 'FIRE-001',
      name: 'Fire Suppression System',
      model: 'Ansul R-102',
      type: 'fire_safety',
      location: 'Building A - Kitchen',
      installDate: '2021-07-20',
      warrantyEnd: '2026-07-20',
      nextMaintenance: '2025-01-20',
      status: 'offline',
      manufacturer: 'Ansul Incorporated',
      serialNumber: 'ANS2021-FIRE-001',
      icon: 'Flame',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop'
    },
    {
      id: 9,
      assetId: 'ELEC-001',
      name: 'Main Electrical Panel',
      model: 'Square D PowerPact',
      type: 'electrical',
      location: 'Building A - Electrical Room',
      installDate: '2019-04-12',
      warrantyEnd: '2024-04-12',
      nextMaintenance: '2025-04-12',
      status: 'warning',
      manufacturer: 'Schneider Electric',
      serialNumber: 'SQD2019-ELEC-001',
      icon: 'Zap',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=400&fit=crop'
    },
    {
      id: 10,
      assetId: 'HVAC-003',
      name: 'Chiller Unit 1',
      model: 'York YK Centrifugal',
      type: 'hvac',
      location: 'Building C - Mechanical Room',
      installDate: '2017-12-08',
      warrantyEnd: '2022-12-08',
      nextMaintenance: '2025-02-28',
      status: 'operational',
      manufacturer: 'Johnson Controls',
      serialNumber: 'YRK2017-HVAC-003',
      icon: 'Snowflake',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop'
    }
  ];

  // Filter and search equipment
  const filteredEquipment = useMemo(() => {
    let filtered = mockEquipment;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(equipment =>
        equipment?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        equipment?.assetId?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        equipment?.model?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        equipment?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        equipment?.manufacturer?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.status) {
      filtered = filtered?.filter(equipment => equipment?.status === filters?.status);
    }

    if (filters?.type) {
      filtered = filtered?.filter(equipment => equipment?.type === filters?.type);
    }

    if (filters?.location) {
      filtered = filtered?.filter(equipment => 
        equipment?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    if (filters?.warrantyStatus) {
      filtered = filtered?.filter(equipment => {
        const warrantyEnd = new Date(equipment.warrantyEnd);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((warrantyEnd - today) / (1000 * 60 * 60 * 24));
        
        switch (filters?.warrantyStatus) {
          case 'active':
            return daysUntilExpiry > 30;
          case 'expiring':
            return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
          case 'expired':
            return daysUntilExpiry <= 0;
          default:
            return true;
        }
      });
    }

    if (filters?.maintenanceStatus) {
      filtered = filtered?.filter(equipment => {
        const maintenanceDate = new Date(equipment.nextMaintenance);
        const today = new Date();
        const daysUntilMaintenance = Math.ceil((maintenanceDate - today) / (1000 * 60 * 60 * 24));
        
        switch (filters?.maintenanceStatus) {
          case 'due':
            return daysUntilMaintenance <= 7 && daysUntilMaintenance > 0;
          case 'overdue':
            return daysUntilMaintenance < 0;
          case 'scheduled':
            return daysUntilMaintenance > 7;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.field];
      let bValue = b?.[sortConfig?.field];

      // Handle date fields
      if (sortConfig?.field === 'installDate' || sortConfig?.field === 'nextMaintenance') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [mockEquipment, searchQuery, filters, sortConfig]);

  const handleEquipmentSelect = (equipment) => {
    setSelectedEquipment(equipment);
    setIsDetailPanelOpen(true);
  };

  const handleCloseDetailPanel = () => {
    setIsDetailPanelOpen(false);
    setSelectedEquipment(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev?.field === field && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log('Bulk action:', action, 'for items:', selectedIds);
    // Handle bulk actions here
  };

  const handleExport = () => {
    console.log('Exporting equipment data...');
    // Handle export logic here
  };

  const handleAddEquipment = () => {
    console.log('Adding new equipment...');
    // Handle add equipment logic here
  };

  const handleScheduleMaintenance = (equipment) => {
    setSelectedEquipment(equipment);
    setIsSchedulerOpen(true);
  };

  const handleScheduleSubmit = (scheduleData) => {
    console.log('Scheduling maintenance:', scheduleData);
    // Handle schedule submission here
  };

  const handleEquipmentUpdate = (updatedEquipment) => {
    console.log('Updating equipment:', updatedEquipment);
    // Handle equipment update here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Equipment Asset Management</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive asset lifecycle management and maintenance planning
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsSchedulerOpen(true)}
              >
                <Icon name="Calendar" size={16} className="mr-2" />
                Schedule Maintenance
              </Button>
              <Button onClick={handleAddEquipment}>
                <Icon name="Plus" size={16} className="mr-2" />
                Add Equipment
              </Button>
            </div>
          </div>

          {/* Equipment Statistics */}
          <EquipmentStats equipment={filteredEquipment} />

          {/* Filters */}
          <EquipmentFilters
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onExport={handleExport}
            onAddEquipment={handleAddEquipment}
          />

          {/* Equipment Table */}
          <EquipmentTable
            equipment={filteredEquipment}
            onEquipmentSelect={handleEquipmentSelect}
            selectedEquipment={selectedEquipment}
            onBulkAction={handleBulkAction}
            onSort={handleSort}
            sortConfig={sortConfig}
          />

          {/* Pagination */}
          {filteredEquipment?.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredEquipment?.length} of {mockEquipment?.length} equipment
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <Icon name="ChevronLeft" size={16} className="mr-1" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                  <Icon name="ChevronRight" size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Equipment Detail Panel */}
      <EquipmentDetailPanel
        equipment={selectedEquipment}
        isOpen={isDetailPanelOpen}
        onClose={handleCloseDetailPanel}
        onUpdate={handleEquipmentUpdate}
      />
      {/* Maintenance Scheduler */}
      <MaintenanceScheduler
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        equipment={selectedEquipment}
        onSchedule={handleScheduleSubmit}
      />
      {/* Quick Action Button */}
      <QuickActionButton />
    </div>
  );
};

export default EquipmentAssetManagement;