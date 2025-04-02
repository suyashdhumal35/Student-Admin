import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authActions';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAdmin, isAuthenticated } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          Student Management System
        </h1>
        {isAuthenticated && (
          <div className="flex items-center space-x-4">
            <span className="font-medium">
              Welcome, {user?.username || 'User'}
            </span>
            {isAdmin && (
              <button 
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md transition-colors"
              >
                Admin Dashboard
              </button>
            )}
            <button 
              onClick={handleLogout}
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