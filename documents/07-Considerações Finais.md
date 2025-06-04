# Avaliação dos Frameworks e Tecnologias Utilizadas no Desenvolvimento do Projeto:

## React Native:
Framework de desenvolvimento de aplicativos móveis criada pelo Facebook que permite a criação de aplicativos para IOS e Android utilizando JavaScript e React.

Vantagens:

- Permite reutilizar grande parte do código entre IOS e Android, reduzindo o tempo de desenvolvimento.
- Usa componentes nativos, garantido uma experiência fluida para os usuários.
- Tem suporte de uma comunidade ativa e do próprio Facebook facilitando encontrar soluções e bibliotecas úteis.
- Permite visualizar mudanças no código em tempo real, acelerando o desenvolvimento.

Desvantagens:

- Algumas funcionalidades exigem integração com o código nativo o que pode aumentar a complexidade.
- Para aplicativos que exigem gráficos ou processamento pesado, pode não ser uma boa opção.
- O React Native evolui rapidamente o que pode exigir ajustes contantes no código.

## Expo Go:
Ambiente de testes que permite rodar aplicativos móveis com React Native diretamente no celular sem precisar configurar emulador ou compilar o código nativo. 

Vantagens:

- Não exige configuração complexa de ambiente.
- Permite visualizar mudanças no código em tempo real.
- Funciona tanto em Android quanto no IOS.

Desvantagens: 

- Inclui várias bibliotecas pré-instaladas (mesmo que não sejam usadas) tornando os apps maiores.
- Menos controle sobre ajustes específicos, uma vez que muitas configurações são feitas automaticamente pelo Expo Go.
- O Expo Go só suporta a versão mais recente do SDK o que pode gerar a necessidades de atualização do projeto para evitar incompatibilidades.

## Node.js

Ambiente de execução de JavaScript que permite rodar código fora do navegador o que torna possível o desenvolvimento de aplicações no lado do servidor. Utiliza um modelo assíncrono e orientado a eventos.

Vantagens:

- Ideal para aplicações uqe precisam lidar com muitas conexões simultâneas, pois apresenta alta escalabilidade.
-  O vetor V8 do Chrome otimiza a execução do JavaScript tornando o Node.js rápido.
-  Conta com uma vasta comunidade de desenvolvedores e uma enorme quantidade de bibliotecas disponíveis via npm.
-  Permite o desenvolvimento full-stack, uma vez que é possível usar JavaScript tanto no front-end como no back-end.

Desvantagens:

- Pode apresentar dificuldades com tarefas que exigem alto processamento, já que usa uma única single-threaded.
- O uso excessivo de funções assíncronas pode tornar o código difícil de ler e manter.
- Sua dependência de pacotes externos pode trazer vulnerabilidades e problemas de segurança.

## Banco de dados MongoDB

O Banco de dados MongoDB, por sua estrutura orientada a documentos, se adapta bem a dados flexíveis como perfis de usuários e históricos de atendimento. Todavia, o uso da versão gratuita limita recursos criticos como segurança avançada, replicação e ferramentas de administração. Além disso, a integração com o ORM Prisma ainda está em fase experimental, o que pode acarretar instabilidade ou restrições de uso.

# Análise crítica e propostas de melhorias:

Para garantir a escalabilidade, segurança e manutenção eficiente do sistema, algumas melhorias técnicas podem ser implementadas ao longo do ciclo de desenvolvimento. 

No frontend, recomenda-se a migração do Expo Go para o bare workflow em ambientes de produção. Essa mudança permitirá maior controle sobre as dependências do projeto, redução do tamanho final do aplicativo e acesso a configurações mais avançadas de build e performance. Além disso, é importante estabelecer uma rotina de atualização e documentação das bibliotecas utilizadas no React Native, evitando conflitos decorrentes de mudanças frequentes na base do framework. 

No backend, é recomendável aplicar boas práticas de segurança como o uso de middlewares (helmet, cors, rate-limit) e a criação de testes automatizados para validação das rotas e funções críticas. Também se sugere uma estrutura clara com async/await e tratamento de erros consistente, facilitando a manutenção e leitura do código assíncrono do Node.js. 

Quanto ao banco de dados, embora o MongoDB seja uma boa escolha para dados flexíveis, deve-se monitorar as limitações do Prisma Client com esse tipo de banco. Caso necessário, o uso do Mongoose pode ser avaliado para maior estabilidade e suporte. Ainda, é essencial configurar autenticação reforçada, backups automáticos e práticas seguras de acesso mesmo na versão gratuita do serviço. 

Por fim, adotar ferramentas de monitoramento (como logs centralizados e métricas básicas) e preparar a infraestrutura para CI/CD com testes e deploy automatizados contribuirá para maior qualidade e confiabilidade do sistema como um todo. 

# Responsabilidades/ Atribuições

Alicia

- Diagrama de caso de uso
- Arquitetura Mobile
- Potencialidades e oportunidades de melhorias para o processo de negócio.
- Telas: listagem de usuários
  
Elisabete

- Requisitos funcionais e não funcionais
- Modelo relacional da aplicação
- Cronograma de custos
- Telas: Cadastro Profissionais
- Considerações finais

Danilo

- Personas e histórias de usuários
- Interface e fluxo de telas
- Desenvolvimento Back-end
- Banco de Dados
- Telas: Home, Login e Cadastro
- Refatoração do código
- Slides e vídeos para apresentação

Isabella

- Cronograma de tarefas
- Diagrama de classes
- BPMN da situação atual do projeto
- BPMN da situação futura do projeto
- Descrever e analisar a situação atual do projeto de negócio
- Telas: Alterar Perfil Paciente e Profissional
- Documentação de testes
- Considerações finais

Nickolas

- Contextualização de Projeto
- Documentação tecnologias utilizadas
- Cronograma pessoal envolvido
- Documentação de testes
- Telas: Cadastro Paciente