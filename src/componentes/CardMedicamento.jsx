import { textoDuracao } from "../js/medicamentos";

export default function CardMedicamento({ tipo, nome, dosagem, horario, frequencia, usoContinuo, termino }) {
    const duracao = textoDuracao({ usoContinuo, termino })

    return (
        <li className="flex flex-wrap gap-5 p-5 rounded-2xl bg-[#FFFFFF] hover:shadow-md transition">
            <div className="flex-1 min-w-[120px]">
                {/* medicamentos novos não têm "tipo": o nome vira o título */}
                <p className="font-semibold text-lg">{tipo || nome}</p>
                {tipo && <p>{nome}</p>}
                <p>{dosagem}</p>
                {frequencia && <p className="text-sm">{frequencia}</p>}
                {duracao && <p className="text-sm">{duracao}</p>}
            </div>
            <div>
                <div className="rounded-full bg-[#ffae52] px-5 py-2 font-semibold">
                    Às {horario}
                </div>
            </div>
        </li>
    );
}
