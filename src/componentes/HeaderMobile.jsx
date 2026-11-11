import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const inicio = pathname === "/";

    return(
        <header className="flex min-h-16 items-center gap-4 border-b border-[#E9DDCF] bg-white px-6 py-4 md:hidden">
            <button
                type="button"
                onClick={() => navigate(voltarPara)}
                className="flex items-center gap-3"
            >
                <img src="/svg/voltar.svg" alt="" className="h-6 w-6" />
                <span className="text-lg font-semibold text-[#75634F]">Voltar</span>
            </button>
        </header>
        
    )
}
