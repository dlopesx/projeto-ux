
export default function CardVacina({nome, ultima, proxima, status}) {
    const estilos = {
        atrasada: { texto: '△ Atrasada', cor: 'text-perigo' },
        proxima: { texto: 'Próxima', cor: 'text-laranja' },
        emDia: { texto: 'Em dia', cor: 'text-verde' },
    }

    const st = estilos[status];

    return(
        <li className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-6 p-6
         md:min-h-28 bg-superficie border-t border-bege">
            <p className="text-xl font-semibold">{nome}</p>
            <p className="text-suave">Última dose: {ultima}</p>
            <p className="text-destaque">Próxima dose: {proxima}</p>
            <p><span className={`inline-flex px-3.5 py-2 rounded-full
                 bg-fundo text-[13px] font-semibold ${st.cor}`}>{st.texto}</span>
            </p>
        </li>       
    );
}