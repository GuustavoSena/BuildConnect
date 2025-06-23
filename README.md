# BuildConnect 🏗️

BuildConnect é uma plataforma full-stack desenvolvida como projeto acadêmico para a matéria de Banco de Dados 2. A aplicação visa criar um marketplace para conectar clientes a profissionais de serviços, facilitando a busca, contratação e avaliação de trabalhos no setor de construção e reforma.

## ✨ Funcionalidades Principais

-   **Autenticação Segura:** Sistema de login com autenticação baseada em JSON Web Tokens (JWT).
-   **Busca Otimizada:** Funcionalidade de pesquisa para encontrar posts e profissionais, com otimização de consulta via paginação no backend.
-   **Perfis Detalhados:** Páginas de perfil para profissionais, exibindo suas informações, nota média e os serviços que oferecem.
-   **Listagem de Serviços:** Catálogo de serviços e categorias para facilitar a navegação do usuário.
-   **Navegação Moderna:** Interface de página única (SPA) com roteamento do lado do cliente utilizando `react-router-dom`.
-   **Interface Responsiva:** Design construído com Tailwind CSS, adaptável para diferentes tamanhos de tela.

## 🛠️ Tecnologias Utilizadas

Este projeto é uma aplicação full-stack que utiliza um ecossistema de tecnologias modernas.

#### **Backend**
-   **Java 21**
-   **Spring Boot 3:** Framework principal para a construção da API REST.
-   **Spring Security:** Para gerenciamento de autenticação e autorização com JWT.
-   **Spring Data JPA (Hibernate):** Para persistência de dados e mapeamento objeto-relacional.
-   **MySQL 8:** Sistema de Gerenciamento de Banco de Dados relacional.
-   **Maven:** Gerenciador de dependências e build do projeto.
-   **Lombok:** Para reduzir código boilerplate em entidades e DTOs.

#### **Frontend**
-   **React 19** com **TypeScript**
-   **Vite:** Ferramenta de build e servidor de desenvolvimento de alta performance.
-   **Tailwind CSS:** Framework de CSS para estilização rápida e customizável.
-   **Axios:** Cliente HTTP para realizar as chamadas à API do backend.
-   **React Router DOM:** Para gerenciamento de rotas no lado do cliente.
-   **Phosphor Icons:** Biblioteca de ícones.

#### **Ambiente e DevOps**
-   **Docker & Docker Compose:** Para containerizar o banco de dados MySQL e o Adminer, garantindo um ambiente de desenvolvimento consistente e isolado.
-   **Adminer:** Ferramenta leve de gerenciamento de banco de dados via web.

## 📂 Estrutura do Projeto

O repositório está organizado em um formato de monorepo, contendo as duas principais partes da aplicação:

-   `buildconnect-backend/`: Contém todo o código-fonte da API em Spring Boot.
-   `buildconnect-frontend/`: Contém todo o código-fonte da aplicação em React.

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento completo na sua máquina.

### Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:
-   [**Java (JDK) 21**](https://www.oracle.com/java/technologies/downloads/#java21)
-   [**Maven 3.8+**](https://maven.apache.org/download.cgi)
-   [**Node.js v20+**](https://nodejs.org/en) (que inclui o `npm`)
-   [**Docker e Docker Compose**](https://www.docker.com/products/docker-desktop/)

### Guia de Instalação

1.  **Clone o Repositório**
    ```bash
    git clone [https://github.com/GuustavoSena/BuildConnect.git](https://github.com/GuustavoSena/BuildConnect.git)
    cd BuildConnect
    ```

2.  **Inicie o Ambiente Backend**
    
    O banco de dados e o Adminer rodam em contêineres Docker. O `docker-compose.yml` na raiz do backend já está configurado para usar o `dump.sql` e criar o banco com todos os dados necessários.

    a. **Inicie os Contêineres:** Navegue até a pasta do backend e suba os serviços com Docker Compose.
    ```bash
    cd buildconnect-backend
    docker-compose up -d
    ```
    O `-d` executa os contêineres em segundo plano. Aguarde um minuto para o banco de dados iniciar completamente.

    b. **Inicie a Aplicação Spring Boot:** Na mesma pasta (`buildconnect-backend`), use o Maven Wrapper para iniciar a API.
    ```bash
    # No Windows
    ./mvnw spring-boot:run

    # No macOS/Linux
    ./mvnw spring-boot:run
    ```
    A API estará rodando em `http://localhost:8081`.

3.  **Inicie o Ambiente Frontend**

    a. **Abra um novo terminal.** Não feche o terminal que está rodando o backend.

    b. **Navegue até a pasta do frontend e instale as dependências:**
    ```bash
    cd ../buildconnect-frontend
    npm install
    ```

    c. **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação React estará acessível em `http://localhost:5173`.

### Acesso às Ferramentas

-   **Aplicação Frontend:** [`http://localhost:5173`](http://localhost:5173)
-   **API Backend (Base URL):** `http://localhost:8081`
-   **Adminer (Gerenciador do Banco):** [`http://localhost:8080`](http://localhost:8080)
    -   **Sistema:** `MySQL`
    -   **Servidor:** `mysql-database` (o nome do serviço no Docker Compose)
    -   **Usuário:** `root`
    -   **Senha:** `1234` (a senha definida no `docker-compose.yml`)


## 📖 Endpoints Principais da API

| Método | Endpoint                    | Descrição                                         | Autenticação? |
| :----- | :-------------------------- | :------------------------------------------------ | :------------ |
| `POST` | `/Auth/Login`               | Autentica um usuário e retorna um token JWT.      | Não           |
| `GET`  | `/posts`                    | Lista os serviços de forma paginada.              | Não           |
| `GET`  | `/posts/{id}`               | Busca um serviço específico pelo ID.              | Não           |
| `GET`  | `/servicos`                 | Lista todas as categorias de serviço.             | Não           |
| `GET`  | `/professionals/{id}`       | Busca o perfil de um profissional pelo ID.        | Não           |
| `GET`  | `/search?query={termo}`     | Busca serviços/profissionais pelo termo enviado.  | Não           |
| `GET`  | `/users/me`                 | Retorna o perfil do usuário autenticado.          | **Sim** |
