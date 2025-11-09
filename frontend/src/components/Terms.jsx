import React from 'react';
import { Link } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Terms of Service</h1>
          <p>Last updated: December 2024</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Service Agreement</h2>
            <p>
              By using Smart Stress Management, you agree to our terms. This service provides AI-powered stress detection and personalized wellness recommendations.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Security & Privacy</h2>
            <p>
              Your data is protected with industry-standard encryption. Raw biometric data (face, voice) is discarded immediately after processing. Only stress results are stored for your wellness tracking. JWT authentication ensures secure access.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. User Responsibilities</h2>
            <p>
              You're responsible for maintaining account security and using the service appropriately. Report any security concerns immediately.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Data Usage</h2>
            <p>
              We use your data only to provide personalized stress management. No data is sold to third parties. You can request data deletion at any time.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Medical Disclaimer</h2>
            <p>
              This service is for informational purposes only and not a substitute for professional medical advice. Always consult healthcare professionals for medical concerns.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at support@smartstressmanagement.com
            </p>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/register" className="back-link">← Back to Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
