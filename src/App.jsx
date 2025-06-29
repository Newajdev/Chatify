import { createBrowserRouter } from 'react-router-dom'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1 className='font-extrabold text-center'>Hello From Home Path</h1>
  }
])
export default router
