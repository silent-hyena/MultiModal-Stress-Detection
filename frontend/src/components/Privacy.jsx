import React from 'react';
import { Link } from 'react-router-dom';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: December 2024</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Data Collection</h2>
            <p>
              We collect minimal data: email, name, and stress results. Raw biometric data (face, voice) is discarded immediately after processing.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Data Security</h2>
            <p>
              All data is encrypted with AES-256 encryption. We use JWT authentication and secure cloud infrastructure. Regular security audits ensure protection.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Data Usage</h2>
            <p>
              Your data is used only to provide personalized stress management recommendations. We don't sell data to third parties.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Your Rights</h2>
            <p>
              You can access, correct, or delete your data anytime. Request data portability or restrict processing. Withdraw consent at any time.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Data Retention</h2>
            <p>
              Data is kept only as long as needed for our services. Account data is deleted within 30 days of closure. Wellness data can be deleted on request.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@smartstressmanagement.com
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

export default Privacy;
