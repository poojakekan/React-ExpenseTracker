import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendEmailVerification } from 'firebase/auth';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendVerificationEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setMessage('Verification email sent. Please check your inbox.');
      }
    } catch (err) {
      setError('Failed to send verification email. Please try again.');
      console.error('Error sending email verification:', err);
    }
  };

  return (
    <div className="verify-email-container">
      <h2>Verify Your Email</h2>
      <button onClick={handleSendVerificationEmail}>Send Verification Email</button>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default VerifyEmail;
