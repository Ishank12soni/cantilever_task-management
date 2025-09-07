import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import taskService from '../services/taskService';
import { FiSave, FiX, FiCalendar, FiTag } from 'react-icons/fi';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    tags: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      setInitialLoading(true);
      const response = await taskService.getTask(id);
      const task = response.task;
      
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        tags: task.tags ? task.tags.join(', ') : ''
      });
    } catch (error) {
      setError('Failed to load task');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const taskData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate || null,
        tags: tagsArray
      };

      if (isEdit) {
        await taskService.updateTask(id, taskData);
      } else {
        await taskService.createTask(taskData);
      }
      
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} task`);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
              {isEdit ? 'Edit Task' : 'Create New Task'}
            </h2>
            <button 
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <FiX />
              Cancel
            </button>
          </div>
          
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Task Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter task title"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your task..."
                rows="4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority" className="form-label">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="dueDate" className="form-label">
                <FiCalendar style={{ marginRight: '8px' }} />
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="form-input"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="tags" className="form-label">
                <FiTag style={{ marginRight: '8px' }} />
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="form-input"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Enter tags separated by commas (e.g., work, urgent, project)"
              />
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                Separate multiple tags with commas
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FiSave />
                {loading ? 'Saving...' : (isEdit ? 'Update Task' : 'Create Task')}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
