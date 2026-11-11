# Установить приложение (первый запуск)
install:
	mkdir -p .env && cp .env.example .env
	docker compose up -d
	docker exec -it app npx prisma db migrate

# Войти в контейнер приложения
cmd:
	docker exec -it app /bin/sh

# Запускать команду после каждого изменения в файле contract.prisma
prisma_contract_emit:
	docker exec -it app npx prisma contract emit

# Пример команды для создания новой миграции (после изменения в файле contract.prisma и запуска prisma_contract_emit)
migrate_plan:
	docker exec -it app npx prisma migration plan --name skill --from 20261105T1524_profile

# Запускать эту команду, если сделал изменения в файле миграции migration.ts, чтобы починить этот файл и сделать его валидным (команда обновляет хэши миграции)
prisma_update_hash:
	docker exec -it app node src/prisma/migrations/app/20261105T1817_profile/migration.ts

# Запустить миграции
migrate:
	docker exec -it app npx prisma db migrate

# Заполнить базу тестовыми данными
seed:
	docker exec -it app npx tsx src/prisma/seed.ts
