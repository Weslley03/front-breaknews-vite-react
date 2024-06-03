import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar.jsx'
import Search from './pages/pesquisa/Search.jsx'
import Home from './pages/home/Home.jsx'
import { GlobalStyled } from './GlobalStyled.jsx'
import ErrorPage from './pages/NotFound/ErrorPage.jsx'

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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyled />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
