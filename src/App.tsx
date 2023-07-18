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

const HomePage = lazy(() =>
  import('pages/HomePage').then((module) => ({
    default: module.HomePage,
  }))
);

const PrivacyPolicyPage = lazy(() =>
  import('pages/PrivacyPolicyPage').then((module) => ({
    default: module.PrivacyPolicyPage,
  }))
);

const ErrorPage = lazy(() =>
  import('pages/ErrorPage').then((module) => ({
    default: module.ErrorPage,
  }))
);

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/auth',
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
    {
      path: '/privacy-policy',
      element: <PrivacyPolicyPage />,
    },
    {
      path: '*',
      element: <ErrorPage />,
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
