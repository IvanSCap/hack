import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

export const AuthGuard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      replace
      to="/login"
      state={{ from: location }}
    />
  );
};
