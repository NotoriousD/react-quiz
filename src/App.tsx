import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom';

import { MainApp } from './MainApp';

function App() {
  const navigate = useNavigate();
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navigate to={`/form/1`} />
        </>
      ),
    },
    {
      path: '/form/:step',
      element: <MainApp />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
