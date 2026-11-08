import React from "react";

export default function CardMedicamento({ tipo, nome, dosagem, horario }) {
    return (
        <li className="flex flex-wrap gap-5 p-5 rounded-2xl bg-[#FFFFFF] hover:shadow-md transition">
            <div className="flex-1 min-w-[120px]">
                <p className="font-semibold text-lg">{tipo}</p>
                <p>{nome}</p>
                <p>{dosagem}</p>
            </div>
            <div>
                <div className="rounded-full bg-[#ffae52] px-5 py-2 font-semibold">
                    Às {horario}
                </div>
            </div>
        </li>
    );
}