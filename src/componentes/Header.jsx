import { useLocation, useNavigate } from "react-router-dom";

export default function Header({ voltarPara = '/index' }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const inicio = pathname === "/index" || pathname === "/inicio";

  function voltar() {
    navigate(voltarPara);
  }

  return (
    <header className="flex flex-row justify-between items-center p-4 lg:p-5 md:px-12 border-b border-[#E9DDCF] transition font-semibold rounded-lg text-[#473C31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja">
      {inicio ? (
        <p>Início</p>
      ) : (
        <button
          type="button"
          onClick={voltar}
          className="flex gap-4 items-center text-lg font-semibold text-[#473C31] hover:text-laranja transition rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja"
        >
          <img
            className="w-5 h-5 lg:w-6 lg:h-6"
            alt=""
            src="/svg/voltar.svg"
          />
          <p>Voltar</p>
        </button>
      )}
    </header>
  );
}
