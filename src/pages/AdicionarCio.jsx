import { useState } from 'react'
import { useNavigate, useParams  } from 'react-router-dom'
import { usePets } from '../context/usePets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'

const FORM_INICIAL = {
  petId: '',
  dataInicio: '',
  dataFim: '',
  naoAcabou: false,
}

export default function AdicionarCio() {
  const campoClass = "w-full h-12 px-4 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl outline-none transition focus:ring-2 focus:ring-[#F29A4B]";
  const navigate = useNavigate()
  const { id } = useParams()
  const { pets } = usePets()
  const [form, setForm] = useState({ ...FORM_INICIAL, petId: id ?? '' })
  const pet = pets.find((p) => p.id === Number(form.petId))

  // um único handler para todos os campos (usa o atributo name)
  function atualizar(event) {
    const { name, value, type, checked } = event.target
    setForm((anterior) => ({
      ...anterior,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // marcar "ainda não terminou" apaga a data do fim, porque ela deixa de valer
  function alternarNaoAcabou(event) {
    const marcada = event.target.checked
    setForm((anterior) => ({
      ...anterior,
      naoAcabou: marcada,
      dataFim: marcada ? '' : anterior.dataFim,
    }))
  }

  function salvar(event) {
    event.preventDefault()
    // aqui entra a lógica de salvar
    navigate(`/pet/${form.petId}/cio`)
  }

  const hoje = new Date().toISOString().slice(0, 10)

  const checkboxNaoAcabou = (
    <label
      htmlFor="naoAcabou"
      className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl border border-[#E9DDCF] bg-[#FEEA8F] px-5 font-semibold transition hover:bg-[#FEEA1F] hover:shadow-md"
    >
      <input
        id="naoAcabou"
        name="naoAcabou"
        type="checkbox"
        checked={form.naoAcabou}
        onChange={alternarNaoAcabou}
        className="size-4 accent-[#F29A4B]"
      />
      Ainda não terminou
    </label>
  )

  return (
    <div className="bg-[#FFFBF6] min-h-screen">
      {/* DESKTOP */}
      <section className="hidden md:flex w-full md:flex-col lg:flex-row min-h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header voltarPara={`/pet/${id}/cio`} />

          <main className="w-full max-w-xl mx-auto py-10 px-8 flex flex-col gap-6 flex-1">
            <h1 className="text-2xl md:text-2xl font-semibold text-[#120111]">
              Registro de cio - {pet.nome}
            </h1>

            <form
              onSubmit={salvar}
              className="flex flex-col gap-6 p-8 border-2 border-[#E9DDCF] rounded-3xl bg-white shadow-sm"
            >
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="dataInicio" className="font-semibold text-lg text-[#2B1A0E]">
                    Data de início
                  </label>
                  <input
                    id="dataInicio"
                    name="dataInicio"
                    type="date"
                    required
                    max={hoje}
                    value={form.dataInicio}
                    onChange={atualizar}
                    className={campoClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="dataFim" className="font-semibold text-lg text-[#2B1A0E]">
                    Data do fim
                  </label>
                  <input
                    id="dataFim"
                    name="dataFim"
                    type="date"
                    required={!form.naoAcabou}
                    disabled={form.naoAcabou}
                    min={form.dataInicio}
                    max={hoje}
                    value={form.dataFim}
                    onChange={atualizar}
                    className={campoClass}
                  />
                </div>

                {checkboxNaoAcabou}
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-[#E9DDCF]">
                <button
                  type="button"
                  onClick={() => navigate(`/pet/${form.petId}/cio`)}
                  className="flex items-center justify-center px-6 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-8 h-12 rounded-xl bg-[#F29A4B] text-white font-semibold hover:bg-[#E8863A] transition shadow-md"
                >
                  Salvar Registro
                </button>
              </div>
            </form>
          </main>
        </div>
      </section>

      {/* MOBILE */}
      <section className="flex md:hidden flex-col w-full min-h-screen">
        <header className="flex min-h-16 items-center gap-4 border-b border-[#E9DDCF] px-5 py-4">
          <button type="button" onClick={() => navigate(`/pet/${id}/cio`)} aria-label="Voltar" className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-[#F8F0E6]">
            <img src="/svg/voltar.svg" alt="" className="size-5" />
          </button>
          <h1 className="text-lg font-semibold">Adicionar registro (cio)</h1>
        </header>
        <main className="w-full p-5 sm:p-6 flex flex-col gap-6 flex-1">
          <h1 className="text-2xl font-semibold text-[#120111]">Adicionar Registro (Cio)</h1>

          <form
            onSubmit={salvar}
            className="flex flex-col gap-6 p-6 border-2 border-[#E9DDCF] rounded-3xl bg-white shadow-sm"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="dataInicioM" className="font-semibold">
                  Data de início
                </label>
                <input
                  id="dataInicioM"
                  name="dataInicio"
                  type="date"
                  required
                  max={hoje}
                  value={form.dataInicio}
                  onChange={atualizar}
                  className={campoClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="dataFimM" className="font-semibold">
                  Data do fim
                </label>
                <input
                  id="dataFimM"
                  name="dataFim"
                  type="date"
                  required={!form.naoAcabou}
                  disabled={form.naoAcabou}
                  min={form.dataInicio}
                  max={hoje}
                  value={form.dataFim}
                  onChange={atualizar}
                  className={campoClass}
                />
              </div>

              {checkboxNaoAcabou}
            </div>

            <div className="flex flex-col-reverse gap-3 mt-4 pt-6 border-t border-[#E9DDCF]">
              <button
                type="button"
                onClick={() => navigate(`/pet/${form.petId}/cio`)}
                className="flex items-center justify-center w-full h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#F29A4B] text-white font-semibold hover:bg-[#E8863A] transition shadow-md"
              >
                Salvar Registro
              </button>
            </div>
          </form>
        </main>
      </section>
    </div>
  )
}
