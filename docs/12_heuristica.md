# Avaliação de IHC por inspeção heurística

## Escopo e método

Esta avaliação registra uma inspeção heurística da implementação React do MeuPet, considerando os fluxos e componentes disponíveis para desktop e celular. A inspeção foi feita por análise das telas, rotas e comportamentos implementados, usando as dez heurísticas de Nielsen e Molich (1994), conforme a estrutura proposta neste documento.

O material da aula *Usabilidade e Heurísticas* destaca que avaliações com usuários devem observar tarefas reais e registrar, entre outros dados, sucesso, erros, tempo e satisfação. A inspeção heurística abaixo complementa o teste por observação registrado em [13_teste_usabilidade.md](./13_teste_usabilidade.md); ela não substitui uma nova sessão com participantes. Os resultados anteriores são usados como contexto, sem serem apresentados como problemas ainda existentes quando o fluxo correspondente já foi corrigido no React.

Foram consideradas as telas de primeiro acesso, dashboard, cadastro de pets, alertas, agendamentos e áreas de cuidado dos pets. A tabela principal contém **somente violações** encontradas na implementação atual. As evidências apontam a tela e o comportamento para facilitar a reprodução; não foram anexadas capturas de tela nesta inspeção.

## Escala de severidade

| Grau | Classificação | Descrição |
| :---: | :--- | :--- |
| 0 | Sem importância | Não afeta a operação da interface. |
| 1 | Cosmético | Não exige correção imediata. |
| 2 | Simples | Problema de baixa prioridade, que pode ser corrigido. |
| 3 | Grave | Problema de alta prioridade, que deve ser corrigido. |
| 4 | Catastrófico | Problema muito grave, que deve ser corrigido de qualquer forma. |

## Violações identificadas

| Heurística | Tela e evidência observada | Impacto para a pessoa usuária | Severidade | Recomendação |
| :--- | :--- | :--- | :---: | :--- |
| **1. Visibilidade do status do sistema** | **Dashboard:** os cartões de agendamentos e alertas são exemplos escritos diretamente na tela e não refletem os dados do contexto usados pelos formulários. | Depois de criar ou alterar um item, o dashboard pode continuar mostrando informações antigas. A pessoa não consegue confirmar o estado atual dos registros por esse resumo. | **3 — Grave** | Montar os cartões a partir dos mesmos dados de agendamentos e alertas usados nas telas de listagem e atualizar o resumo após cada alteração. |
| **1. Visibilidade do status do sistema** | **Novo alerta:** o envio mostra uma confirmação e limpa o formulário, mas a ação `adicionarAlerta` não grava o alerta no contexto usado por “Meus alertas”. | A mensagem indica sucesso, mas o alerta não aparece na lista; o retorno do sistema não corresponde ao resultado da ação. | **3 — Grave** | Salvar o alerta no estado compartilhado antes de mostrar a confirmação. Se o salvamento falhar, manter os dados e apresentar uma mensagem de erro. |
| **1. Visibilidade do status do sistema** | **Registrar peso:** ao salvar, a tela apresenta “Peso adicionado com sucesso”, mas a função não atualiza os pesos do pet. | A pessoa recebe uma confirmação de uma operação que não foi concluída e pode acreditar que o histórico foi atualizado. | **3 — Grave** | Registrar a pesagem no estado compartilhado e atualizar o histórico antes de mostrar a confirmação. |
| **1. Visibilidade do status do sistema** | **Adicionar registro de cio:** ao salvar, a tela volta ao histórico sem adicionar o registro ao estado de cios nem confirmar o resultado. | A pessoa não sabe se o registro foi salvo; ao retornar, o histórico permanece inalterado. | **3 — Grave** | Salvar o registro no contexto do pet e exibir confirmação; em caso de falha, permanecer no formulário e explicar como corrigir. |
| **1. Visibilidade do status do sistema** | **Primeiro acesso:** os botões “Continuar com Google” e “Esqueci a senha” não executam uma ação nem informam que o recurso ainda não está disponível. | A aparência e os rótulos criam a expectativa de que essas ações funcionem; ao clicar, não há resposta. | **2 — Simples** | Implementar os fluxos ou indicar claramente que estão indisponíveis nesta versão. Todo controle visível deve responder à interação. |
| **9. Ajudar a reconhecer, diagnosticar e recuperar erros** | **Rotas de detalhes de pets:** quando um identificador não corresponde a um pet, algumas páginas, como Vacinas e Consultas, mostram apenas “Pet não encontrado”, sem uma ação para voltar à lista de pets. | A pessoa pode ficar sem um caminho claro para se recuperar de um endereço inválido ou de um pet removido. | **2 — Simples** | Exibir uma mensagem em linguagem simples e oferecer um link ou botão para “Meus pets” ou para o início. |

## Boas práticas observadas

Os exemplos abaixo registram aspectos positivos do protótipo. Eles não anulam as violações listadas acima.

| Heurística | Exemplo no MeuPet |
| :--- | :--- |
| **2. Compatibilidade entre o sistema e o mundo real** | A interface usa termos familiares ao cuidado de animais, como “Vacinas”, “Consultas”, “Alimentação”, “Meus pets” e “Próximos cuidados”. |
| **3. Controle e liberdade para a pessoa usuária** | Formulários oferecem opções de voltar ou cancelar, e diálogos de edição podem ser fechados sem concluir a ação. |
| **4. Consistência e padrões** | A paleta, os ícones e o estilo dos cartões e botões se repetem entre as áreas do app, ajudando a reconhecer elementos com a mesma função. |
| **5. Prevenção de erros** | O cadastro de pet valida campos obrigatórios por etapa; campos de data restringem datas futuras quando essa regra se aplica; opções que tornam uma data desnecessária desabilitam o campo correspondente. |
| **6. Reconhecimento em vez de memorização** | O dashboard e os seletores mostram os nomes dos pets, e as áreas de cuidado são acessadas por cartões identificados por texto e ícone. |
| **7. Flexibilidade e eficiência de uso** | O dashboard oferece atalhos de adição para tarefas comuns, incluindo alerta, agendamento, vacina e cadastro de pet. |
| **8. Projeto estético e minimalista** | As telas agrupam informações por assunto, usam títulos de seção e mantêm uma hierarquia visual que facilita localizar os principais conteúdos. |
| **9. Recuperação de erros em formulários** | Em fluxos como o cadastro de pet e o agendamento, a validação pode indicar campos ou dados que precisam de correção. Isso convive com o problema de recuperação de rota descrito na tabela de violações. |

## Relação com o teste por observação

O teste registrado em [13_teste_usabilidade.md](./13_teste_usabilidade.md) teve um participante e apontou dificuldades de navegação na tarefa de registrar vacina e no retorno após adicionar pesagem. Essas observações são evidências do protótipo testado naquele momento. As rotas e os botões de voltar foram ajustados depois; portanto, esses dois relatos não foram repetidos como violações atuais sem nova observação com usuários. Recomenda-se repetir as tarefas após as correções e comparar sucesso, erros, tempo e satisfação, como indicado no material da aula.

## Prioridade de correção

1. Fazer com que alerta, peso e registro de cio sejam realmente salvos antes de confirmar a operação.
2. Conectar o resumo do dashboard aos dados atuais do app.
3. Dar uma resposta aos botões de autenticação externa e recuperação de senha, ou sinalizar que ainda não estão disponíveis.
4. Oferecer um caminho de recuperação nas telas abertas com um identificador de pet inválido.
5. Repetir o teste por observação nas tarefas de vacina, peso, alerta e registro de cio para verificar se as mudanças resolvem as dificuldades sem introduzir novas.

## Referências

- Nielsen e Molich (1994), heurísticas de usabilidade, conforme descritas no enunciado de avaliação da disciplina.
- Material da aula *Usabilidade e Heurísticas* (PDF enviado para esta atividade), especialmente as páginas 4 e 6–8: objetivos e medidas do teste, análise quantitativa e qualitativa e relato dos problemas com localização, justificativa e sugestão de solução.
- Resultados do teste por observação do projeto em [13_teste_usabilidade.md](./13_teste_usabilidade.md).
