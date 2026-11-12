import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { usePets } from '../context/Pets'
import { montarQuando, diaDoTexto } from '../js/alertas'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import CardAlerta from '../componentes/CardAlerta'

function MeusAlertas() {
  const painelRef = useRef(null)
  const formRef = useRef(null)

  // alertas e pets agora vêm do context (os mesmos que a tela Novo alerta usa)
  const { pets, alertas, setAlertas } = usePets()

  const [alertaSelecionado, setAlertaSelecionado] = useState(null)
  const [formulario, setFormulario] = useState({
    titulo: '',
    petId: '',
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
      titulo: alerta.texto,
      petId: String(alerta.petId),
      data: alerta.data ?? '',
      hora: alerta.hora ?? '',
      repetir: alerta.repete ? 'semanal' : 'nao',
      dia: alerta.dia || diaDoTexto(alerta.quando),
      horario: alerta.horario ?? '',
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

    const repete = formulario.repetir === 'semanal'

    setAlertas((anteriores) =>
      anteriores.map((alerta) =>
        alerta.id === alertaSelecionado.id
          ? {
              ...alerta,
              petId: Number(formulario.petId),
              texto: formulario.titulo.trim(),
              quando: montarQuando(formulario),
              repete,
              data: formulario.data,
              hora: formulario.hora,
              dia: repete ? formulario.dia : '',
              horario: repete ? formulario.horario : '',
            }
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
      
      <div className="hidden md:flex"><Sidebar /></div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="bg-[#FFFBF6] flex flex-col flex-1 min-w-0">

        {/* HEADER */}
        <Header />

        {/* MAIN */}
        <main className="flex w-full py-6 px-4 sm:px-8 lg:px-16 flex-col items-start">

          <div className="flex flex-col self-stretch gap-8">

            {/* TÍTULO E BOTÃO DESKTOP */}
            <div className="hidden lg:flex justify-between items-center gap-4">
              <h1 className="text-4xl font-semibold">Meus alertas</h1>

              <Link
                to="/novo-alerta"
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
                to="/novo-alerta"
                className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-2xl font-semibold border border-[#E9DDCF] hover:bg-[#F8F0E6] transition"
              >
                <img src="/svg/adicionar.svg" alt="" />
                Adicionar novo alerta
              </Link>
            </div>

            {/* PAINEL DE ALERTAS */}
            <ul className="flex flex-col gap-4 p-4 sm:p-6 w-full max-w-[600px] bg-[#F8F0E6] rounded-2xl">

              {alertas.map((alerta) => (
                <CardAlerta
                  key={alerta.id}
                  titulo={alerta.texto}
                  descricao={alerta.quando}
                  onEdit={() => abrirPainel(alerta)}
                />
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
                  name="petId"
                  required
                  value={formulario.petId}
                  onChange={atualizarCampo}
                  className="campo appearance-none pr-12 cursor-pointer"
                >
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.nome}
                    </option>
                  ))}
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
