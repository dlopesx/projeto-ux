import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Fiu() {
    const navigate = useNavigate()
  return (
    <>
      <section className="hidden md:block">
        <div className="flex min-h-dvh">

            <aside className="hidden md:flex sticky top-0 h-screen w-[248px] shrink-0 flex-col bg-superficie border-r border-bege px-4 py-6" aria-label="Menu lateral">

                <div className="flex flex-col flex-1 px-3 py-4 justify-between bg-neutral-primary-soft">
                <ul className="flex-1 space-y-2 font-medium">
                    <li className="flex">
                        <a href="#" className="flex flex-1 items-center px-2 py-3 rounded-2xl group">
                            <span className="px-1 pb-6 text-xl font-bold">Site nome</span>
                        </a>
                        <button> <img className="w-6 h-6 mb-6" src="/svg/fechar.svg" alt="X cinza para fechar menu lateral"/></button>
                    </li>

                    <li className="pb-3 mb-2 border-b border-[#E9DDCF]">
                        <a href="#" aria-label="Perfil de Marina" className="group flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-[#E9DDCF]">
                            <span className="w-10 h-10 shrink-0 rounded-full bg-[#E9DDCF] group-hover:bg-[#F8F0E6] flex items-center justify-center font-semibold transition" aria-hidden="true">M</span>
                            <span className="flex-1 min-w-0 font-semibold truncate">Marina</span>
                        </a>
                    </li>

                    <li>
                        <Link to="/" className="flex items-center px-2 py-3 rounded-xl hover:bg-[#E9DDCF] group">
                            <img className="w-6 h-6" src="/svg/inicio.svg" alt="Figura de uma casa na cor laranja"/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Início</span>
                        </Link>
                    </li>
                    <li className="relative">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]"></span>
                        <a href="meus_pets.html" className="flex items-center px-2 py-3 pl-6 rounded-2xl hover:bg-[#E9DDCF] group" aria-current="page">
                            <img className="w-6 h-6" src="/svg/paw-print.svg" alt="Pata de animal na cor laranja"/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Meus pets</span>
                        </a>
                    </li>
                    <li>
                        <a href="meus_agendamentos.html" className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group">
                            <img className="w-6 h-6" src="/svg/calendario.svg" alt="Calendario na cor laranja"/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Agendamentos</span>
                        </a>
                    </li>
                    <li>
                        <a href="meus_alertas.html" className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group">
                            <img className="w-6 h-6" src="/svg/notificacao.svg" alt="Sino de alerta na cor laranja"/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Alertas</span>
                        </a>
                    </li>
                    <li>
                        <a href="tutores.html" className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group">
                            <img className="w-6 h-6" src="/svg/tutores.svg" alt="Figura de usuários na cor laranja"/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Outros tutores</span>
                        </a>
                    </li>
                </ul>

            </div>

            </aside>

            <div className="flex-1 min-w-0 flex flex-col">

                <header className="flex items-center h-[88px] px-6 md:px-12 border-b border-bege">
                    <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-[#473C31] hover:text-laranja transition rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                        <img src="/svg/voltar.svg" alt="Voltar" className="w-5 h-5"/>
                        Voltar
                    </Link>
                </header>

                <main className="p-6 md:p-12">

                    {/* <!-- no desktop largo: cartão do pet na esquerda e cuidados na direita; abaixo disso, um sobre o outro --> */}
                    <div className="flex flex-col xl:flex-row items-stretch xl:items-start gap-8">

                        {/* <!-- IDENTIFICAÇÃO DO PET --> */}
                        <section aria-label="Identificação do pet"
                            className="flex flex-col items-center gap-6 w-full xl:w-[300px] xl:shrink-0 xl:min-h-[539px] px-8 py-8 rounded-[28px] bg-laranja text-center text-xl">

                            <div className="flex items-center justify-center w-[140px] h-[140px] shrink-0 rounded-full bg-cabecalho border border-bege">
                                <img src="/svg/fiu.svg" alt="Figura de um pássaro" className="w-[70px] h-[70px]"/>
                            </div>

                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl md:text-4xl font-semibold">Fiu</h1>
                                <button type="button" aria-label="Editar perfil da Tina"
                                    className="p-1 rounded-lg hover:bg-white/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-texto">
                                    <img src="/svg/editar.svg" alt="Editar" className="w-5 h-5"/>
                                </button>
                            </div>

                            <p className="leading-[145%]">Calopsita • macho</p>
                            <p className="leading-[145%]">2 anos</p>
                        </section>

                        {/* <!-- CUIDADOS --> */}
                        <div className="flex flex-col flex-1 min-w-0 gap-6 text-left">

                            <h2 className="text-[22px] font-semibold leading-[145%]">Próximos cuidados</h2>

                            <ul className="flex flex-col gap-5 p-7 pl-12 list-disc marker:text-laranja rounded-[20px] bg-superficie border border-bege text-base leading-[145%]">
                                <li>Limpar gaiola — amanhã</li>
                                <li>Comprar ração extrusada — amanhã</li>
                            </ul>

                            <h2 className="text-[22px] font-semibold leading-[145%]">Cuidados</h2>

                            <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 text-base">

                                <li>
                                    <a href="cards_pet/consultas_fiu.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6 rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/vacinas.svg" alt="Consultas" className="w-6 h-6 shrink-0"/>
                                        Consultas
                                    </a>
                                </li>

                                <li>
                                    <a href="cards_pet/medicamentos_fiu.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6 rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/estrela.svg" alt="Medicamentos" className="w-6 h-6 shrink-0"/>
                                        Medicamentos
                                    </a>
                                </li>

                                <li>
                                    <a href="cards_pet/alimentacao_fiu.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6 rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/talher.svg" alt="Alimentação" className="w-6 h-6 shrink-0"/>
                                        Alimentação
                                    </a>
                                </li>

                                <li>
                                    <a href="cards_pet/peso_fiu.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6 rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/banheira.svg" alt="Peso" className="w-6 h-6 shrink-0"/>
                                        Peso
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>

                </main>
            </div>
        </div>
      </section>

      <section className="block md:hidden">
        <div className="w-96 relative bg-fundo rounded-3xl inline-flex flex-col justify-start items-start overflow-hidden">

            <header className="self-stretch h-64 px-6 pt-6 pb-9 relative bg-[#FFF6EC] flex flex-col justify-start items-center gap-2.5 overflow-hidden">

                <button type="button" 
                    onClick={() => navigate('/')} 
                    aria-label="Voltar" className="left-6 top-6 absolute">
                    <img src="/svg/voltar.svg" alt="Voltar" className="size-5"/>
                </button>

                <figure className="size-20 mt-8 bg-[#FFF6EC] rounded-full border border-[#E9DDCF] flex justify-center items-center overflow-hidden">
                    <img src="/svg/fiu.svg" alt="Ilustração de um pássaro" className="w-10 h-9"/>
                </figure>

                <div className="inline-flex justify-center items-center gap-2">
                    <h1 className="text-[#382719] text-2xl font-semibold font-['Inter']">
                        Fiu
                    </h1>

                    <button type="button" aria-label="Editar perfil" className="size-4 relative overflow-hidden">
                        <img src="/svg/lapis.svg" alt="Editar" className="size-3.5 absolute left-[1.5px] top-[1.5px]"/>
                    </button>
                </div>

                <p className="self-stretch text-center text-[#75634F] text-sm font-normal font-['Inter'] leading-5">
                    Calopsita • macho<br/>
                    2 ano
                </p>

                <img src="/svg/curvaMobile.svg" alt="Curva de fundo" aria-hidden="true" className="absolute left-0 bottom-0 w-full h-12 object-fill"/>
            </header>

            <div className="self-stretch p-6 flex flex-col justify-start items-start gap-6 overflow-hidden bg-[#FFFCF8]">

                <div className="self-stretch flex flex-col justify-start items-start gap-3">

                    <h2 id="proximos-cuidados" className="self-stretch text-[#382719] text-lg font-semibold font-['Inter']">
                        Próximos cuidados
                    </h2>

                    <ul className="self-stretch p-4 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col items-start gap-3">
                        <li className="self-stretch text-[#8F4B17] text-sm font-normal font-['Inter'] leading-5">
                            Limpar gaiola — amanhã
                        </li>

                        <li className="self-stretch text-[#8F4B17] text-sm font-normal font-['Inter'] leading-5">
                            Comprar ração — amanhã
                        </li>
                    </ul>

                </div>

                <div className="self-stretch flex flex-col justify-start items-start gap-3">

                    <h2 id="cuidados" className="self-stretch text-[#8F4B17] text-lg font-semibold font-['Inter']">
                        Cuidados
                    </h2>

                    <nav aria-label="Categorias de cuidados" className="self-stretch grid grid-cols-2 gap-3">

                        <a href="cards_pet/consultas_fiu.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/consulta.svg" alt="Figura de um estetoscópio" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Consultas
                            </span>
                        </a>

                        <a href="cards_pet/medicamentos_fiu.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/medicamento.svg" alt="Figura de um comprimido" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Medicamento
                            </span>
                        </a>

                        <a href="cards_pet/alimentacao_fiu.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/talher.svg" alt="Figura de talheres" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Alimentação
                            </span>
                        </a>

                        <a href="cards_pet/peso_fiu.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/estrela.svg" alt="Figura de uma estrela" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Peso
                            </span>
                        </a>

                    </nav>
                </div>

            </div>
        </div>
      </section>
    </>
  )
}

export default Fiu