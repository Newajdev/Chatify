import { createBrowserRouter, Outlet } from 'react-router-dom'
import './App.css'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import PrivateRoute from './router/PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet></Outlet>,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home></Home></PrivateRoute>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      
    ]
  }
])
export default router
