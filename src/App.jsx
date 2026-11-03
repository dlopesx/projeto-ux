import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Fiu from './pages/Fiu'
import Tina from './pages/Tina'

function App() {
  return (
    // habilita a navegação
    <BrowserRouter> 
    {/* agrupa as todas de navegação */}
      <Routes>
        {/* define qual componente aparece em cada endereço */}
        <Route path="/" element={<Home />} />
        <Route path="/fiu" element={<Fiu />} />
        <Route path="/tina" element={<Tina />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App