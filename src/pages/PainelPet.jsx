import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePets } from '../context/Pets'
import Sidebar from '../componentes/Sidebar'
import Header from '../componentes/Header'
import Card from "../componentes/CardPet";
import { CUIDADOS } from "../js/cuidados";

// nome do pet com botão de editar (usado no desktop e no mobile)
function NomePet({ pet, onSalvar, tituloClass, iconeSrc, iconeClass, botaoClass }) {
    const [editando, setEditando] = useState(false)
    const [valor, setValor] = useState(pet.nome)

    function abrir() {
        setValor(pet.nome)
        setEditando(true)
    }

    function salvar(event) {
        event.preventDefault()
        const novo = valor.trim()
        if (novo && novo !== pet.nome) onSalvar(novo)
        setEditando(false)
    }

    if (editando) {
        return (
            <form onSubmit={salvar} className="flex items-center gap-2">
                <input
                    autoFocus
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    onKeyDown={(e) => e.key === 'Escape' && setEditando(false)}
                    maxLength={30}
                    aria-label="Nome do pet"
                    className="w-40 rounded-lg border border-bege bg-white px-3 py-1 text-lg font-semibold outline-none focus:ring-2 focus:ring-laranja"
                />
                <button type="submit" aria-label="Salvar nome" className="rounded-lg px-2 py-1 font-semibold hover:bg-white/30">
                    ✓
                </button>
                <button type="button" onClick={() => setEditando(false)} aria-label="Cancelar" className="rounded-lg px-2 py-1 hover:bg-white/30">
                    ✕
                </button>
            </form>
        )
    }

    return (
        <>
            <h1 className={tituloClass}>{pet.nome}</h1>
            <button type="button" onClick={abrir} aria-label={`Editar nome de ${pet.nome}`} className={botaoClass}>
                <img src={iconeSrc} alt="" className={iconeClass} />
            </button>
        </>
    )
}

function PainelPet() {
    const { id } = useParams()
    const { pets, setPets } = usePets()
    const pet = pets.find((p) => p.id === Number(id))
    const navigate = useNavigate()
    const voltarPara = `/index`

    if (!pet) {
        return (
        <div className="p-8">
            <p>Pet não encontrado.</p>
            <Link to="/meus-pets" className="underline">Voltar para meus pets</Link>
        </div>
        )
    }

    function renomear(novoNome) {
        setPets((anteriores) =>
            anteriores.map((p) => (p.id === pet.id ? { ...p, nome: novoNome } : p))
        )
    }

    const cuidados = (CUIDADOS[pet.especie?.toLowerCase()] ?? [])
    .filter((c) => !c.soFemea || pet.genero?.toLowerCase() === 'fêmea')

    // pets cadastrados pelo formulário usam "foto"; os antigos usam "imagem"
    const imagemPet = pet.foto || pet.imagem

    return (
        <>
        <section className="hidden md:block">
            <div className="flex min-h-dvh">
                <Sidebar />

                {/* <!-- ÁREA PRINCIPAL --> */}
                <div className="flex-1 min-w-0 flex flex-col">

                    <Header voltarPara={voltarPara}/>

                    <main className="p-6 md:p-12">
    
                        {/* <!-- no desktop largo: cartão do pet na esquerda e cuidados na direita; abaixo disso, um sobre o outro --> */}
                        <div className="flex flex-col xl:flex-row items-stretch xl:items-start gap-8">

                            {/* <!-- IDENTIFICAÇÃO DO PET --> */}
                            <section aria-label="Identificação do pet"
                                className="flex flex-col items-center gap-6 w-full xl:w-[300px] xl:shrink-0 xl:min-h-[539px] px-8 py-8 rounded-[28px] bg-laranja text-center text-xl">

                                <div className="flex items-center justify-center w-[140px] h-[140px] shrink-0 overflow-hidden rounded-full bg-cabecalho border border-bege">
                                    <img
                                        src={imagemPet}
                                        alt=""
                                        className={pet.foto ? 'w-full h-full object-cover' : 'w-[70px] h-[70px]'}
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <NomePet
                                        pet={pet}
                                        onSalvar={renomear}
                                        tituloClass="text-3xl md:text-4xl font-semibold"
                                        iconeSrc="/svg/editar.svg"
                                        iconeClass="w-5 h-5"
                                        botaoClass="p-1 rounded-lg hover:bg-white/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-texto"
                                    />
                                </div>

                                <p className="leading-[145%]">{pet.especie} • {pet.genero}</p>
                                <p className="leading-[145%]">{pet.idade}</p>
                            </section>

                            {/* <!-- CUIDADOS --> */}
                            <div className="flex flex-col flex-1 min-w-0 gap-6 text-left">

                                <h2 className="text-[22px] font-semibold leading-[145%]">Próximos cuidados</h2>

                                <ul className="flex flex-col gap-5 p-7 pl-12 list-disc marker:text-laranja rounded-[20px] bg-superficie border border-bege text-base leading-[145%]">
                                    <li>Vacinação — hoje, 14h</li>
                                    <li>Limpar vasilha — hoje</li>
                                </ul>

                                <h2 className="text-[22px] font-semibold leading-[145%]">Cuidados</h2>

                                <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 text-base">

                                    {cuidados.map((c) => (
                                        <Card
                                        key={c.pagina}
                                        nome={c.nome}
                                        svg={c.svg}
                                        pagina={c.pagina}
                                        petId={pet.id}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </section>


        <section className="block md:hidden">
            <div className="w-full min-h-dvh relative bg-[#FFFCF8] rounded-3xl flex flex-col justify-start items-start overflow-hidden">

                <header className="self-stretch h-64 px-6 pt-6 pb-9 relative bg-[#FFF6EC] flex flex-col justify-start items-center gap-2.5 overflow-hidden">

                    <button type="button" 
                        onClick={() => navigate('/index')} 
                        aria-label="Voltar" className="left-6 top-6 absolute">
                        <img src="/svg/voltar.svg" alt="Voltar" className="size-5"/>
                    </button>

                    <figure className="size-20 mt-8 bg-[#FFF6EC] rounded-full border border-[#E9DDCF] flex justify-center items-center overflow-hidden">
                        <img
                            src={imagemPet}
                            alt={`Foto de ${pet.nome}`}
                            className={pet.foto ? 'w-full h-full object-cover' : 'w-12 object-contain'}
                        />
                    </figure>

                    <div className="inline-flex justify-center items-center gap-2">
                        <NomePet
                            pet={pet}
                            onSalvar={renomear}
                            tituloClass="text-[#382719] text-2xl font-semibold font-['Inter']"
                            iconeSrc="/svg/lapis.svg"
                            iconeClass="size-3.5"
                            botaoClass="flex size-6 items-center justify-center rounded-full"
                        />
                    </div>

                    <p className="self-stretch text-center text-[#75634F] text-sm font-normal font-['Inter'] leading-5">
                        {pet.especie} • {pet.genero}<br/>
                        {pet.idade}
                    </p>

                    <img src="/svg/curvaMobile.svg" alt="Curva de fundo" aria-hidden="true" className="absolute left-0 bottom-0 w-full h-12 object-fill"/>
                </header>

                <div className="self-stretch p-6 flex flex-col flex-1 justify-start items-start gap-6 overflow-hidden bg-[#FFFCF8]">

                    <div className="self-stretch flex flex-col justify-start items-start gap-3">

                        <h2 id="proximos-cuidados" className="self-stretch text-[#382719] text-lg font-semibold font-['Inter']">
                            Próximos cuidados
                        </h2>

                        <ul className="self-stretch p-4 bg-[#F8F0E6] rounded-2xl border border-[#E9DDCF] flex flex-col items-start gap-3">
                            <li className="self-stretch text-[#8F4B17] text-sm font-normal font-['Inter'] leading-5">
                                Vacinação — hoje, 14h
                            </li>

                            <li className="self-stretch text-[#8F4B17] text-sm font-normal font-['Inter'] leading-5">
                                Limpar vasilha — hoje
                            </li>
                        </ul>

                    </div>

                    <div className="self-stretch flex flex-col justify-start items-start gap-3">

                        <h2 id="cuidados" className="self-stretch text-[#8F4B17] text-lg font-semibold font-['Inter']">
                            Cuidados
                        </h2>

                        <nav aria-label="Categorias de cuidados" className="w-full">
                            <ul className="grid grid-cols-2 gap-3 w-full">
                                {cuidados.map((c) => (
                                <Card key={c.pagina} nome={c.nome} svg={c.svg} pagina={c.pagina} petId={pet.id} />
                                ))}
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        </section>
        </>
    )
}

export default PainelPet
