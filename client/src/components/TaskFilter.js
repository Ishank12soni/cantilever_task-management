import React from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const TaskFilter = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      status: '',
      priority: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = filters.status || filters.priority || filters.search;

  return (
    <div className="filter-bar">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiFilter style={{ color: '#6b7280' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937' }}>
            Filters & Sorting
          </h3>
        </div>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="btn btn-sm btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <FiX />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="form-group">
          <label className="form-label">
            <FiSearch style={{ marginRight: '8px' }} />
            Search Tasks
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Search by title, description, or tags..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            className="form-select"
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="form-group">
          <label className="form-label">Sort By</label>
          <select
            className="form-select"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="createdAt">Created Date</option>
            <option value="updatedAt">Updated Date</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Sort Order */}
      <div className="flex items-center gap-4 mt-4">
        <label className="form-label" style={{ marginBottom: 0 }}>
          Sort Order:
        </label>
        <div className="flex gap-2">
          <button
            className={`btn btn-sm ${filters.sortOrder === 'desc' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleFilterChange('sortOrder', 'desc')}
          >
            Newest First
          </button>
          <button
            className={`btn btn-sm ${filters.sortOrder === 'asc' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleFilterChange('sortOrder', 'asc')}
          >
            Oldest First
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
              Active filters:
            </span>
            {filters.status && (
              <span className="status-badge status-todo">
                Status: {filters.status}
              </span>
            )}
            {filters.priority && (
              <span className="priority-badge priority-medium">
                Priority: {filters.priority}
              </span>
            )}
            {filters.search && (
              <span style={{
                display: 'inline-block',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '500'
              }}>
                Search: "{filters.search}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;
