import { useState } from 'react'
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

const FILTROS = [
    { valor: 'todas', rotulo: 'Todas' },
    { valor: 'atrasada', rotulo: 'Atrasadas' },
    { valor: 'proxima', rotulo: 'Próximas' },
]

function Vacinas() {
    const { id } = useParams()
    const { pets, vacinas } = usePets()
    const [filtro, setFiltro] = useState('todas')

    const pet = pets.find((p) => p.id === Number(id))
    const voltarPara = `/pet/${id}`

    if (!pet) return <p>Pet não encontrado.</p>

    const vacinasDoPet = vacinas.filter((v) => v.petId === pet.id)

    // calcula o status uma vez e filtra por ele
    const vacinasComStatus = vacinasDoPet.map((v) => ({ ...v, status: calcularStatus(v) }))
    const vacinasFiltradas =
        filtro === 'todas'
            ? vacinasComStatus
            : vacinasComStatus.filter((v) => v.status === filtro)

    return (
        <section className="hidden md:block ">
            <div className="flex">
                <Sidebar />
                <div className=" bg-[#FFFBF6] flex flex-col self-stretch flex-1">
                    <Header voltarPara={voltarPara} />
                    <main className="flex py-6 px-4 sm:px-8 lg:px-16 flex-col items-start self-stretch gap-8">

                        {/* título + botão */}
                        <div className="flex flex-wrap items-center gap-6">
                            <h1 className="flex-1 min-w-[12rem] text-3xl md:text-[32px] font-semibold leading-[120%]">{pet.nome} — vacinas</h1>

                            <Link to={`/pet/${pet.id}/adicionar-vacina`}
                                className="flex items-center justify-center gap-2.5 h-[52px] w-full sm:w-[220px]
                                px-6 rounded-xl bg-fundo border border-bege hover:bg-superficie hover:shadow-md
                                transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                <img src="/svg/adicionar.svg" alt="" className="w-5 h-5 shrink-0" />
                                Adicionar vacina
                            </Link>
                        </div>

                        {/* filtro */}
                        <div className="flex flex-wrap items-center gap-4 text-sm" role="group" aria-label="Filtro de vacinas">
                            <span className="font-semibold">Filtro:</span>
                            {FILTROS.map((f) => (
                                <button
                                    key={f.valor}
                                    type="button"
                                    onClick={() => setFiltro(f.valor)}
                                    aria-pressed={filtro === f.valor}
                                    className={`px-5 py-3 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja ${
                                        filtro === f.valor
                                            ? 'bg-laranja border-laranja'
                                            : 'bg-fundo border-bege hover:bg-superficie'
                                    }`}
                                >
                                    {f.rotulo}
                                </button>
                            ))}
                        </div>

                        <h2 className="text-[22px] font-semibold leading-[145%]">
                            {FILTROS.find((f) => f.valor === filtro).rotulo === 'Todas'
                                ? 'Todas as vacinas'
                                : `Vacinas ${FILTROS.find((f) => f.valor === filtro).rotulo.toLowerCase()}`}
                        </h2>

                        {/* carteira de vacinação */}
                        <section className="rounded-[20px] border border-bege overflow-hidden w-full" aria-label="Carteira de vacinação">

                            {/* cabeçalho da lista (só no desktop) */}
                            <div className="hidden md:grid grid-cols-4 gap-6 p-6 bg-cabecalho text-sm font-semibold text-suave" aria-hidden="true">
                                <span>Vacina</span>
                                <span>Última dose</span>
                                <span>Próxima dose</span>
                                <span>Estado</span>
                            </div>

                            {vacinasFiltradas.length === 0 ? (
                                <p className="p-6 text-suave">Nenhuma vacina nessa categoria.</p>
                            ) : (
                                <ul>
                                    {vacinasFiltradas.map((v) => (
                                        <CardVacina
                                            key={v.id}
                                            nome={v.nome}
                                            ultima={formatar(v.data)}
                                            proxima={formatar(v.proxima)}
                                            status={v.status}
                                        />
                                    ))}
                                </ul>
                            )}
                        </section>
                    </main>
                </div>
            </div>
        </section>
    )
}

export default Vacinas