import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from "./LoginComponent";
import StudentsPage from "./StudentsPage";
import Header from "./Header";
import AdminPage from "./AdminPage"; // You'll need to create this

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setIsLoggedIn(true);
      setIsAdmin(userData.isAdmin || false);
    }
  }, []);

  const handleLoginSuccess = (admin) => {
    setIsLoggedIn(true);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('userData');
  };

  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={
              isLoggedIn ? <Navigate to={isAdmin ? "/admin" : "/students"} /> : 
              <LoginComponent onLoginSuccess={handleLoginSuccess} />
            } />
            <Route path="/students" element={
              isLoggedIn ? <StudentsPage isAdmin={isAdmin} /> : <Navigate to="/login" />
            } />
            <Route path="/admin" element={
              isLoggedIn && isAdmin ? <AdminPage /> : <Navigate to="/login" />
            } />
            <Route path="/" element={
              isLoggedIn ? 
                <Navigate to={isAdmin ? "/admin" : "/students"} /> : 
                <Navigate to="/login" />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;