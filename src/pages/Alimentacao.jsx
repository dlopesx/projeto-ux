import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import RotinaAlimentacao from '../componentes/RotinaAlimentacao'

function Alimentacao() {

    const { id } = useParams()
    const { pets, alimentacao, setAlimentacao } = usePets()
    const [editandoFavoritos, setEditandoFavoritos] = useState(false)

    const pet = pets.find((p) => p.id === Number(id))
    const registro = alimentacao.find((a) => a.petId === Number(id))

    if (!pet) return <p>Pet não encontrado.</p>
    if (!registro) return <p>Esse pet ainda não tem alimentação cadastrada.</p>

    function salvarPreferidos(novaLista) {
        setAlimentacao(
            alimentacao.map((a) =>
                a.petId === pet.id ? { ...a, preferidos: novaLista } : a
            )
        )
    }

    function removerPreferido(nome) {
        salvarPreferidos(registro.preferidos.filter((p) => p !== nome))
    }

    function adicionarPreferido() {
        const novo = prompt('Novo alimento favorito:')
        if (novo) {
            salvarPreferidos([...registro.preferidos, novo])
        }
    }

    return (
        // TROCADO: era <section className="hidden md:block"> + <div className="flex">
        // agora é um único div, para a página aparecer no celular também
        <div className="flex min-h-dvh">
            <Sidebar />

            <div className="flex-1 min-w-0 flex flex-col">
                <Header />

                {/* TROCADO: main agora é flex-col com gap, para caber o título */}
                <main className="flex flex-col gap-8 md:gap-10 p-6 md:p-12">

                    {/* TROCADO: título novo */}
                    <h1 className="text-3xl md:text-4xl font-semibold">
                        Alimentação de {pet.nome}
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-9">

                        {/* ROTINA */}
                        <section className="order-2 md:order-1 flex-1 min-w-0">
                            <div className="flex flex-col gap-10 md:gap-16 rounded-3xl border border-[#E9DDCF] bg-[#F8F0E6] p-6 md:p-8">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-2xl font-semibold text-[#120111]">Rotina alimentar</h2>
                                    <button type="button" aria-label="Editar rotina">
                                        <img src="/svg/edit.svg" alt="" className="w-5 h-5 md:w-auto md:h-auto" />
                                    </button>
                                </div>
                                {/* TROCADO: era rotina={rotina} */}
                                <RotinaAlimentacao rotina={registro.rotina} />
                            </div>
                        </section>

                        {/* ALIMENTOS PREFERIDOS */}
                        <section className="order-1 md:order-2 w-full md:w-[32.75rem] md:shrink-0">
                            <div className="flex flex-col gap-6 rounded-3xl border border-[#E9DDCF] p-6 md:p-8">
                                <div className="flex justify-between items-start">
                                    <h2 className="font-semibold text-xl text-[#120111]">Alimentos preferidos</h2>
                                    <button
                                        type="button"
                                        onClick={() => setEditandoFavoritos(!editandoFavoritos)}
                                        aria-label={editandoFavoritos ? 'Fechar edição' : 'Editar alimentos preferidos'}
                                    >
                                        <img
                                            src={editandoFavoritos ? '/svg/fechar.svg' : '/svg/edit.svg'}
                                            alt=""
                                            className="w-5 h-5 md:w-auto md:h-auto"
                                        />
                                    </button>
                                </div>

                                <ol className="flex flex-wrap gap-3 md:gap-4 min-h-16 md:min-h-24">
                                    {/* TROCADO: era preferidos.map */}
                                    {registro.preferidos.map((p) =>
                                        editandoFavoritos ? (
                                            <li key={p}>
                                                <span className="inline-flex items-center bg-[#FEF3E8] border border-[#F29A4B] text-[#120111] text-md font-semibold ps-4 pe-2 py-2 rounded-full gap-2">
                                                    {p}
                                                    <button
                                                        type="button"
                                                        onClick={() => removerPreferido(p)}
                                                        aria-label={`Remover ${p}`}
                                                        className="inline-flex items-center p-0.5 rounded-full hover:bg-[#F29A4B]/20"
                                                    >
                                                        <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </li>
                                        ) : (
                                            <li key={p} className="px-4 py-2 text-md font-semibold rounded-full border border-[#F29A4B]">
                                                {p}
                                            </li>
                                        )
                                    )}

                                    {editandoFavoritos && (
                                        <li>
                                            <button
                                                type="button"
                                                onClick={adicionarPreferido}
                                                aria-label="Adicionar alimento favorito"
                                                className="inline-flex items-center p-0.5 rounded-full hover:bg-[#F29A4B]/20"
                                            >
                                                <img src="/svg/Adicionar2.svg" alt="" />
                                            </button>
                                        </li>
                                    )}
                                </ol>
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </div>
        // TROCADO: o final tinha </div></section>; agora só um </div> fecha o "flex min-h-dvh"
    )
}

export default Alimentacao