# Biblioteca Pessoal - CRUD de Livros

## Descrição

Esta aplicação é um CRUD (Create, Read, Update, Delete) que utiliza uma API REST para permitir aos usuários gerenciar sua lista de livros de forma eficiente.

## Tecnologias Utilizadas

As tecnologias empregadas neste projeto incluem:

- **C# .NET 7**: Linguagem de programação principal.
- **EF Core**: Framework de mapeamento objeto-relacional (ORM) para interação com o banco de dados.
- **Fluent Validator**: Biblioteca para validação de dados.
- **Angular**: Framework para construção do frontend.
- **HTML e CSS**: Linguagens de marcação e estilo para a interface do usuário.
- **SqlServer**: Sistema de gerenciamento de banco de dados relacional.

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

![Imagem da página principal](https://imgur.com/a/sPHuWvu)