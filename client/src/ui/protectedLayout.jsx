import { Outlet, useLocation, Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import LoadingCircul from './LoadingCircul';

function ProtectedLayout({ requiredRole }) {
  const { isAuthenticated, isLoading, data: user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1b2127]">
        <LoadingCircul />
      </div>
    );
  }

  // Not authenticated? Redirect to login with current location
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Authenticated but wrong role? Redirect to dashboard
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/app/Dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
