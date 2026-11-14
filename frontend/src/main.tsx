import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { client } from './apollo/client.js';
import { Layout } from './components/Layout.js';
import { ProfileListPage } from './pages/ProfileListPage.js';
import { ProfileDetailPage } from './pages/ProfileDetailPage.js';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <ProfileListPage /> },
      { path: '/profile/:id', element: <ProfileDetailPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
