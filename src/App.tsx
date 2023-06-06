import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Loader } from 'components/Loader';
import { PrivateRoute } from 'components/PrivateRoute';

const QuizPage = lazy(() =>
  import('pages/QuizPage').then((module) => ({ default: module.QuizPage }))
);

const AuthorizationPage = lazy(() =>
  import('pages/AuthorizationPage').then((module) => ({
    default: module.AuthorizationPage,
  }))
);

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthorizationPage />,
    },
    {
      path: '/form/:step',
      element: (
        <PrivateRoute>
          <QuizPage />
        </PrivateRoute>
      ),
    },
  ]);

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
