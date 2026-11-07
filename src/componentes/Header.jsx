import { Link, useLocation, useNavigate } from "react-router-dom";

    export default function Header() {

        const navigate = useNavigate();
        const { pathname } = useLocation();
        const inicio = pathname === "/";

        return(
            <header className="flex flex-row justify-between items-center p-4 lg:p-5 border-b border-[#E9DDCF]
             transition rounded-lg focus-visible:outline-none
               focus-visible:ring-2 focus-visible:ring-laranja">
                {inicio ? (
                    <p> Início </p>
                ) : (
                <button type="button" onClick={() => navigate(-1)} className="flex gap-4 items-center">
                    <img
                    className="w-5 h-5 lg:w-6 lg:h-6"
                    alt="Botao voltar"
                    src="/svg/voltar.svg"
                    />
                    <p>Voltar</p>
                </button>
                )
                }   
            </header>
        )
    }