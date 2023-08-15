import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Loader } from 'components/Loader';
import { PrivateRoute } from 'components/PrivateRoute';
import { PrivatAdminRoute } from 'components/PrivatAdminRoute';

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

const QuizListPage = lazy(() =>
  import('pages/QuizListPage').then((module) => ({
    default: module.QuizListPage,
  }))
);

const QuestionnariePage = lazy(() =>
  import('pages/QuestionnariePage').then((module) => ({
    default: module.QuestionnariePage,
  }))
);

const AdminPage = lazy(() =>
  import('pages/AdminPage').then((module) => ({
    default: module.AdminPage,
  }))
);

const LoginPage = lazy(() =>
  import('pages/LoginPage').then((module) => ({
    default: module.LoginPage,
  }))
);

const PrivacyPolicyPage = lazy(() =>
  import('pages/PrivacyPolicyPage').then((module) => ({
    default: module.PrivacyPolicyPage,
  }))
);

const PublicAnnouncementPage = lazy(() =>
  import('pages/PublicAnnouncementPage').then((module) => ({
    default: module.PublicAnnouncementPage,
  }))
);

const ErrorPage = lazy(() =>
  import('pages/ErrorPage').then((module) => ({
    default: module.ErrorPage,
  }))
);

const FORM_WITH_DIIA = true;

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage withDiia={FORM_WITH_DIIA} />,
    },
    {
      path: '/auth',
      element: <AuthorizationPage />,
    },
    {
      path: '/form/:step',
      element: (
        <PrivateRoute withDiia={FORM_WITH_DIIA}>
          <QuizPage withDiia={FORM_WITH_DIIA} />
        </PrivateRoute>
      ),
    },
    {
      path: '/admin',
      element: <AdminPage />,
      children: [
        {
          path: 'login',
          index: true,
          element: <LoginPage />,
        },
        {
          path: 'list',
          element: <PrivatAdminRoute><QuizListPage /></PrivatAdminRoute>,
        },
        {
          path: 'list/:id',
          element: <PrivatAdminRoute><QuestionnariePage /></PrivatAdminRoute>
        }
      ]
    },
    {
      path: '/privacy-policy',
      element: <PrivacyPolicyPage />,
    },
    {
      path: '/public-announcement',
      element: <PublicAnnouncementPage />
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
