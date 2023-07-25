import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnActiveTableCart1689851207320
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cart',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cart', 'active');
  }
}
