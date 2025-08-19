import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        result = await register(formData.name, formData.email, formData.password);
      }

      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <div className="brand">
            <div className="brand-icon"></div>
            <span className="brand-name">Login</span>
          </div>

          <div className="login-content">
            <h1 className="welcome-title">
              {isLogin ? (
                <>Hello,<br />Welcome Back</>
              ) : (
                <>Create<br />Account</>
              )}
            </h1>
            <p className="welcome-subtitle">
              {isLogin
                ? "Hey, welcome back to your special place"
                : "Join us and create your account today"
              }
            </p>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              {!isLogin && (
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="login-input"
                    required
                  />
                </div>
              )}

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="login-input"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  className="login-input"
                  required
                  minLength="6"
                />
              </div>

              {isLogin && (
                <div className="form-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <a href="#" className="forgot-password">
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="sign-in-btn"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="signup-link">
              {isLogin ? (
                <>Don't have an account? <button onClick={toggleMode} className="signup-text">Sign Up</button></>
              ) : (
                <>Already have an account? <button onClick={toggleMode} className="signup-text">Sign In</button></>
              )}
            </div>
          </div>
        </div>

        <div className="login-right">
          <img
            src={require('../login-background.png')}
            alt="Login illustration with fingerprint authentication"
            className="login-illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;