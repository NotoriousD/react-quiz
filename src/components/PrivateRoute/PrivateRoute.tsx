import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { selectAuthData } from 'store/auth/selectors';
import { useAppSelector } from 'store';

interface Props {
  withDiia: boolean;
}

export const PrivateRoute: React.FC<PropsWithChildren<Props>> = ({ children, withDiia }) => {
  const { isAuth, requestId } = useAppSelector(selectAuthData);

  if (!isAuth && withDiia) {
    return <Navigate to={'/'} />;
  }

  if (!withDiia && !requestId) {
    return <Navigate to={'/'} />
  }

  return <div>{children}</div>;
};
