import { useParams, Link } from 'react-router-dom'
import { usePets } from '../context/usePets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import CardMedicamento from '../componentes/CardMedicamento'

const ColunaPeriodo = ({ titulo, periodoExato, medicamentosDoPet, onRemover }) => {
    const medsNoPeriodo = medicamentosDoPet.filter((m) => m.periodo === periodoExato)

    return (
        <div className="flex flex-col bg-[#F8F0E6] rounded-2xl p-6 gap-5">
            <h3 className="flex items-center justify-center font-semibold text-xl uppercase">
                {titulo}
            </h3>

            <div role="list" className="flex flex-col gap-4 max-w-[500px]">
                {medsNoPeriodo.length > 0 ? (
                    medsNoPeriodo.map((med) => (
                        <div key={med.id} role="listitem" className="flex items-start gap-2">
                            <div className="flex-1 min-w-0">
                                <CardMedicamento {...med} />
                            </div>

                            <button
                                type="button"
                                onClick={() => onRemover(med)}
                                aria-label={`Remover medicamento${med.nome ? ` ${med.nome}` : ''}`}
                                className="mt-1 shrink-0 rounded-full p-2 text-[#75634F] transition hover:bg-[#F29A4B]/20 hover:text-[#2B1A0E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja"
                            >
                                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4h8v2" />
                                    <path d="M19 6l-1 14H6L5 6" />
                                    <path d="M10 11v5M14 11v5" />
                                </svg>
                            </button>
                        </div>
                    ))
                ) : (
                    <div role="listitem" className="flex gap-5 p-5 bg-[#FFFFFF] hover:shadow-md rounded-2xl border-2 border-[#F29A4B] border-dashed">
                        <p>Sem medicamentos</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Medicamentos() {
    const { id } = useParams()
    const { pets, medicamentos, setMedicamentos } = usePets()
    const voltarPara = `/pet/${id}`

    const pet = (pets || []).find((p) => p.id === Number(id))
    if (!pet) return <p>Pet não encontrado.</p>

    const medicamentosDoPet = (medicamentos || []).filter((m) => m.petId === pet.id)

    function removerMedicamento(med) {
        const nome = med.nome ? `"${med.nome}"` : 'este medicamento'
        if (!window.confirm(`Remover ${nome} de ${pet.nome}?`)) return

        setMedicamentos((anteriores) => anteriores.filter((m) => m.id !== med.id))
    }

    return (
        <div className="flex min-h-dvh bg-fundo text-texto font-sans text-[15px] antialiased">
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            <div className="flex-1 min-w-0 flex flex-col bg-[#FFFBF6]">
                <Header voltarPara={voltarPara} />

                <main className="flex flex-col gap-8 p-6 md:p-12">
                    <div className="flex flex-wrap items-center gap-6">
                        <h1 className="flex-1 min-w-[12rem] text-3xl md:text-[32px] font-semibold leading-[120%]">
                            Medicamentos - {pet.nome}
                        </h1>
                        <Link
                            to={`/pet/${pet.id}/adicionar-medicamento`}
                            className="flex items-center justify-center gap-2.5 h-[52px] w-full sm:w-[220px] px-6 rounded-xl border border-[#9c9c9c] hover:bg-[#F8F0E6] hover:shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja"
                        >
                            <img src="/svg/adicionar.svg" alt="" className="w-5 h-5 shrink-0" />
                            Adicionar medicamento
                        </Link>
                    </div>

                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {['Manhã', 'Tarde', 'Noite'].map((periodo) => (
                            <ColunaPeriodo
                                key={periodo}
                                titulo={periodo}
                                periodoExato={periodo}
                                medicamentosDoPet={medicamentosDoPet}
                                onRemover={removerMedicamento}
                            />
                        ))}
                    </section>
                </main>
            </div>
        </div>
    )
}