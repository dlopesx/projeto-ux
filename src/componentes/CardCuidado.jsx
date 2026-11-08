import React, { useState } from 'react'

export default function CardCuidado({ titulo, proximaData, historico, tituloHistorico }) {
    const [feitoHoje, setFeitoHoje] = useState(false);

    return (
        <section className="flex flex-col gap-5 w-full md:w-[30rem] rounded-3xl border-2 border-[#E9DDCF] bg-[#FFFBF6] p-5 md:p-8">
            <h2 className="font-semibold text-xl self-stretch text-[#120111]">
                {titulo}
            </h2>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-5">
                <div>
                    <p className="text-lg md:text-xl font-semibold text-[#75634F]">
                        Próxima data: 
                    </p>
                    <p className="text-[#75634F]">
                        {proximaData}
                    </p>
                </div>
                <button 
                    type="button" 
                    onClick={() => setFeitoHoje(!feitoHoje)}
                    className={`inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-5 font-semibold transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1A17]
                    ${feitoHoje ? 'bg-[#9EE68CB3] border-transparent text-black' : 'bg-transparent border-[#8A7F76] text-[#1F1A17]'}`}>
                    {feitoHoje ? 'Realizado hoje' : 'Marcar como feito'}
                </button>
            </div>

            <div className="flex flex-col gap-5 md:gap-6 pt-2">
                <h2 className="font-semibold text-sm md:text-base self-stretch text-[#75634F] uppercase">
                    {tituloHistorico}
                </h2>
                <ol className="ml-3 flex flex-col gap-8 border-l-2 border-[#E9DDCF] pl-7 md:pl-8">
                    {historico.map((dataHist, index) => (
                        <li key={index} className="relative flex flex-col gap-2">
                            <span className="absolute -left-[36px] md:-left-[41px] top-1 h-4 w-4 rounded-full border-4 border-[#F8F0E6] bg-[#F29A4B]"></span>
                            <p className="text-sm md:text-base font-semibold text-[#120111]">
                                {dataHist}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}