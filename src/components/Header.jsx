import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, isAdmin, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          Student Management System
        </h1>
        {isLoggedIn && (
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <button 
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md transition-colors"
              >
                Admin Dashboard
              </button>
            )}
            <button 
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;