import { useParams, Link } from 'react-router-dom'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import CardConsulta from '../componentes/CardConsulta'

export default function Consultas(){
    const { id } = useParams()
    const { pets, consultas } = usePets()
    const voltarPara = `/pet/${id}`

    const pet = pets.find((p) => p.id === Number(id))
    if (!pet) return <p>Pet não encontrado.</p>

    // Filtra as consultas apenas desse pet
    const consultasDoPet = consultas.filter(
        (consulta) => consulta.petId === pet.id
    )

    return (
        <>
            {/* ================= DESKTOP ================= */}
            <section className="hidden md:block">
                <div className="flex">
                    <Sidebar />
                    <div className="bg-[#FFFBF6] flex flex-col self-stretch flex-1 min-h-screen">
                        <Header voltarPara={voltarPara}/>
                        
                        <main className="flex flex-col w-full py-6 px-4 sm:px-8 lg:px-16 items-start gap-10 self-stretch">
                            <div className="flex flex-col gap-10 self-stretch">
                                
                                <div className="flex justify-between items-center">
                                    <h1 className="flex items-start self-stretch text-4xl font-semibold"> Consultas </h1>
                                    <Link to={`/pet/${pet.id}/novo-agendamento`} className="flex px-5 py-3 gap-4 rounded-2xl font-semibold border border-[#9c9c9c] hover:shadow-md transition"> 
                                        <img src="/svg/adicionar.svg" alt="Adicionar nova consulta" />
                                        Adicionar uma nova consulta
                                    </Link>
                                </div>
                                
                                <div className="flex gap-[2.25rem]">
                                    
                                    {/* SE NÃO TIVER CONSULTA, MOSTRA ESTE BLOCO */}
                                    {consultasDoPet.length === 0 ? (
                                        <section>
                                            <ul className="flex flex-col gap-16 items-center p-6 max-w-[800px] min-h-[200px] bg-[#F8F0E6] rounded-2xl border-2 border-[#F29A4B] border-dashed relative"> 
                                                <li className="text-xl">
                                                    {pet.nome} não possui nenhuma consulta agendada.   
                                                </li>
                                                <li className="text-md font-semibold border-2 border-[#E8863a] rounded-full px-5 py-3 bg-[#F29A4B]">
                                                    <Link to={`/novo-agendamento`}> Adicionar novo agendamento </Link>
                                                </li>
                                            </ul>
                                        </section>
                                    ) : (
                                        /* SE TIVER CONSULTA, MOSTRA A LINHA DO TEMPO */
                                        <section className="w-[30rem]">
                                            <div className="rounded-3xl border border-[#E9DDCF] p-8">
                                                <h2 className="mb-6 text-2xl font-semibold">Histórico</h2>
                                                <ol className="ml-3 flex flex-col gap-8 border-l-2 border-[#E9DDCF] pl-8">
                                                    {consultasDoPet.map((consulta) => (
                                                        <CardConsulta key={consulta.id} {...consulta} />
                                                    ))}
                                                </ol>
                                            </div>
                                        </section>
                                    )}
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
                    <h1 className="text-2xl font-semibold text-[#120111]"> Consultas </h1>

                    <div className="flex justify-center w-full">
                        <Link to={`/pet/${pet.id}/novo-agendamento`} className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-2xl font-semibold text-sm border border-[#9c9c9c] hover:shadow-md transition">
                            <img src="/svg/adicionar.svg" alt="Adicionar consulta" className="w-5 h-5" />
                            <span>Adicionar consulta</span>
                        </Link>
                    </div>

                    {/* SE NÃO TIVER CONSULTA (MOBILE) */}
                    {consultasDoPet.length === 0 ? (
                        <section className="w-full">
                            <div className="flex flex-col items-center justify-center gap-6 p-6 min-h-[200px] bg-[#F8F0E6] rounded-2xl border-2 border-[#F29A4B] border-dashed text-center">
                                <p className="text-base text-[#120111]">
                                    {pet.nome} não possui nenhuma consulta agendada.
                                </p>
                                <Link to={`/pet/${pet.id}/novo-agendamento`} className="text-sm font-semibold border-2 border-[#E8863A] rounded-full px-5 py-3 bg-[#F29A4B] hover:shadow-md transition">
                                    Adicionar novo agendamento
                                </Link>
                            </div>
                        </section>
                    ) : (
                        /* SE TIVER CONSULTA (MOBILE) */
                        <section className="w-full">
                            <div className="rounded-3xl border-2 border-[#E9DDCF] p-5 flex flex-col gap-6">
                                <h2 className="text-xl font-semibold text-[#120111]"> Histórico </h2>
                                <ol className="ml-3 flex flex-col gap-8 border-l-2 border-[#E9DDCF] pl-7">
                                    {consultasDoPet.map((consulta) => (
                                        <CardConsulta key={consulta.id} {...consulta} />
                                    ))}
                                </ol>
                            </div>
                        </section>
                    )}
                </main>
            </section>
        </>
    )
}
