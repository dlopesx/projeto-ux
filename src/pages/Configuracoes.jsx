import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LayoutPagina from '../componentes/LayoutPagina'
import Interruptor from '../componentes/Interruptor'
import { NOME_APP, VERSAO_APP } from '../js/app'

// as preferências ficam salvas no navegador, para não voltarem ao padrão ao recarregar
const CHAVE_NOTIFICACOES = 'petcare:notificacoes'
const NOTIFICACOES_PADRAO = { consultas: true, vacinas: true }

function lerNotificacoes() {
    try {
        return { ...NOTIFICACOES_PADRAO, ...JSON.parse(localStorage.getItem(CHAVE_NOTIFICACOES)) }
    } catch {
        return NOTIFICACOES_PADRAO
    }
}

// título de seção + conteúdo
function Secao({ titulo, children }) {
    return (
        <section className="flex flex-col gap-3 md:gap-4">
            <h2 className="text-base font-semibold">{titulo}</h2>
            {children}
        </section>
    )
}

// círculo claro que fica atrás dos ícones
function IconeRedondo({ className = 'size-11 md:size-12', children }) {
    return (
        <div
            className={`flex shrink-0 items-center justify-center rounded-full bg-[#FFF6EC] ${className}`}
        >
            {children}
        </div>
    )
}

function LinhaNotificacao({ name, titulo, descricao, checked, onChange }) {
    return (
        <div className="flex items-center justify-between gap-4 border-t border-bege py-4">
            <div className="min-w-0">
                <p className="text-sm font-medium">{titulo}</p>
                <p className="mt-1 text-xs text-[#75634F]">{descricao}</p>
            </div>
            <Interruptor name={name} rotulo={titulo} checked={checked} onChange={onChange} />
        </div>
    )
}

function Configuracoes() {
    const [notificacoes, setNotificacoes] = useState(lerNotificacoes)

    useEffect(() => {
        localStorage.setItem(CHAVE_NOTIFICACOES, JSON.stringify(notificacoes))
    }, [notificacoes])

    // um handler para os dois interruptores (usa o atributo name)
    function alternar(event) {
        const { name, checked } = event.target
        setNotificacoes((anterior) => ({ ...anterior, [name]: checked }))
    }

    return (
        <LayoutPagina tituloMobile="Configurações">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-7 md:gap-9">
                <div>
                    <h1 className="hidden text-3xl font-semibold md:block">Configurações</h1>
                    <p className="text-sm text-[#75634F] md:mt-2 md:text-base">
                        Gerencie as preferências da sua conta e do aplicativo.
                    </p>
                </div>

                <Secao titulo="Conta">
                    <Link
                        to="/perfil"
                        className="group flex items-center justify-between gap-3 rounded-2xl border border-bege bg-superficie p-4 transition hover:bg-[#FFF6EC] hover:shadow-md md:gap-4 md:p-6"
                    >
                        <div className="flex min-w-0 items-center gap-3 md:gap-4">
                            <IconeRedondo>
                                <svg
                                    className="size-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20 21a8 8 0 0 0-16 0"
                                    />
                                    <circle cx="12" cy="7" r="4" strokeWidth="1.7" />
                                </svg>
                            </IconeRedondo>

                            <div className="min-w-0">
                                <h3 className="text-sm font-semibold md:text-base">Minha conta</h3>
                                <p className="mt-1 text-xs text-[#75634F] md:text-sm">
                                    Edite seus dados pessoais e informações do perfil.
                                </p>
                            </div>
                        </div>

                        <svg
                            className="size-5 shrink-0 text-[#75634F] transition group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9 18 6-6-6-6"
                            />
                        </svg>
                    </Link>
                </Secao>

                <Secao titulo="Preferências">
                    <div className="rounded-2xl border border-bege bg-superficie p-4 md:p-6">
                        <div className="mb-4 flex items-center gap-3 md:mb-5">
                            <IconeRedondo className="size-10">
                                <img src="/svg/notificacao.svg" alt="" className="size-5" />
                            </IconeRedondo>

                            <div>
                                <h3 className="text-sm font-semibold md:text-base">Notificações</h3>
                                <p className="text-xs text-[#75634F] md:text-sm">
                                    Escolha quais avisos deseja receber.
                                </p>
                            </div>
                        </div>

                        <LinhaNotificacao
                            name="consultas"
                            titulo="Consultas e agendamentos"
                            descricao="Receba lembretes sobre consultas dos seus pets."
                            checked={notificacoes.consultas}
                            onChange={alternar}
                        />
                        <LinhaNotificacao
                            name="vacinas"
                            titulo="Vacinas e cuidados"
                            descricao="Receba avisos sobre vacinas e cuidados importantes."
                            checked={notificacoes.vacinas}
                            onChange={alternar}
                        />
                    </div>
                </Secao>

                <Secao titulo="Informações">
                    <div className="flex items-center gap-3 rounded-2xl border border-bege bg-superficie p-4 md:gap-4 md:p-6">
                        <IconeRedondo>
                            <svg
                                className="size-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="12" r="9" strokeWidth="1.7" />
                                <path strokeWidth="1.7" strokeLinecap="round" d="M12 11v5m0-8h.01" />
                            </svg>
                        </IconeRedondo>

                        <div>
                            <h3 className="text-sm font-semibold md:text-base">Sobre o {NOME_APP}</h3>
                            <p className="mt-1 text-xs text-[#75634F] md:text-sm">
                                Acompanhe a saúde e o bem-estar dos seus pets em um só lugar.
                            </p>
                            <p className="mt-2 text-xs text-[#75634F]">Versão {VERSAO_APP}</p>
                        </div>
                    </div>
                </Secao>
            </div>
        </LayoutPagina>
    )
}

export default Configuracoes
