import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import VerifyEmail from './VerifyEmail';

const Welcome = () => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setIsVerified(user.emailVerified);
    } else {
      navigate('/login'); // Redirect if user is not logged in
    }
  }, [navigate]);

  return (
    <div className="welcome-container">
      <h1>Welcome to Expense Tracker</h1>
      {!isVerified && <VerifyEmail />}
    </div>
  );
};

export default Welcome;

