import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

// moldura das páginas de conteúdo (Configurações, Sobre...):
// desktop: sidebar + Header | mobile: header com seta de voltar e o título
// o conteúdo (e o max-width dele) fica por conta de cada página
export default function LayoutPagina({ tituloMobile, children }) {
    return (
        <div className="flex min-h-dvh bg-fundo font-sans text-texto">
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="hidden md:block">
                    <Header />
                </div>

                {/* header mobile */}
                <header className="flex h-14 shrink-0 items-center gap-4 border-b border-bege px-6 md:hidden">
                    <Link
                        to="/"
                        aria-label="Voltar para o início"
                        className="flex size-6 shrink-0 items-center justify-center"
                    >
                        <img src="/svg/voltar.svg" alt="" className="size-5 object-contain" />
                    </Link>
                    <h1 className="text-lg font-semibold">{tituloMobile}</h1>
                </header>

                <main className="w-full flex-1 px-4 py-6 sm:px-8 md:py-10 lg:px-16">{children}</main>
            </div>
        </div>
    )
}
