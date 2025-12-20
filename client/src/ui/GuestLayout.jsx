import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import LoadingCircul from './LoadingCircul';

function GuestLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1b2127]">
        <LoadingCircul />
      </div>
    );
  }

  // If user is already authenticated, redirect them to the app
  if (isAuthenticated) {
    return <Navigate to="/app/Dashboard" replace />;
  }

  return <Outlet />;
}

export default GuestLayout;
