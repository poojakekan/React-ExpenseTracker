import React, { useState } from 'react';
import { auth } from '../firebase'; // Ensure this is the correct path for your Firebase setup
import { updateProfile } from 'firebase/auth';

const CompleteProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName,
        photoURL,
      });
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="complete-profile-container">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div className="form-group">
          <label>Display Name:</label>
          <input 
            type="text" 
            value={displayName} 
            onChange={(e) => setDisplayName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Photo URL:</label>
          <input 
            type="text" 
            value={photoURL} 
            onChange={(e) => setPhotoURL(e.target.value)} 
            required 
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
