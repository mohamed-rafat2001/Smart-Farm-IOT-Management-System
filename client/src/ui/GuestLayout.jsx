import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

function GuestLayout() {
  const { isAuthenticated, isLoading, error } = useAuth();
  
  // If there is an authentication error or still loading, allow access to guest pages immediately
  // Don't block guests with a loading screen - they should see the login/signup form right away
  if (error || isLoading) {
    return <Outlet />;
  }

  // If user is already authenticated, redirect them to the app
  if (isAuthenticated) {
    return <Navigate to="/app/Dashboard" replace />;
  }

  return <Outlet />;
}

export default GuestLayout;
