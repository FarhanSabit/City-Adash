import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TechnicianScheduleModal = ({ isOpen, onClose, technician }) => {
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);
  const [viewMode, setViewMode] = useState('day'); // day, week

  // Mock schedule data
  const scheduleData = {
    '2025-01-07': [
      {
        id: 'wo-001',
        title: 'HVAC Maintenance - Building A',
        time: '09:00',
        duration: 120,
        priority: 'High',
        location: 'Building A - Floor 3',
        status: 'scheduled'
      },
      {
        id: 'wo-002',
        title: 'Electrical Inspection',
        time: '11:30',
        duration: 90,
        priority: 'Medium',
        location: 'Building B - Floor 1',
        status: 'in-progress'
      },
      {
        id: 'wo-003',
        title: 'Plumbing Repair',
        time: '14:00',
        duration: 60,
        priority: 'Critical',
        location: 'Building A - Floor 2',
        status: 'scheduled'
      }
    ],
    '2025-01-08': [
      {
        id: 'wo-004',
        title: 'Security System Check',
        time: '08:00',
        duration: 45,
        priority: 'Low',
        location: 'Main Entrance',
        status: 'scheduled'
      },
      {
        id: 'wo-005',
        title: 'Generator Maintenance',
        time: '10:00',
        duration: 180,
        priority: 'High',
        location: 'Basement - Generator Room',
        status: 'scheduled'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-accent text-accent-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      case 'cancelled': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'border-l-error';
      case 'high': return 'border-l-warning';
      case 'medium': return 'border-l-accent';
      case 'low': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const calculateWorkload = (date) => {
    const tasks = scheduleData?.[date] || [];
    const totalMinutes = tasks?.reduce((sum, task) => sum + task?.duration, 0);
    const workingHours = 8 * 60; // 8 hours in minutes
    return Math.round((totalMinutes / workingHours) * 100);
  };

  const getAvailableSlots = (date) => {
    const tasks = scheduleData?.[date] || [];
    const workingHours = [
      '08:00', '09:00', '10:00', '11:00', '12:00',
      '13:00', '14:00', '15:00', '16:00', '17:00'
    ];
    
    const busySlots = tasks?.map(task => task?.time);
    return workingHours?.filter(hour => !busySlots?.includes(hour));
  };

  if (!isOpen || !technician) return null;

  const currentSchedule = scheduleData?.[selectedDate] || [];
  const workloadPercentage = calculateWorkload(selectedDate);
  const availableSlots = getAvailableSlots(selectedDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <img
              src={technician?.avatar}
              alt={technician?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">{technician?.name}</h2>
              <p className="text-sm text-muted-foreground">{technician?.role} - Schedule Overview</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6">
          {/* Date and View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e?.target?.value)}
                className="px-3 py-2 border border-border rounded-md bg-input text-foreground"
              />
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'day' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('day')}
                >
                  Day View
                </Button>
                <Button
                  variant={viewMode === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('week')}
                >
                  Week View
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Daily Workload</p>
                <p className="text-lg font-semibold text-foreground">{workloadPercentage}%</p>
              </div>
              <div className="w-16 h-16">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${workloadPercentage}, 100`}
                    className="text-primary"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Schedule Timeline */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Schedule for {new Date(selectedDate)?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>

              {currentSchedule?.length > 0 ? (
                <div className="space-y-3">
                  {currentSchedule?.map((task) => (
                    <div 
                      key={task?.id}
                      className={`bg-muted p-4 rounded-lg border-l-4 ${getPriorityColor(task?.priority)} hover:shadow-soft transition-shadow`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{task?.title}</h4>
                          <p className="text-sm text-muted-foreground">{task?.location}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task?.status)}`}>
                          {task?.status?.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{formatTime(task?.time)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Timer" size={14} />
                          <span>{formatDuration(task?.duration)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="AlertCircle" size={14} />
                          <span>{task?.priority}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-foreground mb-2">No scheduled tasks</h4>
                  <p className="text-muted-foreground">This technician has no tasks scheduled for this date.</p>
                </div>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Available Time Slots */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Available Time Slots</h4>
                {availableSlots?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots?.map((slot) => (
                      <div 
                        key={slot}
                        className="bg-success/10 border border-success/20 rounded-md p-2 text-center"
                      >
                        <span className="text-sm text-success font-medium">
                          {formatTime(slot)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No available slots</p>
                )}
              </div>

              {/* Technician Info */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Technician Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{technician?.currentLocation}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{technician?.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Activity" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {technician?.completionRate}% completion rate
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Icon name="Plus" size={14} className="mr-2" />
                    Add Task
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Icon name="MessageSquare" size={14} className="mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Icon name="Download" size={14} className="mr-2" />
                    Export Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianScheduleModal;