import React, { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { WebSocketContext } from 'context/WebSocketContext';

export const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useContext(WebSocketContext);

  if (!isAuth) {
    return <Navigate to={'/'} />;
  }

  return <div>{children}</div>;
};
