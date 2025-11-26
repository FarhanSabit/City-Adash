import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const PartsTab = ({ workOrder }) => {
  const [selectedParts, setSelectedParts] = useState([
    {
      id: 1,
      partNumber: 'CARR-FILT-001',
      name: 'HVAC Air Filter - MERV 13',
      description: 'High-efficiency particulate air filter for Carrier units',
      quantity: 2,
      unitPrice: 45.99,
      totalPrice: 91.98,
      supplier: 'HVAC Supply Co.',
      stockLevel: 15,
      status: 'in-stock',
      estimatedDelivery: '2025-01-08',
      category: 'filters'
    },
    {
      id: 2,
      partNumber: 'CARR-SENS-P02',
      name: 'Pressure Sensor Assembly',
      description: 'Digital pressure sensor with mounting bracket',
      quantity: 1,
      unitPrice: 125.50,
      totalPrice: 125.50,
      supplier: 'Industrial Parts Direct',
      stockLevel: 3,
      status: 'low-stock',
      estimatedDelivery: '2025-01-09',
      category: 'sensors'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddPart, setShowAddPart] = useState(false);

  const availableParts = [
    {
      partNumber: 'CARR-BELT-001',
      name: 'Drive Belt - V-Type',
      description: 'Heavy-duty drive belt for HVAC units',
      unitPrice: 28.75,
      supplier: 'HVAC Supply Co.',
      stockLevel: 8,
      status: 'in-stock',
      category: 'mechanical'
    },
    {
      partNumber: 'CARR-COIL-C01',
      name: 'Evaporator Coil',
      description: 'Copper evaporator coil assembly',
      unitPrice: 485.00,
      supplier: 'Carrier Direct',
      stockLevel: 2,
      status: 'low-stock',
      category: 'coils'
    },
    {
      partNumber: 'CARR-FAN-M01',
      name: 'Condenser Fan Motor',
      description: '1/3 HP condenser fan motor with mounting hardware',
      unitPrice: 195.25,
      supplier: 'Motor Specialists Inc.',
      stockLevel: 0,
      status: 'out-of-stock',
      category: 'motors'
    }
  ];

  const suppliers = [
    { value: 'hvac-supply', label: 'HVAC Supply Co.', description: 'Primary supplier - 2-day delivery' },
    { value: 'carrier-direct', label: 'Carrier Direct', description: 'OEM parts - 3-5 day delivery' },
    { value: 'industrial-parts', label: 'Industrial Parts Direct', description: 'Specialty components' },
    { value: 'motor-specialists', label: 'Motor Specialists Inc.', description: 'Motor and electrical parts' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return 'text-green-600 bg-green-50 border-green-200';
      case 'low-stock': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'out-of-stock': return 'text-red-600 bg-red-50 border-red-200';
      case 'ordered': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleQuantityChange = (partId, newQuantity) => {
    setSelectedParts(prev => prev?.map(part => 
      part?.id === partId 
        ? { ...part, quantity: newQuantity, totalPrice: newQuantity * part?.unitPrice }
        : part
    ));
  };

  const handleRemovePart = (partId) => {
    setSelectedParts(prev => prev?.filter(part => part?.id !== partId));
  };

  const handleAddPart = (part) => {
    const newPart = {
      ...part,
      id: Date.now(),
      quantity: 1,
      totalPrice: part?.unitPrice,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0]
    };
    setSelectedParts(prev => [...prev, newPart]);
    setShowAddPart(false);
  };

  const totalCost = selectedParts?.reduce((sum, part) => sum + part?.totalPrice, 0);

  const filteredParts = availableParts?.filter(part =>
    part?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    part?.partNumber?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Parts Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Icon name="Package" size={20} className="mr-2" />
            Required Parts & Materials
          </h3>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">${totalCost?.toFixed(2)}</p>
            </div>
            <Button onClick={() => setShowAddPart(true)} variant="outline">
              <Icon name="Plus" size={16} className="mr-2" />
              Add Part
            </Button>
          </div>
        </div>

        {/* Selected Parts List */}
        <div className="space-y-4">
          {selectedParts?.map((part) => (
            <div key={part?.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{part?.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(part?.status)}`}>
                      {part?.status?.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{part?.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Part Number</p>
                      <p className="font-medium">{part?.partNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Supplier</p>
                      <p className="font-medium">{part?.supplier}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Stock Level</p>
                      <p className="font-medium">{part?.stockLevel} units</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Est. Delivery</p>
                      <p className="font-medium">{part?.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 ml-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={part?.quantity}
                      onChange={(e) => handleQuantityChange(part?.id, parseInt(e?.target?.value) || 1)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Unit Price</p>
                    <p className="font-medium">${part?.unitPrice?.toFixed(2)}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-bold text-lg">${part?.totalPrice?.toFixed(2)}</p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePart(part?.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedParts?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Icon name="Package" size={48} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No parts selected</p>
            <p className="text-xs text-gray-400 mt-1">Add parts and materials needed for this work order</p>
          </div>
        )}
      </div>
      {/* Inventory Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Icon name="Warehouse" size={20} className="mr-2" />
          Inventory Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">In Stock</span>
              <Icon name="CheckCircle" size={16} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-700">
              {selectedParts?.filter(p => p?.status === 'in-stock')?.length}
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-yellow-800">Low Stock</span>
              <Icon name="AlertTriangle" size={16} className="text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-700">
              {selectedParts?.filter(p => p?.status === 'low-stock')?.length}
            </p>
          </div>
          
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-red-800">Out of Stock</span>
              <Icon name="XCircle" size={16} className="text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-700">
              {selectedParts?.filter(p => p?.status === 'out-of-stock')?.length}
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Total Value</span>
              <Icon name="DollarSign" size={16} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-700">${totalCost?.toFixed(0)}</p>
          </div>
        </div>
      </div>
      {/* Add Part Modal */}
      {showAddPart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add Parts & Materials</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAddPart(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <Input
                  type="search"
                  placeholder="Search parts by name or part number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredParts?.map((part) => (
                  <div key={part?.partNumber} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{part?.name}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(part?.status)}`}>
                            {part?.status?.replace('-', ' ')}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{part?.description}</p>
                        
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Part Number</p>
                            <p className="font-medium">{part?.partNumber}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Supplier</p>
                            <p className="font-medium">{part?.supplier}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Stock Level</p>
                            <p className="font-medium">{part?.stockLevel} units</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Unit Price</p>
                            <p className="font-bold">${part?.unitPrice?.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleAddPart(part)}
                        disabled={part?.status === 'out-of-stock'}
                        className="ml-4"
                      >
                        <Icon name="Plus" size={16} className="mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartsTab;