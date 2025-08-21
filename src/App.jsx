import { createBrowserRouter, Outlet } from 'react-router-dom'
import './App.css'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Inbox from './pages/inbox/Inbox'
import Notfications from './pages/notification/Notifications'
import Settings from './pages/setting/Settings'
import Root from '../src/layout/Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/inbox",
        element: <Inbox></Inbox>
      },
      {
        path: "/notifications",
        element: <Notfications></Notfications>
      },
      {
        path: "/settings",
        element: <Settings></Settings>
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
