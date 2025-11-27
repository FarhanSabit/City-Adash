import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TicketDetailPanel = ({ ticket, onClose }) => {
  const [newComment, setNewComment] = useState('');

  if (!ticket) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Icon name="Inbox" size={48} color="var(--color-muted-foreground)" />
          <p className="mt-4 text-sm">Select a ticket to view details</p>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return 'var(--color-error)';
      case 'high':
        return 'var(--color-warning)';
      case 'medium':
        return 'var(--color-accent)';
      case 'low':
        return 'var(--color-success)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const handleAddComment = () => {
    if (newComment?.trim()) {
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Ticket Details</h2>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Close details"
        >
          <Icon name="X" size={20} color="var(--color-foreground)" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {ticket?.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {ticket?.id}
                  </span>
                  <div className="flex items-center gap-1">
                    <Icon
                      name="AlertCircle"
                      size={14}
                      color={getPriorityColor(ticket?.priority)}
                    />
                    <span className="text-xs font-medium" style={{ color: getPriorityColor(ticket?.priority) }}>
                      {ticket?.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className="ml-2 font-medium text-foreground">{ticket?.status}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Category:</span>
                <span className="ml-2 font-medium text-foreground">{ticket?.category}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Reporter:</span>
                <span className="ml-2 font-medium text-foreground">{ticket?.reporter}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Created:</span>
                <span className="ml-2 font-medium text-foreground">{ticket?.createdDate}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Assigned:</span>
                <span className="ml-2 font-medium text-foreground">
                  {ticket?.assignedTo || 'Unassigned'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">SLA:</span>
                <span className="ml-2 font-medium text-foreground">
                  {ticket?.slaHoursRemaining}h remaining
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Description</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {ticket?.description}
            </p>
          </div>

          {ticket?.attachments && ticket?.attachments?.length > 0 && (
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Attachments</h4>
              <div className="grid grid-cols-2 gap-3">
                {ticket?.attachments?.map((attachment, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg border border-border"
                    style={{ height: '120px' }}
                  >
                    <Image
                      src={attachment?.url}
                      alt={attachment?.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Activity Timeline</h4>
            <div className="space-y-3">
              {ticket?.timeline?.map((event, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name={event?.icon} size={14} color="var(--color-primary)" />
                    </div>
                    {index < ticket?.timeline?.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-foreground">{event?.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event?.user}</p>
                    <p className="text-xs text-muted-foreground">{event?.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Comments</h4>
            <div className="space-y-3 mb-4">
              {ticket?.comments?.map((comment, index) => (
                <div key={index} className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{comment?.user}</span>
                    <span className="text-xs text-muted-foreground">{comment?.timestamp}</span>
                  </div>
                  <p className="text-sm text-foreground">{comment?.text}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e?.target?.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
              />
              <Button
                variant="default"
                size="sm"
                iconName="Send"
                iconPosition="right"
                onClick={handleAddComment}
                disabled={!newComment?.trim()}
              >
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Button variant="default" size="sm" iconName="Check" fullWidth>
            Resolve
          </Button>
          <Button variant="outline" size="sm" iconName="UserPlus" fullWidth>
            Reassign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPanel;