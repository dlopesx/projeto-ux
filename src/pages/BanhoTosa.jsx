import { useParams, Link } from 'react-router-dom'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import Banho from '../componentes/Banho'

export default function BanhoTosa(){
    const { id } = useParams()
    // Puxando os dois arrays separados
    const { pets, banhos, tosas } = usePets()
    const voltarPara = `/pet/${id}`
    
    const pet = pets.find((p) => p.id === Number(id))
    if (!pet) return <p>Pet não encontrado.</p>
    
    // Filtrando para o pet atual
    const banhosDoPet = banhos?.filter((b) => b.petId === pet.id) || [];
    const tosasDoPet = tosas?.filter((t) => t.petId === pet.id) || [];

    return (
        <>
            {/* ================= DESKTOP ================= */}
            <section className="hidden md:block">
                <div className="flex">
                    <Sidebar />
                    <div className="bg-[#FFFBF6] flex flex-col self-stretch flex-1 min-h-screen">
                        <Header voltarPara={voltarPara}/>
                        <main className="flex flex-col w-full py-6 px-4 sm:px-8 lg:px-16 items-start gap-10 self-stretch">
                            <div className="flex flex-col gap-10 w-full">
                                
                                <h1 className="flex items-start self-stretch text-4xl font-semibold">
                                    Banho e tosa
                                </h1>

                                <div className="flex gap-[5rem] items-start">
                                    {banhosDoPet.map((item) => (
                                        <Banho key={`banho-${item.id}`} titulo="Banho" proximaData={item.proximaData} historico={item.historico} />
                                    ))}
                                    
                                    {tosasDoPet.map((item) => (
                                        <Banho key={`tosa-${item.id}`} titulo="Tosa" proximaData={item.proximaData} historico={item.historico} />
                                    ))}
                                </div>
                                
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            {/* ================= MOBILE ================= */}
            <section className="block md:hidden min-h-screen w-full bg-[#FFFBF6]">
                <header className="min-h-16 px-6 py-4 border-b border-[#E9DDCF] flex items-center gap-4">
                    <Link to={`/pet/${pet.id}`} className="flex items-center gap-3">
                        <img src="/svg/voltar.svg" alt="Voltar" className="w-6 h-6" />
                        <span className="text-lg font-semibold text-[#75634F]">Voltar</span>
                    </Link>
                </header>

                <main className="w-full p-5 sm:p-6 flex flex-col gap-6">
                    <h1 className="text-2xl font-semibold text-[#120111]">
                        Banho e tosa
                    </h1>

                    {banhosDoPet.map((item) => (
                        <Banho key={`banho-${item.id}`} titulo="Banho" proximaData={item.proximaData} historico={item.historico} />
                    ))}
                    
                    {tosasDoPet.map((item) => (
                        <Banho key={`tosa-${item.id}`} titulo="Tosa" proximaData={item.proximaData} historico={item.historico} />
                    ))}
                    
                </main>
            </section>
        </>
    )
}