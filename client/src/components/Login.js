import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
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
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
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
            <FiLogIn size={48} style={{ color: '#3b82f6', marginBottom: '16px' }} />
            <h2>Welcome Back</h2>
            <p style={{ color: '#6b7280', marginTop: '8px' }}>
              Sign in to manage your tasks
            </p>
          </div>
          
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="text-center mt-4">
            <p style={{ color: '#6b7280' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#3b82f6', fontWeight: '500' }}>
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
