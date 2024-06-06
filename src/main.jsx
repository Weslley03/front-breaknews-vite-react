import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar.jsx'
import Search from './pages/pesquisa/Search.jsx'
import Home from './pages/home/Home.jsx'
import { GlobalStyled } from './GlobalStyled.jsx'
import ErrorPage from './pages/NotFound/ErrorPage.jsx'
import { Authentication } from './pages/authentication/Authentication.jsx'
import { Profile } from './pages/profile/Profile.jsx'
import UserProvider from './context/UserContext.jsx'
import ManageNews from './pages/manageNews/ManageNews.jsx'

const router = createBrowserRouter([
  {
    path: '/', 
    errorElement: <ErrorPage />,
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home /> 
      },

      {
        path: '/search/:title',
        element: <Search />
      },

      {
        path: '/profile',
        element: <Profile />
      }
    ]
  },
  {
    path: '/welcome',
    element: <Authentication />
  },

  {
    path: '/manage-news/:action/:id',
    element: <ManageNews />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyled />
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
