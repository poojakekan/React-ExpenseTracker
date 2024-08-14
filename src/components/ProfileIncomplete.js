import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileIncomplete = () => {
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    navigate('/complete-profile');
  };

  return (
    <div className="profile-incomplete-container">
      <h2>Your Profile is Incomplete</h2>
      <button onClick={handleCompleteProfile}>Complete Profile</button>
    </div>
  );
};

export default ProfileIncomplete;
