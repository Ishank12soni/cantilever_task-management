import React from 'react';
import { FiCheckSquare, FiClock, FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';

const TaskStats = ({ stats }) => {
  if (!stats) return null;

  const getStatusCount = (status) => {
    const statusStat = stats.statusStats.find(s => s._id === status);
    return statusStat ? statusStat.count : 0;
  };

  const getPriorityCount = (priority) => {
    const priorityStat = stats.priorityStats.find(p => p._id === priority);
    return priorityStat ? priorityStat.count : 0;
  };

  const todoCount = getStatusCount('todo');
  const inProgressCount = getStatusCount('in-progress');
  const completedCount = getStatusCount('completed');
  const highPriorityCount = getPriorityCount('high');

  return (
    <div className="stats-grid">
      {/* Total Tasks */}
      <div className="stat-card">
        <div className="stat-number" style={{ color: '#3b82f6' }}>
          {stats.totalTasks}
        </div>
        <div className="stat-label">Total Tasks</div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
          <FiCheckSquare style={{ marginRight: '4px' }} />
          All tasks
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="stat-card">
        <div className="stat-number" style={{ color: '#10b981' }}>
          {stats.completedTasks}
        </div>
        <div className="stat-label">Completed</div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
          <FiCheckSquare style={{ marginRight: '4px' }} />
          {stats.completionRate}% completion rate
        </div>
      </div>

      {/* In Progress */}
      <div className="stat-card">
        <div className="stat-number" style={{ color: '#3b82f6' }}>
          {inProgressCount}
        </div>
        <div className="stat-label">In Progress</div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
          <FiClock style={{ marginRight: '4px' }} />
          Currently working
        </div>
      </div>

      {/* To Do */}
      <div className="stat-card">
        <div className="stat-number" style={{ color: '#6b7280' }}>
          {todoCount}
        </div>
        <div className="stat-label">To Do</div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
          <FiCheckSquare style={{ marginRight: '4px' }} />
          Pending tasks
        </div>
      </div>

      {/* High Priority */}
      <div className="stat-card">
        <div className="stat-number" style={{ color: '#ef4444' }}>
          {highPriorityCount}
        </div>
        <div className="stat-label">High Priority</div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
          <FiAlertTriangle style={{ marginRight: '4px' }} />
          Urgent tasks
        </div>
      </div>

      {/* Overdue */}
      <div className="stat-card">
        <div className="stat-number" style={{ color: '#ef4444' }}>
          {stats.overdueTasks}
        </div>
        <div className="stat-label">Overdue</div>
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
          <FiAlertTriangle style={{ marginRight: '4px' }} />
          Past due date
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
