import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthContextProvider } from 'context/AuthContext';
import { WebSocketProvider } from 'context/WebSocketContext';

import App from './App';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <WebSocketProvider>
          <App />
        </WebSocketProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
