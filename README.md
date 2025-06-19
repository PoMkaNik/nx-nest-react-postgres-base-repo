# Nx-Nest-React-PostgreSQL Base Repository

Базовый monorepo проект для разработки full-stack приложений с использованием современного технологического стека.

## 🏗️ Архитектура проекта

Проект построен на основе **Nx monorepo** и включает в себя:

### 📱 Приложения (`apps/`)

-   **`be-api-main`** - Backend API сервер (NestJS)
-   **`fe-main`** - Frontend приложение (React)

### 📚 Библиотеки (`libs/`)

-   **`common`** - Общие константы, енамы и утилиты
-   **`nest-shared`** - Разделяемые компоненты для NestJS (DTO, сервисы, конфигурации БД, Swagger декораторы)
-   **`sdk`** - SDK для работы с API и вспомогательные утилиты
-   **`eslint-plugin`** - Кастомные правила ESLint для проекта

### 🐳 Инфраструктура (`docker/`, `packages/`)

-   **`docker/`** - Docker конфигурации для приложений
-   **`packages/postgresdb/`** - Конфигурация PostgreSQL базы данных

## 🚀 Быстрый старт

### Системные требования

-   **Node.js**: 22.13.1 (строго)
-   **pnpm**: последняя версия
-   **Docker**: для запуска базы данных

### Установка зависимостей

```bash
pnpm install
```

### Настройка локального окружения

Перед первым запуском необходимо настроить файлы локального окружения:

#### 1. Скопируйте файлы примеров конфигураций:

```bash
# Корневой файл конфигурации приложения
cp .env.local.example .env.local

# Docker конфигурация для базы данных
cp docker/.env.local.example docker/.env.local
```

#### 2. Настройте переменные в `.env.local`:

```bash
# База данных
NX_DB_HOST=localhost
NX_DB_SCHEMA=public
NX_DB_LOGGING=all
# необходимо поменять на свои данные
NX_DB_PORT=5432
NX_DB_NAME=your_database_name     # замените на имя вашей БД
NX_DB_USER=your_db_user           # замените на ваше имя пользователя
NX_DB_PASS=your_db_password       # замените на ваш пароль
```

#### 3. Настройте переменные в `docker/.env.local`:

```bash
# База данных (SU) для Docker
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_postgres_password    # замените на ваш пароль
```

**⚠️ Важно:** Убедитесь, что пользователи суперпользователя (`POSTGRES_USER`) и бэкенда (`NX_DB_USER`) **отличаются**.

#### 4. Запустите Docker контейнеры:

```bash
# Запуск всех сервисов (включая PostgreSQL)
pnpm docker:up

# Или только базу данных
pnpm docker:up:db

# Остановка всех сервисов
pnpm docker:down
```

### Запуск в development режиме

```bash
# Запуск всех проектов одновременно
pnpm all:watch

# Только backend проекты
pnpm be:watch

# Только конкретный backend API
pnpm be:api:watch

# Только frontend проекты
pnpm fe:watch
```

### Сборка для production

```bash
# Сборка всех приложений
pnpm all:build

# Сборка только backend проектов
pnpm be:build

# Сборка только frontend проектов
pnpm fe:build
```

## 🛠️ Основные команды

### Разработка

```bash
# Линтинг всех проектов
pnpm all:lint

# Тестирование (affected проекты)
pnpm pre-push:test

# Интерактивный коммит с валидацией
pnpm dev:commit
```

### API и документация

```bash
# Генерация OpenAPI схемы для backend
pnpm be:openapi

# Генерация TypeScript типов из OpenAPI для frontend
pnpm fe:openapi
```

### Работа с базой данных

```bash
# Создание новой миграции
pnpm mig:create MigrationName

# Генерация миграции на основе изменений в entities
pnpm mig:gen MigrationName

# Применение миграций
pnpm mig:up

# Применение миграций с подтверждением
pnpm mig:up:cd

# Откат миграций
pnpm mig:down

# Просмотр статуса миграций
pnpm mig:show

# Прямая работа с TypeORM CLI
pnpm typeorm [команда]
```

## 🔧 Стек технологий

### Backend

-   **NestJS** - Framework для Node.js
-   **TypeORM** - ORM для работы с базой данных
-   **PostgreSQL** - База данных
-   **Swagger** - API документация
-   **Class Validator/Transformer** - Валидация и трансформация данных

### Frontend

-   **React 19** - UI библиотека
-   **TypeScript** - Типизированный JavaScript
-   **Emotion** - CSS-in-JS стилизация
-   **Webpack** - Сборщик модулей

### DevOps и Инструменты

-   **Docker** - Контейнеризация
-   **Nx 21.2.0** - Monorepo management
-   **pnpm** - Менеджер пакетов
-   **ESLint + Prettier** - Линтинг и форматирование кода
-   **Husky + Commitlint** - Git hooks и валидация коммитов
-   **TypeScript** - Статическая типизация

## 📖 Структура проекта

### Backend (`apps/be-api-main/`)

-   `src/api.module.ts` - Корневой модуль приложения
-   `src/config/` - Конфигурации приложения
-   `src/controllers/` - REST контроллеры
-   `src/services/` - Бизнес логика
-   `scripts/` - Вспомогательные скрипты (генерация Swagger)

### Frontend (`apps/fe-main/`)

-   `src/app/` - Основное приложение React
-   `src/assets/` - Статические ресурсы

### Общие библиотеки (`libs/`)

#### `common/`

-   Константы статус-кодов
-   Енамы для сортировки
-   Утилиты для работы с датами

#### `nest-shared/`

-   Базовые классы для entities и DTO
-   Конфигурация базы данных и миграций
-   Swagger декораторы и схемы
-   Трансформеры для валидации

#### `sdk/`

-   Утилиты для работы со строками
-   Константы форматов дат
-   Типы на уровне типов (typelevel)

#### `eslint-plugin/`

-   Кастомные правила ESLint
-   Конфигурации для различных типов проектов

## 🤝 Правила разработки

### Архитектурные принципы

-   **Типобезопасность**: Строгая типизация TypeScript во всех компонентах
-   **Модульность**: Разделение на переиспользуемые библиотеки
-   **Валидация**: Использование class-validator и типизированных DTO
-   **Документация**: Автогенерация OpenAPI схем

### Соглашения по коду

1. **Язык комментариев и документации**: Русский
2. **Типизация**: Обязательная строгая типизация
3. **Импорты**: Группировка по типам (external, internal, relative)
4. **Валидация**: Использование декораторов и пайпов
5. **Названия**: Entities во множественном числе, DTO с соответствующими суффиксами

### Линтинг и форматирование

Проект использует строгие правила ESLint с поддержкой:

-   Airbnb конфигурации
-   TypeScript правил
-   React/Hooks правил
-   Автоматического удаления неиспользуемых импортов

## 📝 Соглашения по коммитам

Проект использует [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(auth): добавлена аутентификация через JWT
fix(api): исправлена ошибка валидации в контроллере
docs(readme): обновлена документация
refactor(common): вынесены общие утилиты в отдельную библиотеку
```

Доступные типы:

-   `feat` - новая функциональность
-   `fix` - исправление ошибок
-   `docs` - изменения в документации
-   `refactor` - рефакторинг кода
-   `test` - добавление тестов
-   `chore` - обновление зависимостей, конфигурации

## 🚦 CI/CD

Проект настроен с автоматизацией:

-   **Pre-commit hooks**: Линтинг, форматирование, сборка affected проектов
-   **Commit validation**: Проверка соответствия соглашениям
-   **Affected builds**: Сборка только измененных проектов
-   **Docker builds**: Готовые образы для deployment

## 🔗 Полезные ссылки

-   [Nx Documentation](https://nx.dev)
-   [NestJS Documentation](https://docs.nestjs.com)
-   [React Documentation](https://react.dev)
-   [TypeORM Documentation](https://typeorm.io)

## 📞 Поддержка

Для вопросов по разработке:

1. Изучите документацию в соответствующих директориях
2. Проверьте существующие примеры в кодебазе
3. Создайте issue с подробным описанием проблемы

## 🚧 Развитие проекта

Этот репозиторий служит базой для быстрого старта full-stack проектов. При использовании:

1. Скопируйте репозиторий
2. Обновите `package.json` (название, описание)
3. Настройте переменные окружения
4. Добавьте необходимую бизнес-логику
5. Обновите данную документацию под ваш проект
