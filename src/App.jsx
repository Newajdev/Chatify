import { createBrowserRouter, Outlet } from 'react-router-dom'
import './App.css'
import Register from './pages/register/Register'
import Login from './pages/login/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet></Outlet>,
    children: [
      {
        path: "/",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      }
    ]
  }
])
export default router
