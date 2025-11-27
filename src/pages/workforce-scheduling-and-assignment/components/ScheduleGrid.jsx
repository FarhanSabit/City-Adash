import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ScheduleGrid = ({ scheduleData, onTaskClick, onCellClick }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  const getTaskColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-error/15 border-error/30 text-error hover:bg-error/20';
      case 'high':
        return 'bg-warning/15 border-warning/30 text-warning hover:bg-warning/20';
      case 'medium':
        return 'bg-accent/15 border-accent/30 text-accent hover:bg-accent/20';
      case 'low':
        return 'bg-success/15 border-success/30 text-success hover:bg-success/20';
      default:
        return 'bg-muted border-border text-foreground hover:bg-muted/80';
    }
  };

  const navigateWeek = (direction) => {
    setCurrentWeek(prev => prev + direction);
  };

  const getWeekDateRange = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate?.setDate(today?.getDate() + (currentWeek * 7));
    const endDate = new Date(startDate);
    endDate?.setDate(startDate?.getDate() + 6);
    
    return `${startDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-border bg-gradient-to-r from-muted/30 to-muted/10">
        <div>
          <h2 className="text-lg font-bold text-foreground">Weekly Schedule</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{getWeekDateRange()}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2.5 rounded-lg hover:bg-card border border-border transition-all hover:shadow-sm"
            aria-label="Previous week"
          >
            <Icon name="ChevronLeft" size={18} color="var(--color-foreground)" />
          </button>
          <button
            onClick={() => setCurrentWeek(0)}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20"
          >
            Today
          </button>
          <button
            onClick={() => navigateWeek(1)}
            className="p-2.5 rounded-lg hover:bg-card border border-border transition-all hover:shadow-sm"
            aria-label="Next week"
          >
            <Icon name="ChevronRight" size={18} color="var(--color-foreground)" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-6 border-b border-border bg-muted/20">
            <div className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Time
            </div>
            {weekDays?.map((day, index) => (
              <div
                key={index}
                className="p-4 text-xs font-bold text-foreground text-center border-l border-border uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="divide-y divide-border">
            {timeSlots?.map((time, timeIndex) => (
              <div key={timeIndex} className="grid grid-cols-6 min-h-[90px]">
                <div className="p-4 text-xs font-semibold text-muted-foreground bg-muted/10 flex items-start">
                  {time}
                </div>
                {weekDays?.map((day, dayIndex) => {
                  const cellKey = `${day}-${time}`;
                  const tasks = scheduleData?.[cellKey] || [];
                  
                  return (
                    <div
                      key={dayIndex}
                      onClick={() => onCellClick(day, time)}
                      className="p-2.5 border-l border-border hover:bg-accent/5 cursor-pointer transition-colors relative group"
                    >
                      <div className="space-y-2">
                        {tasks?.map((task, taskIndex) => (
                          <div
                            key={taskIndex}
                            onClick={(e) => {
                              e?.stopPropagation();
                              onTaskClick(task);
                            }}
                            className={`p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all shadow-sm hover:shadow ${getTaskColor(task?.priority)}`}
                          >
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-current" />
                              <span className="truncate font-semibold">{task?.assignee}</span>
                            </div>
                            <div className="truncate text-xs opacity-90">{task?.title}</div>
                          </div>
                        ))}
                      </div>
                      {tasks?.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon name="Plus" size={16} color="var(--color-muted-foreground)" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-muted/10">
        <div className="flex items-center gap-6 text-xs flex-wrap">
          <span className="text-muted-foreground font-semibold uppercase tracking-wider">Priority:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-error/20 border border-error/30" />
            <span className="text-foreground font-medium">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-warning/20 border border-warning/30" />
            <span className="text-foreground font-medium">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-accent/20 border border-accent/30" />
            <span className="text-foreground font-medium">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-success/20 border border-success/30" />
            <span className="text-foreground font-medium">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;