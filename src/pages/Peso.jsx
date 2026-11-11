import { useParams, Link } from 'react-router-dom'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'

export default function Peso(){
    const { id } = useParams()
    const { pets, pesos } = usePets()
    const voltarPara = `/pet/${id}`
    
    const pet = pets.find((p) => p.id === Number(id))
    if (!pet) return <p>Pet não encontrado.</p>
    
    // Busca os dados de peso desse pet específico (se não achar, deixa vazio)
    const dadosPeso = pesos?.find((p) => p.petId === pet.id) || { pesoAtual: '--', dataAtual: '--' };

    return(
        <div className="flex min-h-dvh bg-fundo text-texto font-sans text-[15px] antialiased">
            
            {/* SIDEBAR - Escondida no celular, aparece no tablet/desktop */}
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            {/* ÁREA PRINCIPAL */}
            <div className="flex-1 min-w-0 flex flex-col bg-[#FFFBF6]">
                
                <Header voltarPara={voltarPara}/>

                <main className="flex flex-col gap-8 p-6 md:p-12 w-full max-w-[1000px]">
                    
                    {/* Título + botão */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="text-3xl md:text-[32px] font-semibold leading-[120%]">
                            Peso - {pet.nome}
                        </h1>

                        <Link to={`/pet/${pet.id}/adicionar-peso`} 
                            className="flex items-center justify-center gap-2.5 h-[52px] w-full sm:w-[220px] px-6 rounded-xl border border-[#9c9c9c] hover:bg-[#F8F0E6] hover:shadow-md transition font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                            <img className="w-5 h-5" src="/svg/adicionar.svg" alt="Registrar peso" />
                            Registrar peso
                        </Link>
                    </div>

                    {/* GRÁFICO */}
                    <section className="w-full rounded-3xl border border-[#E9DDCF] bg-[#F8F0E6] p-5 md:p-8 overflow-hidden">
                        
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-baseline gap-3">
                                {/* DADOS DINÂMICOS DO CONTEXTO */}
                                <p className="text-4xl md:text-5xl font-bold text-[#2B1A0E]">{dadosPeso.pesoAtual}</p>
                                <p className="font-semibold text-sm md:text-base text-[#75634F]">em {dadosPeso.dataAtual}</p>
                            </div>
                            
                            <div className="flex gap-2 text-sm font-semibold" role="group" aria-label="Período">
                                <button type="button" aria-pressed="true" className="rounded-full border border-[#F29A4B] bg-[#F29A4B] px-4 py-1.5 md:py-2">
                                    6 meses
                                </button>
                            </div>
                        </div>

                        {/* O SVG convertido para o padrão React */}
                        <div className="w-full overflow-hidden">
                            <svg viewBox="0 0 600 240" className="w-full h-auto min-w-[500px]" role="img" aria-label={`Gráfico de linha do peso de ${pet.nome}`}>
                                {/* faixa ideal */}
                                <rect x="50" y="65" width="520" height="90" rx="8" fill="#EEEE88" fillOpacity="0.45"/>
                                <text x="562" y="79" textAnchor="end" fontSize="10" fontWeight="700" fill="#75634F">FAIXA IDEAL</text>
                                
                                {/* linhas de grade */}
                                <g stroke="#E9DDCF" strokeWidth="1">
                                    <line x1="50" y1="20" x2="570" y2="20"/>
                                    <line x1="50" y1="65" x2="570" y2="65"/>
                                    <line x1="50" y1="110" x2="570" y2="110"/>
                                    <line x1="50" y1="155" x2="570" y2="155"/>
                                    <line x1="50" y1="200" x2="570" y2="200"/>
                                </g>
                                
                                {/* eixo y */}
                                <g fontSize="11" fontWeight="600" fill="#75634F" textAnchor="end">
                                    <text x="40" y="24">{pet.especie === 'Ave' ? '120' : '7,0'}</text>
                                    <text x="40" y="69">{pet.especie === 'Ave' ? '110' : '6,5'}</text>
                                    <text x="40" y="114">{pet.especie === 'Ave' ? '100' : '6,0'}</text>
                                    <text x="40" y="159">{pet.especie === 'Ave' ? '90'  : '5,5'}</text>
                                    <text x="40" y="204">{pet.especie === 'Ave' ? '80'  : '5,0'}</text>
                                </g>
                                
                                {/* linha principal */}
                                <polyline points="60,146 160,128 260,119 360,110 460,101 560,110" fill="none" stroke="#F29A4B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                
                                {/* pontos de conexão */}
                                <g fill="#FFFBF6" stroke="#F29A4B" strokeWidth="3">
                                    <circle cx="60" cy="146" r="6"/>
                                    <circle cx="160" cy="128" r="6"/>
                                    <circle cx="260" cy="119" r="6"/>
                                    <circle cx="360" cy="110" r="6"/>
                                    <circle cx="460" cy="101" r="6"/>
                                </g>
                                <circle cx="560" cy="110" r="8" fill="#F29A4B" stroke="#FFFBF6" strokeWidth="3"/>
                                
                                {/* valores em cima dos pontos */}
                                <g fontSize="12" fontWeight="700" fill="#2B1A0E" textAnchor="middle">
                                    <text x="60" y="132">{pet.especie === 'Ave' ? '93' : '5,6'}</text>
                                    <text x="160" y="114">{pet.especie === 'Ave' ? '97' : '5,8'}</text>
                                    <text x="260" y="105">{pet.especie === 'Ave' ? '98' : '5,9'}</text>
                                    <text x="360" y="96">{pet.especie === 'Ave' ? '100' : '6,0'}</text>
                                    <text x="460" y="87">{pet.especie === 'Ave' ? '101' : '6,1'}</text>
                                    <text x="560" y="96">{pet.especie === 'Ave' ? '100' : '6,0'}</text>
                                </g>
                                
                                {/* eixo x (meses) */}
                                <g fontSize="11" fontWeight="700" fill="#75634F" textAnchor="middle">
                                    <text x="60" y="226">MAI</text>
                                    <text x="160" y="226">JUN</text>
                                    <text x="260" y="226">JUL</text>
                                    <text x="360" y="226">AGO</text>
                                    <text x="460" y="226">SET</text>
                                    <text x="560" y="226">OUT</text>
                                </g>
                            </svg>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}