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
import PageWithfooter from './components/footer/PageWithfooter.jsx'
import ManageProfile from './pages/manageProfile/ManageProfile.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const router = createBrowserRouter([
  {
    path: '/', 
    errorElement: <ErrorPage />,
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: (
          <PageWithfooter>
             <Home />
          </PageWithfooter>
        )
      },

      {
        path: '/search/:title',
        element: (
          <PageWithfooter>
            <Search />
          </PageWithfooter>
      )
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
  },

  { 
    path: 'manage-profile/:id',
    element: <ManageProfile />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyled />
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer autoClose={1000} position="top-center"/>
    </UserProvider>
  </React.StrictMode>,
)
