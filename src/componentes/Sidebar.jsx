import { Link, useLocation } from "react-router-dom";

    export default function Sidebar() {

        /*pega a rota atual pra destacar o menu ativo */
        const { pathname } = useLocation();
        const inicio = pathname === "/index" || pathname === "/inicio";
        const meusPets = pathname === "/meus-pets";
        const meusAgendamentos = pathname === "/meus-agendamentos";
        const meusAlertas = pathname === "/meus-alertas";
        const outrosTutores = pathname === "/outros-tutores";
        const configuracoes = pathname === "/configuracoes";
        const sobre = pathname === "/sobre";

        return (
            <aside
                className="bg-[#F8F0E6] p-3 flex flex-col shrink-0 w-60 min-h-dvh"
                aria-label="Sidebar"
                >
                <div className="flex flex-col flex-1 px-3 py-4">
                    <ul className="flex-1 space-y-2 font-medium">
                        <li className="flex">
                            <Link
                            to="/index"
                            className="flex flex-1 items-center px-2 py-3 rounded-2xl"
                            >
                            <span className="px-1 pb-6 text-xl font-bold">
                                Site nome
                            </span>
                            </Link>

                            <button type="button">
                            </button>
                        </li>

                        {/* PERFIL DO USUÁRIO */}
                        <li className="pb-3 mb-2 border-b border-[#E9DDCF]">
                            <Link
                            to="/perfil"
                            className="group flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-[#E9DDCF]"
                            >
                            <span className="w-10 h-10 shrink-0 rounded-full bg-[#E9DDCF] flex items-center justify-center font-semibold">
                                M
                            </span>

                            <span className="flex-1 min-w-0 font-semibold truncate">
                                Marina
                            </span>
                            </Link>
                        </li>

                        <li className={inicio ? "relative" : ""}>
                            {inicio && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]" />
                            )}
                            <Link
                            to="/index"
                            className={`flex items-center px-2 py-3 rounded-xl ${inicio ? "pl-6" : ""}`}
                            >
                            <img className="w-6 h-6" src="/svg/inicio.svg" alt="" />
                            <span className="flex-1 ms-3 whitespace-nowrap ">Início</span>
                            </Link>
                        </li>

                        <li className={meusPets ? "relative" : ""}>
                            {meusPets && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]" />
                            )}
                            <Link
                            to="/meus-pets"
                            className={`flex items-center px-2 py-3 rounded-xl ${meusPets ? "pl-6" : ""}`}
                            >
                            <img className="w-6 h-6" src="/svg/paw-print.svg" alt="" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Meus pets</span>
                            </Link>
                        </li>

                        <li className={meusAgendamentos ? "relative" : ""}>
                            {meusAgendamentos && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]" />
                            )}
                            <Link
                            to="/meus-agendamentos"
                            className={`flex items-center px-2 py-3 rounded-xl ${meusAgendamentos ? "pl-6" : ""}`}
                            >
                            <img className="w-6 h-6" src="/svg/calendario.svg" alt="" />
                            <span className="flex-1 ms-3 whitespace-nowrap">
                                Agendamentos
                            </span>
                            </Link>
                        </li>

                        <li className={meusAlertas ? "relative" : ""}>
                            {meusAlertas && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]" />
                            )}
                            <Link
                            to="/meus-alertas"
                            className={`flex items-center px-2 py-3 rounded-xl ${meusAlertas ? "pl-6" : ""}`}
                            >
                            <img className="w-6 h-6" src="/svg/notificacao.svg" alt="" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Alertas</span>
                            </Link>
                        </li>

                        <li className={outrosTutores ? "relative" : ""}>
                            {outrosTutores && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]" />
                            )}

                            <Link
                            to="/outros-tutores"
                            className={`flex items-center px-2 py-3 rounded-xl ${outrosTutores ? "pl-6" : ""}`}
                            aria-current="page"
                            >
                            <img className="w-6 h-6" src="/svg/tutores.svg" alt="" />
                            <span className="flex-1 ms-3 whitespace-nowrap">
                                Outros tutores
                            </span>
                            </Link>
                        </li>
                    </ul>

                    <ul className=" mt-auto space-y-2 py-5 border-t border-[#E9DDCF] ">
                        <li className={configuracoes ? "relative" : ""}>
                            {configuracoes && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]" />
                            )}
                            <Link to="/configuracoes" className={`flex items-center gap-2 px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] ${configuracoes ? "pl-6" : ""}`}>
                                Config. do app
                            </Link>
                        </li>
                        <li className={sobre ? "relative" : ""}>
                            {sobre && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]" />
                            )}
                            <Link to="/sobre" className={`flex items-center gap-2 px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] ${sobre ? "pl-6" : ""}`}>
                                <img src="/svg/info.svg" alt="Símbolo de informação em laranja" />
                                Sobre
                            </Link>
                        </li>
                    </ul>
                </div>
                </aside>
    );
}
