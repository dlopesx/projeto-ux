import { useEffect, useRef } from 'react'

// some sozinho depois de `duracao` ms (5 segundos, como nos html originais)
export default function AvisoSucesso({ mensagem, onFechar, duracao = 5000 }) {
    // guarda a versão mais recente do onFechar sem reiniciar o timer a cada render
    const fecharRef = useRef(onFechar)
    useEffect(() => {
        fecharRef.current = onFechar
    })

    useEffect(() => {
        const timer = setTimeout(() => fecharRef.current(), duracao)
        return () => clearTimeout(timer)
    }, [mensagem, duracao])

    return (
        <div
            role="status"
            className="fixed bottom-4 left-4 right-4 z-50 flex items-center gap-3 rounded-xl border border-bege bg-[#E8863A] p-4 text-texto shadow-lg md:bottom-auto md:left-auto md:right-10 md:top-24 md:w-[340px]"
        >
            <span
                className="flex size-7 shrink-0 items-center justify-center rounded-md border border-texto"
                aria-hidden="true"
            >
                ✓
            </span>

            <p className="flex-1 text-sm font-medium md:text-base">{mensagem}</p>

            <button
                type="button"
                onClick={onFechar}
                aria-label="Fechar mensagem"
                className="flex size-8 items-center justify-center rounded text-lg hover:bg-black/10"
            >
                ✕
            </button>
        </div>
    )
}
