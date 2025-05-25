import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useToast } from '@/components/ui/use-toast';

const AuthProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    toast({
      title: 'Authentication Required',
      description: 'Please log in to access this page.',
      variant: 'destructive',
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthProtectedRoute;