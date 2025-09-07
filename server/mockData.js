// Mock data storage for development
let users = [];
let tasks = [];
let nextUserId = 1;
let nextTaskId = 1;

const mockData = {
  users: {
    create: (userData) => {
      const user = {
        _id: nextUserId++,
        ...userData,
        createdAt: new Date()
      };
      users.push(user);
      return user;
    },
    findByEmail: (email) => users.find(u => u.email === email),
    findById: (id) => users.find(u => u._id === id),
    findByEmailOrUsername: (email, username) => 
      users.find(u => u.email === email || u.username === username)
  },
  
  tasks: {
    create: (taskData) => {
      const task = {
        _id: nextTaskId++,
        ...taskData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      tasks.push(task);
      return task;
    },
    findById: (id) => tasks.find(t => t._id === id),
    findByUser: (userId) => tasks.filter(t => t.user === userId),
    update: (id, updateData) => {
      const index = tasks.findIndex(t => t._id === id);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updateData, updatedAt: new Date() };
        return tasks[index];
      }
      return null;
    },
    delete: (id) => {
      const index = tasks.findIndex(t => t._id === id);
      if (index !== -1) {
        return tasks.splice(index, 1)[0];
      }
      return null;
    },
    count: () => tasks.length,
    findByUserWithFilters: (userId, filters) => {
      let filteredTasks = tasks.filter(t => t.user === userId);
      
      if (filters.status) {
        filteredTasks = filteredTasks.filter(t => t.status === filters.status);
      }
      
      if (filters.priority) {
        filteredTasks = filteredTasks.filter(t => t.priority === filters.priority);
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredTasks = filteredTasks.filter(t => 
          t.title.toLowerCase().includes(searchTerm) ||
          (t.description && t.description.toLowerCase().includes(searchTerm)) ||
          (t.tags && t.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
      }
      
      // Sort tasks
      const sortBy = filters.sortBy || 'createdAt';
      const sortOrder = filters.sortOrder || 'desc';
      
      filteredTasks.sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];
        
        if (sortBy === 'createdAt' || sortBy === 'updatedAt' || sortBy === 'dueDate') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }
        
        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
      
      return filteredTasks;
    },
    getStats: (userId) => {
      const userTasks = tasks.filter(t => t.user === userId);
      
      const statusStats = userTasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      }, {});
      
      const priorityStats = userTasks.reduce((acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
      }, {});
      
      const totalTasks = userTasks.length;
      const completedTasks = statusStats.completed || 0;
      const overdueTasks = userTasks.filter(t => 
        t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed'
      ).length;
      
      return {
        statusStats: Object.entries(statusStats).map(([status, count]) => ({ _id: status, count })),
        priorityStats: Object.entries(priorityStats).map(([priority, count]) => ({ _id: priority, count })),
        totalTasks,
        completedTasks,
        overdueTasks,
        completionRate: totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(1) : 0
      };
    }
  }
};

module.exports = mockData;
