import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiCalendar, FiTag } from 'react-icons/fi';
import { format } from 'date-fns';

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      await onUpdate(task._id, { status: newStatus });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handlePriorityChange = async (newPriority) => {
    try {
      await onUpdate(task._id, { priority: newPriority });
    } catch (error) {
      console.error('Error updating task priority:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await onDelete(task._id);
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return '#6b7280';
      case 'in-progress': return '#3b82f6';
      case 'completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div 
      className={`task-card ${task.status} ${task.priority}-priority`}
      style={{
        opacity: isDeleting ? 0.5 : 1,
        borderLeftColor: getStatusColor(task.status)
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            color: '#1f2937',
            marginBottom: '8px',
            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
            opacity: task.status === 'completed' ? 0.7 : 1
          }}>
            {task.title}
          </h3>
          
          {task.description && (
            <p style={{ 
              color: '#6b7280', 
              marginBottom: '12px',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              {task.description}
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          <Link 
            to={`/edit-task/${task._id}`}
            className="btn btn-sm btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <FiEdit />
            Edit
          </Link>
          <button 
            onClick={handleDelete}
            className="btn btn-sm btn-danger"
            disabled={isDeleting}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <FiTrash2 />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {/* Status and Priority */}
      <div className="flex gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
            Status:
          </span>
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="status-badge"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              textTransform: 'uppercase'
            }}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
            Priority:
          </span>
          <select
            value={task.priority}
            onChange={(e) => handlePriorityChange(e.target.value)}
            className="priority-badge"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: '500',
              textTransform: 'uppercase'
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <FiTag style={{ color: '#6b7280', fontSize: '14px' }} />
          <div className="flex gap-2 flex-wrap">
            {task.tags.map((tag, index) => (
              <span 
                key={index}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '500'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Due Date */}
      {task.dueDate && (
        <div className="flex items-center gap-2">
          <FiCalendar style={{ color: '#6b7280', fontSize: '14px' }} />
          <span style={{ 
            fontSize: '12px', 
            color: isOverdue ? '#ef4444' : '#6b7280',
            fontWeight: isOverdue ? '500' : 'normal'
          }}>
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            {isOverdue && ' (Overdue)'}
          </span>
        </div>
      )}

      {/* Created Date */}
      <div style={{ 
        marginTop: '12px', 
        paddingTop: '12px', 
        borderTop: '1px solid #f3f4f6',
        fontSize: '11px',
        color: '#9ca3af'
      }}>
        Created: {format(new Date(task.createdAt), 'MMM dd, yyyy')}
      </div>
    </div>
  );
};

export default TaskCard;
