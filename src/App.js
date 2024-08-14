import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import AddExpense from './components/AddExpense';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/welcome" element={isAuthenticated ? <Welcome /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/expenses" element={isAuthenticated ? <AddExpense /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;

