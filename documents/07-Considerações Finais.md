# Avaliação dos frameworks e tecnologias utilizadas no desenvolvimento do projeto:

React Native:
Framework de desenvolvimento de aplicativos moveis criada pelo Facebook que permite a criação de aplicativos para IOS e Android utilizando JavaScript e React.

Vantagens:

- Permite reutilizar grande parte do código entre IOS e Android, reduzindo o tempo de desenvolvimento.
- Usa componentes nativos, garantido uma experiencia fluida para os usuários.
- Tem suporte de uma comunidade ativa e do próprio Facebook facilitando encontrar soluções e bibliotecas úteis.
- Permite visualizar mudanças no código em tempo real, acelerando o desenvolvimento.

Desvantagens:

- Algumas funcionalidades exigem integração com o código nativo o que pode aumentar a complexidade.
- Para aplicativos que exigem gráficos ou processamento pesado, pode não ser uma boa opção.
- O React Native evolui rapidamente o que pode exigir ajustes contantes no código.

Expo Go:
Ambiente de testes que permite rodar aplicativos móveis com React Native diretamente no celular sem precisar configurar emulador ou compilar o código nativo. 

Vantagens:

- Não exige configuração complexa de ambiente.
- Permite visualizar mudanças no código em tempo real.
- Funciona tanto em Android quanto no IOS.

Desvantagens: 

- Inclui várias bibliotecas pré-instaladas (mesmo que não sejam usadas) tornando os apps maiores.
- Menos controle sobre ajustes específicos, uma vez que muitas configurações são feitas automaticamente pelo Expo Go.
- O Expo Go só suporta a versão mais recente do SDK o que pode gerar a necessidades de atualização do projeto para evitar incompatibilidades.

Node.js

Ambiente de execução de JavaScript que permite rodar código fora do navegador o que torna possível o desenvolvimento de aplicações no lado do servidor. Utiliza um modelo assíncrono e orientado a eventos.

Vantagens:

- Ideal para aplicações uqe precisam lidar com muitas conexões simultâneas, pois apresenta alta escalabilidade.
-  O vetor V8 do Chrome otimiza a execução do JavaScript tornando o Node.js rápido.
-  Conta com uma vasta comunidade de desenvolvedores e uma enorme quantidade de bibliotecas disponíveis via npm.
-  Permite o desenvolvimento full-stack, uma vez que é possível usar JavaScript tanto no fr0nt-end como no back-end.

Desvantagens:

- Pode apresentar dificuldades com tarefas que exigem alto processamento, já que usa uma única single-threaded.
- O uso excessivo de funções assíncronas pode tornar o código difícil de ler e manter.
- Sua dependência de pacotes externos pode trazer vulnerabilidades e problemas de segurança.