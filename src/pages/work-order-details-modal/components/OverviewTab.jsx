import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const OverviewTab = ({ workOrder, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: workOrder?.title || '',
    description: workOrder?.description || '',
    priority: workOrder?.priority || 'medium',
    severity: workOrder?.severity || 'moderate',
    category: workOrder?.category || 'hvac',
    estimatedDuration: workOrder?.estimatedDuration || '',
    assignedTechnician: workOrder?.assignedTechnician || '',
    location: workOrder?.location || '',
    room: workOrder?.room || ''
  });

  const [photos, setPhotos] = useState([
    {
      id: 1,
      type: 'before',
      url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
      caption: 'Initial equipment condition',
      timestamp: '2025-01-07 09:15:00'
    },
    {
      id: 2,
      type: 'during',
      url: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?w=400',
      caption: 'Maintenance in progress',
      timestamp: '2025-01-07 10:30:00'
    }
  ]);

  const priorityOptions = [
    { value: 'critical', label: 'Critical', description: 'Immediate attention required' },
    { value: 'high', label: 'High', description: 'Urgent - within 4 hours' },
    { value: 'medium', label: 'Medium', description: 'Standard - within 24 hours' },
    { value: 'low', label: 'Low', description: 'Non-urgent - within 72 hours' }
  ];

  const severityOptions = [
    { value: 'critical', label: 'Critical', description: 'System failure or safety hazard' },
    { value: 'major', label: 'Major', description: 'Significant impact on operations' },
    { value: 'moderate', label: 'Moderate', description: 'Minor operational impact' },
    { value: 'minor', label: 'Minor', description: 'Cosmetic or preventive' }
  ];

  const categoryOptions = [
    { value: 'hvac', label: 'HVAC Systems' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'security', label: 'Security Systems' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'elevator', label: 'Elevator/Lift' },
    { value: 'generator', label: 'Generator' },
    { value: 'other', label: 'Other' }
  ];

  const technicianOptions = [
    { value: 'john-doe', label: 'John Doe', description: 'HVAC Specialist - Available' },
    { value: 'sarah-wilson', label: 'Sarah Wilson', description: 'Electrical Engineer - Busy until 2 PM' },
    { value: 'mike-johnson', label: 'Mike Johnson', description: 'General Maintenance - Available' },
    { value: 'lisa-chen', label: 'Lisa Chen', description: 'Plumbing Expert - Available' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate?.(updatedData);
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target?.files);
    files?.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          type: 'new',
          url: e?.target?.result,
          caption: file?.name,
          timestamp: new Date()?.toLocaleString()
        };
        setPhotos(prev => [...prev, newPhoto]);
      };
      reader?.readAsDataURL(file);
    });
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      {/* Left Panel - Form Fields */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon name="FileText" size={20} className="mr-2" />
            Work Order Details
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Work Order Title"
              type="text"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              placeholder="Enter work order title"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Location"
                type="text"
                value={formData?.location}
                onChange={(e) => handleInputChange('location', e?.target?.value)}
                placeholder="Building/Floor"
              />
              
              <Input
                label="Room Number"
                type="text"
                value={formData?.room}
                onChange={(e) => handleInputChange('room', e?.target?.value)}
                placeholder="Room/Area"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed description of the issue..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Priority Level"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
              />
              
              <Select
                label="Severity Assessment"
                options={severityOptions}
                value={formData?.severity}
                onChange={(value) => handleInputChange('severity', value)}
              />
            </div>

            <Select
              label="Category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleInputChange('category', value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Estimated Duration (hours)"
                type="number"
                value={formData?.estimatedDuration}
                onChange={(e) => handleInputChange('estimatedDuration', e?.target?.value)}
                placeholder="2.5"
                min="0.5"
                step="0.5"
              />
              
              <Select
                label="Assigned Technician"
                options={technicianOptions}
                value={formData?.assignedTechnician}
                onChange={(value) => handleInputChange('assignedTechnician', value)}
                searchable
              />
            </div>
          </div>
        </div>

        {/* Priority & Status Indicators */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon name="AlertCircle" size={20} className="mr-2" />
            Status & Indicators
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg border ${getPriorityColor(formData?.priority)}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Priority</span>
                <Icon name="Flag" size={16} />
              </div>
              <p className="text-lg font-semibold capitalize mt-1">{formData?.priority}</p>
            </div>
            
            <div className="p-3 rounded-lg border bg-blue-50 border-blue-200 text-blue-600">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Icon name="Clock" size={16} />
              </div>
              <p className="text-lg font-semibold mt-1">In Progress</p>
            </div>
          </div>
        </div>
      </div>
      {/* Right Panel - Location Map & Photos */}
      <div className="space-y-6">
        {/* Interactive Location Map */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon name="MapPin" size={20} className="mr-2" />
            Facility Location
          </h3>
          
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '250px' }}>
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Facility Location"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=40.7128,-74.0060&z=16&output=embed"
              className="border-0"
            />
            
            {/* Equipment Overlay */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-medium">HVAC Unit #3</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Room 301-A</p>
            </div>
          </div>
        </div>

        {/* Photo Documentation */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Icon name="Camera" size={20} className="mr-2" />
              Photo Documentation
            </h3>
            
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Add Photos
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {photos?.map((photo) => (
              <div key={photo?.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={photo?.url}
                    alt={photo?.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    photo?.type === 'before' ? 'bg-red-100 text-red-800' :
                    photo?.type === 'during'? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {photo?.type}
                  </span>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-lg">
                  <p className="text-white text-sm font-medium truncate">{photo?.caption}</p>
                  <p className="text-white/80 text-xs">{photo?.timestamp}</p>
                </div>
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-8 w-8 bg-white/90 hover:bg-white">
                    <Icon name="Eye" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {photos?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icon name="ImagePlus" size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No photos uploaded yet</p>
              <p className="text-xs text-gray-400 mt-1">Add before/after photos to document the work</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;