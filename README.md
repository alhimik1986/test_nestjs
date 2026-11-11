# Цифровая визитка (Тестовое задание)

## В приложении я использовал:
- **Prisma 8 и модуль db.ts** — для доступа к БД из любого места без Injectable.
- **DataloaderModule** — для жадной загрузки связанных данных в GraphQL
- **node_modules** - вынес в отдельный volume для быстрого запуска команд prisma и nest,
 а также для универсальной разработки под Windows и Linux. После изменений в package.json рекомендуется выполнить
команду (в корне проекта) `docker cp app:/app/node_modules . `, чтобы скопировать (и обновить) node_modules из контейнера к себе в проект.

## Запуск
```bash
cp .env.example .env
docker compose up -d
docker exec -it app npx prisma db migrate
```

## Заполнить базу тестовыми данными
```bash
docker exec -it app npx tsx src/prisma/seed.ts
```
