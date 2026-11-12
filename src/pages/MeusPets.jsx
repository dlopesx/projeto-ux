
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import { usePets } from '../context/Pets'

function MeusPets() {
  const painelRef = useRef(null)

 const { pets, setPets } = usePets()

  const [petSelecionado, setPetSelecionado] = useState('')
  const [confirmarExclusao, setConfirmarExclusao] = useState(false)

  function abrirPainel() {
    setPetSelecionado(pets[0]?.id.toString() || '')
    setConfirmarExclusao(false)
    painelRef.current?.showModal()
  }

  function fecharPainel() {
    painelRef.current?.close()
    setConfirmarExclusao(false)
    setPetSelecionado('')
  }

  function solicitarExclusao() {
    if (!petSelecionado) return
    setConfirmarExclusao(true)
  }

  function excluirPet() {
    setPets((anteriores) =>
      anteriores.filter((pet) => pet.id.toString() !== petSelecionado)
    )

    fecharPainel()
  }

  return (
    <div className="flex min-h-dvh bg-[#FFFBF6] text-[#2B1A0E]">

      {/* SIDEBAR */}
      <div className="hidden md:flex"><Sidebar /></div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="bg-[#FFFBF6] flex flex-col self-stretch flex-1 min-w-0">

        {/* HEADER */}
        <Header />

        {/* MAIN */}
        <main className="flex w-full py-6 px-4 sm:px-8 lg:px-16 flex-col items-start">

          <div className="flex flex-col self-stretch gap-8">

            {/* TÍTULO E AÇÕES DESKTOP */}
            <div className="hidden lg:flex justify-between items-center gap-4">

              <h1 className="text-4xl font-semibold">
                Meus pets
              </h1>

              <div className="flex gap-4">

                <button
                  type="button"
                  onClick={abrirPainel}
                  disabled={pets.length === 0}
                  aria-label="Remover pet"
                  className="rounded-full p-3 border-2 border-[#A42525] hover:shadow-md transition hover:bg-[#E6B8B880] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <img src="/svg/trash.svg" alt="" />
                </button>

                <Link
                  to="/novo-pet"
                  className="flex items-center px-5 py-3 gap-4 rounded-2xl font-semibold border border-[#E9DDCF] hover:shadow-md transition"
                >
                  <img
                    className="w-5 h-5"
                    src="/svg/adicionar.svg"
                    alt=""
                  />
                  Adicionar um novo pet
                </Link>

              </div>
            </div>

            {/* TÍTULO E AÇÕES MOBILE */}
            <div className="lg:hidden flex flex-col gap-4">

              <h1 className="text-3xl font-semibold">
                Meus pets
              </h1>

              <div className="flex items-center gap-3">

                <Link
                  to="/novo-pet"
                  className="flex flex-1 items-center justify-center px-4 py-3 gap-3 rounded-2xl font-semibold border border-[#E9DDCF] hover:bg-[#F8F0E6] transition"
                >
                  <img
                    className="w-5 h-5"
                    src="/svg/adicionar.svg"
                    alt=""
                  />
                  Adicionar pet
                </Link>

                <button
                  type="button"
                  onClick={abrirPainel}
                  disabled={pets.length === 0}
                  aria-label="Remover pet"
                  className="shrink-0 rounded-full p-3 border-2 border-[#A42525] hover:bg-[#E6B8B880] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <img
                    className="w-6 h-6"
                    src="/svg/trash.svg"
                    alt=""
                  />
                </button>

              </div>
            </div>

            {/* CARDS DOS PETS */}
            <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-6 sm:gap-8 w-full">

              {pets.map((pet) => (
                <li key={pet.id} className="w-full sm:w-[300px]">

                  <Link
                    to={`/pet/${pet.id}`}
                    aria-label={`Ver ${pet.nome}`}
                    className="block w-full sm:w-[300px] overflow-hidden rounded-2xl border-2 border-[#2B1A0E] bg-[#F8F0E6] shadow-md transition duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F29A4B]/50"
                  >

                    {/* FOTO */}
                    <div className="flex h-48 items-center justify-center border-b-2 border-[#2B1A0E] bg-[#E9DDCF]">

                      <img
                        className="w-16 h-16 opacity-70 object-cover"
                        src={pet.imagem}
                        alt={`Símbolo de ${pet.especie.toLowerCase()}`}
                      />

                    </div>

                    {/* INFORMAÇÕES */}
                    <div className="p-5">

                      <h2 className="text-2xl font-bold text-[#2B1A0E] leading-tight">
                        {pet.nome}
                      </h2>

                      <p className="font-semibold text-[#75634F]">
                        {pet.especie} · {pet.raca}
                      </p>

                    </div>

                  </Link>

                </li>
              ))}

              {/* CARD ADICIONAR PET */}
              <li className="w-full sm:w-[300px]">

                <Link
                  to="/novo-pet"
                  aria-label="Adicionar um novo pet"
                  className="group flex min-h-[200px] sm:min-h-[290px] w-full sm:w-[300px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[#9c9c9c] bg-[#F8F0E6] text-[#75634F] transition duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:border-[#F29A4B] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F29A4B]/50"
                >

                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E9DDCF] group-hover:bg-[#F29A4B] transition">
                    <img
                      className="w-6 h-6"
                      src="/svg/adicionar.svg"
                      alt=""
                    />
                  </span>

                  <span className="font-semibold">
                    Adicionar um novo pet
                  </span>

                </Link>

              </li>

            </ul>

          </div>
        </main>
      </div>

      {/* PAINEL DE EXCLUIR PET */}
      <dialog
        ref={painelRef}
        className="m-auto p-0 w-[92vw] max-w-[40rem] max-h-[90dvh] overflow-hidden rounded-3xl bg-[#FFFBF6] text-[#2B1A0E] border border-[#E9DDCF] shadow-2xl backdrop:bg-black/40 open:flex flex-col"
        aria-label="Excluir pet"
      >

        {/* CABEÇALHO DO PAINEL */}
        <div className="flex items-center justify-between gap-4 h-[88px] shrink-0 px-6 border-b border-[#E9DDCF]">

          <h2 className="text-2xl font-semibold">
            Excluir pet
          </h2>

          <button
            type="button"
            onClick={fecharPainel}
            aria-label="Fechar painel"
            className="p-2 rounded-lg hover:bg-[#F8F0E6] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F29A4B]"
          >
            <img
              src="/svg/fechar.svg"
              alt=""
              className="w-6 h-6"
            />
          </button>

        </div>

        {/* CONTEÚDO */}
        <div className="flex flex-1 min-h-0 flex-col">

          <div className="flex-1 overflow-y-auto flex flex-col gap-6 p-6">

            <div className="flex flex-col gap-2">

              <label htmlFor="edit-pet">
                Qual pet deseja remover?
              </label>

              <div className="relative">

                <select
                  id="edit-pet"
                  name="pet"
                  required
                  value={petSelecionado}
                  onChange={(event) => setPetSelecionado(event.target.value)}
                  className="w-full h-12 px-4 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl outline-none transition focus:ring-2 focus:ring-[#F29A4B] appearance-none pr-12 cursor-pointer"
                >

                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.nome}
                    </option>
                  ))}

                </select>

                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F29A4B] pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>

              </div>
            </div>

          </div>

          {/* RODAPÉ */}
          <div className="shrink-0 p-4 sm:p-6 border-t border-[#E9DDCF]">

            {!confirmarExclusao ? (

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">

                <button
                  type="button"
                  onClick={fecharPainel}
                  className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F29A4B]"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={solicitarExclusao}
                  disabled={!petSelecionado}
                  className="px-6 h-12 text-white rounded-xl bg-[#B3261E] font-bold hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B3261E]"
                >
                  Deletar pet
                </button>

              </div>

            ) : (

              <div className="flex flex-col gap-3">

                <p className="font-semibold">
                  Tem certeza que quer excluir esse pet?
                </p>

                <p className="text-sm text-[#75634F]">
                  Essa ação não pode ser desfeita.
                </p>

                <div className="flex flex-col-reverse sm:flex-row gap-3">

                  <button
                    type="button"
                    onClick={() => setConfirmarExclusao(false)}
                    className="px-5 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F29A4B]"
                  >
                    Manter
                  </button>

                  <button
                    type="button"
                    onClick={excluirPet}
                    className="px-5 h-12 rounded-xl bg-[#B3261E] text-white font-semibold hover:brightness-110 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B3261E]"
                  >
                    Sim, excluir
                  </button>

                </div>

              </div>

            )}

          </div>
        </div>
      </dialog>

    </div>
  )
}

export default MeusPets
