import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Error from './pages/Error';
// Default page will be login screen, navigates to Home page once logged in or signed up.
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
