import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'

// 1. CardTutor movido para FORA do componente principal (Boas práticas do React)
function CardTutor({ tutor, mobile = false, onGerenciar }) {
  return (
    <li
      className={`tutor flex items-center ${
        mobile ? 'gap-4 p-4' : 'gap-5 p-5 px-7'
      } rounded-2xl bg-[#F8F0E6] hover:shadow-md transition`}
    >
      <span
        className={`shrink-0 rounded-full bg-[#E9DDCF] flex items-center justify-center font-semibold ${
          mobile ? 'w-12 h-12 text-xl' : 'w-14 h-14 text-xl'
        }`}
        aria-hidden="true"
      >
        {tutor.inicial}
      </span>

      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-[#2B1A0E] truncate ${mobile ? 'text-lg' : 'text-2xl'}`}>
          {tutor.nome}
        </p>
        <p className={`font-semibold text-[#75634F] ${mobile ? 'text-sm' : 'text-md'}`}>
          {tutor.pets}
        </p>
      </div>

      {!tutor.proprio && (
        <button
          type="button"
          onClick={() => onGerenciar(tutor)}
          className={`flex items-center gap-2 text-[#75634F] hover:font-semibold transition ${
            mobile ? 'self-start p-2 rounded-lg hover:bg-[#E9DDCF]' : ''
          }`}
          aria-label={`Gerenciar ${tutor.nome}`}
        >
          <img className="w-5 h-5" src="/svg/editar.svg" alt="" />
          {!mobile && <span className="text-xl">Gerenciar</span>}
        </button>
      )}
    </li>
  )
}

function OutrosTutores() {
  const [tutores, setTutores] = useState([
    { id: 1, nome: 'Marina (você)', inicial: 'M', pets: 'Pets: Tina, Fiu', proprio: true },
    { id: 2, nome: 'Juliana', inicial: 'J', pets: 'Pets em comum: Tina', proprio: false },
    { id: 3, nome: 'Roberto', inicial: 'R', pets: 'Pets em comum: Fiu', proprio: false },
  ])

  const [busca, setBusca] = useState('')
  const [tutorSelecionado, setTutorSelecionado] = useState(null)
  const [confirmarRemocao, setConfirmarRemocao] = useState(false)
  const [avisoConvite, setAvisoConvite] = useState(false)

  const painelConvidarRef = useRef(null)
  const painelGerenciarRef = useRef(null)
  const formConvidarRef = useRef(null)

  const tutoresFiltrados = tutores.filter((tutor) =>
    tutor.nome.toLowerCase().includes(busca.trim().toLowerCase())
  )

  function abrirPainelConvidar() {
    formConvidarRef.current?.reset()
    painelConvidarRef.current?.showModal()
  }

  function fecharPainelConvidar() {
    painelConvidarRef.current?.close()
  }

  function enviarConvite(event) {
    event.preventDefault()
    fecharPainelConvidar()
    setAvisoConvite(true)
  }

  useEffect(() => {
    if (!avisoConvite) return
    const timer = setTimeout(() => {
      setAvisoConvite(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [avisoConvite])

  function abrirPainelGerenciar(tutor) {
    setTutorSelecionado(tutor)
    setConfirmarRemocao(false)
    painelGerenciarRef.current?.showModal()
  }

  function fecharPainelGerenciar() {
    painelGerenciarRef.current?.close()
    setTutorSelecionado(null)
    setConfirmarRemocao(false)
  }

  function removerTutor() {
    if (!tutorSelecionado) return
    setTutores((listaAtual) =>
      listaAtual.filter((tutor) => tutor.id !== tutorSelecionado.id)
    )
    fecharPainelGerenciar()
  }

  return (
    <>
      {/* DESKTOP */}
      <section className="hidden md:block min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="bg-[#FFFBF6] flex flex-col self-stretch flex-1">
            <Header />

            <main className="flex w-full py-6 px-4 sm:px-8 lg:px-16 flex-col items-start self-stretch">
              <div className="flex flex-col self-stretch gap-[2.25rem] w-full max-w-[800px]">
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl font-semibold">Outros tutores</h1>
                  <button
                    type="button"
                    onClick={abrirPainelConvidar}
                    className="flex items-center px-5 py-3 gap-4 rounded-2xl font-semibold border border-[#9c9c9c] hover:shadow-md transition"
                  >
                    <img className="w-5 h-5" src="/svg/adicionar.svg" alt="" />
                    Convidar um tutor
                  </button>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="busca-tutor" className="sr-only">Buscar tutor</label>
                  <input
                    id="busca-tutor"
                    type="search"
                    placeholder="Buscar tutor por nome"
                    className="w-full h-12 px-4 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl outline-none transition focus:ring-2 focus:ring-[#F29A4B]"
                    value={busca}
                    onChange={(event) => setBusca(event.target.value)}
                  />
                </div>

                <ul className="flex flex-col gap-4 p-6 w-full bg-[#E9DDCF] rounded-2xl">
                  {tutoresFiltrados.map((tutor) => (
                    <CardTutor key={tutor.id} tutor={tutor} onGerenciar={abrirPainelGerenciar} />
                  ))}
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
          <Link to="/index" className="flex items-center gap-3">
            <img src="/svg/voltar.svg" alt="" className="w-6 h-6" />
            <span className="text-lg font-semibold text-[#75634F]">Voltar</span>
          </Link>
        </header>

        <main className="px-5 py-6 flex flex-col gap-6">
          <h1 className="text-2xl font-semibold text-[#120111]">Outros tutores</h1>

          <button
            type="button"
            onClick={abrirPainelConvidar}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl border border-[#9c9c9c] font-semibold text-[#2B1A0E] hover:shadow-md transition"
          >
            <img src="/svg/adicionar.svg" alt="" className="w-5 h-5" />
            Convidar um tutor
          </button>

          <div className="w-full">
            <label htmlFor="busca-tutor-mobile" className="sr-only">Buscar tutor</label>
            <input
              id="busca-tutor-mobile"
              type="search"
              placeholder="Buscar tutor por nome"
              className="w-full h-12 px-4 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl outline-none transition focus:ring-2 focus:ring-[#F29A4B]"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
          </div>

          <ul className="flex flex-col gap-4 p-4 bg-[#E9DDCF] rounded-2xl">
            {tutoresFiltrados.map((tutor) => (
              <CardTutor key={tutor.id} tutor={tutor} mobile onGerenciar={abrirPainelGerenciar} />
            ))}
            {tutoresFiltrados.length === 0 && (
              <li className="p-5 text-center text-[#75634F] font-semibold">
                Nenhum tutor encontrado.
              </li>
            )}
          </ul>
        </main>
      </section>

      {/* AVISO TOAST */}
      {avisoConvite && (
        <div role="status" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[380px] max-w-[90vw] flex items-center gap-3 p-5 bg-[#E8863A] rounded-3xl shadow-2xl border border-[#E9DDCF]">
          <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 bg-white/40 rounded-full">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
            </svg>
          </div>
          <div className="ms-3 text-xl font-normal text-white">Convite enviado com sucesso</div>
        </div>
      )}

      {/* MODAL CONVIDAR */}
      <dialog
        ref={painelConvidarRef}
        className="m-auto p-0 w-[92vw] max-w-[28rem] max-h-[90vh] overflow-hidden rounded-3xl bg-[#FFFBF6] text-[#2B1A0E] border border-[#E9DDCF] shadow-2xl backdrop:bg-black/40 open:flex flex-col"
      >
        <div className="flex items-center justify-between gap-4 h-[88px] shrink-0 px-6 border-b border-[#E9DDCF]">
          <h2 className="text-2xl font-semibold">Convidar tutor</h2>
          <button type="button" onClick={fecharPainelConvidar} className="p-2 rounded-lg hover:bg-[#F8F0E6] transition">
            <img src="/svg/fechar.svg" alt="" className="w-6 h-6" />
          </button>
        </div>

        <form ref={formConvidarRef} onSubmit={enviarConvite} className="flex flex-1 min-h-0 flex-col">
          <div className="flex-1 overflow-y-auto flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="convite-email" className="font-semibold">E-mail do tutor</label>
              <input
                id="convite-email"
                name="email"
                type="email"
                required
                autoComplete="off"
                placeholder="nome@email.com"
                className="w-full h-12 px-4 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl outline-none transition focus:ring-2 focus:ring-[#F29A4B]"
              />
            </div>

            <fieldset className="flex flex-col gap-3 border-0 p-0 m-0 min-w-0">
              <legend className="font-semibold mb-3">Quais pets ele pode ver?</legend>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="pets" value="tina" className="w-5 h-5 accent-[#F29A4B]" /> Tina
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="pets" value="fiu" className="w-5 h-5 accent-[#F29A4B]" /> Fiu
              </label>
            </fieldset>
          </div>

          <div className="shrink-0 p-6 border-t border-[#E9DDCF] flex justify-end gap-3">
            <button type="button" onClick={fecharPainelConvidar} className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition">
              Cancelar
            </button>
            <button type="submit" className="px-6 h-12 rounded-xl bg-[#F29A4B] text-white font-semibold hover:bg-[#E8863A] transition">
              Enviar convite
            </button>
          </div>
        </form>
      </dialog>

      {/* MODAL GERENCIAR */}
      <dialog
        ref={painelGerenciarRef}
        className="m-auto p-0 w-[92vw] max-w-[24rem] overflow-hidden rounded-3xl bg-[#FFFBF6] text-[#2B1A0E] border border-[#E9DDCF] shadow-2xl backdrop:bg-black/40"
      >
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">{tutorSelecionado?.nome || 'Gerenciar tutor'}</h2>
            <button type="button" onClick={fecharPainelGerenciar} className="p-2 rounded-lg hover:bg-[#F8F0E6] transition">
              <img src="/svg/fechar.svg" alt="" className="w-6 h-6" />
            </button>
          </div>

          {!confirmarRemocao ? (
            <div className="flex flex-col gap-3">
              <p className="text-[#75634F]">Remover este tutor tira o acesso dele aos seus pets.</p>
              <div className="flex items-center justify-between gap-3">
                <button type="button" onClick={() => setConfirmarRemocao(true)} className="font-semibold text-[#B3261E] rounded-lg hover:underline">
                  Remover tutor
                </button>
                <button type="button" onClick={fecharPainelGerenciar} className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition">
                  Fechar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Remover este tutor?</p>
              <p className="text-sm text-[#75634F]">Essa ação não pode ser desfeita!</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setConfirmarRemocao(false)} className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition">
                  Manter
                </button>
                <button type="button" onClick={removerTutor} className="px-5 h-12 rounded-xl bg-[#B3261E] text-white font-semibold hover:brightness-110 transition">
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
