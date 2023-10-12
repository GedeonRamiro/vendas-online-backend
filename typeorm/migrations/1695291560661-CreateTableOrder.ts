import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableOrder1695291560661 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isUnique: true,
          },

          {
            name: 'user_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'payment_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        columnNames: ['address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'address',
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        columnNames: ['payment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'payment',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order');
  }
}
