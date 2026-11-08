import { createContext, useContext, useState } from 'react'

const PetsContext = createContext()

export function PetsLista({ children }) {

  const [pets, setPets] = useState([
    { id: 1, nome: 'Tina', especie: 'Cachorro', raca: 'Poodle', imagem: '/svg/tina.svg',
     idade: '1 ano', genero: "Fêmea"},
    { id: 2, nome: 'Fiu', especie: 'Ave', raca: 'Calopsita', imagem: '/svg/fiu.svg',
    idade: '2 anos', genero: 'Macho'},
  ])

  const [vacinas, setVacinas] = useState([
    { id: 2, petId: 1, nome: 'Antirrábica', data: '2025-05-23', proxima: '2026-05-23', aplicada: false},
    { id: 1, petId: 1, nome: 'V10', data: '2025-09-20', proxima: '2026-09-20', aplicada: true },
    { id: 2, petId: 1, nome: 'Gripe', data: '2026-05-23', proxima: '2027-05-23', aplicada: false}
  ])

  const [alertas, setAlertas] = useState([
    { id: 1, petId: 1, texto: 'Cortar unha da tina', quando: 'Hoje', repete: false, feito: false },
    { id: 2, petId: 2, texto: 'Limpar gaiola de fiu', quando: 'Toda quarta', repete: true, feito: false },
  ])

  const [consultas, setConsultas] = useState([
    { id: 1, petId: 1, nomeConsulta: "Consulta de tina",
    profissional: 'Adriana', clinica: 'Clínica Solemar',
    endereco: 'Rua fulano 21, Jardins, São Paulo - SP',
    data: '2026-09-14', hora: '09:00',
    descricao: '', feito: false},
    { id: 2, petId: 2, nomeConsulta: "Consulta",
    profissional: 'Clara', clinica: 'Vet. Raio de Sol',
    endereco: '', data: '2026-09-18', hora: '09:00',
    descricao: 'Resfriado leve', feito: true},
    { id: 3, petId: 2, nomeConsulta: "Corte de asas",
    profissional: 'Fabinho', clinica: 'Vet. Raio de Sol',
    endereco: '', data: '2026-09-12', hora: '11:00',
    descricao: '', feito: true},
  ])

  const [alimentacao, setAlimentacao] = useState([
    { id: 1, petId: 1,
    preferidos: ['Frango cozido', 'Brócolis', 'Banana', 'Petisco de carne'],
    rotina: [
    {periodo: 'Manhã', horario: 'Entre 06h e 09h', refeicao: 'Ração em porção pequena'},
    {periodo: 'Tarde', horario: 'Entre 12h e 15h', refeicao: 'Petisco de carne ou maçã em cubos'},
    {periodo: 'Noite', horario: 'Entre 20h e 22h', refeicao: 'Ração com opções: brócolis, cenoura'}]
    },
    { id: 2, petId: 2, 
    preferidos: ['Semente de Girassol', 'Petisco de sementes com mel', 'Ovo cozido', 'Arroz cozido'],
    rotina: [
    {periodo: 'Manhã', horario: 'Entre 06h e 09h', refeicao: 'Repor ração extrusada'},
    {periodo: 'Tarde', horario: 'Entre 12h e 15h', refeicao: 'Arroz cozido e sementes'},
    {periodo: 'Noite', horario: 'Entre 20h e 22h', refeicao: 'Repor ração extrusada'}]
    }
  ])

  const [banhos, setBanhos] = useState([
    { id: 1, petId: 1, proximaData: '2026-11-05', historico: ['2026-11-05', '2026-10-29', '2026-10-22'] },
    { id: 2, petId: 2, proximaData: '2026-11-10', historico: ['2026-10-10'] } 
  ])

  const [tosas, setTosas] = useState([
    { id: 1, petId: 1, proximaData: '2026-10-30', historico: ['2026-10-25', '2026-10-15', '2026-10-10'] }
  ])

  const [medicamentos, setMedicamentos] = useState([
    { id: 1, petId: 1, tipo: 'Antimicrobiano', nome: 'Doxifin', dosagem: '1 comprimido', horario: '08:00', periodo: 'Manhã' }
  ])

  const [pesos, setPesos] = useState([
    { id: 1, petId: 1, pesoAtual: '6,0 kg', dataAtual: '28/10' }, // Tina
    { id: 2, petId: 2, pesoAtual: '100g', dataAtual: '28/10' }    // Fiu
  ])

  const [unhas, setUnhas] = useState([
    { id: 1, petId: 1, proximaData: '05 de novembro de 2026', historico: ['05 de novembro de 2026', '29 de outubro de 2026', '22 de outubro de 2026'] }
  ])

  const [orelhas, setOrelhas] = useState([
    { id: 1, petId: 1, proximaData: '30 de outubro de 2026', historico: ['25 de outubro de 2026', '15 de outubro de 2026', '10 de outubro de 2026'] }
  ])

  const [cios, setCios] = useState([
    { id: 1, petId: 1, historico: ['25 de agosto de 2026', '12 de maio de 2026'] }
  ])


  return (  
    <PetsContext.Provider value={{
        pets, setPets,
        vacinas, setVacinas,
        alertas, setAlertas,
        consultas, setConsultas,
        alimentacao, setAlimentacao,
        banhos, setBanhos, 
        tosas, setTosas,
        medicamentos, setMedicamentos,
        pesos, setPesos,
        unhas, setUnhas,
        orelhas, setOrelhas,
        cios, setCios
        }}>
      {children}
    </PetsContext.Provider>
  )
}

export function usePets() {
  return useContext(PetsContext)
}