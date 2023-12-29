# Biblioteca Pessoal - CRUD de Livros

## Descrição

Esta aplicação é um CRUD (Create, Read, Update, Delete) que utiliza uma API REST para permitir aos usuários gerenciar sua lista de livros de forma eficiente.

## Tecnologias Utilizadas

As tecnologias empregadas neste projeto incluem:

- **C# .NET 7**: Linguagem de programação principal.
- **EF Core**: Framework de mapeamento objeto-relacional (ORM) para interação com o banco de dados.
- **Fluent Validator**: Biblioteca para validação de dados.
- **SAPUI5**: Framework para construção do frontend.
- **XML**: Linguagem de marcação
- **SqlServer**: Sistema de gerenciamento de banco de dados relacional.

## Conceitos Utilizados

As conceitos empregados neste projeto incluem:

- **API REST**: Para a comunicação entre o back e front através do protocolo HTTP.
- **CLEAN ARCHITECTURE**: Para a melhor manutenção, desacoplamento dos projetos da aplicação e organização das estruturas.
- **ARQUITETURA MVC**: Usado no front-end para melhor compreensão, manutenção, escalabilidade e testabilidade.
- **PADRÃO REPOSITORY**: Para alcançar objetivos do SOLID, desacoplar classes e permitir uma comunicação escalável entre a aplicação e a fonte de dados.
- **INJEÇÃO DE DEPENDÊNCIA**: Para desacoplar as classes, facilitar a testabilidade e manutenção.

## Arquitetura do Projeto

O projeto está organizado seguindo o padrão Clean Architecture, dividido em três camadas distintas:

1. **Camada de Domínio:**
   - Contém o modelo de dados utilizado na aplicação.
   - Inclui as regras de validação utilizando o Fluent Validator.

2. **Camada de Infraestrutura:**
   - Repositório implementando o padrão Repository para facilitar a comunicação com a fonte de dados (SqlServer).
   - Configuração de conexão com o banco de dados.
   - Migrações para gerenciamento da estrutura do banco de dados.

3. **Camada WebApp:**
   - Utiliza o padrão MVC (Model-View-Controller) com Angular.
   - Implementa a API REST para interação com o frontend.
   - Integração com as camadas de Domínio e Infraestrutura.

Este design modular e organizado facilita a manutenção, teste e evolução do projeto, garantindo uma separação clara de responsabilidades entre as diferentes partes da aplicação.

## IMAGENS DO PROJETO       

1. **Tela de Listagem:**  

![Imagem da página principal](https://imgur.com/5hiUNWL.png)     
A imagem acima mostra como é a página inicial do site. Contendo duas listas, cada uma sendo populada por um modelo JSON diferente que é filtrado usando a coluna de status (Lido/Nao Lido) através do Fetch.    
Os 3 pontos em cada cabeçalho da lista exibem uma barra de pesquisa através do título, e essa pesquisa é feita através dos dados do banco, e não dos dados presentes na view. Evitando, assim, possíveis conflitos de dados. 


2. **Tela de Detalhes:**      

Ao clicar em um item da lista, o usuário é redirecionado para a página de detalhes do livro selecionado. Como podemos ver a seguir:          
![Imagem da página de detalhes](https://imgur.com/c4ldWSp.png)     


3. **Tela de Cadastro**       

A tela de cadastro pode ser vista abaixo. E passará por validações em todos os seus campos, garantindo a segurança e consistência dos dados na parte do front-end. Que, juntando com a validação feita no .NET, permite que a aplicação seja mais segura e consistente.     
![Imagem da página de cadastro](https://i.imgur.com/TVlN8jL.png)