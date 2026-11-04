
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

function MeusAlertas() {
  const painelRef = useRef(null)
  const formRef = useRef(null)

  const [alertas, setAlertas] = useState([
    {
      id: 1,
      titulo: 'Limpar gaiola de Fiu',
      pet: 'fiu',
      data: '',
      hora: '',
      repetir: 'semanal',
      dia: 'qua',
      horario: '',
      descricao: 'Toda quarta',
    },
    {
      id: 2,
      titulo: 'Cortar unha da Tina',
      pet: 'tina',
      data: '',
      hora: '',
      repetir: 'nao',
      dia: '',
      horario: '',
      descricao: 'Hoje',
    },
  ])

  const [alertaSelecionado, setAlertaSelecionado] = useState(null)
  const [formulario, setFormulario] = useState({
    titulo: '',
    pet: 'fiu',
    data: '',
    hora: '',
    repetir: 'nao',
    dia: '',
    horario: '',
  })

  const [confirmarExclusao, setConfirmarExclusao] = useState(false)

  function abrirPainel(alerta) {
    setAlertaSelecionado(alerta)

    setFormulario({
      titulo: alerta.titulo,
      pet: alerta.pet,
      data: alerta.data,
      hora: alerta.hora,
      repetir: alerta.repetir,
      dia: alerta.dia,
      horario: alerta.horario,
    })

    setConfirmarExclusao(false)
    painelRef.current?.showModal()
  }

  function fecharPainel() {
    painelRef.current?.close()
    setAlertaSelecionado(null)
    setConfirmarExclusao(false)
  }

  function atualizarCampo(event) {
    const { name, value } = event.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }))
  }

  function salvarAlerta(event) {
    event.preventDefault()

    if (!alertaSelecionado) return

    const descricao =
      formulario.repetir === 'semanal'
        ? `Toda ${formulario.dia === 'sab' ? 'sábado' :
          formulario.dia === 'dom' ? 'domingo' :
          formulario.dia === 'seg' ? 'segunda' :
          formulario.dia === 'ter' ? 'terça' :
          formulario.dia === 'qua' ? 'quarta' :
          formulario.dia === 'qui' ? 'quinta' : 'sexta'}`
        : 'Hoje'

    setAlertas((anteriores) =>
      anteriores.map((alerta) =>
        alerta.id === alertaSelecionado.id
          ? { ...alerta, ...formulario, descricao }
          : alerta
      )
    )

    fecharPainel()
  }

  function excluirAlerta() {
    setAlertas((anteriores) =>
      anteriores.filter((alerta) => alerta.id !== alertaSelecionado.id)
    )

    fecharPainel()
  }

  const diasSemana = [
    { value: 'dom', label: 'Domingo' },
    { value: 'seg', label: 'Segunda' },
    { value: 'ter', label: 'Terça' },
    { value: 'qua', label: 'Quarta' },
    { value: 'qui', label: 'Quinta' },
    { value: 'sex', label: 'Sexta' },
    { value: 'sab', label: 'Sábado' },
  ]

  return (
    <div className="flex min-h-dvh bg-[#FFFBF6] text-[#2B1A0E]">

      {/* SIDEBAR - DESKTOP */}
      <aside
        id="default-sidebar"
        className="hidden lg:flex bg-[#F8F0E6] p-3 flex-col shrink-0 w-60 min-h-dvh"
        aria-label="Sidebar"
      >
        <div className="flex flex-col flex-1 px-3 py-4 justify-between">
          <ul className="flex-1 space-y-2 font-medium">

            <li className="flex items-center">
              <Link to="/" className="flex flex-1 items-center px-2 py-3 rounded-2xl">
                <span className="px-1 pb-6 text-xl font-bold">Site nome</span>
              </Link>

              <button type="button">
                <img className="pb-6" src="/svg/fechar.svg" alt="Fechar menu lateral" />
              </button>
            </li>

            <li className="pb-3 mb-2 border-b border-[#E9DDCF]">
              <a
                href="#"
                aria-label="Perfil de Marina"
                className="group flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-[#E9DDCF]"
              >
                <span className="w-10 h-10 shrink-0 rounded-full bg-[#E9DDCF] group-hover:bg-[#F8F0E6] flex items-center justify-center font-semibold transition">
                  M
                </span>
                <span className="flex-1 min-w-0 font-semibold truncate">Marina</span>
              </a>
            </li>

            <li>
              <Link to="/" className="flex items-center px-2 py-3 rounded-xl hover:bg-[#E9DDCF] group">
                <img src="/svg/inicio.svg" alt="" />
                <span className="flex-1 ms-3 whitespace-nowrap">Início</span>
              </Link>
            </li>

            <li>
              <Link to="/meus-pets" className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group">
                <img src="/svg/paw-print.svg" alt="" />
                <span className="flex-1 ms-3 whitespace-nowrap">Meus pets</span>
              </Link>
            </li>

            <li>
              <Link to="/MeusAgendamentos" className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group">
                <img src="/svg/calendario.svg" alt="" />
                <span className="flex-1 ms-3 whitespace-nowrap">Agendamentos</span>
              </Link>
            </li>

            <li className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]" />

              <Link
                to="/MeusAlertas"
                className="flex items-center px-2 py-3 pl-6 rounded-2xl hover:bg-[#E9DDCF] group"
              >
                <img src="/svg/notificacao.svg" alt="" />
                <span className="flex-1 ms-3 whitespace-nowrap">Alertas</span>
              </Link>
            </li>

            <li>
              <Link to="/tutores" className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group">
                <img src="/svg/tutores.svg" alt="" />
                <span className="flex-1 ms-3 whitespace-nowrap">Outros tutores</span>
              </Link>
            </li>

          </ul>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="bg-[#FFFBF6] flex flex-col flex-1 min-w-0">

        {/* HEADER DESKTOP */}
        <header className="hidden lg:flex flex-row justify-between items-center p-5 border-b border-[#E9DDCF]">
          <Link to="/" className="flex gap-4 items-center">
            <img alt="" src="/svg/voltar.svg" />
            <p>Voltar</p>
          </Link>

          <button type="button">
            <img src="/svg/notificacao.svg" alt="Notificações" />
          </button>
        </header>

        {/* HEADER MOBILE */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-[#E9DDCF]">
          <Link to="/" className="flex items-center gap-3">
            <img src="/svg/voltar.svg" alt="Voltar" className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </Link>

          <button type="button" aria-label="Notificações">
            <img src="/svg/notificacao.svg" alt="" className="w-6 h-6" />
          </button>
        </header>

        {/* MAIN */}
        <main className="flex w-full py-6 px-4 sm:px-8 lg:px-16 flex-col items-start">

          <div className="flex flex-col self-stretch gap-8">

            {/* TÍTULO E BOTÃO DESKTOP */}
            <div className="hidden lg:flex justify-between items-center gap-4">
              <h1 className="text-4xl font-semibold">Meus alertas</h1>

              <Link
                to="/NovoAlerta"
                className="flex items-center px-5 py-3 gap-4 rounded-2xl font-semibold border border-[#E9DDCF] hover:shadow-md transition"
              >
                <img src="/svg/adicionar.svg" alt="Adicionar alerta" />
                Adicionar um novo alerta
              </Link>
            </div>

            {/* TÍTULO MOBILE */}
            <div className="lg:hidden flex flex-col gap-4">
              <h1 className="text-3xl font-semibold">Meus alertas</h1>

              <Link
                to="/NovoAlerta"
                className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-2xl font-semibold border border-[#E9DDCF] hover:bg-[#F8F0E6] transition"
              >
                <img src="/svg/adicionar.svg" alt="" />
                Adicionar novo alerta
              </Link>
            </div>

            {/* PAINEL DE ALERTAS */}
            <ul className="flex flex-col gap-4 p-4 sm:p-6 w-full max-w-[600px] bg-[#F8F0E6] rounded-2xl">

              {alertas.map((alerta) => (
                <li
                  key={alerta.id}
                  className="flex flex-col sm:flex-row sm:gap-5 sm:items-center gap-4 p-5 rounded-2xl bg-[#FFAE52] hover:shadow-md transition"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold break-words">{alerta.titulo}</p>
                    <p className="text-sm mt-1">{alerta.descricao}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => abrirPainel(alerta)}
                    className="flex items-center justify-center sm:justify-start gap-2 font-medium hover:font-semibold transition"
                  >
                    <img src="/svg/editar.svg" alt="" />
                    <span>Editar alerta</span>
                  </button>
                </li>
              ))}

              {alertas.length === 0 && (
                <li className="text-center py-8 text-[#75634F]">
                  Você ainda não possui alertas cadastrados.
                </li>
              )}

            </ul>
          </div>
        </main>
      </div>

      {/* PAINEL DE EDITAR ALERTA - COMPARTILHADO */}
      <dialog
        ref={painelRef}
        className="m-auto p-0 w-[92vw] max-w-[40rem] max-h-[90dvh] overflow-hidden rounded-3xl bg-[#FFFBF6] text-[#2B1A0E] border border-[#E9DDCF] shadow-2xl backdrop:bg-black/40 open:flex flex-col"
        aria-label="Editar alerta"
      >

        <div className="flex items-center justify-between gap-4 h-[88px] shrink-0 px-6 border-b border-[#E9DDCF]">
          <h2 className="text-2xl font-semibold">Editar alerta</h2>

          <button
            type="button"
            onClick={fecharPainel}
            aria-label="Fechar painel"
            className="p-2 rounded-lg hover:bg-[#F8F0E6] transition"
          >
            <img src="/svg/fechar.svg" alt="" className="w-6 h-6" />
          </button>
        </div>

        <form
          ref={formRef}
          onSubmit={salvarAlerta}
          className="flex flex-1 min-h-0 flex-col"
        >

          <div className="flex-1 overflow-y-auto flex flex-col gap-6 p-6">

            <div className="flex flex-col gap-2">
              <label htmlFor="edit-titulo">O que você precisa lembrar?</label>
              <input
                id="edit-titulo"
                name="titulo"
                type="text"
                required
                autoComplete="off"
                value={formulario.titulo}
                onChange={atualizarCampo}
                className="campo"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="edit-pet">Para qual pet?</label>

              <div className="relative">
                <select
                  id="edit-pet"
                  name="pet"
                  required
                  value={formulario.pet}
                  onChange={atualizarCampo}
                  className="campo appearance-none pr-12 cursor-pointer"
                >
                  <option value="fiu">Fiu</option>
                  <option value="tina">Tina</option>
                </select>

                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F29A4B] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            <fieldset className="flex flex-col border-0 p-0 m-0 min-w-0">
              <legend className="font-semibold mb-3">Quando?</legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-data" className="sr-only">Data</label>
                  <input
                    id="edit-data"
                    name="data"
                    type="date"
                    value={formulario.data}
                    onChange={atualizarCampo}
                    className="campo w-full"
                  />
                </div>

                <div>
                  <label htmlFor="edit-hora" className="sr-only">Hora</label>
                  <input
                    id="edit-hora"
                    name="hora"
                    type="time"
                    value={formulario.hora}
                    onChange={atualizarCampo}
                    className="campo w-full"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-4 border-0 p-0 m-0 min-w-0">
              <legend className="font-semibold mb-3">Repetir</legend>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="repetir"
                  value="nao"
                  checked={formulario.repetir === 'nao'}
                  onChange={atualizarCampo}
                  className="w-5 h-5 accent-[#F29A4B]"
                />
                Não repetir
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="repetir"
                  value="semanal"
                  checked={formulario.repetir === 'semanal'}
                  onChange={atualizarCampo}
                  className="w-5 h-5 accent-[#F29A4B]"
                />
                A cada
              </label>

              {formulario.repetir === 'semanal' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-8">
                  <div className="relative">
                    <label htmlFor="edit-dia" className="sr-only">Dia da semana</label>

                    <select
                      id="edit-dia"
                      name="dia"
                      value={formulario.dia}
                      onChange={atualizarCampo}
                      required
                      className="campo appearance-none pr-10 cursor-pointer"
                    >
                      <option value="" disabled>Dia da semana</option>

                      {diasSemana.map((dia) => (
                        <option key={dia.value} value={dia.value}>
                          {dia.label}
                        </option>
                      ))}
                    </select>

                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F29A4B] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                  <div>
                    <label htmlFor="edit-horario" className="sr-only">Horário</label>
                    <input
                      id="edit-horario"
                      name="horario"
                      type="time"
                      value={formulario.horario}
                      onChange={atualizarCampo}
                      className="campo w-full"
                    />
                  </div>
                </div>
              )}
            </fieldset>
          </div>

          {/* RODAPÉ */}
          <div className="shrink-0 p-4 sm:p-6 border-t border-[#E9DDCF]">

            {!confirmarExclusao ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">

                <button
                  type="button"
                  onClick={() => setConfirmarExclusao(true)}
                  className="font-semibold text-[#B3261E] rounded-lg hover:underline text-left"
                >
                  Excluir alerta
                </button>

                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={fecharPainel}
                    className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-6 h-12 rounded-xl bg-[#F29A4B] font-semibold hover:bg-[#E8863A] hover:shadow-md transition"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Excluir este alerta?</p>
                <p className="text-sm text-[#75634F]">Essa ação não pode ser desfeita.</p>

                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmarExclusao(false)}
                    className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition"
                  >
                    Manter
                  </button>

                  <button
                    type="button"
                    onClick={excluirAlerta}
                    className="px-5 h-12 rounded-xl bg-[#B3261E] text-white font-semibold hover:brightness-110 transition"
                  >
                    Sim, excluir
                  </button>
                </div>
              </div>
            )}

          </div>
        </form>
      </dialog>
    </div>
  )
}

export default MeusAlertas
