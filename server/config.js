module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/task-manager',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  PORT: process.env.PORT || 5002
};
