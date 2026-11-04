
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'

function MeusAgendamentos() {
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

    function mostrarConfirmacao() {
        setConfirmarExclusao(true)
    }

    function cancelarExclusao() {
        setConfirmarExclusao(false)
    }

    function confirmarExclusaoAgendamento() {
        // A exclusão real será implementada quando
        // os agendamentos forem armazenados em um useState.
        fecharPainel()
    }

    function salvarEdicao(event) {
        event.preventDefault()

        // O formulário ainda não atualiza os dados dos cards.
        // Isso será implementado quando os agendamentos
        // forem armazenados em um useState.
        fecharPainel()
    }

    return (
        <>
            {/* ==================== DESKTOP ==================== */}

            <section className="hidden md:block">
                <div className="flex">

                    {/* SIDEBAR */}

                    <aside
                        id="default-sidebar"
                        className="bg-[#F8F0E6] p-3 flex flex-col shrink-0 w-60 min-h-dvh"
                        aria-label="Sidebar"
                    >
                        <div className="flex flex-col flex-1 px-3 py-4 justify-between bg-neutral-primary-soft">
                            <ul className="flex-1 space-y-2 font-medium">

                                <li className="flex">
                                    <a href="#" className="flex flex-1 items-center px-2 py-3 rounded-2xl group">
                                        <span className="px-1 pb-6 text-xl font-bold">
                                            Site nome
                                        </span>
                                    </a>

                                    <button type="button">
                                        <img
                                            className="pb-6"
                                            src="/svg/fechar.svg"
                                            alt="X cinza para fechar menu lateral"
                                        />
                                    </button>
                                </li>

                                {/* PERFIL DO USUÁRIO */}

                                <li className="pb-3 mb-2 border-b border-[#E9DDCF]">
                                    <a
                                        href="#"
                                        aria-label="Perfil de Marina"
                                        className="group flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-[#E9DDCF]"
                                    >
                                        <span
                                            className="w-10 h-10 shrink-0 rounded-full bg-[#E9DDCF] group-hover:bg-[#F8F0E6] flex items-center justify-center font-semibold transition"
                                            aria-hidden="true"
                                        >
                                            M
                                        </span>

                                        <span className="flex-1 min-w-0 font-semibold truncate">
                                            Marina
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <Link
                                        to="/"
                                        className="flex items-center px-2 py-3 rounded-xl hover:bg-[#E9DDCF] group"
                                    >
                                        <img src="/svg/inicio.svg" alt="Figura de uma casa na cor laranja" />
                                        <span className="flex-1 ms-3 whitespace-nowrap">
                                            Início
                                        </span>
                                    </Link>
                                </li>

                                <li>
                                    <a
                                        href="meus_pets.html"
                                        className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group"
                                    >
                                        <img src="/svg/paw-print.svg" alt="Pata de animal na cor laranja" />
                                        <span className="flex-1 ms-3 whitespace-nowrap">
                                            Meus pets
                                        </span>
                                    </a>
                                </li>

                                <li className="relative">
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]"></span>

                                    <a
                                        href="meus_agendamentos.html"
                                        className="flex items-center px-2 py-3 pl-6 rounded-2xl hover:bg-[#E9DDCF] group"
                                    >
                                        <img src="/svg/calendario.svg" alt="Calendário na cor laranja" />
                                        <span className="flex-1 ms-3 whitespace-nowrap">
                                            Agendamentos
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="meus_alertas.html"
                                        className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group"
                                    >
                                        <img src="/svg/notificacao.svg" alt="Sino de alerta na cor laranja" />
                                        <span className="flex-1 ms-3 whitespace-nowrap">
                                            Alertas
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="tutores.html"
                                        className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group"
                                    >
                                        <img src="/svg/tutores.svg" alt="Figura de usuários na cor laranja" />
                                        <span className="flex-1 ms-3 whitespace-nowrap">
                                            Outros tutores
                                        </span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </aside>

                    {/* HEADER E MAIN */}

                    <div className="bg-[#FFFBF6] flex flex-col self-stretch flex-1">

                        <header className="flex flex-row justify-between p-5 border">
                            <Link to="/" className="flex gap-4">
                                <img alt="Figura de seta laranja" src="/svg/voltar.svg" />
                                <p>Voltar</p>
                            </Link>

                            <button type="button">
                                <img src="/svg/notificacao.svg" alt="Símbolo de informação em laranja" />
                            </button>
                        </header>

                        <main className="flex w-full py-6 px-4 sm:px-8 lg:px-16 flex-col items-start self-stretch">

                            {/* TÍTULO E BOTÃO DE ADICIONAR */}

                            <div className="flex flex-col self-stretch gap-[2.25rem]">

                                <div className="flex justify-between items-center">
                                    <h1 className="flex items-start self-stretch text-4xl font-semibold">
                                        Meus agendamentos
                                    </h1>

                                    <Link
                                        to="/novo-agendamento"
                                        className="flex px-5 py-3 gap-4 rounded-2xl font-semibold border border-[#9c9c9c] hover:shadow-md transition"
                                    >
                                        <img src="/svg/adicionar.svg" alt="Botão de mais" />
                                        Adicionar um novo agendamento
                                    </Link>
                                </div>

                                {/* PAINEL DE AGENDAMENTOS */}

                                <ul className="flex flex-col gap-4 p-6 max-w-[800px] bg-[#E9DDCF] rounded-2xl">

                                    {/* AGENDAMENTO 1 */}

                                    <li className="relative flex flex-col gap-9 p-5 px-7 rounded-2xl bg-[#F8F0E6] hover:shadow-md">

                                        <div className="flex-1 gap-9">
                                            <div className="flex justify-between gap-1">
                                                <p className="font-semibold text-2xl text-[#2B1A0E]">
                                                    Consulta de Tina
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={abrirPainel}
                                                    className="bt-editar flex gap-2 hover:font-semibold"
                                                >
                                                    <img
                                                        src="/svg/edit.svg"
                                                        alt="Símbolo de lápis para editar"
                                                        className="w-6 h-6"
                                                    />
                                                    <p className="text-[#75634F] text-xl">
                                                        Editar
                                                    </p>
                                                </button>
                                            </div>

                                            <p className="font-semibold text-md text-[#75634F]">
                                                14 de setembro de 2026, quinta-feira ⋅ 09:00
                                            </p>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <img src="/svg/mapa.svg" alt="Mapa" className="w-6 h-6" />

                                            <div>
                                                <p className="font-semibold text-xl text-[#2B1A0E]">
                                                    Clínica Solemar
                                                </p>
                                                <p className="font-semibold text-md text-[#75634F]">
                                                    Rua blablabla 34, Terra Nova, São Bernardo do Campo - SP
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <img src="/svg/heart.svg" alt="Coração" className="w-6 h-6" />
                                            <p className="font-semibold text-xl text-[#2B1A0E]">
                                                Profissional: Adriana
                                            </p>
                                        </div>
                                    </li>

                                    {/* AGENDAMENTO 2 */}

                                    <li className="relative flex flex-col gap-9 p-5 px-7 rounded-2xl bg-[#F8F0E6] hover:shadow-md">

                                        <div className="flex-1 gap-9">
                                            <div className="flex justify-between gap-1">
                                                <p className="font-semibold text-2xl text-[#2B1A0E]">
                                                    Tosa da Tina
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={abrirPainel}
                                                    className="bt-editar flex gap-2 hover:font-semibold"
                                                >
                                                    <img
                                                        className="w-6 h-6 items-center"
                                                        src="/svg/edit.svg"
                                                        alt="Símbolo de lápis para editar"
                                                    />
                                                    <p className="text-[#75634F] text-xl">
                                                        Editar
                                                    </p>
                                                </button>
                                            </div>

                                            <p className="font-semibold text-md text-[#75634F]">
                                                11 de setembro de 2026, domingo ⋅ 08:00
                                            </p>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <img src="/svg/mapa.svg" alt="Mapa" />

                                            <div>
                                                <p className="font-semibold text-xl text-[#2B1A0E]">
                                                    Rua fulano 981, Centro, São Bernardo do Campo - SP
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 items-center">
                                            <img src="/svg/heart.svg" alt="Coração" className="w-6 h-6" />
                                            <p className="font-semibold text-xl text-[#2B1A0E]">
                                                Profissional: Marcos
                                            </p>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            {/* ==================== MOBILE ==================== */}

            <section className="block md:hidden">
                <div className="mx-auto min-h-dvh w-full max-w-md overflow-x-hidden rounded-3xl bg-[#FFFBF6] text-[#2B1A0E]">

                    {/* HEADER */}

                    <header className="flex min-h-16 items-center gap-4 border-b border-[#E9DDCF] px-6 py-4">
                        <Link
                            to="/"
                            aria-label="Voltar"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-[#F8F0E6]"
                        >
                            <img src="/svg/voltar.svg" alt="Voltar" className="h-4 w-4" />
                        </Link>

                        <h1 className="text-lg font-semibold leading-snug">
                            Meus agendamentos
                        </h1>
                    </header>

                    {/* CONTEÚDO */}

                    <main className="flex flex-col gap-6 p-5 sm:p-6">

                        {/* TÍTULO E BOTÃO */}

                        <section className="flex flex-col gap-4">
                            <h2 className="text-3xl font-semibold leading-tight">
                                Meus agendamentos
                            </h2>

                            <Link
                                to="/novo-agendamento"
                                className="flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-[#9c9c9c] px-4 py-3 text-sm font-semibold transition hover:bg-[#F8F0E6] hover:shadow-md"
                            >
                                <img
                                    src="/svg/adicionar.svg"
                                    alt=""
                                    className="h-5 w-5"
                                />
                                Adicionar um novo agendamento
                            </Link>
                        </section>

                        {/* LISTA DE AGENDAMENTOS */}

                        <ul className="flex flex-col gap-4 rounded-2xl bg-[#E9DDCF] p-3">

                            {/* AGENDAMENTO 1 */}

                            <li className="flex flex-col gap-5 rounded-2xl bg-[#F8F0E6] p-5 transition hover:shadow-md">

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-xl font-semibold text-[#2B1A0E]">
                                            Consulta de Tina
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={abrirPainel}
                                            className="flex shrink-0 items-center gap-1 text-[#75634F] hover:font-semibold"
                                        >
                                            <img
                                                src="/svg/edit.svg"
                                                alt=""
                                                className="h-5 w-5"
                                            />
                                            <span className="text-sm">Editar</span>
                                        </button>
                                    </div>

                                    <p className="text-sm font-semibold text-[#75634F]">
                                        14 de setembro de 2026
                                    </p>

                                    <p className="text-sm font-semibold text-[#75634F]">
                                        Quinta-feira · 09:00
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <img
                                        src="/svg/mapa.svg"
                                        alt=""
                                        className="mt-1 h-5 w-5 shrink-0"
                                    />

                                    <div className="min-w-0">
                                        <p className="font-semibold text-[#2B1A0E]">
                                            Clínica Solemar
                                        </p>

                                        <p className="text-sm font-medium leading-relaxed text-[#75634F]">
                                            Rua blablabla 34, Terra Nova, São Bernardo do Campo - SP
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <img
                                        src="/svg/heart.svg"
                                        alt=""
                                        className="h-5 w-5 shrink-0"
                                    />

                                    <p className="text-sm font-semibold text-[#2B1A0E]">
                                        Profissional: Adriana
                                    </p>
                                </div>
                            </li>

                            {/* AGENDAMENTO 2 */}

                            <li className="flex flex-col gap-5 rounded-2xl bg-[#F8F0E6] p-5 transition hover:shadow-md">

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-xl font-semibold text-[#2B1A0E]">
                                            Tosa da Tina
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={abrirPainel}
                                            className="flex shrink-0 items-center gap-1 text-[#75634F] hover:font-semibold"
                                        >
                                            <img
                                                src="/svg/edit.svg"
                                                alt=""
                                                className="h-5 w-5"
                                            />
                                            <span className="text-sm">Editar</span>
                                        </button>
                                    </div>

                                    <p className="text-sm font-semibold text-[#75634F]">
                                        11 de setembro de 2026
                                    </p>

                                    <p className="text-sm font-semibold text-[#75634F]">
                                        Domingo · 08:00
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <img
                                        src="/svg/mapa.svg"
                                        alt=""
                                        className="mt-1 h-5 w-5 shrink-0"
                                    />

                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold leading-relaxed text-[#75634F]">
                                            Rua fulano 981, Centro, São Bernardo do Campo - SP
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <img
                                        src="/svg/heart.svg"
                                        alt=""
                                        className="h-5 w-5 shrink-0"
                                    />

                                    <p className="text-sm font-semibold text-[#2B1A0E]">
                                        Profissional: Marcos
                                    </p>
                                </div>
                            </li>

                        </ul>
                    </main>
                </div>
            </section>

            {/* ==================== PAINEL DE EDITAR ==================== */}

            <dialog
                ref={painelRef}
                id="painel-editar"
                className="m-auto p-0 w-[92vw] max-w-[40rem] max-h-[90vh] overflow-hidden rounded-3xl bg-[#FFFBF6] text-[#2B1A0E] border border-[#E9DDCF] shadow-2xl backdrop:bg-black/40 open:flex flex-col"
                aria-label="Editar agendamento"
            >

                {/* CABEÇALHO DO PAINEL */}

                <div className="flex items-center justify-between gap-4 h-[88px] shrink-0 px-6 border-b border-[#E9DDCF]">
                    <h2 id="titulo-painel" className="text-2xl font-semibold">
                        Editar
                    </h2>

                    <button
                        onClick={fecharPainel}
                        type="button"
                        id="fechar-painel"
                        aria-label="Fechar painel"
                        className="p-2 rounded-lg hover:bg-[#F8F0E6] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F29A4B]"
                    >
                        <img src="/svg/fechar.svg" alt="Fechar" className="w-6 h-6" />
                    </button>
                </div>

                {/* FORMULÁRIO */}

                <form
                    id="form-editar"
                    onSubmit={salvarEdicao}
                    className="flex flex-1 min-h-0 flex-col"
                >

                    <div className="flex-1 overflow-y-auto flex flex-col gap-6 p-6">

                        <fieldset className="flex flex-col border-0 p-0 m-0 min-w-0">
                            <legend className="font-semibold mb-3">
                                Quando?
                            </legend>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="edit-data" className="sr-only">
                                        Data
                                    </label>

                                    <input
                                        id="edit-data"
                                        name="data"
                                        type="date"
                                        required
                                        className="campo"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="edit-hora" className="sr-only">
                                        Hora
                                    </label>

                                    <input
                                        id="edit-hora"
                                        name="hora"
                                        type="time"
                                        required
                                        className="campo"
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="edit-clinica">
                                Nome da clínica
                            </label>

                            <input
                                id="edit-clinica"
                                name="clinica"
                                type="text"
                                autoFocus
                                autoComplete="off"
                                className="campo"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="edit-endereco">
                                Endereço
                            </label>

                            <input
                                id="edit-endereco"
                                name="endereco"
                                type="text"
                                required
                                autoComplete="off"
                                className="campo"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="edit-profissional">
                                Profissional
                            </label>

                            <input
                                id="edit-profissional"
                                name="profissional"
                                type="text"
                                required
                                autoComplete="off"
                                className="campo"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="edit-observacoes">
                                Observações/motivo
                            </label>

                            <input
                                id="edit-observacoes"
                                name="observacoes"
                                type="text"
                                autoComplete="off"
                                className="campo"
                            />
                        </div>

                    </div>

                    {/* RODAPÉ DO PAINEL */}

                    <div className="shrink-0 p-6 border-t border-[#E9DDCF]">

                        {confirmarExclusao ? (

                            /* CONFIRMAÇÃO DE EXCLUSÃO */

                            <div id="rodape-confirmar">
                                <div className="flex flex-col gap-3">

                                    <p className="font-semibold">
                                        Excluir este agendamento?
                                    </p>

                                    <p className="text-sm text-[#75634F]">
                                        Essa ação não pode ser desfeita.
                                    </p>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={cancelarExclusao}
                                            type="button"
                                            id="manter"
                                            className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F29A4B]"
                                        >
                                            Manter
                                        </button>

                                        <button
                                            onClick={confirmarExclusaoAgendamento}
                                            type="button"
                                            id="bt-confirmar-excluir"
                                            className="px-5 h-12 rounded-xl bg-[#B3261E] text-white font-semibold hover:brightness-110 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B3261E] focus-visible:ring-offset-2"
                                        >
                                            Sim, excluir
                                        </button>

                                    </div>
                                </div>
                            </div>

                        ) : (

                            /* RODAPÉ NORMAL */

                            <div id="rodape-normal">
                                <div className="flex items-center justify-between gap-3">

                                    <button
                                        onClick={mostrarConfirmacao}
                                        type="button"
                                        id="bt-excluir"
                                        className="font-semibold text-[#B3261E] rounded-lg hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B3261E]"
                                    >
                                        Excluir alerta
                                    </button>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={fecharPainel}
                                            type="button"
                                            id="cancelar"
                                            className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F29A4B]"
                                        >
                                            Cancelar
                                        </button>

                                        <button
                                            type="submit"
                                            className="px-6 h-12 rounded-xl bg-[#F29A4B] font-semibold hover:bg-[#E8863A] hover:shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F29A4B] focus-visible:ring-offset-2"
                                        >
                                            Salvar
                                        </button>

                                    </div>
                                </div>
                            </div>

                        )}

                    </div>
                </form>
            </dialog>
        </>
    )
}

export default MeusAgendamentos
