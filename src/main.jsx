import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './App.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { ThemeProvider } from '@mui/material'
import Theme from './utils/Themes.jsx'
import { Provider } from 'react-redux'
import Store from './Store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </AuthProvider>
    </Provider>
  </StrictMode>,
)
