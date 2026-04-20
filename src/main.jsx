import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Routes from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import { LanguageProvider } from './Context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={Routes} />
    </LanguageProvider>
  </StrictMode>,
)
