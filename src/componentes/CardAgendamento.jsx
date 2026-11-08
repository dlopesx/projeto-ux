import React from 'react';

export default function CardAgendamento({ titulo, dataHora, local, profissional, onEdit }) {
    return (
        <li className="flex flex-col gap-5 rounded-2xl bg-[#F8F0E6] p-5 transition hover:shadow-md md:gap-9 md:px-7">
            <div className="flex flex-col gap-2 md:flex-1 md:gap-9">
                
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold text-[#2B1A0E] md:text-2xl">
                        {titulo}
                    </h3>
                    <button
                        type="button"
                        onClick={onEdit}
                        className="flex shrink-0 items-center gap-1 text-[#75634F] hover:font-semibold"
                    >
                        <img src="/svg/edit.svg" alt="" className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="text-sm md:text-xl">Editar</span>
                    </button>
                </div>

                <p className="text-sm font-semibold text-[#75634F] md:text-base">
                    {dataHora}
                </p>
            </div>

            <div className="flex items-start gap-3 md:items-center">
                <img src="/svg/mapa.svg" alt="" className="mt-1 h-5 w-5 shrink-0 md:mt-0 md:h-6 md:w-6" />
                <div className="min-w-0">
                    <p className="text-sm font-medium leading-relaxed text-[#75634F] md:text-xl md:font-semibold md:text-[#2B1A0E]">
                        {local}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <img src="/svg/heart.svg" alt="" className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
                <p className="text-sm font-semibold text-[#2B1A0E] md:text-xl">
                    Profissional: {profissional}
                </p>
            </div>
        </li>
    );
}