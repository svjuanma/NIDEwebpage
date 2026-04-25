import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children } : any) => {
  const { userId } = useAuth();
  if (userId === null) {
    return <Navigate to="/login" replace />;
  }
  return children;
};