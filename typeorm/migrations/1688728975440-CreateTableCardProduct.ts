import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableCardProduct1688728975440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart_product',
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
            name: 'cart_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'product_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'cart_product',
      new TableForeignKey({
        columnNames: ['cart_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cart',
      }),
    );

    await queryRunner.createForeignKey(
      'cart_product',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cart_product');
  }
}
