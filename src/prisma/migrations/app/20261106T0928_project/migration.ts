#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/20ea9d1a86957602d50326d92e833129ac252ad1f97b4642b3f7b20b40d56926/contract';
import startContract from '../../snapshots/20ea9d1a86957602d50326d92e833129ac252ad1f97b4642b3f7b20b40d56926/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/74f75e2fa6b4d062d41cdfd6ae7efbd07eaab775ba56b40f9301078d1e646902/contract';
import endContract from '../../snapshots/74f75e2fa6b4d062d41cdfd6ae7efbd07eaab775ba56b40f9301078d1e646902/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Project',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('profileId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Project',
        index: 'Project_profileId_idx_d9cdfcaf',
        columns: ['profileId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Project',
        foreignKey: {
          name: 'Project_profileId_fkey',
          columns: ['profileId'],
          references: { schema: 'public', table: 'Profile', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
