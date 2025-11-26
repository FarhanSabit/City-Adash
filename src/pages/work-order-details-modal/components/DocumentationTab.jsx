import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DocumentationTab = ({ workOrder }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const documents = [
    {
      id: 1,
      name: 'Equipment Manual - HVAC Unit 3.pdf',
      type: 'manual',
      size: '2.4 MB',
      uploadedBy: 'John Doe',
      uploadDate: '2025-01-07 09:30:00',
      url: '#',
      icon: 'FileText',
      verified: true,
      compliance: 'OSHA Compliant'
    },
    {
      id: 2,
      name: 'Safety Inspection Checklist.pdf',
      type: 'checklist',
      size: '1.1 MB',
      uploadedBy: 'Sarah Wilson',
      uploadDate: '2025-01-07 10:15:00',
      url: '#',
      icon: 'CheckSquare',
      verified: true,
      compliance: 'Safety Verified'
    },
    {
      id: 3,
      name: 'Pressure Sensor Specifications.pdf',
      type: 'specification',
      size: '856 KB',
      uploadedBy: 'Mike Johnson',
      uploadDate: '2025-01-07 11:00:00',
      url: '#',
      icon: 'FileText',
      verified: false,
      compliance: 'Pending Review'
    },
    {
      id: 4,
      name: 'Before Repair - Equipment Photos.zip',
      type: 'photos',
      size: '15.2 MB',
      uploadedBy: 'John Doe',
      uploadDate: '2025-01-07 09:45:00',
      url: '#',
      icon: 'Image',
      verified: true,
      compliance: 'Quality Approved'
    }
  ];

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const documentTypes = [
    { value: 'manual', label: 'Equipment Manual', icon: 'Book' },
    { value: 'checklist', label: 'Safety Checklist', icon: 'CheckSquare' },
    { value: 'specification', label: 'Technical Specs', icon: 'FileText' },
    { value: 'photos', label: 'Photo Documentation', icon: 'Camera' },
    { value: 'certificate', label: 'Certificates', icon: 'Award' },
    { value: 'report', label: 'Inspection Report', icon: 'ClipboardCheck' },
    { value: 'other', label: 'Other Documents', icon: 'File' }
  ];

  const complianceRequirements = [
    {
      id: 1,
      name: 'OSHA Safety Documentation',
      status: 'compliant',
      description: 'All safety procedures and equipment documentation must meet OSHA standards',
      documents: ['Equipment Manual - HVAC Unit 3.pdf', 'Safety Inspection Checklist.pdf']
    },
    {
      id: 2,
      name: 'Quality Assurance Photos',
      status: 'compliant',
      description: 'Before and after photos required with AI quality verification',
      documents: ['Before Repair - Equipment Photos.zip']
    },
    {
      id: 3,
      name: 'Technical Specifications',
      status: 'pending',
      description: 'Complete technical documentation for all replacement parts',
      documents: ['Pressure Sensor Specifications.pdf']
    }
  ];

  const handleFileUpload = (files) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setSelectedFiles(Array.from(files));
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileUpload(e?.dataTransfer?.files);
    }
  };

  const getFileIcon = (type) => {
    const icons = {
      manual: 'Book',
      checklist: 'CheckSquare',
      specification: 'FileText',
      photos: 'Image',
      certificate: 'Award',
      report: 'ClipboardCheck',
      other: 'File'
    };
    return icons?.[type] || 'File';
  };

  const getComplianceColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'non-compliant': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Icon name="Upload" size={20} className="mr-2" />
          Upload Documentation
        </h3>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' :'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Icon name="CloudUpload" size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supports PDF, DOC, DOCX, JPG, PNG, ZIP files up to 50MB
          </p>
          
          <div className="relative">
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
              onChange={(e) => handleFileUpload(e?.target?.files)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline">
              <Icon name="FolderOpen" size={16} className="mr-2" />
              Browse Files
            </Button>
          </div>
        </div>

        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Uploading files...</span>
              <span className="text-sm text-gray-500">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      {/* Document List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Icon name="Files" size={20} className="mr-2" />
            Uploaded Documents
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Filter" size={16} className="mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Download All
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {documents?.map((doc) => (
            <div key={doc?.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name={getFileIcon(doc?.type)} size={20} className="text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{doc?.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{doc?.size}</span>
                      <span>•</span>
                      <span>Uploaded by {doc?.uploadedBy}</span>
                      <span>•</span>
                      <span>{new Date(doc.uploadDate)?.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    doc?.verified 
                      ? 'bg-green-100 text-green-800' :'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc?.verified ? 'Verified' : 'Pending'}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {documents?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Icon name="FileX" size={48} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No documents uploaded yet</p>
            <p className="text-xs text-gray-400 mt-1">Upload documentation to track compliance and quality</p>
          </div>
        )}
      </div>
      {/* Compliance Requirements */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2" />
          Compliance Requirements
        </h3>
        
        <div className="space-y-4">
          {complianceRequirements?.map((requirement) => (
            <div key={requirement?.id} className={`border rounded-lg p-4 ${getComplianceColor(requirement?.status)}`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">{requirement?.name}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  requirement?.status === 'compliant' ?'bg-green-200 text-green-800' 
                    : requirement?.status === 'pending' ?'bg-yellow-200 text-yellow-800' :'bg-red-200 text-red-800'
                }`}>
                  {requirement?.status === 'compliant' ? 'Compliant' : 
                   requirement?.status === 'pending' ? 'Pending Review' : 'Non-Compliant'}
                </span>
              </div>
              
              <p className="text-sm mb-3">{requirement?.description}</p>
              
              <div className="space-y-1">
                <p className="text-xs font-medium">Related Documents:</p>
                {requirement?.documents?.map((docName, index) => (
                  <div key={index} className="flex items-center text-xs">
                    <Icon name="File" size={12} className="mr-1" />
                    <span>{docName}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* AI Quality Check */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Icon name="Brain" size={20} className="mr-2" />
          AI Quality Verification
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">Photo Quality</span>
              <Icon name="CheckCircle" size={16} className="text-green-600" />
            </div>
            <p className="text-green-700 text-sm">All photos meet quality standards</p>
            <p className="text-xs text-green-600 mt-1">Resolution: ✓ Clarity: ✓ Lighting: ✓</p>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Document Scan</span>
              <Icon name="Scan" size={16} className="text-blue-600" />
            </div>
            <p className="text-blue-700 text-sm">Text extraction completed</p>
            <p className="text-xs text-blue-600 mt-1">OCR Accuracy: 98.5%</p>
          </div>
          
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-800">Content Analysis</span>
              <Icon name="Search" size={16} className="text-purple-600" />
            </div>
            <p className="text-purple-700 text-sm">Compliance keywords detected</p>
            <p className="text-xs text-purple-600 mt-1">Safety terms: 12 found</p>
          </div>
        </div>
      </div>
      {/* Digital Signatures */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Icon name="PenTool" size={20} className="mr-2" />
          Digital Signatures
        </h3>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">Technician Sign-off</span>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Signed
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Icon name="User" size={14} className="mr-2" />
              <span>John Doe - HVAC Technician</span>
              <span className="mx-2">•</span>
              <span>2025-01-07 14:30:00</span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">Supervisor Approval</span>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <Icon name="UserCheck" size={14} className="mr-2" />
                <span>Sarah Wilson - Maintenance Supervisor</span>
              </div>
              <Button size="sm">
                <Icon name="PenTool" size={14} className="mr-2" />
                Request Signature
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationTab;