import { useParams, Link } from 'react-router-dom'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import CardVacina from '../componentes/CardVacina'

function calcularStatus(v) {
        // compara só o dia (sem horas), para "próxima dose = hoje" não virar atrasada à tarde
        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)
        const proxima = new Date(v.proxima + 'T00:00')
        const diasRestantes = (proxima - hoje) / (1000 * 60 * 60 * 24)

        if (diasRestantes < 0) return 'atrasada'
        if (diasRestantes <= 60) return 'proxima'
        return 'emDia'
        }

function formatar(dataISO) {
        // vacina sem primeira dose ainda não tem data
        if (!dataISO) return '—'
        return new Date(dataISO + 'T12:00').toLocaleDateString('pt-BR')
    }

function Vacinas(){

    const { id } = useParams()
    const { pets, vacinas } = usePets()
    const pet = pets.find((p) => p.id === Number(id))

    if (!pet) return <p>Pet não encontrado.</p>
    
    const vacinasDoPet = vacinas.filter((v) => v.petId === pet.id)

    
    return(
        
        <section className="hidden md:block ">
            <div className="flex">
                <Sidebar />
                    <div className=" bg-[#FFFBF6] flex flex-col self-stretch flex-1"> 
                        <Header />
                        <main className="flex py-6 px-4 sm:px-8 lg:px-16 flex-col items-start self-stretch gap-8">
    
                        {/* <!-- título + botão -->*/} 
                        <div className="flex flex-wrap items-center gap-6">
                            <h1 className="flex-1 min-w-[12rem] text-3xl md:text-[32px] font-semibold leading-[120%]">{pet.nome} — vacinas</h1>
    
                            <Link to={`/pet/${pet.id}/adicionar-vacina`}
                                className="flex items-center justify-center gap-2.5 h-[52px] w-full sm:w-[220px]
                                px-6 rounded-xl bg-fundo border border-bege hover:bg-superficie hover:shadow-md 
                                transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                <img src="/svg/adicionar.svg" alt="Adicionar Vacina" className="w-5 h-5 shrink-0"/>
                                Adicionar vacina
                            </Link>
                        </div>
    
                            {/* <!-- filtro -->*/} 
                            <div className="flex flex-wrap items-center gap-4 text-sm" role="group" aria-label="Filtro de vacinas">
                                <span className="font-semibold">Filtro:</span>
                                <button type="button" aria-pressed="true"
                                    className="px-5 py-3 rounded-full bg-laranja border border-laranja transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja focus-visible:ring-offset-2">
                                    Todas
                                </button>
                                <button type="button" aria-pressed="false"
                                    className="px-5 py-3 rounded-full bg-fundo border border-bege hover:bg-superficie transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                    Atrasadas
                                </button>
                                <button type="button" aria-pressed="false"
                                    className="px-5 py-3 rounded-full bg-fundo border border-bege hover:bg-superficie transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                    Próximas
                                </button>
                            </div>
    
                            <h2 className="text-[22px] font-semibold leading-[145%]">Todas as vacinas</h2>
    
                            {/* carteira de vacinação*/}
                            <section className="rounded-[20px] border border-bege overflow-hidden" aria-label="Carteira de vacinação">
    
                                {/*  cabeçalho da lista (só no desktop) */}
                                <div className="hidden md:grid grid-cols-4 gap-6 p-6 bg-cabecalho text-sm font-semibold text-suave" aria-hidden="true">
                                    <span>Vacina</span>
                                    <span>Última dose</span>
                                    <span>Próxima dose</span>
                                    <span>Estado</span>
                                </div>
    
                                <ul>
                                    {vacinasDoPet.map((v) => (
                                        <CardVacina
                                        key={v.id}
                                        nome={v.nome}
                                        ultima={formatar(v.data)}
                                        proxima={formatar(v.proxima)}
                                        status={calcularStatus(v)}
                                        />
                                    ))}
                                </ul>
                            </section>
                        </main>
                    </div>
                </div>
        </section>
    )
}

export default Vacinas