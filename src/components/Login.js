import React, { useState } from 'react';
import { auth } from '../firebase'; // Ensure this path is correct for your project
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      console.log('User has successfully logged in.');
  
      if (!user.displayName || !user.photoURL) {
        navigate('/profile-incomplete'); // Redirect to profile incomplete page
      } else {
        navigate('/welcome'); // Redirect to welcome page if profile is complete
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
