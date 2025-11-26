import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TechnicalDetailsTab = ({ workOrder }) => {
  const [selectedEquipment, setSelectedEquipment] = useState('hvac-unit-3');

  const equipmentData = {
    'hvac-unit-3': {
      name: 'HVAC Unit #3',
      model: 'Carrier 50TCQ036',
      serialNumber: 'CAR-2019-HV-003',
      installDate: '2019-03-15',
      lastMaintenance: '2024-11-15',
      warranty: 'Active until 2026-03-15',
      specifications: {
        capacity: '36,000 BTU/hr',
        voltage: '208-230V, 3-phase',
        refrigerant: 'R-410A',
        weight: '485 lbs',
        dimensions: '48" x 32" x 28"'
      },
      sensors: [
        { name: 'Temperature', value: '72.5°F', status: 'normal', trend: 'stable' },
        { name: 'Pressure', value: '145 PSI', status: 'warning', trend: 'increasing' },
        { name: 'Vibration', value: '0.8 mm/s', status: 'normal', trend: 'stable' },
        { name: 'Power Draw', value: '8.2 kW', status: 'normal', trend: 'decreasing' }
      ]
    }
  };

  const maintenanceHistory = [
    {
      id: 1,
      date: '2024-11-15',
      type: 'Preventive Maintenance',
      technician: 'John Doe',
      description: 'Quarterly filter replacement and system inspection',
      status: 'completed',
      duration: '2.5 hours',
      cost: '$285.00'
    },
    {
      id: 2,
      date: '2024-08-20',
      type: 'Repair',
      technician: 'Sarah Wilson',
      description: 'Replaced faulty pressure sensor',
      status: 'completed',
      duration: '1.5 hours',
      cost: '$165.00'
    },
    {
      id: 3,
      date: '2024-05-10',
      type: 'Preventive Maintenance',
      technician: 'Mike Johnson',
      description: 'Spring maintenance and refrigerant check',
      status: 'completed',
      duration: '3.0 hours',
      cost: '$320.00'
    }
  ];

  const equipment = equipmentData?.[selectedEquipment];

  const getSensorStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return 'TrendingUp';
      case 'decreasing': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Equipment Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Icon name="Settings" size={20} className="mr-2" />
          Equipment Information
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Wind" size={32} className="text-blue-600" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{equipment?.name}</h4>
                <p className="text-gray-600">{equipment?.model}</p>
                <p className="text-sm text-gray-500">Serial: {equipment?.serialNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Install Date</p>
                <p className="text-gray-900">{equipment?.installDate}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Last Maintenance</p>
                <p className="text-gray-900">{equipment?.lastMaintenance}</p>
              </div>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Icon name="Shield" size={16} className="text-green-600 mr-2" />
                <p className="text-sm font-medium text-green-800">Warranty Status</p>
              </div>
              <p className="text-green-700 mt-1">{equipment?.warranty}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-semibold text-gray-900">Technical Specifications</h5>
            <div className="space-y-3">
              {Object.entries(equipment?.specifications)?.map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 capitalize">{key?.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Real-time Sensor Data */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Icon name="Activity" size={20} className="mr-2" />
          Real-time Sensor Data
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipment?.sensors?.map((sensor, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getSensorStatusColor(sensor?.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{sensor?.name}</span>
                <Icon name={getTrendIcon(sensor?.trend)} size={16} />
              </div>
              <p className="text-2xl font-bold mb-1">{sensor?.value}</p>
              <div className="flex items-center text-xs">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  sensor?.status === 'normal' ? 'bg-green-500' :
                  sensor?.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="capitalize">{sensor?.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Maintenance History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Icon name="History" size={20} className="mr-2" />
            Maintenance History
          </h3>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export History
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Technician</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Cost</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceHistory?.map((record) => (
                <tr key={record?.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{record?.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      record?.type === 'Preventive Maintenance' ?'bg-blue-100 text-blue-800' :'bg-orange-100 text-orange-800'
                    }`}>
                      {record?.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{record?.technician}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                    {record?.description}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{record?.duration}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{record?.cost}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {record?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* IoT Integration Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Icon name="Wifi" size={20} className="mr-2" />
          IoT Integration Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">Sensor Network</span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-green-700 text-sm">Connected - 4/4 sensors active</p>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Data Sync</span>
              <Icon name="RefreshCw" size={16} className="text-blue-600" />
            </div>
            <p className="text-blue-700 text-sm">Last sync: 2 minutes ago</p>
          </div>
          
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-800">Predictive Analytics</span>
              <Icon name="Brain" size={16} className="text-purple-600" />
            </div>
            <p className="text-purple-700 text-sm">ML model active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetailsTab;