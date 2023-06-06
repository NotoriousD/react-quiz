import React, {
  PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { io, Socket } from 'socket.io-client';

import { AuthContext } from './AuthContext';

interface WebSocketResponse {
  status: WebSocketStatus | null;
  isAuth: boolean;
}

interface WebSocketData {
  status: WebSocketStatus | null;
}

const initialData = {
  status: null,
};

export enum WebSocketStatus {
  Initialized = 'initialized',
  Processing = 'processing',
  Done = 'done',
  NotUsed = 'notUsed',
  Refuse = 'refuse',
}

export const WebSocketContext = createContext<WebSocketResponse>({
  status: null,
  isAuth: false,
});

export const WebSocketProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { otp, requestId } = useContext(AuthContext);
  const [connected, setConnected] = useState<Boolean>(false);
  const [data, setData] = useState<WebSocketData>(initialData);
  const [isAuth, setAuth] = useState<boolean>(false);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (otp && requestId && !connected) {
      socket.current = io('https://test-api-3bob.onrender.com', {
        path: '/api/request/status/socket/',
      });
      socket.current.emit(
        'status',
        JSON.stringify({
          otp,
          requestId,
        })
      );

      socket.current.on('connected', (result) => {
        setConnected(result);
      });

      socket.current.on('data', (result) => {
        setData(result);
        if (result.status === WebSocketStatus.Done) {
          setAuth(true);
        }
      });

      socket.current.on('error', (result) => {
        console.log('error', result);
      });

      socket.current.on('disconnect', (result) => {
        console.log('disconnect', result);
      });
    }

    return () => {};
  }, [otp, requestId, socket, connected]);

  return (
    <WebSocketContext.Provider value={{ status: data.status, isAuth }}>
      {children}
    </WebSocketContext.Provider>
  );
};
