import React, { ReactNode } from 'react'
import { useAppSelector } from '../app/hook'
import { Navigate, useLocation } from 'react-router-dom';


interface RequireAuthProps {
  children: ReactNode;  // Accept ReactNode as children
}

function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAppSelector((state) => state.auth);
   const location = useLocation();
  
  if (!auth.token) {

    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

export default RequireAuth