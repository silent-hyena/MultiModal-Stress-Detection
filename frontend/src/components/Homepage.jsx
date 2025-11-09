import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

//   const handleLearnMore = () => {
//     navigate('/register');
//   };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Smart Stress Management
          </h1>
          <p className="hero-subtitle">
            Advanced technology meets personalized wellness - detect stress and find relief that works for you
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>Get Started</button>
            {/* <button className="btn-secondary" onClick={handleLearnMore}>Learn More</button> */}
          </div>
        </div>
        <div className="hero-visual">
          <div className="stress-indicator">
            <div className="stress-level low">Low</div>
            <div className="stress-level medium">Medium</div>
            <div className="stress-level high">High</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">Comprehensive stress detection and personalized relief solutions</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Smart Detection</h3>
              <p>Our system analyzes facial expressions, voice tone, and text to understand your stress levels accurately</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Relief</h3>
              <p>Dynamic interventions tailored to your stress level - from memes to meditation</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>Personalized Content</h3>
              <p>Custom affirmations, motivational content, and humor tailored specifically for you</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Stress Analytics</h3>
              <p>Track your stress patterns over time with comprehensive visualizations and insights</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Privacy First</h3>
              <p>Your data is protected - raw inputs are discarded immediately, only stress scores are stored</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Support</h3>
              <p>Instant stress detection and immediate relief suggestions for better mental wellness</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Simple steps to transform your stress management journey</p>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Smart Input</h3>
              <p>Our system analyzes your facial expressions, voice tone, and text to detect stress patterns</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Smart Classification</h3>
              <p>Our system classifies your stress level as Low, Medium, or High with high accuracy</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Personalized Relief</h3>
              <p>Get tailored interventions - memes for low stress, music for medium, meditation for high stress</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Track Progress</h3>
              <p>Monitor your stress trends and wellness journey with detailed analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stress Levels Section */}
      <section className="stress-levels">
        <div className="container">
          <h2 className="section-title">Personalized Stress Relief</h2>
          <p className="section-subtitle">Tailored interventions based on your unique stress patterns</p>
          <div className="stress-cards">
            <div className="stress-card low">
              <div className="stress-header">
                <h3>Low Stress</h3>
                <div className="stress-indicator-dot low"></div>
              </div>
              <p>Light relief activities to maintain your positive mood</p>
              <ul>
                <li>🎭 Personalized memes and jokes</li>
                <li>😄 AI-generated humor</li>
                <li>🎵 Upbeat music recommendations</li>
              </ul>
            </div>
            <div className="stress-card medium">
              <div className="stress-header">
                <h3>Medium Stress</h3>
                <div className="stress-indicator-dot medium"></div>
              </div>
              <p>Calming activities to help you relax and unwind</p>
              <ul>
                <li>🎵 Calming music playlists</li>
                <li>🫁 Guided breathing exercises</li>
                <li>🌿 Nature sounds and meditation</li>
              </ul>
            </div>
            <div className="stress-card high">
              <div className="stress-header">
                <h3>High Stress</h3>
                <div className="stress-indicator-dot high"></div>
              </div>
              <p>Intensive relief techniques for immediate stress reduction</p>
              <ul>
                <li>🧘 AI-generated affirmations</li>
                <li>🕯️ Guided meditation sessions</li>
                <li>💆 Progressive muscle relaxation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Why Choose Our Solution?</h2>
          <p className="section-subtitle">Built with privacy, science, and your wellbeing in mind</p>
          <div className="benefits-grid">
            <div className="benefit">
              <h3>🔬 Science-Based</h3>
              <p>Built on latest research in psychology and wellness, ensuring reliable stress detection</p>
            </div>
            <div className="benefit">
              <h3>🎨 Personalization</h3>
              <p>No more one-size-fits-all solutions - every recommendation is tailored to you</p>
            </div>
            <div className="benefit">
              <h3>🔒 Privacy Protected</h3>
              <p>Your sensitive data is processed locally and discarded immediately after analysis</p>
            </div>
            <div className="benefit">
              <h3>📈 Continuous Improvement</h3>
              <p>Our system learns from your patterns to provide increasingly accurate and helpful suggestions</p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li>Features</li>
                <li>Pricing</li>
                <li>API</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Smart Stress Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
