// intervalo padrão entre doses (o mesmo que os dados do context já usam: 1 ano)
export const INTERVALO_MESES = 12

// sugestões que aparecem no campo "nome da vacina" (o tutor ainda pode digitar outra)
// as chaves são as mesmas de `especie` em context/Pets.jsx
export const VACINAS_SUGERIDAS = {
    Cachorro: ['V8', 'V10', 'Antirrábica', 'Gripe canina', 'Giárdia', 'Leishmaniose'],
    Gato: ['V3', 'V4', 'V5', 'Antirrábica', 'Leucemia felina (FeLV)'],
}

// Date -> "YYYY-MM-DD" no fuso local
function paraISO(data) {
    const ano = data.getFullYear()
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const dia = String(data.getDate()).padStart(2, '0')
    return `${ano}-${mes}-${dia}`
}

export function hojeISO() {
    return paraISO(new Date())
}

// "2026-11-10" + 12 meses -> "2027-11-10"
export function calcularProximaDose(dataISO, meses = INTERVALO_MESES) {
    const data = new Date(dataISO + 'T12:00')
    data.setMonth(data.getMonth() + meses)
    return paraISO(data)
}

// monta os campos que dependem do formulário, no formato das vacinas do context:
// { nome, data, proxima, aplicada }  (id e petId quem coloca é a página)
export function montarVacina({ nome, data, naoTomou }) {
    // primeira dose pendente: não existe última dose e a próxima é "agora"
    if (naoTomou) {
        return { nome: nome.trim(), data: '', proxima: hojeISO(), aplicada: false }
    }

    return {
        nome: nome.trim(),
        data,
        proxima: calcularProximaDose(data),
        aplicada: true,
    }
}
