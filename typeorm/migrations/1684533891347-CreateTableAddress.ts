import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableAddress1684533891347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
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
            name: 'city_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'cep',
            type: 'varchar',
            length: '45',
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
      true,
    );

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'city',
      }),
    );

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address');
  }
}
