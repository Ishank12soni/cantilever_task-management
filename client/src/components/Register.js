import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUserPlus, FiUser, FiMail, FiLock } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const result = await register(formData.username, formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <div className="card">
          <div className="text-center mb-6">
            <FiUserPlus size={48} style={{ color: '#3b82f6', marginBottom: '16px' }} />
            <h2>Create Account</h2>
            <p style={{ color: '#6b7280', marginTop: '8px' }}>
              Join us to start managing your tasks
            </p>
          </div>
          
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                <FiUser style={{ marginRight: '8px' }} />
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                value={formData.username}
                onChange={handleChange}
                required
                minLength="3"
                placeholder="Choose a username"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FiMail style={{ marginRight: '8px' }} />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <FiLock style={{ marginRight: '8px' }} />
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Create a password"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                <FiLock style={{ marginRight: '8px' }} />
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="text-center mt-4">
            <p style={{ color: '#6b7280' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#3b82f6', fontWeight: '500' }}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
