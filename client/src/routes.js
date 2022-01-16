import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
const DashboardLayout = lazy(() => import('./layouts/dashboard'));
const LogoOnlyLayout = lazy(() => import('./layouts/LogoOnlyLayout'));
//
const Login = lazy(() => import('./pages/Login'));

const Register = lazy(() => import('./pages/Register'));
const DashboardApp = lazy(() => import('./pages/DashboardApp'));
const Products = lazy(() => import('./pages/Products'));
const Blog = lazy(() => import('./pages/Blog'));
const User = lazy(() => import('./pages/User'));
const NotFound = lazy(() => import('./pages/Page404'));
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
