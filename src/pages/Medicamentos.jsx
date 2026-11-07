import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import CardVacina from '../componentes/CardVacina'

function Medicamentos(){

    const { id } = useParams()
    const { pets, alimentacao } = usePets()
    const pet = pets.find((p) => p.id === Number(id))

    if (!pet) return <p>Pet não encontrado.</p>
    
    const alimentacaoDoPet = pet.filter((a) => a.petId === pet.id)

    return(
        <section class="hidden md:block">
            <div class="flex">
                
                <Sidebar />

                    {/* <!-- ÁREA PRINCIPAL --> */}
                    <div className="flex-1 min-w-0 flex flex-col">
    
                        <Header />
    
                        <main className="p-6 md:p-12">


                        </main>

                    </div>
            </div>
        </section>
    )
}
export default Medicamentos