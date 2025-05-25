# basic-nodejs-mitso

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package
  manager.
- Docker и Docker Compose - [Download & Install Docker](https://docs.docker.com/get-docker/) и [Docker Compose](https://docs.docker.com/compose/install/).

## Downloading

```
git clone {repository URL}
```

## Способы запуска приложения

### 1. Запуск локально

#### Installing NPM modules

```
npm install
```

#### Running application

```
npm start
```

### 2. Запуск с использованием Docker

#### Запуск всех контейнеров

```
docker-compose up -d
```

Это запустит:
- REST API приложение на Express (доступно по адресу http://localhost:4000)
- PostgreSQL базу данных (доступна на порту 5432)
- pgAdmin для управления базой данных (доступен по адресу http://localhost:5050)

#### Остановка контейнеров

```
docker-compose down
```

#### Остановка контейнеров с удалением томов

```
docker-compose down -v
```

#### Просмотр логов контейнеров

```
docker-compose logs
```

Для просмотра логов конкретного сервиса:

```
docker-compose logs app
docker-compose logs postgres
docker-compose logs pgadmin
```

#### Доступ к pgAdmin

1. Откройте http://localhost:5050 в браузере
2. Войдите, используя параметры из .env файла:
   - Email: admin@example.com (PGADMIN_DEFAULT_EMAIL)
   - Password: admin (PGADMIN_DEFAULT_PASSWORD)
3. Добавьте новый сервер со следующими параметрами:
   - Имя: tours-postgres
   - Хост: postgres (имя сервиса в docker-compose)
   - Порт: 5432
   - База данных: tours_db (POSTGRES_DB из .env)
   - Имя пользователя: postgres (POSTGRES_USER из .env)
   - Пароль: postgres (POSTGRES_PASSWORD из .env)

## Development

If you're using VSCode, you can get a better developer experience from integration with
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
