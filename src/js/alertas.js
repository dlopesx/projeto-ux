export const REPETICAO = {
    dom: 'Todo domingo',
    seg: 'Toda segunda',
    ter: 'Toda terça',
    qua: 'Toda quarta',
    qui: 'Toda quinta',
    sex: 'Toda sexta',
    sab: 'Todo sábado',
}

// "2026-11-10" -> "10/11/2026"
function formatarData(iso) {
    const [ano, mes, dia] = iso.split('-')
    return `${dia}/${mes}/${ano}`
}

// texto que aparece no card: "Hoje às 09:00", "10/11/2026 às 09:00", "Toda quarta às 08:00"
export function montarQuando({ repetir, data, hora, dia, horario }) {
    if (repetir === 'semanal') {
        const texto = REPETICAO[dia] ?? 'Toda semana'
        const horaRepeticao = horario || hora
        return horaRepeticao ? `${texto} às ${horaRepeticao}` : texto
    }

    const hoje = new Date().toLocaleDateString('sv-SE') // YYYY-MM-DD no fuso local
    const texto = !data || data === hoje ? 'Hoje' : formatarData(data)
    return hora ? `${texto} às ${hora}` : texto
}

// alertas antigos só têm o texto ("Toda quarta"), então descobre o dia a partir dele ("qua")
export function diaDoTexto(quando = '') {
    return Object.keys(REPETICAO).find((chave) => quando.startsWith(REPETICAO[chave])) ?? ''
}