import Sidebar from '../componentes/Sidebar' // Ajuste o caminho conforme a sua estrutura de pastas
import { useNavigate } from 'react-router-dom';

export default function AdicionarPeso() {
  const campoClass = "w-full h-12 px-4 bg-[#F8F0E6] border border-[#E9DDCF] rounded-2xl outline-none transition focus:ring-2 focus:ring-[#F29A4B]";
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFFBF6] min-h-screen">
      
      {/* DESKTOP */}
      <section className="hidden md:flex w-full min-h-screen">
        {/* Renderiza o seu componente de Menu */}
        <Sidebar />
        
        {/* Área Principal Desktop */}
        <div className="flex-1 flex flex-col">
          <header className="flex flex-row justify-between p-5 border-b border-[#E9DDCF] bg-white">
            <button onClick={() => navigate(-1)} className="flex items-center gap-3 hover:opacity-75 transition">
                <img src="/svg/voltar.svg" alt="Voltar" className="w-6 h-6" />
                <span className="text-lg font-semibold text-[#75634F]">Voltar</span>
            </button>
          </header>

          <main className="w-full max-w-2xl mx-auto py-10 px-8 flex flex-col gap-6 flex-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#120111]">Registrar Peso</h1>
            
            <form className="flex flex-col gap-6 p-8 border-2 border-[#E9DDCF] rounded-3xl bg-white shadow-sm">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#2B1A0E]">Data da pesagem</label>
                <input name="data" type="date" required className={campoClass} />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#2B1A0E]">Peso (gramas ou kg)</label>
                <div className="relative">
                  <input name="peso" type="number" step="0.01" placeholder="Ex: 100" required className={campoClass} />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-[#75634F]">
                    g/kg
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[#2B1A0E]">Observações</label>
                <input name="obs" type="text" placeholder="Ex: Pesagem pós-consulta" className={campoClass} />
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-[#E9DDCF]">
                <a href="/peso-historico" className="flex items-center justify-center px-6 h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition">
                  Cancelar
                </a>
                <button type="submit" className="px-8 h-12 rounded-xl bg-[#F29A4B] text-[#2B1A0E] font-semibold hover:bg-[#E8863A] transition shadow-md">
                  Salvar Peso
                </button>
              </div>
            </form>
          </main>
        </div>
      </section>

      {/* MOBILE */}
      <section className="flex md:hidden flex-col w-full min-h-screen">
        <header className="min-h-16 px-6 py-4 border-b border-[#E9DDCF] flex items-center gap-4 bg-white">
          <a href="/peso-historico" className="flex items-center gap-3">
            <img src="/svg/voltar.svg" alt="Voltar" className="w-6 h-6" />
            <span className="text-lg font-semibold text-[#75634F]">Voltar</span>
          </a>
        </header>

        <main className="w-full p-5 sm:p-6 flex flex-col gap-6 flex-1">
          <h1 className="text-2xl font-semibold text-[#120111]">Registrar Peso</h1>
          
          <form className="flex flex-col gap-6 p-6 border-2 border-[#E9DDCF] rounded-3xl bg-white shadow-sm">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-[#2B1A0E]">Data da pesagem</label>
              <input name="data" type="date" required className={campoClass} />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-medium text-[#2B1A0E]">Peso (gramas ou kg)</label>
              <div className="relative">
                <input name="peso" type="number" step="0.01" placeholder="Ex: 100" required className={campoClass} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-[#75634F]">
                  g/kg
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-medium text-[#2B1A0E]">Observações</label>
              <input name="obs" type="text" placeholder="Ex: Pesagem pós-consulta" className={campoClass} />
            </div>

            <div className="flex flex-col-reverse gap-3 mt-4 pt-6 border-t border-[#E9DDCF]">
              <a href="/peso-historico" className="flex items-center justify-center w-full h-12 rounded-xl border border-[#E9DDCF] font-semibold hover:bg-[#F8F0E6] transition">
                Cancelar
              </a>
              <button type="submit" className="w-full h-12 rounded-xl bg-[#F29A4B] text-[#2B1A0E] font-semibold hover:bg-[#E8863A] transition shadow-md">
                Salvar Peso
              </button>
            </div>
          </form>
        </main>
      </section>

    </div>
  );
}