import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.agreeToTerms
      );

      if (response.success) {
        // Registration successful - redirect to login
        navigate('/login', { 
          state: { message: 'Registration successful! Please login to continue.' } 
        });
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Server error. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join thousands of users managing their stress with our smart solution</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message" style={{ 
                color: '#e74c3c', 
                backgroundColor: '#fee', 
                padding: '10px', 
                borderRadius: '4px', 
                marginBottom: '15px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password (min 6 characters)"
                required
                minLength={6}
                disabled={loading}
              />
            </div>
            <div className="form-options">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span className="checkmark"></span>
                I agree to the{' '}
                <Link to="/terms" className="terms-link">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="terms-link">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className="auth-btn primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-visual">
          <div className="visual-content">
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">🧠</div>
                <div className="benefit-text">
                  <h4>Smart Detection</h4>
                  <p>Advanced stress detection using multiple inputs</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <div className="benefit-icon">🎯</div>
                <div className="benefit-text">
                  <h4>Personalized Relief</h4>
                  <p>Tailored interventions for your stress level</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <div className="benefit-icon">📊</div>
                <div className="benefit-text">
                  <h4>Progress Tracking</h4>
                  <p>Monitor your wellness journey over time</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <div className="benefit-icon">🔒</div>
                <div className="benefit-text">
                  <h4>Privacy First</h4>
                  <p>Your data is protected and secure</p>
                </div>
              </div>
            </div>
            
            <div className="visual-footer">
              <h3>Start Your Wellness Journey</h3>
              <p>Join our community of users who have transformed their stress management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
