import { useParams, Link } from 'react-router-dom'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
// Importando o novo componente que você criou:
import CardCuidado from '../componentes/CardCuidado'

export default function UnhasOrelhas(){
    const { id } = useParams()
    const { pets, unhas, orelhas } = usePets()
    
    const pet = pets.find((p) => p.id === Number(id))
    if (!pet) return <p>Pet não encontrado.</p>
    
    const unhasDoPet = unhas?.filter((u) => u.petId === pet.id) || [];
    const orelhasDoPet = orelhas?.filter((o) => o.petId === pet.id) || [];

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
                        Unhas e orelhas
                    </h1>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-[5rem] items-start">
                        {unhasDoPet.map((item) => (
                            <CardCuidado 
                                key={`unha-${item.id}`} 
                                titulo="Unhas" 
                                proximaData={item.proximaData} 
                                historico={item.historico} 
                                tituloHistorico="Histórico de unhas"
                            />
                        ))}
                        
                        {orelhasDoPet.map((item) => (
                            <CardCuidado 
                                key={`orelha-${item.id}`} 
                                titulo="Orelhas" 
                                proximaData={item.proximaData} 
                                historico={item.historico} 
                                tituloHistorico="Histórico de limpeza"
                            />
                        ))}
                    </div>

                </main>
            </div>
        </div>
    )
}