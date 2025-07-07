import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './App.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { ThemeProvider } from '@mui/material'
import Theme from './utils/Themes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
