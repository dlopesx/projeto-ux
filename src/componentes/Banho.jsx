import { useState } from "react";

function formatarData(dataString) {
    if (!dataString) return "";
    const [ano, mes, dia] = dataString.split('-');
    const data = new Date(ano, mes - 1, dia);
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function Banho({ titulo, proximaData, historico }) {
    const [feitoHoje, setFeitoHoje] = useState(false);

    return (
        <article className="flex flex-col w-full md:w-[30rem] gap-5 md:gap-6 rounded-3xl border-2 border-[#E9DDCF] bg-[#FFFBF6] p-5 md:p-8">
            
            <div className="flex items-center justify-between md:justify-center md:gap-5">
                <h2 className="text-xl font-semibold text-[#120111] md:self-stretch">
                    {titulo}
                </h2>
                <span className="rounded-full px-4 py-1 border border-black text-xs md:text-sm font-semibold bg-[#9EE68CB3] whitespace-nowrap">
                    EM DIA
                </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-5 border-t-2 border-[#E9DDCF] pt-4 md:py-5">
                <div>
                    <p className="text-base md:text-xl font-semibold text-[#75634F]">
                        Próxima data:
                    </p>
                    <p className="text-sm md:text-base text-[#75634F]">
                        {formatarData(proximaData)}
                    </p>
                </div>

                <button type="button" onClick={() => setFeitoHoje(!feitoHoje)}
                    className={`min-h-11 rounded-full border px-4 md:px-5 py-2 font-semibold text-sm transition hover:shadow-md flex-shrink-0
                    ${feitoHoje ? 'bg-[#9EE68CB3] text-black border-transparent' : 'bg-transparent text-[#1F1A17] border-[#8A7F76]'}`}>
                    {feitoHoje ? 'Realizado hoje' : 'Marcar como feito'}
                </button>
            </div>

            <div className="border-t-2 border-[#E9DDCF] pt-4 flex flex-col gap-5 md:gap-6">
                <h3 className="text-sm md:text-base font-semibold text-[#75634F] uppercase">
                    Histórico de {titulo}
                </h3>
                <ol className="ml-3 flex flex-col gap-6 md:gap-8 border-l-2 border-[#E9DDCF] pl-7 md:pl-8">
                    {historico.map((dataHist, index) => (
                        <li key={index} className="relative flex flex-col gap-2">
                            <span className="absolute -left-[36px] md:-left-[41px] top-1 w-4 h-4 rounded-full border-4 border-[#F8F0E6] bg-[#F29A4B]"></span>
                            <p className="text-sm md:text-base font-semibold text-[#120111]">
                                {formatarData(dataHist)}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </article>
    );
}