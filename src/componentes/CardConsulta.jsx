import React from "react";

// Função para formatar a data (ex: "2026-09-18" -> "18 de setembro de 2026")
function formatarData(dataString) {
    if (!dataString) return "";
    const [ano, mes, dia] = dataString.split('-');
    const data = new Date(ano, mes - 1, dia);
    return data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function CardConsulta({ nomeConsulta, data, hora, profissional, clinica, descricao }) {
    return (
        <li className="relative flex flex-col gap-1 md:gap-1">
            {/* Bolinha da linha do tempo */}
            <span className="absolute -left-[36px] md:-left-[41px] top-1 h-4 w-4 rounded-full border-4 border-[#F8F0E6] bg-[#F29A4B]"></span>
            
            <p className="text-sm font-semibold text-[#75634F]">
                {formatarData(data)} · {hora}
            </p>
            
            <p className="text-lg md:text-xl font-semibold text-[#120111]">
                {nomeConsulta}
            </p>
            
            <p className="text-sm md:text-base text-[#75634F]">
                {clinica} · {profissional}
            </p>
            
            {/* O bloco de anotação amarela só renderiza se existir alguma 'descricao' escrita lá no Contexto */}
            {descricao && (
                <p className="mt-1 md:mt-2 rounded-lg bg-[#EEEE88] px-3 py-2 text-sm text-[#473C31] w-fit">
                    {descricao}
                </p>
            )}
        </li>
    );
}