import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import MeusAgendamentos from './pages/MeusAgendamentos'
import OutrosTutores from './pages/Tutores'
import MeusAlertas from './pages/MeusAlertas'
import MeusPets from './pages/MeusPets'
import Configuracoes from './pages/Configuracoes'
import Sobre from './pages/Sobre'

function App() {
  return (
    // habilita a navegação
    <BrowserRouter> 
    {/* agrupa as todas de navegação */}
      <Routes>
        {/* define qual componente aparece em cada endereço */}
        <Route path="/" element={<Home />} />
        <Route path="/meus-pets" element={<MeusPets />} />
        <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
        <Route path="/outros-tutores" element={<OutrosTutores />} />
        <Route path="/meus-alertas" element={<MeusAlertas />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App