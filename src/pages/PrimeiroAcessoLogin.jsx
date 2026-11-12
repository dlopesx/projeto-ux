import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Input = ({ children, className = '' }) => <div className={`flex h-12 md:h-14 w-full items-center gap-3 rounded-xl border border-[#51443B] bg-[#F8F0E6] md:bg-[#FFFBF6] px-4 ${className}`}>{children}</div>

export default function PrimeiroAcessoLogin() {
  const [tela, setTela] = useState('abertura')
  const [senhaVisivel, setSenhaVisivel] = useState(false)
  const navigate = useNavigate()
  useEffect(() => { const timer = setTimeout(() => setTela('inicio'), 5000); return () => clearTimeout(timer) }, [])
  const olho = <button type="button" onClick={() => setSenhaVisivel(v => !v)} aria-label="Mostrar ou ocultar senha"><img src="/svg/olho.svg" alt="" className="h-5 w-5" /></button>
  return <>
    <section className="hidden min-h-dvh grid-cols-[3fr_2fr] bg-[#FFFBF6] md:grid">
      <div className="relative flex min-h-dvh flex-col justify-center gap-9 overflow-hidden bg-[#FFF6EC] p-12 lg:p-20"><div className="text-6xl font-semibold text-[#2B1A0E] xl:text-7xl">MeuPet</div><p className="text-2xl text-[#75634F]">Todo cuidado merece um lugar especial.</p><img src="/svg/curva.svg" alt="" className="absolute bottom-0 left-0 h-28 w-full" /></div>
      <div className="flex min-h-dvh flex-col items-center justify-center overflow-y-auto p-6 lg:p-10"><div className="flex w-full max-w-lg flex-col items-center gap-6">
        <div className="flex w-full gap-4"><Link to="/primeiro-acesso/login" className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#F29A4B] text-lg font-semibold text-white">Log In</Link><Link to="/primeiro-acesso/cadastro" className="flex h-12 flex-1 items-center justify-center rounded-xl text-lg font-semibold text-[#75634F]">Cadastro</Link></div>
        <Input><input type="email" placeholder="E-mail" className="h-full min-w-0 flex-1 bg-transparent outline-none"/><img src="/svg/@.svg" alt="Email" className="h-6 w-6"/></Input>
        <Input><input type={senhaVisivel ? 'text' : 'password'} placeholder="Senha" className="h-full min-w-0 flex-1 bg-transparent outline-none"/>{olho}</Input>
        <button type="button" className="text-sm text-[#8F4B17]">Esqueci a senha</button>
        <button type="button" className="h-12 w-64 rounded-xl border border-[#E9DDCF]">Continuar com Google</button>
        <button type="button" onClick={() => navigate('/index')} className="h-12 w-64 rounded-xl bg-[#F29A4B] text-lg font-semibold">Entrar</button>
        <div className="flex w-full items-center gap-4"><div className="h-px flex-1 bg-[#E9DDCF]"/>ou<div className="h-px flex-1 bg-[#E9DDCF]"/></div><Link to="/index" className="text-sm">Continuar sem cadastro</Link>
      </div></div>
    </section>
    <section className="relative min-h-dvh bg-[#FFFBF6] md:hidden">
      {tela === 'abertura' && <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#FFFBF6]"><img src="/svg/logo-bichinho-icone 1.svg" alt="Logo da aplicação" className="h-32 w-32"/></div>}
      {tela === 'inicio' && <div className="flex min-h-dvh flex-col"><header className="relative flex min-h-[55dvh] flex-col gap-6 overflow-hidden bg-[#FFF6EC] px-8 pt-28"><h1 className="text-5xl font-semibold leading-tight">MeuPet</h1><p className="text-lg text-[#8F7662]">Todo cuidado merece um lugar especial.</p><img src="/svg/curvaMobile.svg" alt="" className="absolute bottom-0 left-0 h-12 w-full"/></header><div className="flex flex-1 flex-col gap-4 px-6 pt-9"><Link to="/primeiro-acesso/cadastro" className="flex h-12 items-center justify-center rounded-xl bg-[#F29A4B] text-xl font-semibold">Cadastrar</Link><button onClick={() => setTela('login')} className="h-12 rounded-xl border border-[#E9DDCF] bg-[#EEEE88] text-xl font-semibold text-[#8F4B17]">Já possuo uma conta</button><Link to="/index" className="py-2 text-center text-sm">Continuar sem cadastro</Link></div></div>}
      {tela === 'login' && <div className="relative flex min-h-dvh flex-col"><header className="flex h-16 items-center gap-4 border-b border-[#E9DDCF] px-6"><button type="button" onClick={() => setTela('inicio')} aria-label="Voltar"><img src="/svg/voltar.svg" alt="" className="h-6 w-6"/></button><h1 className="font-semibold">Login</h1></header><div className="flex flex-col gap-7 p-6"><h2 className="text-2xl font-semibold">Que bom ter você de volta :)</h2><div className="flex flex-col gap-3.5"><Input><input type="email" placeholder="E-mail" className="min-w-0 flex-1 bg-transparent outline-none"/><img src="/svg/@.svg" alt="" className="h-4 w-4"/></Input><Input><input type={senhaVisivel ? 'text' : 'password'} placeholder="Senha" className="min-w-0 flex-1 bg-transparent outline-none"/>{olho}</Input><button type="button" className="self-end text-xs text-[#8F4B17]">Esqueci a senha</button></div><button type="button" className="h-12 rounded-xl border border-[#E9DDCF]">Continuar com Google</button></div><button type="button" onClick={() => navigate('/index')} className="absolute bottom-6 left-6 right-6 h-12 rounded-xl bg-[#F5A04B] font-semibold">Entrar</button></div>}
    </section>
  </>
}
