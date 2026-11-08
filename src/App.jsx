import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import MeusAgendamentos from './pages/MeusAgendamentos'
import OutrosTutores from './pages/Tutores'
import MeusAlertas from './pages/MeusAlertas'
import MeusPets from './pages/MeusPets'
import Configuracoes from './pages/Configuracoes'
import Sobre from './pages/Sobre'
import PainelPet from './pages/PainelPet'
import Vacinas from './pages/Vacinas'
import Alimentacao from './pages/Alimentacao.jsx'
import BanhoTosa from './pages/BanhoTosa'
import Cio from './pages/Cio'
import Consultas from './pages/Consultas'
import Medicamentos from './pages/Medicamentos'
import Peso from './pages/Peso'
import UnhasOrelhas from './pages/UnhasOrelhas'
import NovoAgendamento from './pages/NovoAgendamento.jsx'
import NovoAlerta from './pages/NovoAlerta.jsx'

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
        <Route path="/pet/:id" element={<PainelPet />} />

        <Route path="/pet/:id/vacinas" element={<Vacinas />} />
        <Route path="/pet/:id/alimentacao" element={<Alimentacao />} />
        <Route path="/pet/:id/banho-tosa" element={<BanhoTosa />} />
        <Route path="/pet/:id/cio" element={<Cio />} />
        <Route path="/pet/:id/consultas" element={<Consultas />} />
        <Route path="/pet/:id/medicamentos" element={<Medicamentos />} />
        <Route path="/pet/:id/peso" element={<Peso />} />
        <Route path="/pet/:id/unhas-orelhas" element={<UnhasOrelhas />} />

        <Route path="/novo-agendamento" element={<NovoAgendamento />} />
        <Route path="/novo-alerta" element={<NovoAlerta />} />
      </Routes>
    </BrowserRouter>

    
  )
}

export default App