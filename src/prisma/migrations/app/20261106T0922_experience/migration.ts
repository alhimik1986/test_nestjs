#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/20ea9d1a86957602d50326d92e833129ac252ad1f97b4642b3f7b20b40d56926/contract';
import endContract from '../../snapshots/20ea9d1a86957602d50326d92e833129ac252ad1f97b4642b3f7b20b40d56926/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/7ba8604527682b0447540dec35a4ea11f807b067e70970dd67c30a778e9f72d1/contract';
import startContract from '../../snapshots/7ba8604527682b0447540dec35a4ea11f807b067e70970dd67c30a778e9f72d1/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Experience',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('company', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('position', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('startDate', 'date', { notNull: true, codecRef: { codecId: 'pg/date-temporal@1' } }),
          col('endDate', 'date', { codecRef: { codecId: 'pg/date-temporal@1' } }),
          col('achievements', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('profileId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Experience',
        index: 'Experience_profileId_idx_d9cdfcaf',
        columns: ['profileId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Experience',
        foreignKey: {
          name: 'Experience_profileId_fkey',
          columns: ['profileId'],
          references: { schema: 'public', table: 'Profile', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
