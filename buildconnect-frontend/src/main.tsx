// src/main.tsx (configuração do roteador)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { SearchProvider } from './context/SearchContext.tsx'; 
// Imports do React Router e das nossas páginas
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { PostDetailPage } from './pages/PostDetailPage.tsx';

// Criamos as rotas da nossa aplicação
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // O <App /> é o nosso layout principal
    children: [ // As páginas são "filhas" do layout e serão renderizadas no <Outlet />
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        // O :id é um parâmetro dinâmico, para vermos o perfil de um usuário específico
        path: "/profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "/posts/:id",
        element: <PostDetailPage />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Em vez de renderizar <App />, renderizamos o nosso provedor de rotas */}
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  </React.StrictMode>,
)