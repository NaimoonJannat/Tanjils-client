import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Routes from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Provider/AuthProvider.jsx'
import { LanguageProvider } from './Context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider router={Routes} />
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>,
)
