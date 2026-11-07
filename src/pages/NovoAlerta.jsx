
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../componentes/Sidebar'

function NovoAlerta() {
    const [repetirDesktop, setRepetirDesktop] = useState('nao')
    const [repetirMobile, setRepetirMobile] = useState('nao')
    const [alertaAdicionado, setAlertaAdicionado] = useState(false)

    function adicionarAlerta(event) {
        event.preventDefault()
        setAlertaAdicionado(true)
        event.currentTarget.reset()
        setRepetirDesktop('nao')
        setRepetirMobile('nao')
    }

    function fecharMensagem() {
        setAlertaAdicionado(false)
    }

    return (
        <>
            {/* ==================== DESKTOP ==================== */}

            <section className="hidden md:block">
                <div className="flex">

                    {/* SIDEBAR */}

                    <Sidebar />

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

                            <div className="flex flex-col items-center self-stretch gap-[2.25rem]">

                                <div className="flex justify-between self-stretch items-center">
                                    <h1 className="flex items-start self-stretch text-4xl font-semibold">
                                        Novo alerta
                                    </h1>
                                </div>

                                {/* FORMULÁRIO NOVO ALERTA */}

                                <div className="flex flex-col self-stretch gap-3">

                                    <form
                                        id="form-alerta"
                                        onSubmit={adicionarAlerta}
                                        className="flex flex-col gap-8 w-full max-w-[936px] border border-[#E9DDCF] rounded-2xl p-6"
                                    >

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                                            <div className="flex flex-col gap-3">
                                                <label htmlFor="lembrete-desktop">
                                                    O que você precisa lembrar?
                                                </label>

                                                <input
                                                    id="lembrete-desktop"
                                                    name="lembrete"
                                                    type="text"
                                                    required
                                                    placeholder="Ex: Limpar vasilhas"
                                                    className="campo p-4 w-full h-14 bg-[#F8F0E6] rounded-2xl"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <label htmlFor="pet-desktop">
                                                    Para qual pet?
                                                </label>

                                                <input
                                                    id="pet-desktop"
                                                    name="pet"
                                                    type="text"
                                                    required
                                                    className="campo w-full h-14 bg-[#F8F0E6] rounded-2xl"
                                                />
                                            </div>

                                        </div>

                                        {/* DATA E HORÁRIO */}

                                        <fieldset className="flex flex-col gap-4 border-0 p-0 m-0 min-w-0">
                                            <legend className="font-semibold mb-4">
                                                Quando?
                                            </legend>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="data-desktop" className="sr-only">
                                                        Data
                                                    </label>

                                                    <input
                                                        type="date"
                                                        id="data-desktop"
                                                        name="data"
                                                        required
                                                        className="campo h-14 p-4 bg-[#F8F0E6] rounded-2xl"
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="hora-desktop" className="sr-only">
                                                        Hora
                                                    </label>

                                                    <input
                                                        type="time"
                                                        id="hora-desktop"
                                                        name="hora"
                                                        required
                                                        className="campo h-14 p-4 bg-[#F8F0E6] rounded-2xl"
                                                    />
                                                </div>

                                            </div>
                                        </fieldset>

                                        {/* REPETIÇÃO */}

                                        <fieldset className="flex flex-col gap-4 border-0 p-0 m-0">
                                            <legend className="font-semibold mb-4">
                                                Repetir?
                                            </legend>

                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="repetir-desktop"
                                                    value="nao"
                                                    checked={repetirDesktop === 'nao'}
                                                    onChange={() => setRepetirDesktop('nao')}
                                                    className="w-5 h-5 accent-[#F29A4B]"
                                                />

                                                Não repetir
                                            </label>

                                            <label className="flex flex-wrap items-center gap-4 cursor-pointer">
                                                <input
                                                    id="repetir-semanal-desktop"
                                                    type="radio"
                                                    name="repetir-desktop"
                                                    value="semanal"
                                                    checked={repetirDesktop === 'semanal'}
                                                    onChange={() => setRepetirDesktop('semanal')}
                                                    className="w-5 h-5 accent-[#F29A4B]"
                                                />

                                                <span>A cada</span>

                                                <div className={`flex items-center gap-3 w-[204px] h-10 px-5 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl transition ${repetirDesktop === 'semanal' ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>

                                                    <label htmlFor="dia-desktop" className="sr-only">
                                                        Dia da semana
                                                    </label>

                                                    <select
                                                        id="dia-desktop"
                                                        name="dia"
                                                        disabled={repetirDesktop !== 'semanal'}
                                                        defaultValue=""
                                                        className="accent-[#F29A4B] flex-1 min-w-0 h-full bg-transparent outline-none appearance-none cursor-pointer"
                                                    >
                                                        <option value="" disabled>
                                                            Dia da semana
                                                        </option>
                                                        <option value="dom">Domingo</option>
                                                        <option value="seg">Segunda</option>
                                                        <option value="ter">Terça</option>
                                                        <option value="qua">Quarta</option>
                                                        <option value="qui">Quinta</option>
                                                        <option value="sex">Sexta</option>
                                                        <option value="sab">Sábado</option>
                                                    </select>

                                                    <img
                                                        src="/svg/seta-baixo.svg"
                                                        alt="Seta"
                                                        className="w-5 h-5 shrink-0"
                                                    />
                                                </div>

                                                <div className={`flex items-center gap-3 w-[204px] h-10 px-5 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl transition ${repetirDesktop === 'semanal' ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>

                                                    <label htmlFor="horario-desktop" className="sr-only">
                                                        Horário
                                                    </label>

                                                    <input
                                                        id="horario-desktop"
                                                        name="horario"
                                                        type="time"
                                                        disabled={repetirDesktop !== 'semanal'}
                                                        className="campo bg-[#F8F0E6] w-full"
                                                    />
                                                </div>
                                            </label>
                                        </fieldset>

                                        {/* BOTÃO ADICIONAR */}

                                        <button
                                            id="bt-adicionar"
                                            type="submit"
                                            className="flex bg-[#F29A4B] w-60 px-4 py-3 gap-4 rounded-2xl font-semibold hover:bg-[#E8863A] hover:shadow-md transition"
                                        >
                                            <img src="/svg/adicionar.svg" alt="Botão de mais" />
                                            Adicionar
                                        </button>

                                        {/* MENSAGEM DE SUCESSO */}

                                        {alertaAdicionado && (
                                            <div
                                                id="alerta-adicionado"
                                                className="flex w-full max-w-[340px] items-center p-4 gap-3 fixed top-[7rem] right-[5rem] text-body bg-[#E8863A] rounded-xl shadow-xs border border-default z-50"
                                                role="status"
                                            >
                                                <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">
                                                    <svg
                                                        className="w-7 h-7 border border-[#111111] rounded-md"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 11.917 9.724 16.5 19 7.5"
                                                        />
                                                    </svg>
                                                </div>

                                                <div className="ms-3 text-base font-normal">
                                                    Alerta adicionado com sucesso.
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={fecharMensagem}
                                                    className="ms-auto flex items-center justify-center text-body hover:bg-neutral-secondary-medium rounded text-sm h-8 w-8"
                                                    aria-label="Fechar mensagem"
                                                >
                                                    <span className="sr-only">Fechar</span>
                                                    <svg
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M6 18 17.94 6M18 18 6.06 6"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}

                                    </form>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            {/* ==================== MOBILE ==================== */}

            <section className="block md:hidden min-h-dvh w-full bg-fundo flex flex-col">

                <div className="flex-1 min-h-dvh w-full bg-fundo flex flex-col">

                    {/* HEADER */}

                    <header className="h-16 shrink-0 px-5 border-b border-borda flex items-center gap-4">

                        <Link
                            to="/"
                            aria-label="Voltar"
                            className="size-6 shrink-0 flex items-center justify-center"
                        >
                            <img
                                src="/svg/voltar.svg"
                                alt="Voltar"
                                className="size-4 object-contain"
                            />
                        </Link>

                        <h1 className="text-texto1 text-lg font-semibold font-['Inter']">
                            Novo alerta
                        </h1>
                    </header>

                    {/* FORMULÁRIO MOBILE */}

                    <form
                        id="form-alerta-mobile"
                        onSubmit={adicionarAlerta}
                        className="flex-1 w-full px-5 pt-6 pb-24 flex flex-col gap-6 bg-fundo"
                    >

                        <div className="w-full flex flex-col gap-2">
                            <label
                                htmlFor="lembrete-mobile"
                                className="text-texto1 text-base font-medium font-['Inter']"
                            >
                                O que você precisa lembrar?
                            </label>

                            <input
                                id="lembrete-mobile"
                                name="lembrete"
                                type="text"
                                placeholder="Ex: Limpar vasilhas"
                                required
                                className="campo w-full h-12 px-3.5 bg-superficie border border-borda rounded-xl text-texto1 placeholder:text-texto2"
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label
                                htmlFor="pet-mobile"
                                className="text-texto1 text-base font-medium font-['Inter']"
                            >
                                Para qual pet?
                            </label>

                            <div className="w-full h-12 px-3.5 bg-superficie border border-borda rounded-xl flex items-center gap-2.5 focus-within:ring-2 focus-within:ring-laranja">

                                <input
                                    id="pet-mobile"
                                    name="pet"
                                    type="text"
                                    required
                                    className="min-w-0 flex-1 w-full h-full bg-transparent text-texto1 outline-none focus:ring-0 border-0 rounded-xl"
                                />

                                <button
                                    type="button"
                                    aria-label="Pesquisar pet"
                                    className="size-5 shrink-0 flex items-center justify-center"
                                >
                                    <img
                                        src="/svg/pesquisar.svg"
                                        alt="Pesquisar"
                                        className="size-4 object-contain"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* DATA E HORÁRIO */}

                        <fieldset className="w-full flex flex-col gap-3">
                            <legend className="text-texto1 text-base font-semibold font-['Inter'] mb-3">
                                Quando?
                            </legend>

                            <div className="grid grid-cols-2 gap-3">

                                <div className="min-w-0">
                                    <label htmlFor="data-mobile" className="sr-only">
                                        Data
                                    </label>

                                    <div className="relative h-12 w-full px-3.5 bg-superficie border border-borda rounded-xl flex items-center">

                                        <input
                                            id="data-mobile"
                                            name="data"
                                            type="date"
                                            required
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />

                                        <span className="flex-1 text-texto2 text-base pointer-events-none">
                                            Data
                                        </span>

                                        <img
                                            src="/svg/calendario.svg"
                                            alt="Calendário"
                                            className="size-4 object-contain pointer-events-none"
                                        />
                                    </div>
                                </div>

                                <div className="min-w-0">
                                    <label htmlFor="hora-mobile" className="sr-only">
                                        Hora
                                    </label>

                                    <div className="relative h-12 w-full px-3.5 bg-superficie border border-borda rounded-xl flex items-center">

                                        <input
                                            id="hora-mobile"
                                            name="hora"
                                            type="time"
                                            required
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />

                                        <span className="flex-1 text-texto2 text-base pointer-events-none">
                                            Hora
                                        </span>

                                        <img
                                            src="/svg/relogio.svg"
                                            alt="Relógio"
                                            className="size-4 object-contain pointer-events-none"
                                        />
                                    </div>
                                </div>

                            </div>
                        </fieldset>

                        {/* REPETIÇÃO */}

                        <fieldset className="w-full flex flex-col gap-4">
                            <legend className="text-texto1 text-base font-semibold font-['Inter'] mb-2">
                                Repetir?
                            </legend>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="repetir-mobile"
                                    value="nao"
                                    checked={repetirMobile === 'nao'}
                                    onChange={() => setRepetirMobile('nao')}
                                    className="size-5 accent-laranja"
                                />

                                <span className="text-texto1 text-base">
                                    Não repetir
                                </span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    id="repetir-semanal-mobile"
                                    type="radio"
                                    name="repetir-mobile"
                                    value="semanal"
                                    checked={repetirMobile === 'semanal'}
                                    onChange={() => setRepetirMobile('semanal')}
                                    className="size-5 accent-laranja"
                                />

                                <span className="text-texto1 text-base">
                                    Sim, selecionar intervalo
                                </span>
                            </label>

                            {repetirMobile === 'semanal' && (
                                <div
                                    id="opcoes-repeticao-mobile"
                                    className="flex flex-col gap-3 pl-8"
                                >
                                    <label htmlFor="dia-mobile" className="sr-only">
                                        Dia da semana
                                    </label>

                                    <select
                                        id="dia-mobile"
                                        name="dia"
                                        defaultValue=""
                                        className="campo w-full h-12 px-4 bg-superficie border border-borda rounded-xl text-texto1"
                                    >
                                        <option value="" disabled>
                                            Dia da semana
                                        </option>
                                        <option value="dom">Domingo</option>
                                        <option value="seg">Segunda</option>
                                        <option value="ter">Terça</option>
                                        <option value="qua">Quarta</option>
                                        <option value="qui">Quinta</option>
                                        <option value="sex">Sexta</option>
                                        <option value="sab">Sábado</option>
                                    </select>

                                    <label
                                        htmlFor="horario-mobile"
                                        className="text-texto1 text-sm"
                                    >
                                        Horário da repetição
                                    </label>

                                    <input
                                        id="horario-mobile"
                                        name="horario"
                                        type="time"
                                        className="campo w-full h-12 px-4 bg-superficie border border-borda rounded-xl text-texto1"
                                    />
                                </div>
                            )}
                        </fieldset>

                        {/* MENSAGEM DE SUCESSO MOBILE */}

                        {alertaAdicionado && (
                            <div
                                id="alerta-adicionado-mobile"
                                role="status"
                                className="flex w-full items-center justify-between gap-3 p-3 bg-superficie rounded-xl border border-borda"
                            >
                                <span className="text-texto1 text-sm">
                                    Alerta adicionado com sucesso.
                                </span>

                                <button
                                    type="button"
                                    onClick={fecharMensagem}
                                    aria-label="Fechar mensagem"
                                    className="text-texto1 font-semibold px-2"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {/* BOTÃO ADICIONAR */}

                        <button
                            type="submit"
                            className="fixed bottom-6 left-5 right-5 w-[calc(100%-2.5rem)] h-12 px-5 bg-laranja rounded-xl border border-borda flex justify-center items-center shadow-md"
                        >
                            <span className="text-texto1 text-base font-semibold font-['Inter']">
                                Adicionar
                            </span>
                        </button>

                    </form>
                </div>
            </section>
        </>
    )
}

export default NovoAlerta
