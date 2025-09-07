import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import taskService from '../services/taskService';
import TaskCard from './TaskCard';
import TaskFilter from './TaskFilter';
import TaskStats from './TaskStats';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: ''
  });

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks(filters);
      setTasks(response.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await taskService.getTaskStats();
      setStats(response);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      fetchStats(); // Refresh stats after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const response = await taskService.updateTask(taskId, updatedData);
      setTasks(tasks.map(task => 
        task._id === taskId ? response.task : task
      ));
      fetchStats(); // Refresh stats after update
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const refreshData = () => {
    fetchTasks();
    fetchStats();
  };

  if (loading && tasks.length === 0) {
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
            Welcome back, {user?.username}!
          </h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            Manage your tasks efficiently
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={refreshData}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FiRefreshCw />
            Refresh
          </button>
          <Link to="/create-task" className="btn btn-primary">
            <FiPlus />
            Add Task
          </Link>
        </div>
      </div>

      {/* Stats */}
      {stats && <TaskStats stats={stats} />}

      {/* Filters */}
      <TaskFilter filters={filters} onFilterChange={handleFilterChange} />

      {/* Tasks */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
            Your Tasks ({tasks.length})
          </h2>
        </div>

        {tasks.length === 0 ? (
          <div className="card text-center">
            <div style={{ padding: '3rem' }}>
              <div style={{ 
                fontSize: '4rem', 
                color: '#d1d5db', 
                marginBottom: '1rem' 
              }}>
                📝
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#6b7280' }}>
                No tasks found
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
                {filters.status || filters.priority || filters.search 
                  ? 'Try adjusting your filters or create a new task.'
                  : 'Get started by creating your first task!'
                }
              </p>
              <Link to="/create-task" className="btn btn-primary">
                <FiPlus />
                Create Your First Task
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
