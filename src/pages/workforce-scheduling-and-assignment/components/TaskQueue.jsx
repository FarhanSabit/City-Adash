import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskQueue = ({ tasks, onAssignTask, onTaskDetails }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
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

  const filteredTasks = tasks?.filter(task => {
    if (filter === 'all') return true;
    return task?.status === filter;
  });

  const sortedTasks = [...filteredTasks]?.sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder?.[a?.priority] - priorityOrder?.[b?.priority];
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-border bg-gradient-to-r from-muted/30 to-muted/10">
        <h2 className="text-lg font-bold text-foreground mb-4">Task Queue</h2>
        
        <div className="space-y-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
          >
            <option value="all">All Tasks</option>
            <option value="unassigned">Unassigned</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
          >
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by Due Date</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
        {sortedTasks?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Icon name="CheckCircle" size={32} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No tasks in queue</p>
            <p className="text-xs text-muted-foreground mt-1">All caught up!</p>
          </div>
        ) : (
          sortedTasks?.map((task) => (
            <div
              key={task?.id}
              className="bg-gradient-to-br from-background to-background/80 border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${getPriorityColor(task?.priority)}15` }}
                >
                  <Icon
                    name={getPriorityIcon(task?.priority)}
                    size={18}
                    color={getPriorityColor(task?.priority)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-foreground truncate mb-1">
                    {task?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
                    {task?.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {task?.requiredSkills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs mb-4 py-2 px-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                  <span className="font-medium">{task?.estimatedHours}h</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Calendar" size={12} color="var(--color-muted-foreground)" />
                  <span className="font-medium">{task?.dueDate}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTaskDetails(task)}
                  iconName="Eye"
                  iconPosition="left"
                  iconSize={14}
                  className="flex-1 border-border hover:bg-muted"
                >
                  View
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onAssignTask(task)}
                  iconName="UserPlus"
                  iconPosition="left"
                  iconSize={14}
                  className="flex-1 shadow-sm hover:shadow"
                >
                  Assign
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-border bg-muted/10">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-foreground font-semibold">Total: {sortedTasks?.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-foreground font-semibold">
              Unassigned: {tasks?.filter(t => t?.status === 'unassigned')?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskQueue;