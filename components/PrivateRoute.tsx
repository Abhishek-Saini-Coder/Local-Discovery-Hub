import React from 'react'; // React import needed for React.ReactElement and JSX
import { Navigate, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';

interface PrivateRouteProps {
  currentUser: User | null;
  requiredRole?: UserRole; 
  // Fix: Change children type to React.ReactElement for clarity and stricter typing.
  children: React.ReactElement; 
}

// Fix: Remove React.FC and explicitly type the component function.
// Return type is React.ReactElement as Navigate and children are ReactElements.
export const PrivateRoute = ({ currentUser, requiredRole, children }: PrivateRouteProps): React.ReactElement => {
  const location = useLocation();

  if (!currentUser) {
    // Not logged in, redirect to login page
    // Pass the current location so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!currentUser.role && requiredRole) {
    // Logged in but role not yet selected, redirect to role selection
    // This typically happens on first login for a new user
    return <Navigate to="/select-role" state={{ from: location }} replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    // Logged in, role selected, but does not have the required role for this route
    // Redirect to home page or an "unauthorized" page
    // For simplicity, redirecting to home.
    // You could show a message: "You are not authorized to view this page."
    return <Navigate to="/" replace />;
  }

  // User is logged in and has the required role (if any specified), or no role is required.
  return children;
};