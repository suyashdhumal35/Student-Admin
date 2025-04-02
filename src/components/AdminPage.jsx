import React from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/data.json';

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Students Statistics</h2>
          <p>Total Students: {data.students.length}</p>
          {/* Add more admin-specific statistics here */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <button 
            onClick={() => navigate('/students')}
            className="w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View All Students
          </button>
          {/* Add more admin actions here */}
        </div>
      </div>
      
      {/* You can add more admin-specific components here */}
    </div>
  );
};

export default AdminPage;