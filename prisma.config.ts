import 'dotenv/config';
import { definePrismaConfig } from 'prisma/config';
import { defineConfig as definePostgresConfig } from '@prisma/orm-postgres/config';


process.loadEnvFile('./.env');
if (!process.env['DATABASE_URL']) {
  throw new Error('DATABASE_URL is not set');
}

// noinspection JSUnusedGlobalSymbols
export default definePrismaConfig({
  orm: definePostgresConfig({
    contract: './src/prisma/contract.prisma',

    db: {
      connection: process.env['DATABASE_URL']!,
    },

    migrations: {
      dir: './src/prisma/migrations',
    },

    output: './src/prisma/generated',
  }),

  skills: {
    check: false,
  },
});
