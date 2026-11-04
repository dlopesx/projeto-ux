    function Sidebar() {

        /*pega a rota atual pra destacar o menu ativo */
        const { pathname } = useLocation();
        const inicio = pathname === "/";
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
                            to="/"
                            className="flex flex-1 items-center px-2 py-3 rounded-2xl"
                            >
                            <span className="px-1 pb-6 text-xl font-bold">
                                Site nome
                            </span>
                            </Link>

                            <button type="button">
                            <img
                                className="w-6 h-6 mb-6"
                                src="/svg/fechar.svg"
                                alt="Fechar menu lateral"
                            />
                            </button>
                        </li>

                        {/* PERFIL DO USUÁRIO */}
                        <li className="pb-3 mb-2 border-b border-[#E9DDCF]">
                            <a
                            href="#"
                            className="group flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-[#E9DDCF]"
                            >
                            <span className="w-10 h-10 shrink-0 rounded-full bg-[#E9DDCF] flex items-center justify-center font-semibold">
                                M
                            </span>

                            <span className="flex-1 min-w-0 font-semibold truncate">
                                Marina
                            </span>
                            </a>
                        </li>

                        <li>
                            {inicio && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]" />
                            )}
                            <Link
                            to="/"
                            className={`flex items-center px-2 py-3 rounded-xl ${inicio ? "pl-6" : ""}`}
                            >
                            <img className="w-6 h-6" src="/svg/inicio.svg" alt="" />
                            <span className="flex-1 ms-3 whitespace-nowrap ">Início</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                            to="/meus-pets"
                            className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group"
                            >
                            <img className="w-6 h-6" src="/svg/paw-print.svg" alt="" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Meus pets</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                            to="/meus-agendamentos"
                            className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group"
                            >
                            <img className="w-6 h-6" src="/svg/calendario.svg" alt="" />
                            <span className="flex-1 ms-3 whitespace-nowrap">
                                Agendamentos
                            </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                            to="/meus-alertas"
                            className="flex items-center px-2 py-3 rounded-2xl hover:bg-[#E9DDCF] group"
                            >
                            <img className="w-6 h-6" src="/svg/notificacao.svg" alt="" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Alertas</span>
                            </Link>
                        </li>

                        <li className="relative">
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 rounded-r bg-[#F29A4B]" />

                            <Link
                            to="/outros-tutores"
                            className="flex items-center px-2 py-3 pl-6 rounded-2xl hover:bg-[#E9DDCF] group"
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
                        <li>
                            <Link to="/configuracoes" className="flex items-center gap-2 px-2 py-3 rounded-2xl hover:bg-[#E9DDCF]">
                                Config. do app
                            </Link>
                        </li>
                        <li>
                            <Link to="/sobre" className="flex items-center gap-2 px-2 py-3 rounded-2xl hover:bg-[#E9DDCF]">
                                <img src="/svg/info.svg" alt="Símbolo de informação em laranja" />
                                Sobre
                            </Link>
                        </li>
                    </ul>
                </div>
                </aside>
    );
}