#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/7ba8604527682b0447540dec35a4ea11f807b067e70970dd67c30a778e9f72d1/contract';
import endContract from '../../snapshots/7ba8604527682b0447540dec35a4ea11f807b067e70970dd67c30a778e9f72d1/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/bae4d767c5fabae30fb6a99a114c13ecf289d9e9f44844c681cea5f99db4ae30/contract';
import startContract from '../../snapshots/bae4d767c5fabae30fb6a99a114c13ecf289d9e9f44844c681cea5f99db4ae30/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Skill',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('profileId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Skill',
        index: 'Skill_profileId_idx_d9cdfcaf',
        columns: ['profileId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Skill',
        foreignKey: {
          name: 'Skill_profileId_fkey',
          columns: ['profileId'],
          references: { schema: 'public', table: 'Profile', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
