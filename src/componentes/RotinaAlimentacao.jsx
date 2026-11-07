export default function RotinaAlimentacao({ rotina, editando, onMudar }) {
    return (
        <ol className="ml-3 flex flex-col gap-12 md:gap-[5rem] border-l-2 border-[#E9DDCF] pl-8">
            {rotina.map((r, i) => (
                <li key={`${r.periodo}-${r.horario}`} className="relative flex flex-col gap-2">
                    <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-[#F8F0E6] bg-[#F29A4B]"></span>
                    <p className="text-md font-semibold bg-[#E9DDCF] rounded-full px-4 py-2 max-w-[15rem] text-[#473C31]">
                        {r.periodo} - {r.horario}
                    </p>

                    {editando ? (
                        <input
                            value={r.refeicao}
                            onChange={(e) => onMudar(i, e.target.value)}
                            className="text-xl font-semibold bg-white border border-[#F29A4B] rounded-xl px-3 py-2 outline-none"
                        />
                    ) : (
                        <p className="text-xl font-semibold">{r.refeicao}</p>
                    )}
                </li>
            ))}
        </ol>
    )
}