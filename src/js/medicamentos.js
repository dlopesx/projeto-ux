// "YYYY-MM-DD" -> "DD/MM/YYYY"
function formatarData(iso) {
    const [ano, mes, dia] = iso.split('-')
    return `${dia}/${mes}/${ano}`
}

// a página Medicamentos separa os cards em colunas por período
// "08:00" -> "Manhã" | "Tarde" | "Noite"
export function periodoDoHorario(hora) {
    const h = Number(hora.split(':')[0])
    if (h < 12) return 'Manhã'
    if (h < 18) return 'Tarde'
    return 'Noite'
}

// texto que aparece no card: "Uso contínuo", "Até 20/11/2026" ou '' (medicamentos antigos)
export function textoDuracao({ usoContinuo, termino }) {
    if (usoContinuo) return 'Uso contínuo'
    return termino ? `Até ${formatarData(termino)}` : ''
}

// monta o medicamento no formato do context (id e petId quem coloca é a página)
// campos antigos (tipo, horario, periodo) continuam existindo para a página Medicamentos funcionar
export function montarMedicamento({ nome, dosagem, frequencia, horario, inicio, termino, usoContinuo }) {
    return {
        tipo: '',
        nome: nome.trim(),
        dosagem: dosagem.trim(),
        frequencia: frequencia.trim(),
        horario,
        periodo: periodoDoHorario(horario),
        inicio,
        termino: usoContinuo ? '' : termino,
        usoContinuo,
    }
}
