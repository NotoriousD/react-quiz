import React, {
  PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { io, Socket } from 'socket.io-client';

import { useWindow } from 'hooks/useWindow';
import { selectAuthData } from 'store/auth/selectors';
import { setIsAuth, setStatus } from 'store/auth';
import { fetchAuthStatus } from 'store/auth/thunk';
import { useAppDispatch, useAppSelector } from 'store';
import { AuthirizationStatuses } from 'types';

export const WebSocketContext = createContext({
  connected: false,
});

export const WebSocketProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { otp, requestId } = useAppSelector(selectAuthData);
  const [connected, setConnected] = useState<boolean>(false);
  const socket = useRef<Socket | null>(null);
  const { isMobile } = useWindow();

  useEffect(() => {
    if (otp && requestId && !connected) {
      socket.current = io('https://test-api-3bob.onrender.com', {
        path: '/api/request/status/socket/',
        transports: ['websocket'],
        rememberUpgrade: true,
      });
      socket.current.emit(
        'status',
        JSON.stringify({
          otp,
          requestId,
        })
      );

      socket.current.on('connected', (result) => {
        setConnected(true);
        if (isMobile) {
          dispatch(fetchAuthStatus());
        }
      });

      socket.current.on('data', (result) => {
        dispatch(setStatus(result.status));
        if (result.status === AuthirizationStatuses.Done) {
          dispatch(setIsAuth());
        }
      });

      socket.current.on('error', (result) => {});

      socket.current.on('disconnect', (result) => {
        if (isMobile) {
          fetchAuthStatus();
        }
      });
    }

    return () => {};
  }, [otp, requestId, socket, connected, dispatch, isMobile]);

  return (
    <WebSocketContext.Provider value={{ connected }}>
      {children}
    </WebSocketContext.Provider>
  );
};
