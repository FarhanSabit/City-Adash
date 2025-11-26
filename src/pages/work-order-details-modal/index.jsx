import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickActionButton from '../../components/ui/QuickActionButton';
import OverviewTab from './components/OverviewTab';
import TechnicalDetailsTab from './components/TechnicalDetailsTab';
import PartsTab from './components/PartsTab';
import TimelineTab from './components/TimelineTab';
import DocumentationTab from './components/DocumentationTab';

const WorkOrderDetailsModal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [workOrderData, setWorkOrderData] = useState({
    id: 'WO-2025-001',
    title: 'HVAC Unit #3 Pressure Sensor Malfunction',
    description: `Critical pressure sensor failure detected in HVAC Unit #3 located in Room 301-A. 
    The sensor is showing abnormal readings which could lead to system inefficiency and potential equipment damage. 
    Immediate replacement required to maintain optimal building climate control.`,
    priority: 'high',
    status: 'in-progress',
    severity: 'major',
    category: 'hvac',
    location: 'Building A - Floor 3',
    room: '301-A',
    assignedTechnician: 'john-doe',
    estimatedDuration: '3.5',
    createdDate: '2025-01-07 08:30:00',
    dueDate: '2025-01-08 17:00:00',
    customer: 'Facility Management',
    requestedBy: 'John Smith'
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText', badge: null },
    { id: 'technical', label: 'Technical Details', icon: 'Settings', badge: null },
    { id: 'parts', label: 'Parts & Materials', icon: 'Package', badge: 2 },
    { id: 'timeline', label: 'Timeline', icon: 'Clock', badge: 8 },
    { id: 'documentation', label: 'Documentation', icon: 'Files', badge: 4 }
  ];

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        console.log('Auto-saving work order data...');
        setHasUnsavedChanges(false);
      }, 3000);

      return () => clearTimeout(autoSaveTimer);
    }
  }, [hasUnsavedChanges]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 's':
            e?.preventDefault();
            handleSave();
            break;
          case '1':
            e?.preventDefault();
            setActiveTab('overview');
            break;
          case '2':
            e?.preventDefault();
            setActiveTab('technical');
            break;
          case '3':
            e?.preventDefault();
            setActiveTab('parts');
            break;
          case '4':
            e?.preventDefault();
            setActiveTab('timeline');
            break;
          case '5':
            e?.preventDefault();
            setActiveTab('documentation');
            break;
          default:
            break;
        }
      }
      
      if (e?.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleWorkOrderUpdate = (updatedData) => {
    setWorkOrderData(prev => ({ ...prev, ...updatedData }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    console.log('Saving work order:', workOrderData);
    setHasUnsavedChanges(false);
    // Implement save logic here
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmClose) return;
    }
    
    // Navigate back or close modal
    window.history?.back();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in-progress': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'awaiting-parts': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab workOrder={workOrderData} onUpdate={handleWorkOrderUpdate} />;
      case 'technical':
        return <TechnicalDetailsTab workOrder={workOrderData} />;
      case 'parts':
        return <PartsTab workOrder={workOrderData} />;
      case 'timeline':
        return <TimelineTab workOrder={workOrderData} />;
      case 'documentation':
        return <DocumentationTab workOrder={workOrderData} />;
      default:
        return <OverviewTab workOrder={workOrderData} onUpdate={handleWorkOrderUpdate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-72'} mt-16`}>
        {/* Modal Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="Wrench" size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{workOrderData?.title}</h1>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-600">ID: {workOrderData?.id}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(workOrderData?.priority)}`}>
                        {workOrderData?.priority?.toUpperCase()} PRIORITY
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(workOrderData?.status)}`}>
                        {workOrderData?.status?.replace('-', ' ')?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {hasUnsavedChanges && (
                  <div className="flex items-center text-sm text-orange-600">
                    <Icon name="AlertCircle" size={16} className="mr-1" />
                    <span>Unsaved changes</span>
                  </div>
                )}
                
                <Button variant="outline" onClick={handleSave} disabled={!hasUnsavedChanges}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Save
                </Button>
                
                <Button variant="outline">
                  <Icon name="Printer" size={16} className="mr-2" />
                  Print
                </Button>
                
                <Button variant="ghost" onClick={handleClose}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-50">
              <nav className="flex space-x-1">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab?.id
                        ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} className="mr-2" />
                    <span>{tab?.label}</span>
                    {tab?.badge && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                        {tab?.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Icon name="Keyboard" size={14} />
                <span>Ctrl+S to save • Ctrl+1-5 for tabs • Esc to close</span>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              {renderTabContent()}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Icon name="User" size={14} className="mr-1" />
                  <span>Assigned to: John Doe</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Calendar" size={14} className="mr-1" />
                  <span>Due: {new Date(workOrderData.dueDate)?.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" size={14} className="mr-1" />
                  <span>Est. Duration: {workOrderData?.estimatedDuration}h</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Icon name="Check" size={16} className="mr-2" />
                  Save & Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <QuickActionButton />
    </div>
  );
};

export default WorkOrderDetailsModal;