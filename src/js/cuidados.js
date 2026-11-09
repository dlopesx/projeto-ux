export const CUIDADOS = {
  cachorro: [
    { pagina: 'vacinas', nome: 'Vacinas', svg: 'vacinas' },
    { pagina: 'consultas', nome: 'Consultas', svg: 'consulta' },
    { pagina: 'alimentacao', nome: 'Alimentação', svg: 'talher' },
    { pagina: 'medicamentos', nome: 'Medicamentos', svg: 'estrela' },
    { pagina: 'banho-tosa', nome: 'Banho e Tosa', svg: 'banheira' },
    { pagina: 'peso', nome: 'Peso', svg: 'peso'},
    { pagina: 'unhas-orelhas', nome: 'Unhas/Orelhas', svg: 'coracao' },
    { pagina: 'cio', nome: 'Cio', svg: 'coracao', soFemea: true },
  ],
  ave: [
    { pagina: 'consultas', nome: 'Consultas', svg: 'consulta' },
    { pagina: 'medicamentos', nome: 'Medicamentos', svg: 'estrela' },
    { pagina: 'alimentacao', nome: 'Alimentação', svg: 'talher' },
    { pagina: 'peso', nome: 'Peso', svg: 'peso' },
]
}; // <-- IMPORTANTE: Feche a chave do objeto CUIDADOS aqui com ponto e vírgula!

// COMENTÁRIO: Agora sim, a função fica solta no arquivo e pode ser exportada
export const formatarDataBR = (dataString) => {
    if (!dataString || dataString === 'Em andamento') return dataString;
    return dataString.split('-').reverse().join('/');
};