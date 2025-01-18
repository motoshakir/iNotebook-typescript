import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hook';

function PrivateRoute() {
    const auth = useAppSelector((state) => state.auth);
       const location = useLocation();
      
      if (!auth.token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    
      return <Outlet/>
 
}

export default PrivateRoute