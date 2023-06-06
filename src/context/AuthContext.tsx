import React, { PropsWithChildren, createContext, useState } from 'react';

import { AuthData } from 'api/API';

import { useDeeplinkQuery } from 'hooks/useDeeplinkQuery';

const initialData = {
  deepLink: null,
  otp: null,
  requestId: null,
  error: null,
};

export const AuthContext = createContext<AuthData>(initialData);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [data, setData] = useState<AuthData>(initialData);

  useDeeplinkQuery({
    onSuccess: (res) => {
      setData(res);
    },
    enabled: !data.deepLink,
  });

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
