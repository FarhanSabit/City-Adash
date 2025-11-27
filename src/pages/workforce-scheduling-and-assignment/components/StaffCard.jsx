import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const StaffCard = ({ staff, onAssign, onViewDetails }) => {
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

  const getStatusBg = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success/10';
      case 'busy':
        return 'bg-warning/10';
      case 'offline':
        return 'bg-muted';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted ring-2 ring-border">
            <Image
              src={staff?.avatar}
              alt={staff?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${getStatusBg(staff?.status)}`}
            style={{ backgroundColor: getStatusColor(staff?.status) }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground truncate">
                {staff?.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate">{staff?.role}</p>
            </div>
            <button
              onClick={() => onViewDetails(staff)}
              className="p-1.5 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
              aria-label="View staff details"
            >
              <Icon name="MoreVertical" size={16} color="var(--color-muted-foreground)" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {staff?.skills?.slice(0, 2)?.map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary"
              >
                {skill}
              </span>
            ))}
            {staff?.skills?.length > 2 && (
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground">
                +{staff?.skills?.length - 2}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-border">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-medium">{staff?.activeAssignments} tasks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                <span className="font-medium">{staff?.hoursThisWeek}h</span>
              </div>
            </div>
            <button
              onClick={() => onAssign(staff)}
              disabled={staff?.status === 'offline'}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;