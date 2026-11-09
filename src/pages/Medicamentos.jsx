import { useParams, Link } from 'react-router-dom'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import CardMedicamento from '../componentes/CardMedicamento'

// 1. COMPONENTE EXTRAÍDO: Colocado fora do "export default function Medicamentos"
const ColunaPeriodo = ({ titulo, periodoExato, medicamentosDoPet }) => {
    const medsNoPeriodo = medicamentosDoPet.filter(m => m.periodo === periodoExato);

    return (
        <div className="flex flex-col bg-[#F8F0E6] rounded-2xl p-6 gap-5">
            <h3 className="flex items-center justify-center font-semibold text-xl uppercase">
                {titulo}
            </h3>
            <ul className="flex flex-col gap-4 max-w-[500px]"> 
                {medsNoPeriodo.length > 0 ? (
                    medsNoPeriodo.map((med) => (
                        <CardMedicamento key={med.id} {...med} />
                    ))
                ) : (
                    <li className="flex gap-5 p-5 bg-[#FFFFFF] hover:shadow-md rounded-2xl border-2 border-[#F29A4B] border-dashed">
                        <p>Sem medicamentos</p>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default function Medicamentos() {
    const { id } = useParams()
    const { pets, medicamentos } = usePets()
    
    // 2. PREVENÇÃO: Se 'pets' estiver indefinido, adota um array vazio.
    const pet = (pets || []).find((p) => p.id === Number(id))
    if (!pet) return <p>Pet não encontrado.</p>
    
    const medicamentosDoPet = (medicamentos || []).filter((m) => m.petId === pet.id);

    return (
        <div className="flex min-h-dvh bg-fundo text-texto font-sans text-[15px] antialiased">
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            <div className="flex-1 min-w-0 flex flex-col bg-[#FFFBF6]">
                <header className="flex items-center justify-between h-[88px] px-6 md:px-12 border-b border-bege">
                    <Link to={`/pet/${pet.id}`} className="flex items-center gap-2 text-lg font-semibold text-[#473C31] hover:text-laranja transition rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                        <img alt="Figura de seta laranja" src="/svg/voltar.svg" />
                        Voltar
                    </Link>
                </header>

                <main className="flex flex-col gap-8 p-6 md:p-12">
                    <div className="flex flex-wrap items-center gap-6">
                        <h1 className="flex-1 min-w-[12rem] text-3xl md:text-[32px] font-semibold leading-[120%]">
                            Medicamentos - {pet.nome}
                        </h1>
                        <Link to={`/pet/${pet.id}/adicionar-medicamento`}
                           className="flex items-center justify-center gap-2.5 h-[52px] w-full sm:w-[220px] px-6 rounded-xl border border-[#9c9c9c] hover:bg-[#F8F0E6] hover:shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                            <img src="/svg/adicionar.svg" alt="Adicionar medicamento" className="w-5 h-5 shrink-0" />
                            Adicionar medicamento
                        </Link>
                    </div>

                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {/* 3. PROP: Passando os medicamentos filtrados para o componente isolado */}
                        <ColunaPeriodo titulo="Manhã" periodoExato="Manhã" medicamentosDoPet={medicamentosDoPet} />
                        <ColunaPeriodo titulo="Tarde" periodoExato="Tarde" medicamentosDoPet={medicamentosDoPet} />
                        <ColunaPeriodo titulo="Noite" periodoExato="Noite" medicamentosDoPet={medicamentosDoPet} />
                    </section>
                </main>
            </div>
        </div>
    )
}