import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/data.json';

const LoginComponent = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isAdminLogin) {
      const admin = data.admins.find(
        (a) => a.username === username && a.password === password
      );
      if (admin) {
        localStorage.setItem('userData', JSON.stringify({ ...admin, isAdmin: true }));
        onLoginSuccess(true);
        navigate('/students');
      } else {
        setError('Invalid admin credentials');
      }
    } else {
      // Student login logic (if you have student credentials)
      // For now, we'll just allow any student to login since we don't have credentials
      localStorage.setItem('userData', JSON.stringify({ username, isAdmin: false }));
      onLoginSuccess(false);
      navigate('/students');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">
          {isAdminLogin ? 'Admin Login' : 'Student Login'}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsAdminLogin(!isAdminLogin)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {isAdminLogin ? 'Student Login' : 'Admin Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;