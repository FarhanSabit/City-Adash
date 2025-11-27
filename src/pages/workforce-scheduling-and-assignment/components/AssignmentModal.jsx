import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AssignmentModal = ({ task, staff, onClose, onConfirm }) => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'var(--color-success)';
      case 'busy':
        return 'var(--color-warning)';
      case 'offline':
        return 'var(--color-muted-foreground)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const handleConfirm = () => {
    if (!selectedStaff || !scheduledDate || !scheduledTime) {
      alert('Please fill in all required fields');
      return;
    }

    onConfirm({
      task,
      staff: selectedStaff,
      scheduledDate,
      scheduledTime,
      priority,
      notes,
    });
  };

  const matchingStaff = staff?.filter((member) => {
    const hasMatchingSkills = task?.requiredSkills?.some((skill) =>
      member?.skills?.includes(skill)
    );
    const matchesSearch =
      member?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      member?.role?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return hasMatchingSkills && matchesSearch && member?.status !== 'offline';
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-fadeIn">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto scrollbar-thin animate-slideInUp">
        {/* Enhanced Header */}
        <div className="sticky top-0 bg-gradient-to-r from-card to-card/80 backdrop-blur-sm border-b border-border p-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-foreground">Assign Task to Staff</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Select staff member and schedule details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-all hover:rotate-90"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} color="var(--color-foreground)" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left Column - Task Details & Schedule */}
            <div className="space-y-5">
              {/* Enhanced Task Details Card */}
              <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-5 border border-border">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="FileText" size={16} color="var(--color-primary)" />
                  Task Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                      Title
                    </label>
                    <p className="text-sm font-medium text-foreground">{task?.title}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block flex items-center gap-1">
                        <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
                        Location
                      </label>
                      <p className="text-sm font-medium text-foreground">{task?.location}</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block flex items-center gap-1">
                        <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                        Duration
                      </label>
                      <p className="text-sm font-medium text-foreground">{task?.estimatedHours} hours</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block flex items-center gap-1">
                      <Icon name="Tool" size={12} color="var(--color-muted-foreground)" />
                      Required Skills
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {task?.requiredSkills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/10 text-primary border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Schedule Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Scheduled Date *
                    </label>
                    <Input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e?.target?.value)}
                      required
                      className="shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Scheduled Time *
                    </label>
                    <Input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e?.target?.value)}
                      required
                      className="shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Priority Level
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e?.target?.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
                  >
                    <option value="critical">🔴 Critical</option>
                    <option value="high">🟠 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Assignment Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e?.target?.value)}
                    rows={4}
                    placeholder="Add any special instructions or notes..."
                    className="w-full px-4 py-3 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Staff Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Icon name="Users" size={16} color="var(--color-primary)" />
                  Select Staff Member *
                </h3>
                <span className="text-xs font-semibold text-muted-foreground px-3 py-1 bg-muted rounded-full">
                  {matchingStaff?.length} matching
                </span>
              </div>

              <Input
                type="search"
                placeholder="Search by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="shadow-sm"
              />

              <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin pr-1">
                {matchingStaff?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                      <Icon name="UserX" size={32} color="var(--color-muted-foreground)" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">No matching staff available</p>
                    <p className="text-xs text-muted-foreground mt-1">Try adjusting your search</p>
                  </div>
                ) : (
                  matchingStaff?.map((member) => (
                    <div
                      key={member?.id}
                      onClick={() => setSelectedStaff(member)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        selectedStaff?.id === member?.id
                          ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50 hover:bg-muted/30 hover:shadow'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted ring-2 ring-border">
                            <Image
                              src={member?.avatar}
                              alt={member?.avatarAlt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div
                            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card shadow"
                            style={{ backgroundColor: getStatusColor(member?.status) }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-foreground truncate">
                                {member?.name}
                              </h4>
                              <p className="text-xs text-muted-foreground truncate">{member?.role}</p>
                            </div>
                            {selectedStaff?.id === member?.id && (
                              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <Icon name="Check" size={14} color="white" />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-2.5">
                            {member?.skills
                              ?.filter((skill) => task?.requiredSkills?.includes(skill))
                              ?.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>

                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Icon name="Briefcase" size={12} color="var(--color-muted-foreground)" />
                              <span className="font-medium">{member?.activeAssignments} active</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                              <span className="font-medium">{member?.hoursThisWeek}h week</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-card to-card/80 backdrop-blur-sm border-t border-border p-5 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 border-2">
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            disabled={!selectedStaff || !scheduledDate || !scheduledTime}
            className="flex-1 shadow-md hover:shadow-lg"
            iconName="CheckCircle"
            iconPosition="left"
          >
            Confirm Assignment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;