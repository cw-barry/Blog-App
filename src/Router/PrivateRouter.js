import React from 'react';

import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { toastNotify } from '../helper/Toastify';

const PrivateRouter = () => {
  let currentUser = localStorage.getItem('user') || false;
  let location = useLocation();

  if (!currentUser) {
    toastNotify('You need to login first', 'warn');
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRouter;
