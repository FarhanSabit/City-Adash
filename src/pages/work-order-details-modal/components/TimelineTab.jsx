import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineTab = ({ workOrder }) => {
  const [filter, setFilter] = useState('all');

  const timelineEvents = [
    {
      id: 1,
      type: 'created',
      title: 'Work Order Created',
      description: 'Work order WO-2025-001 created by facility manager',
      user: 'John Smith',
      userRole: 'Facility Manager',
      timestamp: '2025-01-07 08:30:00',
      icon: 'FileText',
      color: 'blue'
    },
    {
      id: 2,
      type: 'assigned',
      title: 'Technician Assigned',
      description: 'Work order assigned to John Doe based on expertise and availability',
      user: 'System Auto-Assignment',
      userRole: 'System',
      timestamp: '2025-01-07 08:32:15',
      icon: 'UserCheck',
      color: 'green'
    },
    {
      id: 3,
      type: 'status_change',
      title: 'Status Updated',
      description: 'Status changed from "New Request" to "In Progress"',
      user: 'John Doe',
      userRole: 'HVAC Technician',
      timestamp: '2025-01-07 09:15:30',
      icon: 'ArrowRight',
      color: 'orange'
    },
    {
      id: 4,
      type: 'comment',
      title: 'Comment Added',
      description: 'Initial inspection completed. Pressure sensor showing abnormal readings. Replacement required.',
      user: 'John Doe',
      userRole: 'HVAC Technician',
      timestamp: '2025-01-07 09:45:00',
      icon: 'MessageSquare',
      color: 'gray'
    },
    {
      id: 5,
      type: 'parts_ordered',
      title: 'Parts Ordered',
      description: 'Pressure sensor assembly (CARR-SENS-P02) ordered from Industrial Parts Direct',
      user: 'Sarah Wilson',
      userRole: 'Inventory Manager',
      timestamp: '2025-01-07 10:20:00',
      icon: 'Package',
      color: 'purple'
    },
    {
      id: 6,
      type: 'photo_uploaded',
      title: 'Photos Uploaded',
      description: '2 photos uploaded showing equipment condition and sensor location',
      user: 'John Doe',
      userRole: 'HVAC Technician',
      timestamp: '2025-01-07 10:35:00',
      icon: 'Camera',
      color: 'indigo'
    },
    {
      id: 7,
      type: 'escalation',
      title: 'Priority Escalated',
      description: 'Priority escalated from Medium to High due to extended downtime',
      user: 'System Auto-Escalation',
      userRole: 'System',
      timestamp: '2025-01-07 11:00:00',
      icon: 'AlertTriangle',
      color: 'red'
    },
    {
      id: 8,
      type: 'parts_received',
      title: 'Parts Received',
      description: 'Pressure sensor assembly received and verified in inventory',
      user: 'Mike Johnson',
      userRole: 'Warehouse Staff',
      timestamp: '2025-01-07 14:30:00',
      icon: 'CheckCircle',
      color: 'green'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Events', count: timelineEvents?.length },
    { value: 'status_change', label: 'Status Changes', count: timelineEvents?.filter(e => e?.type === 'status_change')?.length },
    { value: 'comment', label: 'Comments', count: timelineEvents?.filter(e => e?.type === 'comment')?.length },
    { value: 'parts_ordered', label: 'Parts & Materials', count: timelineEvents?.filter(e => e?.type?.includes('parts'))?.length },
    { value: 'system', label: 'System Events', count: timelineEvents?.filter(e => e?.userRole === 'System')?.length }
  ];

  const getIconColor = (color) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      orange: 'text-orange-600 bg-orange-100',
      red: 'text-red-600 bg-red-100',
      purple: 'text-purple-600 bg-purple-100',
      indigo: 'text-indigo-600 bg-indigo-100',
      gray: 'text-gray-600 bg-gray-100'
    };
    return colors?.[color] || colors?.gray;
  };

  const filteredEvents = filter === 'all' 
    ? timelineEvents 
    : timelineEvents?.filter(event => {
        if (filter === 'system') return event.userRole === 'System';
        if (filter === 'parts_ordered') return event.type?.includes('parts');
        return event.type === filter;
      });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date?.toLocaleDateString() + ' at ' + date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Timeline Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Icon name="Clock" size={20} className="mr-2" />
            Work Order Timeline
          </h3>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export Timeline
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === option?.value
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' :'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
            >
              {option?.label}
              <span className="ml-2 px-2 py-0.5 text-xs bg-white rounded-full">
                {option?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Timeline Events */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="space-y-6">
            {filteredEvents?.map((event, index) => (
              <div key={event.id} className="relative flex items-start space-x-4">
                {/* Timeline Icon */}
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${getIconColor(event.color)}`}>
                  <Icon name={event.icon} size={16} />
                </div>
                
                {/* Event Content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-semibold text-gray-900">{event.title}</h4>
                    <span className="text-sm text-gray-500">{formatTimestamp(event.timestamp)}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-2">{event.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Icon name="User" size={14} className="mr-1" />
                      <span>{event.user}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Badge" size={14} className="mr-1" />
                      <span>{event.userRole}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Calendar" size={14} className="mr-1" />
                      <span>{new Date(event.timestamp)?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredEvents?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Icon name="Clock" size={48} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No events found for the selected filter</p>
            <p className="text-xs text-gray-400 mt-1">Try selecting a different filter option</p>
          </div>
        )}
      </div>
      {/* Timeline Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Timeline Statistics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Total Events</span>
              <Icon name="Activity" size={16} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-700">{timelineEvents?.length}</p>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">Status Changes</span>
              <Icon name="ArrowRight" size={16} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-700">
              {timelineEvents?.filter(e => e?.type === 'status_change')?.length}
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-800">User Actions</span>
              <Icon name="Users" size={16} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-700">
              {timelineEvents?.filter(e => e?.userRole !== 'System')?.length}
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-orange-800">Time Elapsed</span>
              <Icon name="Clock" size={16} className="text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-700">6h 30m</p>
          </div>
        </div>
      </div>
      {/* Add Comment Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2" />
          Add Comment
        </h3>
        
        <div className="space-y-4">
          <textarea
            placeholder="Add a comment to the timeline..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded" />
                <span>Notify assigned technician</span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded" />
                <span>Mark as important</span>
              </label>
            </div>
            
            <Button>
              <Icon name="Send" size={16} className="mr-2" />
              Add Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineTab;