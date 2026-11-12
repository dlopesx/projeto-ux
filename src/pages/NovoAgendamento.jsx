import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// imports do calendário
import flatpickr from 'flatpickr'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import 'flatpickr/dist/flatpickr.min.css'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import CampoForm, { estiloCampo, SelectCampo } from '../componentes/CampoForm'
import AvisoSucesso from '../componentes/AvisoSucesso'

const FORM_INICIAL = {
    titulo: '',
    petId: '',
    data: '',
    hora: '',
    profissional: '',
    crm: '',
    clinica: '',
    endereco: '',
    descricao: '',
}


function NovoAgendamento() {
    const navigate = useNavigate()
    // Quando há um ID na rota, o formulário já abre com o pet escolhido.
    const { id } = useParams()
    const { pets, setConsultas } = usePets()

    const [form, setForm] = useState({ ...FORM_INICIAL, petId: id ?? '' })
    const [erroData, setErroData] = useState(false)
    const [adicionado, setAdicionado] = useState(false)
    const voltarPara = id ? `/pet/${id}/consultas` : '/index'

    const dataRef = useRef(null) // input escondido que o flatpickr usa
    const calendarioRef = useRef(null) // instância do calendário

    // cria o calendário uma vez e destrói ao sair da tela
    useEffect(() => {
        calendarioRef.current = flatpickr(dataRef.current, {
            locale: Portuguese,
            minDate: 'today',
            inline: true,
            dateFormat: 'Y-m-d', // mesmo formato das consultas do context
            onChange: (_selecionadas, dataTexto) => {
                setForm((anterior) => ({ ...anterior, data: dataTexto }))
                setErroData(false)
            },
        })

        return () => calendarioRef.current.destroy()
    }, [])

    // um único handler para todos os campos (usa o atributo name)
    function atualizar(event) {
        const { name, value } = event.target
        setForm((anterior) => ({ ...anterior, [name]: value }))
    }

    function adicionarAgendamento(event) {
        event.preventDefault()

        // o input do calendário fica escondido, então a validação da data é manual
        if (!form.data) {
            setErroData(true)
            return
        }

        // mesmo formato das consultas que já estão no context
        setConsultas((anteriores) => [
            ...anteriores,
            {
                id: anteriores.reduce((maior, c) => Math.max(maior, c.id), 0) + 1,
                petId: Number(form.petId),
                nomeConsulta: form.titulo.trim(),
                profissional: form.profissional.trim(),
                crm: form.crm.trim(),
                clinica: form.clinica.trim(),
                endereco: form.endereco.trim(),
                data: form.data,
                hora: form.hora,
                descricao: form.descricao.trim(),
                feito: false,
            },
        ])

        setForm({ ...FORM_INICIAL, petId: id ?? '' })
        calendarioRef.current.clear()
        setAdicionado(true)
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
                <header className="flex min-h-16 items-center gap-4 border-b border-bege px-6 py-4 md:hidden">
                    <button
                        type="button"
                        onClick={() => navigate(voltarPara)}
                        aria-label="Voltar"
                        className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-superficie"
                    >
                        <img src="/svg/voltar.svg" alt="" className="size-4" />
                    </button>
                    <h1 className="text-lg font-semibold">Adicionar consulta</h1>
                </header>

                <main className="flex w-full flex-col gap-6 px-5 py-6 sm:px-6 md:gap-9 md:px-8 lg:px-16">
                    <h1 className="hidden text-4xl font-semibold md:block">Adicionar consulta</h1>

                    <form
                        onSubmit={adicionarAgendamento}
                        className="flex w-full flex-col items-start gap-6 lg:flex-row lg:gap-16"
                    >
                        {/* COLUNA ESQUERDA: calendário + horário */}
                        <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[26rem]">
                            <section className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold md:text-xl">Selecione a data da consulta:</h2>

                                <div className="w-full overflow-x-auto">
                                    {/* o flatpickr desenha o calendário logo depois deste input */}
                                    <input
                                        ref={dataRef}
                                        name="data"
                                        type="text"
                                        className="hidden"
                                        aria-hidden="true"
                                        tabIndex={-1}
                                    />
                                </div>

                                {erroData && (
                                    <p role="alert" className="text-sm font-medium text-red-700">
                                        Selecione uma data no calendário.
                                    </p>
                                )}
                            </section>

                            <CampoForm id="hora" label="Horário">
                                <input
                                    id="hora"
                                    name="hora"
                                    type="time"
                                    required
                                    value={form.hora}
                                    onChange={atualizar}
                                    className={`${estiloCampo} h-12 md:h-14`}
                                />
                            </CampoForm>
                        </div>

                        {/* COLUNA DIREITA: dados do agendamento */}
                        <div className="flex w-full min-w-0 flex-1 flex-col gap-6 md:rounded-2xl md:border md:border-bege md:p-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-6">
                                <CampoForm id="titulo" label="Título do agendamento">
                                    <input
                                        id="titulo"
                                        name="titulo"
                                        type="text"
                                        required
                                        value={form.titulo}
                                        onChange={atualizar}
                                        placeholder="Ex: Consulta de rotina"
                                        className={`${estiloCampo} h-12 md:h-14`}
                                    />
                                </CampoForm>

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
                                        {pets.map((pet) => (
                                            <option key={pet.id} value={pet.id}>
                                                {pet.nome}
                                            </option>
                                        ))}
                                    </SelectCampo>
                                </CampoForm>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-6">
                                <CampoForm id="profissional" label="Profissional">
                                    <input
                                        id="profissional"
                                        name="profissional"
                                        type="text"
                                        value={form.profissional}
                                        onChange={atualizar}
                                        className={`${estiloCampo} h-12 md:h-14`}
                                    />
                                </CampoForm>

                                <CampoForm id="crm" label="CRM (opcional)">
                                    <input
                                        id="crm"
                                        name="crm"
                                        type="text"
                                        value={form.crm}
                                        onChange={atualizar}
                                        className={`${estiloCampo} h-12 md:h-14`}
                                    />
                                </CampoForm>
                            </div>

                            <CampoForm id="clinica" label="Estabelecimento (opcional)">
                                <input
                                    id="clinica"
                                    name="clinica"
                                    type="text"
                                    value={form.clinica}
                                    onChange={atualizar}
                                    className={`${estiloCampo} h-12 md:h-14`}
                                />
                            </CampoForm>

                            <CampoForm id="endereco" label="Endereço (opcional)">
                                <input
                                    id="endereco"
                                    name="endereco"
                                    type="text"
                                    value={form.endereco}
                                    onChange={atualizar}
                                    className={`${estiloCampo} h-12 md:h-14`}
                                />
                            </CampoForm>

                            <CampoForm id="descricao" label="Observações / motivo">
                                <textarea
                                    id="descricao"
                                    name="descricao"
                                    value={form.descricao}
                                    onChange={atualizar}
                                    className={`${estiloCampo} min-h-28 resize-y py-4`}
                                />
                            </CampoForm>

                            <button
                                type="submit"
                                className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-laranja font-semibold transition hover:bg-[#E8863A] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja focus-visible:ring-offset-2 md:w-40"
                            >
                                <img src="/svg/adicionar.svg" alt="" className="size-5" />
                                Adicionar
                            </button>
                        </div>
                    </form>
                </main>
            </div>

            {adicionado && (
                <AvisoSucesso
                    mensagem="Agendamento adicionado com sucesso."
                    onFechar={() => setAdicionado(false)}
                />
            )}
        </div>
    )
}

export default NovoAgendamento
