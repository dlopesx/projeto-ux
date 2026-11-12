import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePets } from '../context/Pets'
import LayoutFormulario from '../componentes/LayoutFormulario'
import CampoForm, { estiloCampo } from '../componentes/CampoForm'
import SelectPet from '../componentes/SelectPet'
import CheckboxDestaque from '../componentes/CheckboxDestaque'
import AvisoSucesso from '../componentes/AvisoSucesso'
import { montarMedicamento } from '../js/medicamentos'

const FORM_INICIAL = {
    petId: '',
    nome: '',
    dosagem: '',
    frequencia: '',
    horario: '',
    inicio: '',
    termino: '',
    usoContinuo: false,
}

function NovoMedicamento() {
    // existe só quando a rota é /pet/:id/adicionar-medicamento (pet já escolhido)
    const { id } = useParams()
    const { pets, setMedicamentos } = usePets()

    const [form, setForm] = useState({ ...FORM_INICIAL, petId: id ?? '' })
    const [adicionado, setAdicionado] = useState(false)

    const pet = pets.find((p) => p.id === Number(form.petId))

    // um único handler para todos os campos (usa o atributo name)
    function atualizar(event) {
        const { name, value, type, checked } = event.target
        setForm((anterior) => ({
            ...anterior,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    // marcar "uso contínuo" apaga a data de término, porque ela deixa de valer
    function alternarUsoContinuo(event) {
        const marcado = event.target.checked
        setForm((anterior) => ({
            ...anterior,
            usoContinuo: marcado,
            termino: marcado ? '' : anterior.termino,
        }))
    }

    function adicionarMedicamento(event) {
        event.preventDefault()

        setMedicamentos((anteriores) => [
            ...anteriores,
            {
                id: anteriores.reduce((maior, m) => Math.max(maior, m.id), 0) + 1,
                petId: Number(form.petId),
                ...montarMedicamento(form),
            },
        ])

        // mantém o pet escolhido e limpa o resto
        setForm({ ...FORM_INICIAL, petId: form.petId })
        setAdicionado(true)
    }

    return (
        <LayoutFormulario
            titulo="Adicionar medicamento"
            tituloMobile={`Adicionar medicamento${pet ? ` — ${pet.nome}` : ''}`}
            voltarPara={id ? `/pet/${id}/medicamentos` : '/index'}
        >
            <form
                onSubmit={adicionarMedicamento}
                className="flex w-full flex-col gap-6 md:max-w-[500px] md:gap-8 md:rounded-2xl md:border md:border-bege md:p-6"
            >
                <div className="grid grid-cols-1 gap-5">
                    <SelectPet pets={pets} value={form.petId} onChange={atualizar} />

                    <CampoForm id="nome" label="Nome do medicamento">
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            required
                            value={form.nome}
                            onChange={atualizar}
                            placeholder="Nome do medicamento"
                            className={`${estiloCampo} h-12 md:h-14`}
                        />
                    </CampoForm>

                    <CampoForm id="dosagem" label="Dosagem">
                        <input
                            id="dosagem"
                            name="dosagem"
                            type="text"
                            required
                            value={form.dosagem}
                            onChange={atualizar}
                            placeholder="Ex.: 5 ml ou 1 comprimido"
                            className={`${estiloCampo} h-12 md:h-14`}
                        />
                    </CampoForm>

                    <CampoForm id="frequencia" label="Frequência">
                        <input
                            id="frequencia"
                            name="frequencia"
                            type="text"
                            required
                            value={form.frequencia}
                            onChange={atualizar}
                            placeholder="Ex.: A cada 8 horas"
                            className={`${estiloCampo} h-12 md:h-14`}
                        />
                    </CampoForm>

                    {/* campo novo: a página Medicamentos usa o horário para escolher a coluna (Manhã/Tarde/Noite) */}
                    <CampoForm id="horario" label="Horário da dose">
                        <input
                            id="horario"
                            name="horario"
                            type="time"
                            required
                            value={form.horario}
                            onChange={atualizar}
                            className={`${estiloCampo} h-12 md:h-14`}
                        />
                    </CampoForm>

                    <CampoForm id="inicio" label="Data de início">
                        <input
                            id="inicio"
                            name="inicio"
                            type="date"
                            required
                            value={form.inicio}
                            onChange={atualizar}
                            className={`${estiloCampo} h-12 md:h-14`}
                        />
                    </CampoForm>

                    <CampoForm id="termino" label="Data de término">
                        <input
                            id="termino"
                            name="termino"
                            type="date"
                            required={!form.usoContinuo}
                            disabled={form.usoContinuo}
                            min={form.inicio || undefined}
                            value={form.termino}
                            onChange={atualizar}
                            className={`${estiloCampo} h-12 md:h-14 disabled:cursor-not-allowed disabled:opacity-50`}
                        />
                    </CampoForm>
                </div>

                <CheckboxDestaque
                    id="usoContinuo"
                    name="usoContinuo"
                    checked={form.usoContinuo}
                    onChange={alternarUsoContinuo}
                >
                    Uso contínuo
                </CheckboxDestaque>

                <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-laranja font-semibold transition hover:bg-[#E8863A] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja focus-visible:ring-offset-2 md:w-40"
                >
                    <img src="/svg/adicionar.svg" alt="" className="size-5" />
                    Adicionar
                </button>
            </form>

            {adicionado && (
                <AvisoSucesso
                    mensagem="Medicamento adicionado com sucesso!"
                    onFechar={() => setAdicionado(false)}
                />
            )}
        </LayoutFormulario>
    )
}

export default NovoMedicamento
