import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext';
import { UserRole } from '../types';

interface RoleGuardProps {
  /** Roles that are permitted to access this route */
  allowedRoles: UserRole[];
  /** Where to redirect if access is denied. Defaults to '/' */
  redirectTo?: string;
  children: React.ReactNode;
}

/**
 * RoleGuard – wraps a route and redirects the user if their role is
 * not in the `allowedRoles` list.
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  redirectTo = '/',
  children,
}) => {
  const { userProfile, loading } = useFirebase();

  // Still loading – render nothing (App.tsx loading spinner already handles this)
  if (loading) return null;

  const role = userProfile?.role ?? 'student';

  if (!allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
