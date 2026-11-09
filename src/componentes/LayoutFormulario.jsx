import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

// moldura das telas de formulário: sidebar + header no desktop, header com voltar no mobile
// uso: <LayoutFormulario titulo="Adicionar vacina">...formulário...</LayoutFormulario>
export default function LayoutFormulario({ titulo, tituloMobile = titulo, children }) {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-dvh bg-fundo text-texto">
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="hidden md:block">
                    <Header />
                </div>

                {/* header mobile */}
                <header className="flex min-h-16 items-center gap-4 border-b border-bege px-5 py-4 md:hidden">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        aria-label="Voltar"
                        className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-superficie"
                    >
                        <img src="/svg/voltar.svg" alt="" className="size-4" />
                    </button>
                    <h1 className="text-lg font-semibold">{tituloMobile}</h1>
                </header>

                <main className="flex w-full flex-col gap-6 px-5 py-6 sm:px-6 md:gap-9 md:px-8 lg:px-16">
                    <h1 className="hidden text-4xl font-semibold md:block">{titulo}</h1>
                    {children}
                </main>
            </div>
        </div>
    )
}
