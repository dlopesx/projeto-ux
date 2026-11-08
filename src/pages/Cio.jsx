import { useParams, Link } from 'react-router-dom'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'

export default function Cio(){
    const { id } = useParams()
    const { pets, cios } = usePets()
    
    const pet = pets.find((p) => p.id === Number(id))
    if (!pet) return <p>Pet não encontrado.</p>
    
    // Busca os cios do pet. Pega o primeiro (se houver) para renderizar a timeline
    const cioDoPet = cios?.find((c) => c.petId === pet.id) || { historico: [] };

    return(
        <div className="flex min-h-dvh bg-fundo text-texto font-sans text-[15px] antialiased">
            
            {/* SIDEBAR */}
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            {/* ÁREA PRINCIPAL */}
            <div className="flex-1 min-w-0 flex flex-col bg-[#FFFBF6]">
                
                {/* HEADER */}
                <header className="flex items-center justify-between h-[88px] px-6 md:px-12 border-b border-bege">
                    <Link to={`/pet/${pet.id}`} className="flex items-center gap-2 text-lg font-semibold text-[#473C31] hover:text-laranja transition rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                        <img alt="Voltar" src="/svg/voltar.svg" className="w-6 h-6" />
                        Voltar
                    </Link>
                </header>

                <main className="flex flex-col gap-8 p-6 md:p-12 w-full">
                    
                    <h1 className="text-2xl md:text-4xl font-semibold text-[#120111]">
                        Cio - Histórico
                    </h1>

                    <section className="w-full md:w-[30rem] rounded-3xl border md:border-[#E9DDCF] border-2 bg-[#FFFBF6] p-5 md:p-8 flex flex-col gap-6 md:gap-7">
                        
                        <Link to={`/pet/${pet.id}/adicionar-cio`} className="flex items-center justify-center px-4 py-3 gap-3 md:gap-4 rounded-2xl font-semibold border border-[#9c9c9c] hover:shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                            <img src="/svg/adicionar.svg" alt="Adicionar registro" className="w-5 h-5" />
                            <span>Adicionar registro</span>
                        </Link>

                        <ol className="ml-3 flex flex-col gap-8 border-l-2 border-[#E9DDCF] pl-7 md:pl-8">
                            
                            {cioDoPet.historico.length > 0 ? (
                                cioDoPet.historico.map((dataHist, index) => (
                                    <li key={index} className="relative flex flex-col gap-1">
                                        <span className="absolute -left-[36px] md:-left-[41px] top-1 h-4 w-4 rounded-full border-4 border-[#F8F0E6] bg-[#F29A4B]"></span>
                                        
                                        {/* Apenas o primeiro item ganha a tag de "Última menstruação" */}
                                        {index === 0 && (
                                            <p className="text-sm font-semibold text-[#75634F]">
                                                Última menstruação
                                            </p>
                                        )}
                                        
                                        <p className="text-lg md:text-xl font-semibold text-[#120111]">
                                            {dataHist}
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <p className="text-[#75634F]">Nenhum registro de cio encontrado.</p>
                            )}

                        </ol>

                    </section>

                </main>
            </div>
        </div>
    )
}