# Task Manager

A full-stack task management application with authentication, CRUD operations, filtering, sorting, and responsive design.

## Features

- **User Authentication**: Register, login, and logout functionality
- **Task Management**: Create, read, update, and delete tasks
- **Advanced Filtering**: Filter tasks by status, priority, and search
- **Smart Sorting**: Sort tasks by date, title, priority, and status
- **Task Statistics**: Overview of task completion rates and priorities
- **Responsive Design**: Works perfectly on mobile and desktop
- **Real-time Updates**: Instant status and priority changes
- **Due Date Tracking**: Track overdue tasks
- **Tag System**: Organize tasks with custom tags

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Context API for state management
- React Icons for UI icons
- date-fns for date formatting

## Prerequisites

Before running this application, make sure you have the following installed:

1. **Node.js** (version 14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **npm** (comes with Node.js)

## Installation

1. **Clone or download the project**
   ```bash
   cd task-manager
   ```

2. **Install dependencies for all parts**
   ```bash
   npm run install-all
   ```

3. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the MongoDB connection string in `server/config.js` if needed
   - Default connection: `mongodb://127.0.0.1:27017/task-manager`

4. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5002) and frontend development server (port 3000).

## Manual Setup (if npm run install-all doesn't work)

1. **Install root dependencies**
   ```bash
   npm install
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

## Usage

1. **Start the backend server**
   ```bash
   npm run server
   ```

2. **Start the frontend (in a new terminal)**
   ```bash
   npm run client
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5002

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Tasks
- `GET /api/tasks` - Get all tasks with filtering and sorting (requires token)
- `GET /api/tasks/:id` - Get a specific task (requires token)
- `POST /api/tasks` - Create a new task (requires token)
- `PUT /api/tasks/:id` - Update a task (requires token)
- `DELETE /api/tasks/:id` - Delete a task (requires token)
- `GET /api/tasks/stats/overview` - Get task statistics (requires token)

### Query Parameters for Tasks
- `status` - Filter by status (todo, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `sortBy` - Sort by field (createdAt, updatedAt, dueDate, title, priority, status)
- `sortOrder` - Sort order (asc, desc)
- `search` - Search in title, description, and tags

## Project Structure

```
task-manager/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React Context for state management
│   │   ├── services/       # API service functions
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # Express routes
│   ├── middleware/         # Custom middleware
│   ├── config.js           # Configuration
│   ├── index.js            # Server entry point
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

## Features Overview

### Task Management
- **Create Tasks**: Add new tasks with title, description, status, priority, due date, and tags
- **Edit Tasks**: Modify existing tasks with full form validation
- **Delete Tasks**: Remove tasks with confirmation dialog
- **Status Updates**: Quick status changes (To Do, In Progress, Completed)
- **Priority Management**: Set and change task priorities (Low, Medium, High)

### Filtering & Sorting
- **Status Filter**: Filter by task status
- **Priority Filter**: Filter by task priority
- **Search**: Search across title, description, and tags
- **Sorting**: Sort by creation date, update date, due date, title, priority, or status
- **Sort Order**: Ascending or descending order

### Statistics Dashboard
- **Total Tasks**: Count of all tasks
- **Completion Rate**: Percentage of completed tasks
- **Status Breakdown**: Count by status (To Do, In Progress, Completed)
- **Priority Overview**: Count by priority level
- **Overdue Tasks**: Count of tasks past their due date

### User Experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Instant updates without page refresh
- **Intuitive UI**: Clean, modern interface with clear visual hierarchy
- **Loading States**: Proper loading indicators and error handling
- **Form Validation**: Client and server-side validation

## Environment Variables

Create a `.env` file in the server directory with:

```
MONGODB_URI=mongodb://127.0.0.1:27017/task-manager
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5002
```

## Deployment

### Backend (Heroku)
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect your GitHub repository
4. Deploy from the main branch

### Frontend (Netlify)
1. Build the React app: `npm run build`
2. Deploy the `client/build` folder to Netlify
3. Set environment variables for API URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
# cantilever_task-management
