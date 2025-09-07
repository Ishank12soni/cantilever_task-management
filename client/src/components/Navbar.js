import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiPlus, FiLogOut, FiUser, FiCheckSquare } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '1rem 0',
      marginBottom: '2rem',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#3b82f6',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FiCheckSquare />
            Task Manager
          </Link>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {user ? (
              <>
                <Link to="/create-task" className="btn btn-primary">
                  <FiPlus />
                  Add Task
                </Link>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '8px 16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <FiUser style={{ color: '#6b7280' }} />
                  <span style={{ color: '#374151', fontWeight: '500' }}>
                    {user.username}
                  </span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
