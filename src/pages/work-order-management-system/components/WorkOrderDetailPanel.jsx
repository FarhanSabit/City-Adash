import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WorkOrderDetailPanel = ({ workOrder }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [newComment, setNewComment] = useState('');

  if (!workOrder) {
    return (
      <div className="h-full flex items-center justify-center bg-card border-l border-border">
        <div className="text-center">
          <Icon name="ClipboardList" size={48} color="var(--color-muted-foreground)" />
          <p className="mt-4 text-sm text-muted-foreground">Select a work order to view details</p>
        </div>
      </div>);

  }

  const attachments = [
  {
    id: 1,
    name: 'chiller-inspection-photo.jpg',
    type: 'image',
    url: "https://images.unsplash.com/photo-1570289826062-448027fa2197",
    alt: 'Industrial chiller unit with visible pipes and control panel in mechanical room with concrete walls',
    uploadedBy: 'John Martinez',
    uploadedAt: '2025-11-20T08:30:00'
  },
  {
    id: 2,
    name: 'maintenance-checklist.pdf',
    type: 'document',
    url: '#',
    alt: 'PDF document icon',
    uploadedBy: 'Sarah Chen',
    uploadedAt: '2025-11-20T09:15:00'
  }];


  const comments = [
  {
    id: 1,
    author: 'John Martinez',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d99ddb00-1763291684442.png",
    avatarAlt: 'Professional headshot of Hispanic male technician with short black hair wearing blue work uniform',
    content: 'Started inspection at 8:00 AM. Found refrigerant levels slightly low. Proceeding with top-up and leak detection.',
    timestamp: '2025-11-20T08:45:00',
    isInternal: false
  },
  {
    id: 2,
    author: 'Sarah Chen',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb9cc40e-1763295859243.png",
    avatarAlt: 'Professional headshot of Asian female supervisor with long black hair wearing white shirt and safety vest',
    content: 'Approved additional parts requisition. ETA for replacement gaskets is 2 hours.',
    timestamp: '2025-11-20T09:30:00',
    isInternal: true
  }];


  const approvalWorkflow = [
  { step: 'Technician Review', status: 'completed', approver: 'John Martinez', date: '2025-11-20T08:00:00' },
  { step: 'Supervisor Approval', status: 'completed', approver: 'Sarah Chen', date: '2025-11-20T08:15:00' },
  { step: 'Parts Authorization', status: 'in-progress', approver: 'Mike Johnson', date: null },
  { step: 'Final Sign-off', status: 'pending', approver: 'David Lee', date: null }];


  const getStatusIcon = (status) => {
    const icons = {
      completed: 'CheckCircle2',
      'in-progress': 'Clock',
      pending: 'Circle'
    };
    return icons?.[status];
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'var(--color-success)',
      'in-progress': 'var(--color-primary)',
      pending: 'var(--color-muted-foreground)'
    };
    return colors?.[status];
  };

  const handleAddComment = () => {
    if (newComment?.trim()) {
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="flex flex-col bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground truncate">{workOrder?.id}</h2>
            <p className="text-sm text-muted-foreground truncate">{workOrder?.asset}</p>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Icon name="X" size={20} color="var(--color-muted-foreground)" />
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={activeTab === 'details' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('details')}>
            Details
          </Button>
          <Button
            variant={activeTab === 'attachments' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('attachments')}>
            Attachments ({attachments?.length})
          </Button>
          <Button
            variant={activeTab === 'comments' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('comments')}>
            Comments ({comments?.length})
          </Button>
          <Button
            variant={activeTab === 'approval' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('approval')}>
            Approval
          </Button>
        </div>
      </div>
      <div className="p-4">
        {activeTab === 'details' &&
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Priority</label>
                <div className="mt-1">
                  <span
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${workOrder?.priority === 'critical' ? 'var(--color-error)' : 'var(--color-warning)'}15`,
                    color: workOrder?.priority === 'critical' ? 'var(--color-error)' : 'var(--color-warning)'
                  }}>

                    <Icon name="AlertCircle" size={12} />
                    {workOrder?.priority?.charAt(0)?.toUpperCase() + workOrder?.priority?.slice(1)}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <Select
                  options={[
                  { value: 'pending-approval', label: 'Pending Approval' },
                  { value: 'scheduled', label: 'Scheduled' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' }]
                  }
                  value={workOrder?.status}
                  onChange={() => {}} />

                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Assigned Technician</label>
              <div className="mt-1">
                <Select
                options={[
                { value: 'john', label: 'John Martinez' },
                { value: 'sarah', label: 'Sarah Chen' },
                { value: 'mike', label: 'Mike Johnson' }]
                }
                value="john"
                onChange={() => {}} />

              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Scheduled Date</label>
                <Input
                type="date"
                value={workOrder?.scheduledDate}
                onChange={() => {}}
                className="mt-1" />

              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Type</label>
                <div className="mt-1">
                  <Select
                  options={[
                  { value: 'preventive', label: 'Preventive' },
                  { value: 'corrective', label: 'Corrective' },
                  { value: 'emergency', label: 'Emergency' },
                  { value: 'inspection', label: 'Inspection' }]
                  }
                  value={workOrder?.type?.toLowerCase()}
                  onChange={() => {}} />

                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <textarea
              className="mt-1 w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="Enter work order description..."
              defaultValue="Routine maintenance inspection of chiller unit. Check refrigerant levels, inspect compressor, clean condenser coils, and verify control system operation." />

            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Estimated Hours</label>
                <Input
                type="number"
                value={workOrder?.estimatedHours}
                onChange={() => {}}
                className="mt-1" />

              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Actual Hours</label>
                <Input
                type="number"
                value={workOrder?.actualHours}
                onChange={() => {}}
                className="mt-1" />

              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Completion Progress</label>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${workOrder?.completionPercentage}%` }} />

                </div>
                <span className="text-sm font-medium text-foreground">
                  {workOrder?.completionPercentage}%
                </span>
              </div>
            </div>
          </div>
        }

        {activeTab === 'attachments' &&
        <div className="space-y-3">
            <Button variant="outline" size="sm" iconName="Upload" iconPosition="left" fullWidth>
              Upload Attachment
            </Button>
            {attachments?.map((attachment) =>
          <div key={attachment?.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                {attachment?.type === 'image' ?
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                src={attachment?.url}
                alt={attachment?.alt}
                className="w-full h-full object-cover" />

                  </div> :

            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={24} color="var(--color-muted-foreground)" />
                  </div>
            }
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{attachment?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Uploaded by {attachment?.uploadedBy}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(attachment.uploadedAt)?.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="Download" size={16} color="var(--color-muted-foreground)" />
                </Button>
              </div>
          )}
          </div>
        }

        {activeTab === 'comments' &&
        <div className="space-y-4">
            <div className="space-y-3">
              {comments?.map((comment) =>
            <div key={comment?.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                  src={comment?.avatar}
                  alt={comment?.avatarAlt}
                  className="w-full h-full object-cover" />

                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{comment?.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.timestamp)?.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                      </span>
                      {comment?.isInternal &&
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-warning/10 text-warning">
                          Internal
                        </span>
                  }
                    </div>
                    <p className="text-sm text-foreground">{comment?.content}</p>
                  </div>
                </div>
            )}
            </div>

            <div className="pt-4 border-t border-border">
              <textarea
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)} />

              <div className="mt-2 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={handleAddComment}>
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        }

        {activeTab === 'approval' &&
        <div className="space-y-4">
            {approvalWorkflow?.map((step, index) =>
          <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${getStatusColor(step?.status)}15`,
                  color: getStatusColor(step?.status)
                }}>

                    <Icon name={getStatusIcon(step?.status)} size={16} color={getStatusColor(step?.status)} />
                  </div>
                  {index < approvalWorkflow?.length - 1 &&
              <div className="w-0.5 h-12 bg-border mt-2" />
              }
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-foreground">{step?.step}</p>
                  <p className="text-xs text-muted-foreground">{step?.approver}</p>
                  {step?.date &&
              <p className="text-xs text-muted-foreground">
                      {new Date(step.date)?.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
                    </p>
              }
                </div>
              </div>
          )}
          </div>
        }
      </div>
      <div className="p-4 border-t border-border flex gap-2">
        <Button variant="outline" fullWidth>
          Cancel
        </Button>
        <Button variant="default" fullWidth>
          Save Changes
        </Button>
      </div>
    </div>);

};

export default WorkOrderDetailPanel;