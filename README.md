# Techpines

Api desenvolvida para o processo seletivo da Techpines de Treeine, empresa de desenvolvimento de software,
consiste em um backend em Laravel 11 com Laravel Sail e um frontend em React. O backend está localizado na pasta `backend/project` e o frontend na pasta `frontend`.

## Estrutura do Projeto

- **Backend:** Laravel 11 com Laravel Sail
  - Localização: `backend/project`
- **Frontend:** React
  - Localização: `frontend`

## Tecnologias Utilizadas

### Backend
  <img src="https://github.com/user-attachments/assets/2dd9cb8e-1fb2-4275-881d-911e0cc243e2" alt="Laravel Logo" width="30" height="30">
  <img src="https://github.com/user-attachments/assets/ec4eba85-e574-4e05-9617-3b04a5a9d868" alt="Docker Logo" width="30" height="30">
  <img src="https://github.com/user-attachments/assets/d104c9c0-48e5-49cf-bbc1-908ddc5c5b22" alt="Postrgres Logo" width="30" height="30">

### Frontend
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React Logo" width="30" height="30">

## Requisitos

- Docker e Docker Compose
- Node.js e npm (ou yarn)

## Configuração do Backend (Laravel 11 com Laravel Sail)

1. **Navegue até a pasta do backend:**

    ```bash
    cd backend/project/
    ```

2. **Instale as dependências do Laravel Sail:**

    Se você ainda não tiver o Laravel Sail instalado, adicione-o ao projeto:

    ```bash
    composer require laravel/sail --dev
    ```

    Em seguida, publique o arquivo de configuração do Sail:

    ```bash
    php artisan sail:install
    ```

3. **Configure o ambiente:**

    - Copie o arquivo `.env.example` para `.env`:

      ```bash
      cp .env.example .env
      ```

    - Verifique e ajuste as variáveis de ambiente no arquivo `.env` conforme necessário. Por exemplo, configure a conexão com o banco de dados.

4. **Inicie o ambiente Docker com Sail:**

    ```bash
    ./vendor/bin/sail up
    ```

    Este comando iniciará o Docker e os serviços necessários para o Laravel, como o servidor web e o banco de dados.

5. **Execute as migrações do banco de dados (dentro do container Sail):**

    ```bash
    ./vendor/bin/sail artisan migrate
    ```

   O backend estará disponível em `http://localhost`.

## Configuração do Frontend (React)

1. **Navegue até a pasta do frontend:**

    ```bash
    cd frontend/
    ```

2. **Instale as dependências do React:**

    ```bash
    npm install
    ```

    ou, se estiver usando yarn:

    ```bash
    yarn install
    ```

3. **Inicie o servidor de desenvolvimento do React:**

    ```bash
    npm start
    ```

    ou, se estiver usando yarn:

    ```bash
    yarn start
    ```

   O frontend estará disponível em `http://localhost:3000`.

## Considerações Finais

- O backend (Laravel Sail) e o frontend precisam estar rodando simultaneamente para que a aplicação funcione corretamente.
- Verifique os arquivos de configuração e as variáveis de ambiente para garantir que estejam configurados corretamente.
- A parte de recuperação de senha não foi desenvolvida a tempo, então caso perca a senha é necessário criar uma nova conta com um novo email.
- A senha de seu usuário precisa ter no mínimo 8 caracteres.
- Para parar os containers do Docker, use:

  ```bash
  ./vendor/bin/sail down
