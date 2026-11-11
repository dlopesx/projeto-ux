import { useState } from 'react'
import { Link } from 'react-router-dom' 
import { useNavigate } from 'react-router-dom'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import { usePets } from '../context/Pets'

function Home() {
    const { pets } = usePets()    // NOVO (aqui só precisa de pets, não de setPets)
    const [painelAberto, setPainelAberto] = useState(false)
    const [painelMobileAberto, setPainelMobileAberto] = useState(false)
    const [menuMobileAberto, setMenuMobileAberto] = useState(false)
    const navigate = useNavigate()
    
  return (
    <>
      <section className="hidden md:block ">
        <div className="flex">

            <Sidebar />

                <div className=" bg-[#FFFBF6] flex flex-col self-stretch flex-1"> 

                    <Header />
                    
                    <main className="flex py-6 px-4 sm:px-8 lg:px-16 flex-col items-start self-stretch">
                        
                        <div className="flex flex-col items-center self-stretch gap-[2.25rem]">
                            <div className="flex justify-between self-stretch items-center">
                                <h1 className= " flex items-start self-stretch text-4xl font-semibold"> Oi, Marina! </h1>
                                <button id="bt-adicionar" onClick={() => setPainelAberto(true)} className="flex bg-[#F29A4B] px-4 py-3 gap-4 rounded-2xl  font-semibold hover:bg-[#E8863A] hover:shadow-md transition transition" > <img src = "/svg/adicionar.svg" alt="Botão de 'Mais'"/>
                                    Adicionar </button>
                            </div>
                            <dialog id="painel-adicionar" open={painelAberto} aria-label="Adicionar novo item"
                                className="fixed top-[7rem] right-4 md:right-[250px] left-auto bottom-auto m-0 p-0 w-80 max-w-[calc(100%-2rem)]
                                    bg-transparent text-[#2B1A0E] overflow-visible backdrop:bg-transparent
                                    open:flex flex-col gap-3">

                                <button id="fechar_painel" onClick={() => setPainelAberto(false)} type="button"
                                    className="self-end px-4 py-2 rounded-xl bg-white border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F29A4B]">
                                    Fechar menu
                                </button>

                                <ul className="flex flex-col gap-2 p-4 bg-white border border-[#E9DDCF] rounded-2xl shadow-md">
                                    <li>
                                        <Link to="novo-alerta"
                                        className="flex items-center gap-5 p-5 rounded-2xl bg-[#F8F0E6] hover:shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F29A4B]">
                                            <img src="/svg/notificacao.svg" alt="Sino de notificação" className="w-6 h-6 shrink-0"/>
                                            Adicionar novo alerta
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/novo-agendamento"
                                        className="flex items-center gap-5 p-5 rounded-2xl bg-[#F8F0E6] hover:shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F29A4B]">
                                            <img src="/svg/calendario.svg" alt="Calendário" className="w-6 h-6 shrink-0"/>
                                            Adicionar agendamento
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="nova-vacina"
                                        className="flex items-center gap-5 p-5 rounded-2xl bg-[#F8F0E6] hover:shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F29A4B]">
                                            <img src="/svg/vacinas.svg" alt="Adicionar vacina" className="w-6 h-6 shrink-0"/>
                                            Adicionar nova vacina
                                        </Link>
                                    </li>
                                </ul>
                            </dialog>

                            <div className="flex flex-col self-stretch gap-8"> 
                
                                <h2 className= " flex items-start self-stretch text-2xl font-semibold"> Meus pets </h2>
                
                                <div className="bg-[#F8F0E6] flex self-stretch items-start rounded-xl p-7 gap-8 "> 
                                    
                                    {pets.map((pet) => (
                                    <Link
                                        key={pet.id}
                                        to={`/pet/${pet.id}`}
                                        className="bg-[#FFFFFF] items-center flex p-9 gap-4 w-[16.5rem] h-[6.5rem] rounded-xl border border-[#E9DDCF] hover:shadow-md transition"
                                    >
                                        <div className="flex items-center gap-[1.5rem]">
                                        <div className="w-16 h-16 shrink-0 rounded-full bg-[#E9DDCF] flex justify-center">
                                            <img src={pet.imagem} alt="" className="w-10" />
                                        </div>
                                        <p className="font-semibold text-2xl">{pet.nome}</p>
                                        </div>
                                    </Link>
                                    ))}
                                    <button onClick={() => navigate(`novo-pet`)} className=" bg-[#E9DDCF] items-center flex p-9 gap-4 w-[16.5rem] h-[6.5rem] rounded-xl border-2 border-[#F29A4B] border-dashed hover:shadow-md transition"> 
                                        <div className=" bg-[#E9DDCF] flex flex-col p-[1.75rem] gap-[1.25rem] w-[16.5rem] rounded-md ">
                                            <p> Adicionar pet</p>
                                        </div>
                                    </button>
                                </div>      
                
                            </div>

                        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-32">  
                
                            <div className=" flex items-start flex-col gap-3"> 
                                <div className="flex flex-row justify-between self-stretch"> 
                                    <div className="flex gap-4">
                                        <p className="text-2xl font-semibold"> Agendamentos</p>
                                        <div className="w-9 h-9 shrink-0 rounded-full bg-[#E9DDCF] flex justify-center items-center"> 2 </div>
                                        <Link to="/novo-agendamento" className="bg-[#F29A4B] p-1 rounded-3xl hover:bg-[#E8863A] hover:shadow-md transition flex items-center"> <img src = "/svg/adicionar.svg" alt="Botão de 'Mais'" className="w-6 h-4"/> </Link>
                                    </div>
                                    
                                    <Link to="/meus-agendamentos" className="text-xl hover:underline text-[#DB7F2E] font-bold"> Ver todos → </Link>
                
                                    
                                </div>

                                <ul className="flex flex-col gap-3 self-stretch text-xl"> 
                                    <li className="relative flex gap-5 p-5 items-center rounded-2xl bg-[#F8F0E6] hover:shadow-md ">
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-14 w-1.5 rounded-r bg-[#F29A4B]"></span>
                                        <div className="rounded-2xl bg-[#FFFFFF] p-2 px-8 flex flex-col items-center">
                                            <p className="text-3xl font-semibold">
                                                14
                                            </p>
                                            <p>
                                                SET
                                            </p>
                                        </div>

                                        <div className="flex-1"> 
                                            <p className="font-bold"> Consulta de tina</p>
                                            <p className="text-[#5a4636]"> 14/09/26</p>
                                        </div>

                                        <div>
                                            <p className="text-3xl font-semibold text-[#DB7F2E]" > 09h00</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-5 p-5 items-center rounded-2xl bg-[#F8F0E6] hover:shadow-md ">
                                        <div className="rounded-2xl bg-[#FFFFFF] p-2 px-8 flex flex-col items-center">
                                            <p className="text-3xl font-semibold">
                                                11
                                            </p>
                                            <p>
                                                SET
                                            </p>
                                        </div>
                                        <div className="flex-1"> 
                                            <p className="font-bold"> Tosa da Tina</p>
                                            <p className="text-[#5a4636]"> 11/09/26</p>
                                        </div>

                                        <div> 
                                            <p className="text-3xl font-semibold text-[#DB7F2E]" > 11h00</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                
                            <div className="flex items-start flex-col gap-2">
                
                                <div className="flex flex-row self-stretch justify-between"> 
                
                                    <div className="flex gap-4">
                                        <p className="text-2xl font-semibold"> Alertas </p>
                                        <div className="w-9 h-9 shrink-0 rounded-full bg-[#E9DDCF] flex justify-center items-center"> 2 </div>
                                        <Link to="/novo-alerta" className="bg-[#F29A4B] p-1 rounded-3xl hover:bg-[#E8863A] hover:shadow-md transition flex items-center" > <img src = "/svg/adicionar.svg" alt="Botão de 'Mais'" className="w-6 h-4"/> </Link> 
                                    </div>
                                        
                                    <Link to="/meus-alertas"  className="text-xl hover:underline text-[#DB7F2E] font-bold"> Ver todos →</Link>
                
                                </div>
                                
                                <ul className="flex flex-col gap-3 self-stretch text-xl "> 
                                    <li className="relative flex gap-5 p-5 h-[7.5rem] items-center rounded-2xl bg-[#F8F0E6] hover:shadow-md ">
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-14 w-1.5 rounded-r bg-[#F29A4B]"></span>
                                        <img src = "/svg/notificacao.svg" alt="Sino laranja" className="w-9"/>
                                        <div className="flex-1"> 
                                            <p className="font-bold"> Limpar gaiola de Fiu</p>
                                            <p className="text-[#5a4636]"> Toda quarta</p>
                                        </div>
                                    </li>
                                    <li className="bg-[#F8F0E6] flex gap-5 h-[7.8rem] p-5 self-stretch rounded-[1.3rem] hover:shadow-md">
                                        <img src = "/svg/notificacao.svg" alt="Sino laranja" className="w-9"/>
                                        <div> 
                                            <p className="font-bold"> Cortar unha da Tina</p>
                                            <p className="text-[#5a4636]"> Hoje</p>
                                        </div>
                                    </li>
                                </ul>
                
                            </div>
                            </div>
                
                        </div>
                        
                
                    </main>

                </div>
                


            </div>
    </section>

    <section className="block md:hidden">
    <div className="relative flex min-h-dvh w-full flex-col overflow-hidden rounded-3xl bg-[#FFFBF6]">

        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-[#E9DDCF] px-6">
            <button
                type="button"
                id="abrir-menu"
                onClick={() => setMenuMobileAberto(true)}
                className="flex size-6 shrink-0 items-center justify-center"
                aria-label="Abrir menu"
                aria-expanded={menuMobileAberto}
            >
                <img src="/svg/menu.svg" alt="Menu" className="w-4 h-4 object-contain"/>
            </button>

            <h1 className="text-lg font-semibold font-['Inter'] text-[#2B1A0E]">
                Oi, Marina :)
            </h1>
        </header>

            <main className="flex flex-1 flex-col gap-5 px-4 py-4">

                <section className="flex flex-col gap-3">
                    <h2 className="text-base font-semibold font-['Inter'] text-[#2B1A0E]">
                        Meus pets
                    </h2>

                    <div className="flex items-start justify-around gap-3 rounded-2xl border border-[#E9DDCF] bg-[#F8F0E6] p-3">

                        <button type="button" onClick={() => navigate(`/pet/${pet.id}`)} className="flex w-16 shrink-0 flex-col items-center gap-2">
                            <span className="flex size-14 items-center justify-center rounded-full border border-[#E9DDCF]">
                                <img src="/svg/plus.svg" alt="Figura de um + laranja" className="w-6 object-contain"/>
                            </span>
                            <span className="text-center text-xs font-normal font-['Inter'] leading-4 text-[#75634F]">
                                Adicionar pet
                            </span>
                        </button>

                        {/* MAPEAMENTO DINÂMICO DOS PETS NO MOBILE */}
                        {pets.map((pet) => (
                            <button key={pet.id} type="button" onClick={() => navigate(`/pet/${pet.id}`)} className="flex w-16 shrink-0 flex-col items-center gap-2">
                                <span className="flex size-14 items-center justify-center rounded-full border border-[#E9DDCF] bg-[#FFF6EC] overflow-hidden">
                                    <img src={pet.imagem} alt={pet.nome} className="w-9 object-contain"/>
                                </span>
                                <span className="text-xs font-normal font-['Inter'] text-[#75634F]">{pet.nome}</span>
                            </button>
                        ))}

                    </div>
                </section>

                <section className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-base font-semibold font-['Inter'] text-[#2B1A0E]">
                            Agendamentos
                        </h2>

                        <button type="button" onClick={() => navigate('/novo-agendamento')} className="text-xs font-semibold font-['Inter'] text-[#75634F]">
                            + Adicionar
                        </button>
                    </div>

                    <article className="flex items-center gap-3 rounded-2xl border border-[#E9DDCF] bg-[#F8F0E6] p-3">
                        <img src="/svg/calendario.svg" alt="Figura de um calendário laranja" className="w-6 shrink-0 object-contain"/>

                        <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold font-['Inter'] text-[#2B1A0E]">
                                Consulta de Tina
                            </h3>
                            <p className="text-xs font-normal font-['Inter'] text-[#75634F]">
                                14/09/26
                            </p>
                        </div>

                        <time className="shrink-0 text-sm font-semibold font-['Inter'] text-[#F29A4B]">
                            09h30
                        </time>
                    </article>

                    <Link to="/meus-agendamentos" className="self-end text-xs font-normal font-['Inter'] text-[#75634F]">
                        Ver todos
                    </Link>
                </section>

                <section className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-base font-semibold font-['Inter'] text-[#2B1A0E]">
                            Alertas
                        </h2>

                        <button type="button" onClick="window.location.href='novo_alerta.html'" className="text-xs font-semibold font-['Inter'] text-[#75634F]">
                            + Adicionar
                        </button>
                    </div>

                    <article className="flex items-center gap-3 rounded-2xl border border-[#E9DDCF] bg-[#F8F0E6] p-3">
                        <img src="/svg/notificacao.svg" alt="Figura de um sino laranja" className="w-6 shrink-0 object-contain"/>

                        <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold font-['Inter'] text-[#2B1A0E]">
                                Limpar gaiola de Fiu
                            </h3>
                            <p className="text-xs font-normal font-['Inter'] text-[#75634F]">
                                Toda quarta
                            </p>
                        </div>
                    </article>
                    <Link to="/meus-alertas" className="self-end text-xs font-normal font-['Inter'] text-[#75634F]">
                        Ver todos
                    </Link>
                </section>

            </main>

            <nav className="mx-4 mb-3 mt-auto flex h-12 shrink-0 items-center justify-between rounded-full border border-[#E9DDCF] bg-[#F8F0E6] px-6">
                <button
                    type="button"
                    onClick="window.location.href='#'"
                    className="flex size-6 items-center justify-center"
                    aria-label="Início"
                >
                    <img src="/svg/inicio.svg" alt="Figura de uma casa laranja" className="w-9 object-contain"/>
                </button>

                <button type="button" id="bt-adicionar-mobile" onClick={() => setPainelMobileAberto(true)} className="flex size-10 items-center justify-center rounded-full bg-[#F29A4B]" aria-label="Adicionar">
                    <img src="/svg/Adicionar2.svg" alt="Figura de um círculo com um + branco no centro" className="w-14 object-contain"/>
                </button>
            </nav>

            <div id="menu-lateral" className={`fixed inset-0 z-50 ${menuMobileAberto ? '' : 'hidden'}`}>

                <button
                    type="button"
                    id="fechar-menu-fundo"
                    className="absolute inset-0 bg-black/30"
                    aria-label="Fechar menu"
                ></button>

                <aside className="absolute left-0 top-0 flex h-dvh w-64 max-w-[85vw] flex-col gap-8 overflow-y-auto bg-[#FFFBF6] p-6 shadow-xl">

                    <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold font-['Inter'] text-[#2B1A0E]">
                            Marina
                        </span>

                        <button
                            type="button"
                            id="fechar-menu"
                            onClick={() => setMenuMobileAberto(false)}
                            className="flex size-8 items-center justify-center rounded-full text-[#75634F] hover:bg-[#F8F0E6]"
                            aria-label="Fechar menu"
                        >
                            <span className="text-2xl leading-none">&times;</span>
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6">
                        <a href="perfil_marina.html" className="text-base font-normal font-['Inter'] leading-6 text-[#75634F]">
                            Ver perfil
                        </a>

                        <Link to="/tutores" className="text-base font-normal font-['Inter'] leading-6 text-[#75634F]">
                            Administrar tutores
                        </Link>

                        <Link to="/meus-pets" className="text-base font-normal font-['Inter'] leading-6 text-[#75634F]">
                            Meus pets
                        </Link>
                    </nav>

                    <div className="mt-auto flex flex-col gap-6 border-t border-[#E9DDCF] pt-6">
                        <a href="configuracoes.html" className="text-base font-normal font-['Inter'] text-[#75634F]">
                            Config. do app
                        </a>

                        <a href="sobre.html" className="flex items-center gap-2.5 text-base font-normal font-['Inter'] text-[#75634F]">
                            Sobre
                            <span className="flex size-5 items-center justify-center rounded-full border border-[#75634F] text-xs font-semibold">
                                i
                            </span>
                        </a>
                    </div>

                </aside>
            </div>

            </div>
                
                <dialog
                    id="painel-adicionar-mobile"
                    open={painelMobileAberto}
                    aria-label="Adicionar novo item"
                    className="fixed top-auto bottom-20 left-1/2 -translate-x-1/2 m-0 p-0 w-80 max-w-[calc(100%-2rem)] bg-transparent text-[#2B1A0E] overflow-visible backdrop:bg-black/30"
                >
                    <button
                        id="fechar-painel-mobile"
                        onClick={() => setPainelMobileAberto(false)}
                        type="button"
                        className="mb-3 ml-auto block rounded-xl border border-[#E9DDCF] bg-white px-4 py-2 font-semibold"
                    >
                        Fechar menu
                    </button>

                    <ul className="flex flex-col gap-2 rounded-2xl border border-[#E9DDCF] bg-white p-4 shadow-md">
                        <li>
                            <a href="novo_alerta.html" className="flex items-center gap-5 rounded-2xl bg-[#F8F0E6] p-5">
                                <img src="/svg/notificacao.svg" alt="Sino de notificação" className="h-6 w-6 shrink-0"/>
                                Adicionar novo alerta
                            </a>
                        </li>

                        <li>
                            <a href="adicionar_agendamento.html" className="flex items-center gap-5 rounded-2xl bg-[#F8F0E6] p-5">
                                <img src="/svg/calendario.svg" alt="Calendário" className="h-6 w-6 shrink-0"/>
                                Adicionar agendamento
                            </a>
                        </li>

                        <li>
                            <a href="adicionar_vacina.html" className="flex items-center gap-5 rounded-2xl bg-[#F8F0E6] p-5">
                                <img src="/svg/vacinas.svg" alt="Adicionar vacina" className="h-6 w-6 shrink-0"/>
                                Adicionar nova vacina
                            </a>
                        </li>
                    </ul>
                </dialog>

      </section>
    </>
  )
}

export default Home