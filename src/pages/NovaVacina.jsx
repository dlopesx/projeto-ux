import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import CampoForm, { estiloCampo, SelectCampo } from '../componentes/CampoForm'
import AvisoSucesso from '../componentes/AvisoSucesso'
import { VACINAS_SUGERIDAS, hojeISO, montarVacina } from '../js/vacinas'

const FORM_INICIAL = {
    petId: '',
    nome: '',
    data: '',
    naoTomou: false,
}

function NovaVacina() {
    const navigate = useNavigate()
    // existe só quando a rota é /pet/:id/adicionar-vacina (pet já escolhido)
    const { id } = useParams()
    const { pets, vacinas, setVacinas } = usePets()

    const [form, setForm] = useState({ ...FORM_INICIAL, petId: id ?? '' })
    // null = sem aviso | 'adicionada' | 'atualizada'
    const [aviso, setAviso] = useState(null)
    const voltarPara = id ? `/pet/${id}/vacinas` : '/index'

    const pet = pets.find((p) => p.id === Number(form.petId))
    const sugestoes = pet ? (VACINAS_SUGERIDAS[pet.especie] ?? []) : []

    // some sozinho depois de 5 segundos, como no html original
    useEffect(() => {
        if (!aviso) return
        const timer = setTimeout(() => setAviso(null), 5000)
        return () => clearTimeout(timer)
    }, [aviso])

    // um único handler para todos os campos (usa o atributo name)
    function atualizar(event) {
        const { name, value, type, checked } = event.target
        setForm((anterior) => ({
            ...anterior,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    // marcar "ainda não tomou" apaga a data, porque ela deixa de valer
    function alternarNaoTomou(event) {
        const marcada = event.target.checked
        setForm((anterior) => ({
            ...anterior,
            naoTomou: marcada,
            data: marcada ? '' : anterior.data,
        }))
    }

    function adicionarVacina(event) {
        event.preventDefault()

        const campos = montarVacina(form)
        const petId = Number(form.petId)

        // se o pet já tem essa vacina, atualiza em vez de duplicar
        const existente = vacinas.find(
            (v) => v.petId === petId && v.nome.toLowerCase() === campos.nome.toLowerCase()
        )

        if (existente) {
            setVacinas((anteriores) =>
                anteriores.map((v) => (v === existente ? { ...v, ...campos } : v))
            )
        } else {
            setVacinas((anteriores) => [
                ...anteriores,
                {
                    id: anteriores.reduce((maior, v) => Math.max(maior, v.id), 0) + 1,
                    petId,
                    ...campos,
                },
            ])
        }

        // mantém o pet escolhido e limpa o resto
        setForm({ ...FORM_INICIAL, petId: form.petId })
        setAviso(existente ? 'atualizada' : 'adicionada')
    }

    return (
        <div className="flex min-h-dvh bg-fundo text-texto">
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="hidden md:block">
                    <Header voltarPara={voltarPara} />
                </div>

                {/* header mobile */}
                <header className="flex min-h-16 items-center gap-4 border-b border-bege px-5 py-4 md:hidden">
                    <button
                        type="button"
                        onClick={() => navigate(voltarPara)}
                        aria-label="Voltar"
                        className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-superficie"
                    >
                        <img src="/svg/voltar.svg" alt="" className="size-4" />
                    </button>
                    <h1 className="text-lg font-semibold">
                        Adicionar vacina{pet ? ` — ${pet.nome}` : ''}
                    </h1>
                </header>

                <main className="flex w-full flex-col gap-6 px-5 py-6 sm:px-6 md:gap-9 md:px-8 lg:px-16">
                    <h1 className="hidden text-4xl font-semibold md:block">Adicionar vacina</h1>

                    <form
                        onSubmit={adicionarVacina}
                        className="flex w-full flex-col gap-6 md:max-w-[500px] md:gap-8 md:rounded-2xl md:border md:border-bege md:p-6"
                    >
                        <div className="grid grid-cols-1 gap-5">
                            <CampoForm id="petId" label="Para qual pet?">
                                <SelectCampo
                                    id="petId"
                                    name="petId"
                                    required
                                    value={form.petId}
                                    onChange={atualizar}
                                >
                                    <option value="" disabled>
                                        Selecione o pet
                                    </option>
                                    {pets.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.nome}
                                        </option>
                                    ))}
                                </SelectCampo>
                            </CampoForm>

                            <CampoForm id="nome" label="Selecione o nome da vacina">
                                <input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    required
                                    list="vacinas-sugeridas"
                                    value={form.nome}
                                    onChange={atualizar}
                                    placeholder="Nome da vacina"
                                    autoComplete="off"
                                    className={`${estiloCampo} h-12 md:h-14`}
                                />
                                {/* sugestões de acordo com a espécie do pet escolhido */}
                                <datalist id="vacinas-sugeridas">
                                    {sugestoes.map((nome) => (
                                        <option key={nome} value={nome} />
                                    ))}
                                </datalist>
                            </CampoForm>

                            <CampoForm id="data" label="Data da última dose">
                                <input
                                    id="data"
                                    name="data"
                                    type="date"
                                    required={!form.naoTomou}
                                    disabled={form.naoTomou}
                                    max={hojeISO()}
                                    value={form.data}
                                    onChange={atualizar}
                                    className={`${estiloCampo} h-12 md:h-14 disabled:cursor-not-allowed disabled:opacity-50`}
                                />
                            </CampoForm>
                        </div>

                        <label
                            htmlFor="naoTomou"
                            className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl border border-bege bg-[#FEEA8F] px-5 font-semibold transition hover:bg-[#FEEA1F] hover:shadow-md"
                        >
                            <input
                                id="naoTomou"
                                name="naoTomou"
                                type="checkbox"
                                checked={form.naoTomou}
                                onChange={alternarNaoTomou}
                                className="size-4 accent-laranja"
                            />
                            Ainda não tomou a primeira dose
                        </label>

                        <button
                            type="submit"
                            className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-laranja font-semibold transition hover:bg-[#E8863A] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja focus-visible:ring-offset-2 md:w-40"
                        >
                            <img src="/svg/adicionar.svg" alt="" className="size-5" />
                            Adicionar
                        </button>
                    </form>
                </main>
            </div>

            {aviso && (
                <AvisoSucesso
                    mensagem={
                        aviso === 'atualizada'
                            ? 'Vacina atualizada com sucesso.'
                            : 'Vacina adicionada com sucesso.'
                    }
                    onFechar={() => setAviso(null)}
                />
            )}
        </div>
    )
}

export default NovaVacina
