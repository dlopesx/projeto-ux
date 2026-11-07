import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Tina() {
    const navigate = useNavigate()
  return (
    <>

      <section className="hidden md:block">
        <div className="flex min-h-dvh">
            {/* <!-- SIDEBAR (só aparece a partir de 768px) --> */}
            <aside className="hidden md:flex sticky top-0 h-screen w-[248px] shrink-0 flex-col bg-superficie border-r border-bege px-4 py-6" aria-label="Menu lateral">
{/* 
                <!-- perfil --> */}
                <a href="#" aria-label="Perfil de Marina" className="group flex items-center gap-3 px-2 py-2 mb-6 rounded-2xl hover:bg-bege transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                    <span className="w-10 h-10 shrink-0 rounded-full bg-bege group-hover:bg-superficie flex items-center justify-center font-semibold transition" aria-hidden="true">M</span>
                    <span className="flex-1 min-w-0 text-base font-semibold truncate">Marina</span>
                    <img src="/svg/v.svg" alt="" className="w-4 h-4 shrink-0"/>
                </a>

                <nav className="flex-1" aria-label="Navegação principal">
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link to="/" className="flex items-center gap-3 pl-6 pr-3 py-3 rounded-xl hover:bg-bege transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                <img src="/svg/inicio.svg" alt="Início" className="w-6 h-6 shrink-0"/>
                                Início
                            </Link>
                        </li>

                        {/* <!-- item ativo: barrinha só no meio --> */}
                        <li className="relative">
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-laranja"></span>
                            <a href="#" aria-current="page" className="flex items-center gap-3 pl-6 pr-3 py-3 rounded-xl bg-bege font-semibold">
                                <img src="/svg/paw-print.svg" alt="Pata de cachorrro" className="w-6 h-6 shrink-0"/>
                                Meus pets
                            </a>
                        </li>

                        <li>
                            <a href="#" className="flex items-center gap-3 pl-6 pr-3 py-3 rounded-xl hover:bg-bege transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                <img src="/svg/calendario.svg" alt="Calendário" className="w-6 h-6 shrink-0"/>
                                Agendamentos
                            </a>
                        </li>
                        <li>
                            <a href="meus_alertas.html" className="flex items-center gap-3 pl-6 pr-3 py-3 rounded-xl hover:bg-bege transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                <img src="/svg/notificacao.svg" alt="Sino de notificação" className="w-6 h-6 shrink-0"/>
                                Alertas
                            </a>
                        </li>
                    </ul>
                </nav>

                
            </aside>

            {/* <!-- ÁREA PRINCIPAL --> */}
            <div className="flex-1 min-w-0 flex flex-col">

                <header className="flex items-center h-[88px] px-6 md:px-12 border-b border-bege">
                    <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-[#473C31] hover:text-laranja transition rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                        <img src="/svg/voltar.svg" alt="Voltar" className="w-5 h-5"/>
                        Voltar
                    </Link>
                </header>

                <main className="p-6 md:p-12">
{/* 
                    <!-- no desktop largo: cartão do pet na esquerda e cuidados na direita; abaixo disso, um sobre o outro --> */}
                    <div className="flex flex-col xl:flex-row items-stretch xl:items-start gap-8">

                        {/* <!-- IDENTIFICAÇÃO DO PET --> */}
                        <section aria-label="Identificação do pet"
                            className="flex flex-col items-center gap-6 w-full xl:w-[300px] xl:shrink-0 xl:min-h-[539px] px-8 py-8 rounded-[28px] bg-laranja text-center text-xl">

                            <div className="flex items-center justify-center w-[140px] h-[140px] shrink-0 rounded-full bg-cabecalho border border-bege">
                                <img src="/svg/dog.svg" alt="Foto de perfil tina" className="w-[70px] h-[70px]"/>
                            </div>

                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl md:text-4xl font-semibold">Tina</h1>
                                <button type="button" aria-label="Editar perfil da Tina"
                                    className="p-1 rounded-lg hover:bg-white/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-texto">
                                    <img src="/svg/editar.svg" alt="Editar" className="w-5 h-5"/>
                                </button>
                            </div>

                            <p className="leading-[145%]">Cachorro • fêmea</p>
                            <p className="leading-[145%]">1 ano</p>
                        </section>
{/* 
                        <!-- CUIDADOS --> */}
                        <div className="flex flex-col flex-1 min-w-0 gap-6 text-left">

                            <h2 className="text-[22px] font-semibold leading-[145%]">Próximos cuidados</h2>

                            <ul className="flex flex-col gap-5 p-7 pl-12 list-disc marker:text-laranja rounded-[20px] bg-superficie border border-bege text-base leading-[145%]">
                                <li>Vacinação — hoje, 14h</li>
                                <li>Limpar vasilha — hoje</li>
                            </ul>

                            <h2 className="text-[22px] font-semibold leading-[145%]">Cuidados</h2>

                            <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 text-base">

                                <li>
                                    <a href="cards_pet/painel_vacinas.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6 rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/vacinas.svg" alt="Vacina" className="w-6 h-6 shrink-0"/>
                                        Vacinas
                                    </a>
                                </li>

                                <li>
                                    <a href="cards_pet/consultas_tina.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6 rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/consulta.svg" alt="Consulta" className="w-6 h-6 shrink-0"/>
                                        Consultas
                                    </a>
                                </li>

                                <li>
                                    <a href="cards_pet/alimentacao_tina.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6 rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/talher.svg" alt="Alimentação" className="w-6 h-6 shrink-0"/>
                                        Alimentação
                                    </a>
                                </li>

                                <li>
                                    <a href="cards_pet/medicamentos_tina.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6 rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/estrela.svg" alt="Medicamentos" className="w-6 h-6 shrink-0"/>
                                        Medicamentos
                                    </a>
                                </li>

                                <li>
                                    <a href="cards_pet/cio.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6 rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/coracao.svg" alt="Coração" className="w-6 h-6 shrink-0"/>
                                        Cio
                                    </a>
                                </li>

                                <li>
                                    <a href="cards_pet/banho_tosa.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6 rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/banheira.svg" alt="Banho" className="w-6 h-6 shrink-0"/>
                                        Banho e Tosa
                                    </a>
                                </li>

                                <li>
                                    <a href="cards_pet/peso_tina.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6 rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/maos.svg" alt="Peso" className="w-6 h-6 shrink-0"/>
                                        Peso
                                    </a>
                                </li>

                                <li>
                                    <a href="cards_pet/unhas_orelhas.html"
                                    className="flex flex-col items-start gap-[18px] h-[118px] min-w-0 p-6  rounded-[20px] bg-superficie border border-bege hover:shadow-md hover:-translate-y-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
                                        <img src="/svg/coracao.svg" alt="Coração" className="w-6 h-6 shrink-0"/>
                                        Unhas/Orelhas
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
        <div className="w-96 relative bg-Fundo rounded-3xl inline-flex flex-col justify-start items-start overflow-hidden">

            <header className="self-stretch h-64 px-6 pt-6 pb-9 relative bg-[#FFF6EC] flex flex-col justify-start items-center gap-2.5 overflow-hidden">

                <button type="button" 
                    onClick={() => navigate('/')} 
                    aria-label="Voltar" className="left-6 top-6 absolute">
                    <img src="/svg/voltar.svg" alt="Voltar" className="size-5"/>
                </button>

                <figure className="size-20 mt-8 bg-[#FFF6EC] rounded-full border border-[#E9DDCF] flex justify-center items-center overflow-hidden">
                    <img src="/svg/tina.svg" alt="Ilustração de um cachorro" className="w-10 h-9"/>
                </figure>

                <div className="inline-flex justify-center items-center gap-2">
                    <h1 className="text-[#382719] text-2xl font-semibold font-['Inter']">
                        Tina
                    </h1>

                    <button type="button" aria-label="Editar perfil" className="size-4 relative overflow-hidden">
                        <img src="/svg/lapis.svg" alt="Figura de um lápis laranja" className="size-3.5 absolute left-[1.5px] top-[1.5px]"/>
                    </button>
                </div>

                <p className="self-stretch text-center text-[#75634F] text-sm font-normal font-['Inter'] leading-5">
                    Cachorro • fêmea<br/>
                    1 ano
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
                            Vacinação — hoje,14h
                        </li>

                        <li className="self-stretch text-[#8F4B17] text-sm font-normal font-['Inter'] leading-5">
                            Limpar vasilha — hoje
                        </li>
                    </ul>

                </div>

                <div className="self-stretch flex flex-col justify-start items-start gap-3">

                    <h2 id="cuidados" className="self-stretch text-[#8F4B17] text-lg font-semibold font-['Inter']">
                        Cuidados
                    </h2>

                    <nav aria-label="Categorias de cuidados" className="self-stretch grid grid-cols-2 gap-3">

                        <a href="cards_pet/painel_vacinas.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/vacinas.svg" alt="Figura de uma vacina laranja" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Vacinas
                            </span>
                        </a>

                        <a href="cards_pet/consultas_tina.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/consulta.svg" alt="Figura de um estetoscópio" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Consultas
                            </span>
                        </a>

                        <a href="cards_pet/alimentacao_tina.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/talher.svg" alt="Alimentação" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Alimentação
                            </span>
                        </a>

                        <a href="cards_pet/cio.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/coracao.svg" alt="Figura de um coração laranja" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Cio
                            </span>
                        </a>

                    </nav>

                    <nav aria-label="Categorias de cuidados" className="self-stretch grid grid-cols-2 gap-3">

                        <a href="cards_pet/medicamentos_tina.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/estrela.svg" alt="Figura de uma estrela laranja" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Medicamentos
                            </span>
                        </a>

                        <a href="cards_pet/banho_tosa.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/maos.svg" alt="Figura de duas mãos com um + no centro" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Banho e Tosa
                            </span>
                        </a>

                        <a href="cards_pet/peso_tina.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/banheira.svg" alt="Figura de uma banheira laranja" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Peso
                            </span>
                        </a>

                        <a href="cards_pet/unhas_orelhas.html" className="h-20 p-3.5 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col justify-start items-start gap-2.5">
                            <img src="/svg/coracao.svg" alt="Figura de um coração laranja" aria-hidden="true" className="size-5"/>
                            <span className="text-[#8F4B17] text-xs font-normal font-['Inter']">
                                Unhas/Orelhas
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

export default Tina