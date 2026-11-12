import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'

const etapas = ['Nome e espécie', 'Raça', 'Nascimento', 'Informações adicionais', 'Foto']
const especies = ['Cachorro', 'Gato', 'Ave', 'Peixe', 'Roedor', 'Réptil', 'Outro']
const sexos = ['Fêmea', 'Macho']

const campo = 'w-full h-12 px-4 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl outline-none focus:ring-2 focus:ring-[#F29A4B] disabled:opacity-50'
const titulo = 'text-2xl md:text-4xl font-semibold'

export default function NovoPet() {
  const navigate = useNavigate()
  const { pets, setPets } = usePets()

  const [passo, setPasso] = useState(1)
  const [erro, setErro] = useState('')
  const [novoId, setNovoId] = useState(null)

  const [nome, setNome] = useState('')
  const [especie, setEspecie] = useState('')
  const [sexo, setSexo] = useState('')
  const [raca, setRaca] = useState('')
  const [semRaca, setSemRaca] = useState(false)
  const [nascimento, setNascimento] = useState('')
  const [semData, setSemData] = useState(false)
  const [cor, setCor] = useState('')
  const [peso, setPeso] = useState('')
  const [adotado, setAdotado] = useState('')
  const [castrado, setCastrado] = useState('')
  const [foto, setFoto] = useState('')

  const hoje = new Date().toISOString().slice(0, 10)

  function escolherFoto(e) {
    const arquivo = e.target.files[0]
    if (!arquivo) return
    const leitor = new FileReader()
    leitor.onload = () => setFoto(leitor.result)
    leitor.readAsDataURL(arquivo)
  }

  function validar() {
    if (passo === 1 && (!nome.trim() || !especie || !sexo)) {
      return 'Preencha o nome e escolha a espécie e o sexo.'
    }
    if (passo === 2 && !raca.trim() && !semRaca) {
      return 'Informe a raça ou marque que não sabe.'
    }
    if (passo === 3 && !nascimento && !semData) {
      return 'Informe a data ou marque que não sabe.'
    }
    return ''
  }

  // só deixa voltar para etapas anteriores
  function irParaEtapa(n) {
    if (n >= passo) return
    setErro('')
    setPasso(n)
  }

  function voltar() {
    if (passo === 1) navigate('/index')
    else irParaEtapa(passo - 1)
  }

  function enviar(e) {
    e.preventDefault()

    const mensagem = validar()
    if (mensagem) {
      setErro(mensagem)
      return
    }
    setErro('')

    if (passo < 5) {
      setPasso(passo + 1)
      return
    }

    // última etapa: salva o pet
    const id = pets.reduce((maior, p) => Math.max(maior, p.id), 0) + 1
    setPets([
      ...pets,
      {
        id,
        nome: nome.trim(),
        especie,
        genero: sexo,
        raca: semRaca ? 'Não sei' : raca.trim(),
        nascimento: semData ? 'Não sei' : nascimento,
        cor,
        peso,
        adotado,
        castrado,
        foto,
      },
    ])
    setNovoId(id)
  }

  if (novoId) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#FFFBF6] p-6">
        <div className="flex w-full max-w-md flex-col gap-6 rounded-3xl border border-[#E9DDCF] bg-[#F8F0E6] p-8">
          <h1 className="text-2xl font-semibold">Pet cadastrado!</h1>
          <p>Veja o perfil de {nome} ♡</p>
          <Link
            to={`/pet/${novoId}`}
            className="flex h-12 items-center justify-center rounded-xl bg-[#F29A4B] font-semibold hover:bg-[#E8863A]"
          >
            Ir para o pet
          </Link>
          <Link to="/index" className="text-center text-sm hover:underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh bg-[#FFFBF6]">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="hidden md:block">
          <Header voltarPara="/index" />
        </div>

        <header className="flex h-16 items-center gap-4 border-b border-[#E9DDCF] px-5 md:hidden">
          <button type="button" onClick={voltar} aria-label="Voltar">
            <img src="/svg/voltar.svg" alt="" className="size-4" />
          </button>
          <p className="text-lg font-semibold text-[#75634F]">Novo pet</p>
        </header>

        {/* mobile: barra de progresso, etapas feitas são clicáveis */}
        <div className="flex gap-1.5 px-6 pt-5 md:hidden">
          {etapas.map((texto, i) => (
            <button
              key={texto}
              type="button"
              onClick={() => irParaEtapa(i + 1)}
              disabled={i + 1 >= passo}
              aria-label={`Voltar para ${texto}`}
              className={`h-2 flex-1 rounded-full ${
                i + 1 <= passo ? 'bg-[#75634F]' : 'bg-[#E9DDCF]'
              }`}
            />
          ))}
        </div>

        <main className="flex w-full max-w-5xl flex-col gap-6 p-6 md:flex-row md:gap-12 md:px-16 md:py-8">
          <div className="flex flex-col gap-4 md:w-60 md:gap-6">
            <p className="font-semibold">NOVO PET</p>
            <p className="text-sm text-[#75634F] md:hidden">
              Passo {passo} de 5: {etapas[passo - 1]}
            </p>

            <ol className="hidden flex-col gap-6 md:flex">
              {etapas.map((texto, i) => (
                <li key={texto}>
                  <button
                    type="button"
                    onClick={() => irParaEtapa(i + 1)}
                    disabled={i + 1 >= passo}
                    className="flex items-center gap-4 text-left enabled:cursor-pointer enabled:hover:underline"
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border border-[#E9DDCF] ${
                        i + 1 <= passo ? 'bg-[#F29A4B]' : 'bg-[#F8F0E6]'
                      }`}
                    >
                      {i + 1}
                    </span>
                    {texto}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <form
            onSubmit={enviar}
            className="flex flex-1 flex-col gap-8 md:rounded-3xl md:border md:border-[#E9DDCF] md:p-9"
          >
            {passo === 1 && (
              <>
                <h1 className={titulo}>Qual o nome do pet?</h1>
                <input
                  type="text"
                  placeholder="Nome do pet"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={campo}
                />

                <div>
                  <p className="mb-3 font-semibold">Espécie:</p>
                  <div className="flex flex-wrap gap-2">
                    {especies.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setEspecie(item)}
                        className={`rounded-full border px-4 py-2 text-sm ${
                          especie === item
                            ? 'border-[#F29A4B] bg-[#F29A4B]'
                            : 'border-[#E9DDCF] bg-[#F8F0E6]'
                        }`}
                      >
                        {item === 'Ave' ? 'Pássaro' : item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 font-semibold">Sexo:</p>
                  <div className="flex gap-2">
                    {sexos.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSexo(item)}
                        className={`rounded-full border px-4 py-2 text-sm ${
                          sexo === item
                            ? 'border-[#F29A4B] bg-[#F29A4B]'
                            : 'border-[#E9DDCF] bg-[#F8F0E6]'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {passo === 2 && (
              <>
                <h1 className={titulo}>Qual a raça do pet?</h1>
                <input
                  type="text"
                  placeholder="Digite a raça"
                  value={raca}
                  disabled={semRaca}
                  onChange={(e) => setRaca(e.target.value)}
                  className={campo}
                />
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={semRaca}
                    onChange={(e) => {
                      setSemRaca(e.target.checked)
                      setRaca('')
                    }}
                    className="size-5 accent-[#F29A4B]"
                  />
                  Não sei a raça
                </label>
              </>
            )}

            {passo === 3 && (
              <>
                <h1 className={titulo}>Qual a data de nascimento?</h1>
                <input
                  type="date"
                  max={hoje}
                  value={nascimento}
                  disabled={semData}
                  onChange={(e) => setNascimento(e.target.value)}
                  className={campo}
                />
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={semData}
                    onChange={(e) => {
                      setSemData(e.target.checked)
                      setNascimento('')
                    }}
                    className="size-5 accent-[#F29A4B]"
                  />
                  Não sei a data
                </label>
              </>
            )}

            {passo === 4 && (
              <>
                <h1 className={titulo}>Quase lá!</h1>

                <div className="flex flex-col gap-2">
                  <label htmlFor="cor">Cor</label>
                  <input
                    id="cor"
                    type="text"
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                    className={campo}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="peso">Peso (kg)</label>
                  <input
                    id="peso"
                    type="number"
                    min="0"
                    step="0.1"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    className={campo}
                  />
                </div>

                <div>
                  <p className="mb-2">O pet é adotado?</p>
                  <label className="mr-8">
                    <input type="radio" name="adotado" checked={adotado === 'sim'} onChange={() => setAdotado('sim')} className="mr-2 accent-[#F29A4B]" />
                    Sim
                  </label>
                  <label>
                    <input type="radio" name="adotado" checked={adotado === 'nao'} onChange={() => setAdotado('nao')} className="mr-2 accent-[#F29A4B]" />
                    Não
                  </label>
                </div>

                <div>
                  <p className="mb-2">O pet é castrado?</p>
                  <label className="mr-8">
                    <input type="radio" name="castrado" checked={castrado === 'sim'} onChange={() => setCastrado('sim')} className="mr-2 accent-[#F29A4B]" />
                    Sim
                  </label>
                  <label>
                    <input type="radio" name="castrado" checked={castrado === 'nao'} onChange={() => setCastrado('nao')} className="mr-2 accent-[#F29A4B]" />
                    Não
                  </label>
                </div>
              </>
            )}

            {passo === 5 && (
              <>
                <h1 className={titulo}>Que tal uma foto?</h1>

                <div className="mx-auto flex size-36 items-center justify-center overflow-hidden rounded-full border border-[#E9DDCF] bg-[#F8F0E6]">
                  {foto ? (
                    <img src={foto} alt="Foto do pet" className="size-full object-cover" />
                  ) : (
                    <img src="/svg/paw-print.svg" alt="" className="w-12 opacity-70" />
                  )}
                </div>

                <input type="file" accept="image/*" onChange={escolherFoto} />
              </>
            )}

            {erro && <p className="text-sm text-red-700">{erro}</p>}

            <button
              type="submit"
              className="h-12 rounded-xl bg-[#F29A4B] px-8 font-semibold hover:bg-[#E8863A] md:w-48"
            >
              {passo < 5 ? 'Avançar' : 'Concluir'}
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}
