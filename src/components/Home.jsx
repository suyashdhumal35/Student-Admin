// Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Student Portal</h1>
      <p className="mb-4">Please login to view student records</p>
      <Link 
        to="/login" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Login
      </Link>
    </div>
  );
};

export default Home;