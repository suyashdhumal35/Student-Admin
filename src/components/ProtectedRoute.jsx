import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        // User not logged in, redirect to login
        navigate('/login');
        return null;
    }

    if (requiredRole && user.role !== requiredRole) {
        // User doesn't have required role, redirect to unauthorized or home
        navigate('/unauthorized');
        return null;
    }

    return children;
};

export default ProtectedRoute;