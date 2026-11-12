import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import HeaderMobile from '../componentes/HeaderMobile'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePets } from '../context/usePets'
import AvisoSucesso from '../componentes/AvisoSucesso'

const FORM_INICIAL = {
  petId: '',
  data: '',
  peso: '',
  unidadePeso: 'g',
}

export default function AdicionarPeso() {
  const campoClass =
    "w-full h-12 px-4 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl outline-none transition focus:ring-2 focus:ring-[#F29A4B]"
  const navigate = useNavigate()
  const { id } = useParams()
  const { pets } = usePets()

  const [form, setForm] = useState({ ...FORM_INICIAL, petId: id ?? '' })
  const [aviso, setAviso] = useState(false)

  const pet = pets.find((p) => p.id === Number(form.petId))
  const hoje = new Date().toISOString().slice(0, 10)
  const voltarPara = `/pet/${form.petId}/peso`

  // aviso some sozinho depois de 5 segundos
  useEffect(() => {
    if (!aviso) return
    const timer = setTimeout(() => setAviso(false), 5000)
    return () => clearTimeout(timer)
  }, [aviso])

  // um único handler para todos os campos (usa o atributo name)
  function atualizar(event) {
    const { name, value } = event.target
    setForm((anterior) => ({ ...anterior, [name]: value }))
  }

  function salvar(event) {
    event.preventDefault()

    // mantém o pet escolhido e limpa o resto
    setForm({ ...FORM_INICIAL, petId: form.petId })
    setAviso(true)
  }

  return (
    <div className="flex min-h-dvh bg-[#FFFBF6]">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="hidden md:block">
          <Header voltarPara={voltarPara} />
        </div>

        <div className="md:hidden">
          <HeaderMobile voltarPara={voltarPara} titulo="Voltar" />
        </div>

        <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-5 sm:p-6 md:px-8 md:py-10">
          <h1 className="text-2xl font-semibold text-[#120111] md:text-4xl">
            Registrar Peso{pet ? ` - ${pet.nome}` : ''}
          </h1>

          <form
            onSubmit={salvar}
            className="flex flex-col gap-6 rounded-3xl border-2 border-[#E9DDCF] bg-white p-6 shadow-sm md:p-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="data" className="font-medium text-[#2B1A0E]">
                Data da pesagem
              </label>
              <input
                id="data"
                name="data"
                type="date"
                required
                max={hoje}
                value={form.data}
                onChange={atualizar}
                className={campoClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="peso" className="font-medium text-[#2B1A0E]">
                Peso
              </label>
              <div className="relative">
                <input
                  id="peso"
                  name="peso"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Ex: 100"
                  required
                  value={form.peso}
                  onChange={atualizar}
                  className={`${campoClass} pr-24`}
                />
                <select
                  name="unidadePeso"
                  value={form.unidadePeso}
                  onChange={atualizar}
                  aria-label="Unidade do peso"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent font-semibold text-[#75634F] outline-none"
                >
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col-reverse gap-3 border-t border-[#E9DDCF] pt-6 md:flex-row md:justify-end">
              <button
                type="button"
                onClick={() => navigate(voltarPara)}
                className="flex h-12 w-full items-center justify-center rounded-xl border border-[#E9DDCF] font-semibold transition hover:bg-[#F8F0E6] md:w-auto md:px-6"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#F29A4B] font-semibold text-[#2B1A0E] shadow-md transition hover:bg-[#E8863A] md:w-auto md:px-8"
              >
                Salvar Peso
              </button>
            </div>
          </form>
        </main>
      </div>

      {aviso && (
        <AvisoSucesso
          mensagem="Peso adicionado com sucesso."
          onFechar={() => setAviso(false)}
        />
      )}
    </div>
  )
}
