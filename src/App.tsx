import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainApp } from './MainApp';

function App() {
  const router = createBrowserRouter([
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
