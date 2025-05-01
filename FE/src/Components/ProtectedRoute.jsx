import { Navigate, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
