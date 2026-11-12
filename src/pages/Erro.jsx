import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Erro() {
  const [detalhes, setDetalhes] = useState(false)
  const navigate = useNavigate()
  return <main className="flex min-h-dvh w-full flex-col bg-[#FFFBF6] px-8 pb-8 pt-28 text-[#8F4B17] md:mx-auto md:min-h-[520px] md:max-w-2xl md:justify-center md:px-16"><section className="flex-1"><h1 className="mb-4 text-2xl font-semibold text-[#D64545]">Ops!</h1><p className="text-xl leading-7">Tivemos um problema no nosso sistema. Tente novamente mais tarde.</p><button type="button" aria-expanded={detalhes} onClick={() => setDetalhes(value => !value)} className="mt-5 text-base text-[#75634F]">{detalhes ? '↓ Ocultar detalhes' : '→ Ver detalhes'}</button>{detalhes && <p className="mt-3 text-sm leading-5">O sistema encontrou um erro inesperado. Tente novamente mais tarde. Se o problema persistir, entre em contato com o suporte.</p>}</section><footer className="pt-3"><button type="button" onClick={() => navigate('/index')} className="h-12 w-full rounded-xl border border-[#E9DDCF] bg-[#F29A4B] font-semibold text-[#2B1A0E]">Ir para o menu</button></footer></main>
}
