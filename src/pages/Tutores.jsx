
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../componentes/Sidebar'

function OutrosTutores() {
  // Lista inicial de tutores.
  // Cada tutor possui um identificador, nome, inicial e pets compartilhados.
  const [tutores, setTutores] = useState([
    {
      id: 1,
      nome: 'Marina (você)',
      inicial: 'M',
      pets: 'Pets: Tina, Fiu',
      proprio: true,
    },
    {
      id: 2,
      nome: 'Juliana',
      inicial: 'J',
      pets: 'Pets em comum: Tina',
      proprio: false,
    },
    {
      id: 3,
      nome: 'Roberto',
      inicial: 'R',
      pets: 'Pets em comum: Fiu',
      proprio: false,
    },
  ])

  // Guarda o texto digitado na busca.
  const [busca, setBusca] = useState('')

  // Guarda o tutor que foi selecionado para gerenciamento.
  const [tutorSelecionado, setTutorSelecionado] = useState(null)

  // Controla qual etapa do gerenciamento está sendo exibida:
  // false = opções normais; true = confirmação de exclusão.
  const [confirmarRemocao, setConfirmarRemocao] = useState(false)

  // Controla a exibição da mensagem de convite enviado.
  const [avisoConvite, setAvisoConvite] = useState(false)

  // Referências aos elementos dialog do HTML.
  // Com useRef, conseguimos abrir e fechar os painéis nativos do navegador.
  const painelConvidarRef = useRef(null)
  const painelGerenciarRef = useRef(null)
  const formConvidarRef = useRef(null)

  // Filtra a lista de tutores conforme o texto digitado.
  // trim() remove espaços extras e toLowerCase() ignora diferenças
  // entre letras maiúsculas e minúsculas.
  const tutoresFiltrados = tutores.filter((tutor) =>
    tutor.nome.toLowerCase().includes(busca.trim().toLowerCase())
  )

  // Abre o painel de convite e limpa os campos do formulário.
  function abrirPainelConvidar() {
    formConvidarRef.current?.reset()
    painelConvidarRef.current?.showModal()
  }

  // Fecha o painel de convite.
  function fecharPainelConvidar() {
    painelConvidarRef.current?.close()
  }

  // Executada quando o formulário de convite é enviado.
  function enviarConvite(event) {
    // Impede que o formulário recarregue a página.
    event.preventDefault()

    // Fecha o painel após o envio.
    fecharPainelConvidar()

    // Exibe a mensagem de confirmação.
    // Neste momento, o envio é apenas visual: ainda não existe
    // integração com um servidor ou serviço de e-mail.
    setAvisoConvite(true)

    // A mensagem desaparece automaticamente após 4 segundos.
    // O useEffect abaixo controla esse tempo.
  }

  // Controla o tempo de exibição do aviso de convite.
  useEffect(() => {
    if (!avisoConvite) return

    const timer = setTimeout(() => {
      setAvisoConvite(false)
    }, 4000)

    // Limpa o temporizador caso o componente seja desmontado
    // ou o estado do aviso seja alterado antes dos 4 segundos.
    return () => clearTimeout(timer)
  }, [avisoConvite])

  // Abre o painel de gerenciamento do tutor escolhido.
  function abrirPainelGerenciar(tutor) {
    setTutorSelecionado(tutor)

    // Sempre começa mostrando as opções normais,
    // e não a tela de confirmação.
    setConfirmarRemocao(false)

    painelGerenciarRef.current?.showModal()
  }

  // Fecha o painel de gerenciamento e limpa a seleção.
  function fecharPainelGerenciar() {
    painelGerenciarRef.current?.close()
    setTutorSelecionado(null)
    setConfirmarRemocao(false)
  }

  // Exibe a etapa que pergunta se o usuário realmente deseja remover.
  function solicitarRemocao() {
    setConfirmarRemocao(true)
  }

  // Volta para as opções normais, sem remover o tutor.
  function cancelarRemocao() {
    setConfirmarRemocao(false)
  }

  // Remove o tutor selecionado da lista.
  function removerTutor() {
    if (!tutorSelecionado) return

    // filter() cria uma nova lista contendo todos os tutores,
    // exceto aquele cujo ID corresponde ao tutor selecionado.
    setTutores((listaAtual) =>
      listaAtual.filter((tutor) => tutor.id !== tutorSelecionado.id)
    )

    fecharPainelGerenciar()
  }

  // Componente que representa um tutor na lista.
  // Ele é reutilizado tanto na versão desktop quanto na mobile.
  function CardTutor({ tutor, mobile = false }) {
    return (
      <li
        className={`tutor flex items-center ${
          mobile ? 'gap-4 p-4' : 'gap-5 p-5 px-7'
        } rounded-2xl bg-[#F8F0E6] hover:shadow-md transition`}
      >
        {/* Círculo com a inicial do tutor */}
        <span
          className={`shrink-0 rounded-full bg-[#E9DDCF] flex items-center justify-center font-semibold ${
            mobile ? 'w-12 h-12 text-xl' : 'w-14 h-14 text-xl'
          }`}
          aria-hidden="true"
        >
          {tutor.inicial}
        </span>

        {/* Nome e pets compartilhados */}
        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold text-[#2B1A0E] truncate ${
              mobile ? 'text-lg' : 'text-2xl'
            }`}
          >
            {tutor.nome}
          </p>

          <p
            className={`font-semibold text-[#75634F] ${
              mobile ? 'text-sm' : 'text-md'
            }`}
          >
            {tutor.pets}
          </p>
        </div>

        {/* O próprio usuário não pode ser removido da lista */}
        {!tutor.proprio && (
          <button
            type="button"
            onClick={() => abrirPainelGerenciar(tutor)}
            className={`flex items-center gap-2 text-[#75634F] hover:font-semibold transition ${
              mobile ? 'self-start p-2 rounded-lg hover:bg-[#E9DDCF]' : ''
            }`}
            aria-label={`Gerenciar ${tutor.nome}`}
          >
            <img
              className="w-5 h-5"
              src="/svg/editar.svg"
              alt=""
            />

            {/* No mobile, aparece somente o ícone de edição */}
            {!mobile && <span className="text-xl">Gerenciar</span>}
          </button>
        )}
      </li>
    )
  }

  return (
    <>
      {/* DESKTOP */}
      <section className="hidden md:block min-h-screen">
        <div className="flex min-h-screen">

          <Sidebar />

          {/* CONTEÚDO PRINCIPAL */}
          <div className="bg-[#FFFBF6] flex flex-col self-stretch flex-1">

            <Header />

            <main className="flex w-full py-6 px-4 sm:px-8 lg:px-16 flex-col items-start self-stretch">
              <div className="flex flex-col self-stretch gap-[2.25rem]">

                {/* TÍTULO E BOTÃO DE CONVIDAR */}
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl font-semibold">
                    Outros tutores
                  </h1>

                  <button
                    type="button"
                    onClick={abrirPainelConvidar}
                    className="flex items-center px-5 py-3 gap-4 rounded-2xl font-semibold border border-[#9c9c9c] hover:shadow-md transition"
                  >
                    <img
                      className="w-5 h-5"
                      src="/svg/adicionar.svg"
                      alt=""
                    />
                    Convidar um tutor
                  </button>
                </div>

                {/* CAMPO DE BUSCA */}
                <div className="flex flex-col gap-2 max-w-[800px] w-full">
                  <label htmlFor="busca-tutor" className="sr-only">
                    Buscar tutor
                  </label>

                  <input
                    id="busca-tutor"
                    type="search"
                    placeholder="Buscar tutor por nome"
                    className="campo"
                    value={busca}
                    onChange={(event) => setBusca(event.target.value)}
                  />
                </div>

                {/* LISTA DE TUTORES */}
                <ul className="flex flex-col gap-4 p-6 w-full max-w-[800px] bg-[#E9DDCF] rounded-2xl">

                  {tutoresFiltrados.map((tutor) => (
                    <CardTutor key={tutor.id} tutor={tutor} />
                  ))}

                  {/* Mensagem exibida quando a busca não encontra resultados */}
                  {tutoresFiltrados.length === 0 && (
                    <li className="p-5 text-center text-[#75634F] font-semibold">
                      Nenhum tutor encontrado.
                    </li>
                  )}

                </ul>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* MOBILE */}
      <section className="block md:hidden min-h-screen bg-[#FFFBF6]">

        <header className="min-h-16 px-6 py-4 border-b border-[#E9DDCF] flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/svg/voltar.svg" alt="" className="w-6 h-6" />
            <span className="text-lg font-semibold text-[#75634F]">
              Voltar
            </span>
          </Link>
        </header>

        <main className="px-5 py-6 flex flex-col gap-6">

          <h1 className="text-2xl font-semibold text-[#120111]">
            Outros tutores
          </h1>

          {/* BOTÃO DE CONVIDAR */}
          <button
            type="button"
            onClick={abrirPainelConvidar}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl border border-[#9c9c9c] font-semibold text-[#2B1A0E] hover:shadow-md transition"
          >
            <img src="/svg/adicionar.svg" alt="" className="w-5 h-5" />
            Convidar um tutor
          </button>

          {/* BUSCA MOBILE */}
          <div className="w-full">
            <label htmlFor="busca-tutor-mobile" className="sr-only">
              Buscar tutor
            </label>

            <input
              id="busca-tutor-mobile"
              type="search"
              placeholder="Buscar tutor por nome"
              className="campo w-full"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
          </div>

          {/* LISTA MOBILE */}
          <ul className="flex flex-col gap-4 p-4 bg-[#E9DDCF] rounded-2xl">

            {tutoresFiltrados.map((tutor) => (
              <CardTutor key={tutor.id} tutor={tutor} mobile />
            ))}

            {tutoresFiltrados.length === 0 && (
              <li className="p-5 text-center text-[#75634F] font-semibold">
                Nenhum tutor encontrado.
              </li>
            )}

          </ul>
        </main>
      </section>

      {/* AVISO DE CONVITE ENVIADO */}
      {avisoConvite && (
        <div
          role="status"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[380px] max-w-[90vw] flex items-center gap-3 p-5 bg-[#E8863A] rounded-3xl shadow-2xl border border-[#E9DDCF]"
        >
          <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 bg-white/40 rounded-full">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
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

          <div className="ms-3 text-xl font-normal">
            Convite enviado com sucesso
          </div>
        </div>
      )}

      {/* PAINEL DE CONVIDAR TUTOR */}
      <dialog
        ref={painelConvidarRef}
        onClick={(event) => {
          // Fecha o painel se o usuário clicar fora da área do formulário.
          if (event.target === event.currentTarget) {
            fecharPainelConvidar()
          }
        }}
        className="m-auto p-0 w-[92vw] max-w-[28rem] max-h-[90vh] overflow-hidden rounded-3xl bg-[#FFFBF6] text-[#2B1A0E] border border-[#E9DDCF] shadow-2xl backdrop:bg-black/40 open:flex flex-col"
        aria-label="Convidar tutor"
      >
        <div className="flex items-center justify-between gap-4 h-[88px] shrink-0 px-6 border-b border-[#E9DDCF]">
          <h2 className="text-2xl font-semibold">
            Convidar tutor
          </h2>

          <button
            type="button"
            onClick={fecharPainelConvidar}
            aria-label="Fechar painel"
            className="p-2 rounded-lg hover:bg-[#F8F0E6] transition"
          >
            <img src="/svg/fechar.svg" alt="" className="w-6 h-6" />
          </button>
        </div>

        <form
          ref={formConvidarRef}
          onSubmit={enviarConvite}
          className="flex flex-1 min-h-0 flex-col"
        >
          <div className="flex-1 overflow-y-auto flex flex-col gap-6 p-6">

            <div className="flex flex-col gap-2">
              <label htmlFor="convite-email">
                E-mail do tutor
              </label>

              <input
                id="convite-email"
                name="email"
                type="email"
                required
                autoComplete="off"
                placeholder="nome@email.com"
                className="campo"
              />
            </div>

            <fieldset className="flex flex-col gap-3 border-0 p-0 m-0 min-w-0">
              <legend className="font-semibold mb-3">
                Quais pets ele pode ver?
              </legend>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="pets"
                  value="tina"
                  className="w-5 h-5 accent-[#F29A4B]"
                />
                Tina
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="pets"
                  value="fiu"
                  className="w-5 h-5 accent-[#F29A4B]"
                />
                Fiu
              </label>
            </fieldset>
          </div>

          <div className="shrink-0 p-6 border-t border-[#E9DDCF] flex justify-end gap-3">
            <button
              type="button"
              onClick={fecharPainelConvidar}
              className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 h-12 rounded-xl bg-[#F29A4B] font-semibold hover:bg-[#E8863A] hover:shadow-md transition"
            >
              Enviar convite
            </button>
          </div>
        </form>
      </dialog>

      {/* PAINEL DE GERENCIAR TUTOR */}
      <dialog
        ref={painelGerenciarRef}
        onClick={(event) => {
          // Fecha o painel ao clicar no fundo escuro.
          if (event.target === event.currentTarget) {
            fecharPainelGerenciar()
          }
        }}
        className="m-auto p-0 w-[92vw] max-w-[24rem] overflow-hidden rounded-3xl bg-[#FFFBF6] text-[#2B1A0E] border border-[#E9DDCF] shadow-2xl backdrop:bg-black/40"
        aria-label="Gerenciar tutor"
      >
        <div className="flex flex-col gap-4 p-6">

          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">
              {tutorSelecionado?.nome || 'Gerenciar tutor'}
            </h2>

            <button
              type="button"
              onClick={fecharPainelGerenciar}
              aria-label="Fechar painel"
              className="p-2 rounded-lg hover:bg-[#F8F0E6] transition"
            >
              <img src="/svg/fechar.svg" alt="" className="w-6 h-6" />
            </button>
          </div>

          {/* PRIMEIRA ETAPA: opções de gerenciamento */}
          {!confirmarRemocao && (
            <div className="flex flex-col gap-3">
              <p className="text-[#75634F]">
                Remover este tutor tira o acesso dele aos seus pets.
              </p>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={solicitarRemocao}
                  className="font-semibold text-[#B3261E] rounded-lg hover:underline"
                >
                  Remover tutor
                </button>

                <button
                  type="button"
                  onClick={fecharPainelGerenciar}
                  className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}

          {/* SEGUNDA ETAPA: confirmação da remoção */}
          {confirmarRemocao && (
            <div className="flex flex-col gap-3">
              <p className="font-semibold">
                Remover este tutor?
              </p>

              <p className="text-sm text-[#75634F]">
                Essa ação não pode ser desfeita!
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={cancelarRemocao}
                  className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition"
                >
                  Manter
                </button>

                <button
                  type="button"
                  onClick={removerTutor}
                  className="px-5 h-12 rounded-xl bg-[#B3261E] text-white font-semibold hover:brightness-110 transition"
                >
                  Sim, quero remover
                </button>
              </div>
            </div>
          )}

        </div>
      </dialog>
    </>
  )
}

export default OutrosTutores
