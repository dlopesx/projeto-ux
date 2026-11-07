import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PetsLista } from './context/Pets.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PetsLista>
      <App />
    </PetsLista>
  </StrictMode>,
)
