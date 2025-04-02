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

### Márcio José

<img src="img/marcio.jpg" width = "150px">

Pedreiro autonomo pai de um filho atípico (transtorno do espectro autista).

| MOTIVAÇÕES                                                                                                                                                                                                                      | FRUSTRAÇÕES                                                                                                                                                                                                                                                                                                                                                                                                                                | HOBBIES / HISTÓRIA                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|Márcio é pai solteiro de seu filho Gabriel. Sua esposa faleceu quando Gabriel tinha poucos anos de vida, e desde então a principal motivação de Márcio tem sido garantir a melhor educação e condição de vida possível a seu filho.| Seu filho nasceu um transtorno do espectro autista de nível 1 de suporte. Mesmo sendo o nível de menor suporte do transtorno, o acompanhamento com profissionais da área de psicopedagogia é essencial para garantir o melhor aproveitamento pedagógico, entretanto o alto custo destes profissionais impossibilita sua contratação.| Márcio vem de uma origem humilde e sempre teve dificuldades financeiras, sua esposa veio a falecer nos primeiros anos de vida de seu filho Gabriel, que nasceu com transtorno do espectro autista de nível 1. Desde então, ele tem buscado trazer a melhor condição de vida possível a ele, investindo principalmente em sua educação, tendo em vista as limitações e dificuldades que o transtorno traz.|

---

## Histórias de Usuários

A partir da compreensão do dia a dia das personas identificadas para o projeto, foram registradas as seguintes histórias de usuários.

| EU COMO... `PERSONA` | QUERO/PRECISO ... `FUNCIONALIDADE`                                                                                          | PARA ... `MOTIVO/VALOR`                                                                                                                                                                                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Natalia Almeida   | Poder informar a pais ou responsáveis a disponibilidade de atendimento pedagógico para pessoas atípicas voluntário ou a custo social.                                                              |Ganhar mais experiência prática e auxiliar crianças e adolescentes em que os pais não tenham condição de pagar atendimento particular. |
| Natalia Almeida   | Encontrar em mais detalhes perfis de crianças e adolescentes atípicos que precisam de atendimento. Com uma pequena biografia da trajetória pedagógica, tipos de transtornos, dificuldades e/ou deficiências, foto de perfil entre outras informações relevantes.                                                              |Selecionar os perfis que tenho condições de atender de forma social. |
| Natalia Almeida   | Identificar e comprovar a condição social dos pais do possível paciente.                                                              |Garantir a acessibilidade a quem de fato precisa, que não tenha condições financeiras para arcar com atendimento particular ou em clínicas.|
| Natalia Almeida   | Identificar a localidade do possível paciente.                                                               |Saber se compensa mais atender no domicílio dele ou no meu. |
| Natalia Almeida   | Filtrar possíveis pacientes que aceitem atendimento a valor social daqueles que aceitem apenas atendimento gratuito.                                                              |Alinhar expectativas e possibilidades de atendimento, nem toda intervenção é possível a custo zero. |
| Márcio José  | Encontrar psicopedagogos particulares dispostos a fazer trabalho voluntário ou a custo social.                                                              |Realizar o acompanhamento pedagógico do meu filho com transtorno do espectro autista.|
| Márcio José  | Selecionar apenas profissionais próximos a minha localidade.                                                             |Optar por profissionais mais próximos, reduzindo custos com transporte.|
| Márcio José  | Visualizar a imagem de perfil, o currículo e as formações do profissional. disponível.                                                             |Garantir a seleção de um profissional regulamentado para evitar fraudes ou abusos.|
## Arquitetura e Tecnologias

O sistema segue uma arquitetura **cliente-servidor** com:
- **Backend**: Node.js + Express.js
- **Frontend**: React Native (iOS/Android)
- **Banco de Dados**: MongoDB (via Prisma ORM)

### Diagrama de Fluxo da Arquitetura


```
    A[App Mobile\nReact Native] -->|HTTPS| B[API Gateway\nExpress.js]
    B --> C[Autenticação\nJWT]
    C --> D[Banco de Dados\nMongoDB]
    C --> E[Microserviços]
    E --> E1[Usuários\nCRUD]
    E --> E2[Profissionais\nBusca/Filtros]
    E --> E3[Pacientes\nPerfis/Histórico]
```

### Tecnologias Definidas

#### 1. **Frontend (Aplicativo Mobile)**
| Componente          | Tecnologia                          |
|---------------------|-------------------------------------|
| Framework           | React Native                        |
| Navegação           | React Navigation                    |
| Gerenciamento de Estado | Context API / Redux             |
| UI/UX               | NativeBase ou React Native Paper    |


#### 2. **Backend (API RESTful)**
| Componente       | Tecnologia                  |
|------------------|-----------------------------|
| Linguagem        | JavaScript                  |
| Framework        | Express.js                  |
| Autenticação     | JWT                         |
| Upload de Imagens| Multer                      |

#### 3. **Banco de Dados**
| Componente | Tecnologia               |
|------------|--------------------------|
| SGBD       | MongoDB                  |
| ORM        | Prisma Client            |
| Cache      | Redis (Opcional)         |

#### 4. **Infraestrutura**
| Área           | Tecnologia                          |
|----------------|-------------------------------------|
| Hospedagem     | Azure App Service                  |
| Banco de Dados | Azure Cosmos DB (MongoDB API)      |
| CI/CD          | GitHub Actions                     |
| Monitoramento  | Azure Application Insights         |

### Fluxo de Comunicação
1. **App Mobile** → API Gateway (Express.js)  
   - Todas as requisições passam por um roteador central.
2. **Autenticação JWT**  
   - Validação via middleware `auth.js`.
3. **Prisma ORM** → MongoDB  
   - Consultas tipadas e seguras.

### Justificativa das Escolhas
| Tecnologia  | Vantagem                                   |
|-------------|--------------------------------------------|
| React Native| Cross-platform com código único            |
| MongoDB     | Flexível para dados semi-estruturados      |
| Prisma      | Tipagem forte + facilidade de manutenção   |
| JWT         | Autenticação stateless e escalável         |

## Project Model Canvas

Colocar a imagem do modelo construído apresentando a proposta de solução.

> **Links Úteis**:
> Disponíveis em material de apoio do projeto

## Requisitos

A tabela que se segue apresenta a matriz de rastreabilidade dos requisitos funcionais e não funcionais que detalham o escopo do projeto.

<a href="img/matriz-rastreabilidade-requisitos.pdf"><img width="600px" src="img/matriz-rastreabilidade.jpg"></a>

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

<img src="img/diagrama-uml-psychoapp.jpg">

## Modelo ER (Projeto Conceitual)

<img src="img/Modelo-ER.drawio.png" width = "700px">

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

Sugestão de ferramentas para geração deste artefato: LucidChart e Draw.io.

A referência abaixo irá auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Projeto da Base de Dados

<img src="img/Psichoapp.png">  

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.

## Modelagem dos processos : notação BPMN

<img src="img/BPMN.png">
