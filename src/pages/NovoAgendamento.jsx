// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
// abaixo imports usados para o calendário
import { useEffect } from 'react'
import flatpickr from 'flatpickr'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import 'flatpickr/dist/flatpickr.min.css'
import Sidebar from '../componentes/Sidebar'

function NovoAgendamento(){
    // const navigate = useNavigate()
    useEffect(() => {
        const calendarioData = flatpickr("#data", {
            locale: Portuguese,
            minDate: "today",
            inline: true
        })

        const calendarioHorario = flatpickr("#horario", {
            locale: Portuguese,
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            minuteIncrement: 1
        })

        const calendarioMobile = flatpickr("#data-mobile", {
            locale: Portuguese,
            minDate: "today",
            inline: true,
            appendTo: document.getElementById("calendario-mobile")
        })

        const horarioMobile = flatpickr("#horario-mobile", {
            locale: Portuguese,
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            minuteIncrement: 1,
            disableMobile: true
        })

        return () => {
            calendarioData.destroy()
            calendarioHorario.destroy()
            calendarioMobile.destroy()
            horarioMobile.destroy()
        }
    }, [])
    return (
        <>

            <section className="hidden md:block">
                <div className="flex">
                    {/* <!-- SIDEBAR--> */}

                    <Sidebar />

                    {/* <!-- HEADER E MAIN --> */}

                    <div className=" bg-[#FFFBF6] flex flex-col self-stretch flex-1">



                        <header className="flex flex-row justify-between p-5 border ">

                            <Link to="/" className="flex gap-4">

                                <img alt="Figura de seta laranja" src="/svg/voltar.svg"/>

                                <p> Voltar</p>

                            </Link>

                            <button> <img src = "/svg/notificacao.svg" alt="Símbolo de informação em laranja"/> </button>

                        </header>



                        <main className="flex w-full py-6 px-4 sm:px-8 lg:px-16 flex-col items-start self-stretch">



                            <div className="flex flex-col items-center self-stretch gap-3">

                                <div className="flex justify-between self-stretch items-center">

                                    <h1 className= " flex items-start self-stretch text-4xl font-semibold"> Novo agendamento </h1>

                                </div>



                                <div className="flex self-stretch">



                                    <form id="form-agendamento" method="post" action="#" className="flex flex-col lg:flex-row items-start gap-16 w-full">



                                        {/* <!-- CALENDARIO e HORARIO--> */}

                                        <div className="flex flex-col gap-6 w-full lg:w-[26rem] shrink-0">



                                            <div className="">

                                                {/* <input id="data"  name="data" className="campo w-130 h-5 px-5 bg-[#F8F0E6] border border-[#E9DDCF] rounded-md"/> */}
                                                <input
                                                    id="data"
                                                    name="data"
                                                    type="text"
                                                    className="hidden"
                                                />

                                            </div>



                                            <div className="flex flex-col gap-3">

                                                <label for="horario"> Horário </label>

                                                <input id="horario" name="horario" type="text" placeholder="00:00"

                                                    className="campo w-full h-14 px-5 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl "/>

                                            </div>



                                        </div>



                                        {/* <!-- PREENCHIMENTOS --> */}

                                        <div className="flex flex-col flex-1 gap-3 p-5 border border-[#E9DDCF] rounded-2xl">

                                            <div className="flex flex-col gap-6">

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                                                    <div className="flex flex-col gap-3">

                                                        <label for="profissional" > Profissional </label>

                                                        <input id="profissional" name="profissional" className="campo w-full h-14 bg-[#F8F0E6] rounded-2xl"/>

                                                    </div>

                                                    <div className="flex flex-col gap-3">

                                                        <label for="crm"> CRM (opcional)</label>

                                                        <input id="crm" name="crm" className="campo w-full h-14 bg-[#F8F0E6] rounded-2xl"/>

                                                    </div>

                                                </div>

                                                <div className="flex flex-col gap-3">

                                                    <div className="flex flex-col gap-2">

                                                        <label for="estabelecimento"> Estabelecimento (opcional)</label>

                                                        <input id="estabelecimento" name="estabelecimento" className="campo w-full h-14 bg-[#F8F0E6] rounded-2xl"/>

                                                    </div>

                                                    <div className="flex flex-col gap-2">

                                                        <label for="endereco"> Endereço (opcional) </label>

                                                        <input id="endereco" name="endereco" className="campo w-full h-14 bg-[#F8F0E6] rounded-2xl"/>

                                                    </div>

                                                    <div className="flex flex-col gap-2">

                                                        <label for="obs"> Observações/motivo </label>

                                                        <textarea id="obs" name="obs"

                                                            className="campo w-full h-28 px-5 py-4 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl"></textarea>

                                                    </div>

                                                </div>

                                            </div>



                                            <button type="submit" id="bt-adicionar" className="flex bg-[#F29A4B] w-40 px-4 py-3 gap-4 rounded-2xl font-semibold hover:bg-[#E8863A] hover:shadow-md transition transition" >

                                                <img src = "/svg/adicionar.svg" alt="Botão de 'Mais'"/>

                                                Adicionar

                                            </button>

                                            <div id="agendamento-adicionado" className="hidden flex w-85 items-center p-4 gap-3 fixed top-[4.5rem] right-[5rem] text-body bg-[#E8863A] rounded-xl shadow-xs border border-default" role="alert">

                                                <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">

                                                    <svg className="w-7 h-7 border border-[#111111] rounded-md" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/></svg>

                                                    <span className="sr-only">Check icon</span>

                                                </div>

                                                <div className="ms-3 text-xl font-normal ">Agendamento adicionado com sucesso.</div>

                                                <button type="button" id="bt-fechar" className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none" data-dismiss-target="#toast-success" aria-label="Close">

                                                    <span className="sr-only">Close</span>

                                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>

                                                </button>

                                            </div>

                                        </div>



                                    </form>



                                </div>



                            </div>



                        </main>



                    </div>



                </div>
            </section>

            <section className="block md:hidden">
                <div className="mx-auto min-h-dvh w-full max-w-md overflow-x-hidden rounded-3xl bg-[#FFFBF6] text-[#2B1A0E]">
                    <header className="flex min-h-16 items-center gap-4 border-b border-[#E9DDCF] px-6 py-4">
                        <Link to="/" aria-label="Voltar" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-[#F8F0E6]">
                            <img src="/svg/voltar.svg" alt="Voltar" className="h-4 w-4"/>
                        </Link>
                        <h1 className="text-lg font-semibold leading-snug">Adicionar consulta</h1>
                    </header>

                    <form id="form-agendamento-mobile" className="flex flex-col gap-5 p-5 sm:p-6">
                        <section className="flex flex-col gap-3">
                            <h2 className="text-2xl font-semibold leading-8">Selecione a data da consulta:</h2>
                            <label for="data-mobile" className="sr-only">Data da consulta</label>
                            <input id="data-mobile" name="data" type="text" className="sr-only" required/>
                            <div id="calendario-mobile" className="w-full min-w-0 rounded-2xl border border-[#E9DDCF] p-2.5" aria-label="Calendário para selecionar a data"></div>
                        </section>

                        <section className="flex flex-col gap-2">
                            <label for="horario-mobile" className="text-sm font-medium">Horário</label>
                            <div className="relative">
                                <input id="horario-mobile" name="horario" type="text" placeholder="00h00" className="w-full min-w-0 rounded-xl border border-[#E9DDCF] bg-[#F8F0E6] p-3.5 pr-12 text-[#2B1A0E] outline-none focus:border-[#F29A4B] focus:ring-2 focus:ring-[#F29A4B]/25" required/>
                                <img src="/svg/relogio.svg" alt="Abrir seletor de horário" id="relogio" className="cursor-pointer absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"/>
                            </div>
                        </section>

                        <section className="grid grid-cols-[minmax(0,1fr)_120px] gap-3">
                            <div className="flex min-w-0 flex-col gap-2">
                                <label for="veterinario-mobile" className="text-sm font-medium">Veterinário</label>
                                <input id="veterinario-mobile" name="veterinario" type="text" placeholder="Nome" className="w-full min-w-0 rounded-xl border border-[#E9DDCF] bg-[#F8F0E6] p-3.5 text-[#2B1A0E] outline-none focus:border-[#F29A4B] focus:ring-2 focus:ring-[#F29A4B]/25"/>
                            </div>
                            <div className="flex min-w-0 flex-col gap-2">
                                <label for="crm-mobile" className="whitespace-nowrap text-sm font-medium">CRM (opcional)</label>
                                <input id="crm-mobile" name="crm" type="text" className="w-full min-w-0 rounded-xl border border-[#E9DDCF] bg-[#F8F0E6] p-3.5 text-[#2B1A0E] outline-none focus:border-[#F29A4B] focus:ring-2 focus:ring-[#F29A4B]/25"/>
                            </div>
                        </section>

                        <section className="flex flex-col gap-2">
                            <label for="clinica-mobile" className="text-sm font-medium">Clínica (opcional)</label>
                            <input id="clinica-mobile" name="clinica" type="text" className="w-full min-w-0 rounded-xl border border-[#E9DDCF] bg-[#F8F0E6] p-3.5 text-[#2B1A0E] outline-none focus:border-[#F29A4B] focus:ring-2 focus:ring-[#F29A4B]/25"/>
                        </section>

                        <section className="flex flex-col gap-2">
                            <label for="endereco-mobile" className="text-sm font-medium">Endereço (opcional)</label>
                            <input id="endereco-mobile" name="endereco" type="text" className="w-full min-w-0 rounded-xl border border-[#E9DDCF] bg-[#F8F0E6] p-3.5 text-[#2B1A0E] outline-none focus:border-[#F29A4B] focus:ring-2 focus:ring-[#F29A4B]/25"/>
                        </section>

                        <section className="flex flex-col gap-2">
                            <label for="observacoes-mobile" className="text-sm font-medium">Observações / motivo</label>
                            <textarea id="observacoes-mobile" name="observacoes" className="min-h-24 w-full min-w-0 resize-y rounded-xl border border-[#E9DDCF] bg-[#F8F0E6] p-3.5 text-[#2B1A0E] outline-none focus:border-[#F29A4B] focus:ring-2 focus:ring-[#F29A4B]/25"></textarea>
                        </section>

                        <button type="submit" className="min-h-12 w-full rounded-xl bg-[#F29A4B] px-5 font-semibold text-[#2B1A0E] transition hover:bg-[#E8863A] focus:outline-none focus:ring-2 focus:ring-[#F29A4B] focus:ring-offset-2">Adicionar</button>
                    </form>
                </div>

                <div id="agendamento-adicionado-mobile" className="fixed bottom-4 left-4 right-4 z-50 hidden items-center gap-3 rounded-xl border border-[#E9DDCF] bg-[#F8F0E6] p-4 text-[#2B1A0E] shadow-lg sm:left-auto sm:max-w-md">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#2B1A0E]">✓</span>
                    <p className="flex-1 text-sm font-medium">Consulta adicionada com sucesso.</p>
                    <button id="bt-fechar-mobile" type="button" aria-label="Fechar notificação" className="px-2 text-lg">×</button>
                </div>
            </section>
        </>
    )
    
}
export default NovoAgendamento