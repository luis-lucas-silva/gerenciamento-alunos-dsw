# Sistema de Gerenciamento de Alunos
### Autor: Luis Lucas de Andrade Silva

#### Descrição: 
O projeto consiste em disponibilizar ao usuário uma interface que seja possível o cadastro de disciplinas, 
de alunos para as respectivas disciplinas e o lançamento ou alteração de notas de três avaliações, calculando
automaticamente a média das mesmas e informando o seu conceito, sendo eles: A, B, C, D e F. Por fim, uma aba 
de relatório em formato de tabela permitindo ao usuário analisar todos os alunos.

#### Funcionalidades:
- Cadastro de Disciplinas
- Cadastro de Alunos
- Lançamento de notas (filtro por: disciplina e posteriormente aluno)
- Alteração de notas (filtro por: disciplina e posteriormente aluno)
- Cálculo de média e conceito
- Relatório em forma de tabela (sem filtros)

#### Recursos utilizados:
- Frontend:
  - HTML 5
  - CSS 3
  - Javascript
- Backend:
  - PHP 
- Banco de dados:
  - MySQL 
- Webserver: 
  - Apache (disponibilizado pelo XAMPP)

### Disposição do diretório:
- backend
  - alunos
  - disciplinas
  - config
  - objects
    - aluno
    - disciplina
- frontend
  - alunos
    - lancarnotas
    - alterarnotas
  - disciplinas
  - relatorio
- database

#### Observações:
Para melhorar a experiência do usuário, o backend e frontend estão separados havendo somente ligação entre os dois através 
de chamadas HTTP e que retornam JSON, ou seja, o backend funciona de forma similar a uma API.

### Instalação:
Utilizando o XAMPP, basta apenas clonar o repositório dentro da pasta que ele executa o PHP, normalmente, a pasta htdocs.
