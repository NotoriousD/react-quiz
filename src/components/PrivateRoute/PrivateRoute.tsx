import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { selectAuthData } from 'store/auth/selectors';
import { useAppSelector } from 'store';

export const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useAppSelector(selectAuthData);

  if (!isAuth) {
    return <Navigate to={'/'} />;
  }

  return <div>{children}</div>;
};
