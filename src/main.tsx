import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SiteJM from './SiteJM.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteJM />
  </StrictMode>,
)
