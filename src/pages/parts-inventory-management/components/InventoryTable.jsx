import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const InventoryTable = ({
  parts,
  selectedParts,
  onSelectPart,
  onSelectAll,
  onSort,
  sortConfig,
  onReorderPart,
  onEditPart
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParts = useMemo(() => {
    return parts?.filter((part) =>
    part?.partNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    part?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    part?.supplier?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  }, [parts, searchTerm]);

  const getStockStatusColor = (currentStock, reorderLevel) => {
    if (currentStock === 0) return 'text-red-700 bg-red-50 border-red-200';
    if (currentStock <= reorderLevel) return 'text-orange-700 bg-orange-50 border-orange-200';
    return 'text-green-700 bg-green-50 border-green-200';
  };

  const getStockStatusText = (currentStock, reorderLevel) => {
    if (currentStock === 0) return 'Out of Stock';
    if (currentStock <= reorderLevel) return 'Low Stock';
    return 'In Stock';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const handleSort = (field) => {
    onSort(field);
  };

  const getSortIcon = (field) => {
    if (sortConfig?.field !== field) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-300 overflow-hidden">
      {/* Table Header - Updated with modern styling */}
      <div className="p-6 border-b border-gray-300 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h3 className="text-xl font-bold text-gray-800">Parts Inventory</h3>
          <div className="flex items-center gap-3">
            <Input
              type="search"
              placeholder="Search parts, suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-56 h-9 bg-gray-50 border-gray-300 focus:border-yellow-400 focus:ring-yellow-200 rounded-lg transition-all duration-300" />
            <Button 
              variant="outline" 
              iconName="Filter" 
              iconPosition="left" 
              size="sm"
              className="bg-white hover:bg-yellow-50 border-gray-300 text-gray-700 hover:text-yellow-700 hover:border-yellow-400 transition-all duration-300">
              Filter
            </Button>
            <Button 
              variant="outline" 
              iconName="Download" 
              iconPosition="left" 
              size="sm"
              className="bg-white hover:bg-yellow-50 border-gray-300 text-gray-700 hover:text-yellow-700 hover:border-yellow-400 transition-all duration-300">
              Export
            </Button>
          </div>
        </div>
        
        {selectedParts?.length > 0 &&
        <div className="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 rounded-lg p-4 mt-4">
            <span className="text-sm text-gray-700 font-medium">
              {selectedParts?.length} items selected
            </span>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                iconName="ShoppingCart"
                className="bg-white hover:bg-yellow-50 border-gray-300 text-gray-700 hover:text-yellow-700 transition-all duration-300">
                Bulk Reorder
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                iconName="Edit"
                className="bg-white hover:bg-yellow-50 border-gray-300 text-gray-700 hover:text-yellow-700 transition-all duration-300">
                Bulk Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                iconName="Trash2"
                className="bg-white hover:bg-red-50 border-gray-300 text-gray-700 hover:text-red-700 hover:border-red-400 transition-all duration-300">
                Remove
              </Button>
            </div>
          </div>
        }
      </div>

      {/* Table - Updated with modern styling */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
            <tr>
              <th className="w-12 p-4 text-left">
                <Checkbox
                  checked={selectedParts?.length === filteredParts?.length && filteredParts?.length > 0}
                  indeterminate={selectedParts?.length > 0 && selectedParts?.length < filteredParts?.length}
                  onChange={onSelectAll} />
              </th>
              <th className="p-4 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('partNumber')}
                  className="font-semibold text-gray-800 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300">
                  Part Number
                  <Icon name={getSortIcon('partNumber')} size={14} className="ml-2" />
                </Button>
              </th>
              <th className="p-4 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('description')}
                  className="font-semibold text-gray-800 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300">
                  Description
                  <Icon name={getSortIcon('description')} size={14} className="ml-2" />
                </Button>
              </th>
              <th className="p-4 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('currentStock')}
                  className="font-semibold text-gray-800 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300">
                  Stock
                  <Icon name={getSortIcon('currentStock')} size={14} className="ml-2" />
                </Button>
              </th>
              <th className="p-4 text-left">
                <span className="font-semibold text-gray-800">Reserved</span>
              </th>
              <th className="p-4 text-left">
                <span className="font-semibold text-gray-800">Status</span>
              </th>
              <th className="p-4 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('supplier')}
                  className="font-semibold text-gray-800 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300">
                  Supplier
                  <Icon name={getSortIcon('supplier')} size={14} className="ml-2" />
                </Button>
              </th>
              <th className="p-4 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('unitCost')}
                  className="font-semibold text-gray-800 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300">
                  Unit Cost
                  <Icon name={getSortIcon('unitCost')} size={14} className="ml-2" />
                </Button>
              </th>
              <th className="p-4 text-left">
                <span className="font-semibold text-gray-800">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredParts?.map((part) =>
            <tr key={part?.id} className="border-b border-gray-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300">
                <td className="p-4">
                  <Checkbox
                  checked={selectedParts?.includes(part?.id)}
                  onChange={() => onSelectPart(part?.id)} />
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 text-sm">{part?.partNumber}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1 w-fit">{part?.category}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col max-w-xs">
                    <span className="text-sm text-gray-800 truncate font-medium">{part?.description}</span>
                    {part?.compatibility &&
                  <span className="text-xs text-gray-500 mt-1">
                        Compatible: {part?.compatibility}
                      </span>
                  }
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800 text-lg">{part?.currentStock}</span>
                    <span className="text-xs text-gray-500">
                      Min: {part?.reorderLevel}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-gray-800 font-medium">{part?.reservedQuantity}</span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStockStatusColor(part?.currentStock, part?.reorderLevel)}`}>
                    {getStockStatusText(part?.currentStock, part?.reorderLevel)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-800 font-medium">{part?.supplier}</span>
                    <div className="flex items-center mt-1">
                      {[...Array(5)]?.map((_, i) =>
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < part?.supplierRating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                    )}
                      <span className="text-xs text-gray-500 ml-1 font-medium">
                        ({part?.supplierRating})
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">
                      {formatCurrency(part?.unitCost)}
                    </span>
                    <span className="text-xs text-gray-500">
                      Total: {formatCurrency(part?.unitCost * part?.currentStock)}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReorderPart(part)}
                    disabled={part?.currentStock > part?.reorderLevel}
                    className="h-9 w-9 hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-300 rounded-lg">
                      <Icon name="ShoppingCart" size={14} />
                    </Button>
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditPart(part)}
                    className="h-9 w-9 hover:bg-gray-100 hover:text-gray-700 transition-all duration-300 rounded-lg">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 hover:bg-gray-100 hover:text-gray-700 transition-all duration-300 rounded-lg">
                      <Icon name="MoreVertical" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer - Updated styling */}
      <div className="p-4 border-t border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 font-medium">
            Showing {filteredParts?.length} of {parts?.length} parts
          </span>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled
              className="bg-white border-gray-300 text-gray-400">
              <Icon name="ChevronLeft" size={14} />
            </Button>
            <span className="text-sm text-gray-700 px-3 py-1 bg-white rounded-md border border-gray-300 font-medium">Page 1 of 1</span>
            <Button 
              variant="outline" 
              size="sm" 
              disabled
              className="bg-white border-gray-300 text-gray-400">
              <Icon name="ChevronRight" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default InventoryTable;