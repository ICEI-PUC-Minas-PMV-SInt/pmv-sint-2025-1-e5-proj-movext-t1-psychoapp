# Projeto de Interface

## Fluxo de telas da aplicação

O fluxo do usuário previsto para as telas do sistema segue no esquema abaixo:

<a href="img/fluxo-telas-diagrama.jpg"><img width="1000" src="img/fluxo-telas-diagrama.jpg"></a>

O diagrama acima, além de exibir o fluxo de telas previsto para o usuário, conta com um índice que numera cada uma das telas do sistema a fim de identifica-las de acordo com o protótipo de alta fidelidade que segue abaixo.

### Tela 01 - Homepage

Tela inicial da aplicação

<a href="img/Telas/tela_1.jpg"><img width="350px" src="img/Telas/tela_1.jpg"></a>

### Tela 02 - Login

Tela de login da aplicação, quando o login é bem-sucedido o Token JWT é gerado e armazenado no lado cliente para verificação nas rotas privadas.

<a href="img/Telas/tela_2.jpg"><img width="350px" src="img/Telas/tela_2.jpg"></a>

### Tela 03 - Cadastro Usuário

Tela para cadastrar um usuário geral, dependendo da escolha do usuário no Radio Button "Paciente" ou "Psicopedagogo" a próxima tela será a especialização do perfil de acordo com essa escolha.

<a href="img/Telas/tela_3.jpg"><img width="350px" src="img/Telas/tela_3.jpg"></a>

### Tela 04 - Cadastro Especialização Usuário Profissional

Tela para seguir com o cadastro sendo um Profissional (Psicopedagogo).

<a href="img/Telas/tela_4.jpg"><img width="350px" src="img/Telas/tela_4.jpg"></a>

### Tela 05 - Cadastro Especialização Usuário Paciente

Tela para seguir com o cadastro sendo um Paciente.

<a href="img/Telas/tela_5.jpg"><img width="350px" src="img/Telas/tela_5.jpg"></a>

### Tela 06 - Listagem de Profissionais Disponíveis

Tela com a listagem de profissionais disponíveis, exibida apenas para perfis do tipo Paciente. Essa é uma rota privada, apenas com um Token JWT válido é possível acessá-la. Do contrário, a API retorna status 401, não autorizado.

<a href="img/Telas/tela_6.jpg"><img width="350px" src="img/Telas/tela_6.jpg"></a>

### Tela 07 - Listagem de Pacientes Disponíveis

Tela com a listagem de pacientes disponíveis, exibida apenas para perfis do tipo Profissional. Essa é uma rota privada, apenas com um Token JWT válido é possível acessá-la. Do contrário, a API retorna status 401, não autorizado.

<a href="img/Telas/tela_7.jpg"><img width="350px" src="img/Telas/tela_7.jpg"></a>

### Tela 08 - Alteração Dados Perfil Profissional

Tela para alterar os dados do perfil do tipo Profissional.

<a href="img/Telas/tela_8.jpg"><img width="350px" src="img/Telas/tela_8.jpg"></a>

### Tela 09 - Alteração Dados Perfil Paciente

Tela para alterar os dados do perfil do tipo Paciente.

<a href="img/Telas/tela_9.jpg"><img width="350px" src="img/Telas/tela_9.jpg"></a>