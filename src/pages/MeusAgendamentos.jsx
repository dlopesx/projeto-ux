import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import CardAgendamento from '../componentes/CardAgendamento'

// "2026-09-14" + "09:00" -> "14 de setembro de 2026, segunda-feira ⋅ 09:00"
function formatarDataHora(data, hora) {
    const [ano, mes, dia] = data.split('-')
    const d = new Date(ano, mes - 1, dia)
    const dataLonga = d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
    const diaSemana = d.toLocaleDateString('pt-BR', { weekday: 'long' })
    return `${dataLonga}, ${diaSemana} ⋅ ${hora}`
}

// endereço + (clínica)
function montarLocal({ endereco, clinica }) {
    if (endereco && clinica) return `${endereco} (${clinica})`
    return endereco || clinica || 'Local não informado'
}

function MeusAgendamentos() {
    const { consultas } = usePets()
    // só os pendentes, do mais próximo para o mais distante
    const agendamentos = consultas
        .filter((consulta) => !consulta.feito)
        .sort((a, b) => `${a.data} ${a.hora}`.localeCompare(`${b.data} ${b.hora}`))

    const painelRef = useRef(null)
    const [confirmarExclusao, setConfirmarExclusao] = useState(false)

    function abrirPainel() {
        painelRef.current?.showModal()
        setConfirmarExclusao(false)
    }

    function fecharPainel() {
        painelRef.current?.close()
        setConfirmarExclusao(false)
    }

    // ... (Mantenha as outras funções: mostrarConfirmacao, cancelarExclusao, etc)
    function mostrarConfirmacao() { setConfirmarExclusao(true) }
    function cancelarExclusao() { setConfirmarExclusao(false) }
    function confirmarExclusaoAgendamento() { fecharPainel() }
    function salvarEdicao(event) {
        event.preventDefault()
        fecharPainel()
    }

    return (
        <div className="flex min-h-dvh bg-[#FFFBF6] text-[#2B1A0E]">
            {/* SIDEBAR (Escondida no mobile automaticamente pelo CSS do componente Sidebar) */}
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            <div className="flex-1 min-w-0 flex flex-col bg-[#FFFBF6]">
                <div className="hidden md:block">
                    <Header />
                </div>

                {/* HEADER MOBILE (Opcional, se você quiser aquele cabeçalho com botão voltar só no mobile) */}
                <header className="md:hidden flex min-h-16 items-center gap-4 border-b border-[#E9DDCF] px-6 py-4">
                    <Link to="/" aria-label="Voltar" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-[#F8F0E6]">
                        <img src="/svg/voltar.svg" alt="Voltar" className="h-4 w-4" />
                    </Link>
                    <h1 className="text-lg font-semibold leading-snug">Meus agendamentos</h1>
                </header>

                <main className="flex flex-col gap-6 md:gap-[2.25rem] w-full p-5 sm:p-6 md:py-6 md:px-8 lg:px-16">
                    
                    {/* TÍTULO E BOTÃO (Adapta sozinho do mobile pro PC) */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                            Meus agendamentos
                        </h1>
                        <Link to="/novo-agendamento" className="flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-[#9c9c9c] px-4 py-3 text-sm md:text-base font-semibold transition hover:bg-[#F8F0E6] hover:shadow-md">
                            <img src="/svg/adicionar.svg" alt="" className="h-5 w-5" />
                            Adicionar um novo agendamento
                        </Link>
                    </div>

                    {/* LISTA DE AGENDAMENTOS */}
                    <ul className="flex flex-col gap-4 rounded-2xl bg-[#E9DDCF] p-3 md:p-6 max-w-[800px] w-full">
                        {agendamentos.map((consulta) => (
                            <CardAgendamento
                                key={consulta.id}
                                titulo={consulta.nomeConsulta}
                                dataHora={formatarDataHora(consulta.data, consulta.hora)}
                                local={montarLocal(consulta)}
                                profissional={consulta.profissional}
                                onEdit={abrirPainel}
                            />
                        ))}

                        {agendamentos.length === 0 && (
                            <li className="py-8 text-center text-[#75634F]">
                                Você ainda não possui agendamentos.
                            </li>
                        )}
                    </ul>
                </main>
            </div>

            {/* MANTENHA SEU CÓDIGO DO <dialog> DO PAINEL DE EDITAR AQUI... */}
            <dialog ref={painelRef} className="...">
                 {/* (todo o resto do seu modal) */}
            </dialog>
        </div>
    )
}

export default MeusAgendamentos