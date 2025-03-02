# Especificações do Projeto

Através de pesquisas de campo dentro do público alvo do projeto, foram estipuladas as personas que seguem juntamente de suas histórias de usuário, dando origem aos requisitos funcionais e não funcionais da aplicação.

## Personas

### Natalia Almeida

<img src="img/natalia.jpg" width = "150px">

Formada em pedagogia com pós em psicopedagogia e pós em edução especial e inclusiva.

| MOTIVAÇÕES                                                                                                                                                                                                                      | FRUSTRAÇÕES                                                                                                                                                                                                                                                                                                                                                                                                                                | HOBBIES / HISTÓRIA                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Natalia é apaixonada por ajudar e cuidar de quem mais precisa, tendo grande empatia por causas sociais e pessoas em situação de vulnerabilidade. Suas motivações a fizeram seguir na área da edução, que posteriormente foi especializada à edução inclusiva. |Além dos atendimentos particulares em clínicas e à domicílio, Natalia gostaria de ampliar sua participação social atendendo gratuitamente ou a custo social crianças e adolescentes em situação de vulnerabilidade financeira. Além de ampliar sua experiência na área, faz parte das suas motivações a inclusão. Porém ela não encontra com facilidade canais de comunicação para se conectar a este público, sendo necessário uma ferramenta de uso intuitivo e de baixo custo necessária para este fim.| Inicialmente influenciada pela família, Natalia decidiu seguir a área da educação com foco em concursos público, entretanto, ao decorrer de sua jornada se deparou com crianças e adolescentes com deficiências intelectuais e do especto autista, e sentiu que poderia fazer mais por esse público. Sendo assim, se especializou em psicopedagogia e posteriormente em educação especial e inclusiva.|

---

## Histórias de Usuários

A partir da compreensão do dia a dia das personas identificadas para o projeto, foram registradas as seguintes histórias de usuários.

| EU COMO... `PERSONA` | QUERO/PRECISO ... `FUNCIONALIDADE`                                                                                          | PARA ... `MOTIVO/VALOR`                                                                                                                                                                                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Natalia Almeida   | Poder informar a pais ou responsáveis a disponibilidade de atendimento pedagógio para pessoas atípicas voluntário ou a custo social.                                                              |Ganhar mais experiência prática e auxiliar crianças e adolescentes em que os pais não tenham condição de pagar atendimento particular. |
| Natalia Almeida   | Encontrar em mais detalhes perfis de crianças e adolescentes atípicos que precisam de atendimento. Com uma pequena biografia da trajetória pedagógica, tipos de transtornos, dificuldades e/ou deficiências, foto de perfil entre outras informações relevantes.                                                              |Selecionar os perfis que tenho condições de atender de forma social. |
| Natalia Almeida   | Identificar e comprovar a condição social dos pais do possível paciente.                                                              |Garantir a acessibilidade a quem de fato precisa, que não tenha condições financeiras para arcar com atendimento particular ou em clínicas.|
| Natalia Almeida   | Identificar a localidade do possível paciente                                                               |Saber se compensa mais atender no domicílio dele ou no meu. |
| Natalia Almeida   | Filtrar possíveis pacientes que aceitem atendimento a valor social daqueles que aceitem apenas atendimento gratuíto.                                                              |Alinhar expectativas e possibilidades de atendimento, nem toda intervenção é possível a custo zero. |
## Arquitetura e Tecnologias

o	Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

Colocar a imagem do modelo construído apresentando a proposta de solução.

> **Links Úteis**:
> Disponíveis em material de apoio do projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O aplicativo deve possibilitar o cadastro e a atualização das informações sobre a disponibilidade de atendimento voluntário ou à custo social. | ALTA | 
|RF-002| O aplicativo deve permitir o cadastro  de psicopedagogos voluntários, incluindo nome, formação, experiência e disponibilidade.    | ALTA |
|RF-003| O aplicativo deve permitir a visualização detalhada do perfil de crianças e adolescentes atípicos. O perfil deve conter a trajetória 
pedagógica, tipos de transtornos, dificuldade/ou deficiências, foto de perfil entre outras informações relevantes. | ALTA |
|RF-004| O aplicativo deve comprovar a condição social dos pais do possível paciente. | ALTA |
|RF-005| O aplicativo deve conter a localidade do possível paciente. | MEDIA |
|RF-006| O aplicativo deve filtrar possíveis pacientes que aceitam atendimento à valor social daqueles que aceitam apenas atendimento gratuíto. | MEDIA |
|RF-007| O aplicativo deve oferecer autenticação via email e senha, além de suporte para recuperação de senha. | ALTA |
|RF-008| O aplicativo deve permitir reagendamento e cancelamento de sessões com notificação prévia. | MEDIA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O aplicativo deve ser compatível com dispositivos Android e iOS | ALTA | 
|RNF-002| O aplicativo deve garantir segurança dos dados utilizando criptografia nas comunicações e armazenamento seguro de informações sensíveis.  |  ALTA | 
|RNF-003| O aplicativo deve suportar ao menos 10.000 usuários simultaneamente sem degradação de desempenho. | MEDIA |
|RNF-004| O tempo de resposta para carregamento das telas não deve ultrapassar 2 segundos. | BAIXA |
|RNF-005| O sistema deve estar em conformidade com a Lei Geral de Proteção de Dados (LGPD). | MEDIA |
|RNF| O aplicativo deve apresentar as informações de forma estruturada e de fácil compreensão. | MEDIA |

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até julho de 2025 |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo ER (Projeto Conceitual)

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

Sugestão de ferramentas para geração deste artefato: LucidChart e Draw.io.

A referência abaixo irá auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.
