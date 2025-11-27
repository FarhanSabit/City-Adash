import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StaffDetailsModal = ({ staff, onClose }) => {
  if (!staff) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-fadeIn">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin animate-slideInUp">
        <div className="sticky top-0 bg-gradient-to-r from-card to-card/80 backdrop-blur-sm border-b border-border p-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Staff Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-all hover:rotate-90"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} color="var(--color-foreground)" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start gap-5 p-5 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl border border-border">
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted ring-4 ring-border shadow-lg">
                <Image
                  src={staff?.avatar}
                  alt={staff?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-card shadow-lg"
                style={{ backgroundColor: getStatusColor(staff?.status) }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-1">{staff?.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{staff?.role}</p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                  {staff?.employeeId}
                </span>
                <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-success/10 text-success capitalize border border-success/20">
                  {staff?.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Mail" size={16} color="var(--color-primary)" />
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email</span>
              </div>
              <p className="text-sm font-medium text-foreground truncate">{staff?.email}</p>
            </div>

            <div className="bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Phone" size={16} color="var(--color-primary)" />
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone</span>
              </div>
              <p className="text-sm font-medium text-foreground">{staff?.phone}</p>
            </div>

            <div className="bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="MapPin" size={16} color="var(--color-primary)" />
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Department</span>
              </div>
              <p className="text-sm font-medium text-foreground">{staff?.department}</p>
            </div>

            <div className="bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl p-4 border border-border hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Calendar" size={16} color="var(--color-primary)" />
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Shift</span>
              </div>
              <p className="text-sm font-medium text-foreground">{staff?.shift}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Award" size={16} color="var(--color-primary)" />
              Skills & Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {staff?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 text-sm font-semibold rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Icon name="ShieldCheck" size={16} color="var(--color-primary)" />
              Certifications
            </h4>
            <div className="space-y-2">
              {staff?.certifications?.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-border hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon name="Award" size={18} color="var(--color-accent)" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{cert?.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground px-3 py-1 bg-muted rounded-full">
                    Exp: {cert?.expiry}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center border border-primary/20 hover:shadow-md transition-all">
              <div className="text-3xl font-bold text-primary mb-1">{staff?.activeAssignments}</div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Tasks</div>
            </div>
            <div className="bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl p-4 text-center border border-warning/20 hover:shadow-md transition-all">
              <div className="text-3xl font-bold text-warning mb-1">{staff?.hoursThisWeek}</div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hours Week</div>
            </div>
            <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl p-4 text-center border border-success/20 hover:shadow-md transition-all">
              <div className="text-3xl font-bold text-success mb-1">{staff?.completedTasks}</div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Completed</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Activity" size={16} color="var(--color-primary)" />
              Recent Activity
            </h4>
            <div className="space-y-3">
              {staff?.recentActivity?.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-border hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle" size={18} color="var(--color-accent)" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity?.description}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                      {activity?.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gradient-to-r from-card to-card/80 backdrop-blur-sm border-t border-border p-5 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 border-2">
            Close
          </Button>
          <Button variant="default" className="flex-1 shadow-md hover:shadow-lg" iconName="UserPlus" iconPosition="left">
            Assign Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailsModal;