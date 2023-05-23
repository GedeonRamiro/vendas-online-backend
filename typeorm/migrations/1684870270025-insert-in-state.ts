import { MigrationInterface, QueryRunner } from 'typeorm';

const newDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

export class InsertInState1684870270025 implements MigrationInterface {
  insertTbale =
    'INSERT INTO state (`id`, `name`, `uf`, `created_at`, `updated_at`) VALUES ';
  states = `(1, 'Acre', 'AC', '${newDate}', '${newDate}'),
  (2, 'Alagoas', 'AL', '${newDate}','${newDate}'),
  (3, 'Amazonas', 'AM', '${newDate}', '${newDate}'),
  (4, 'Amapá', 'AP', '${newDate}', '${newDate}'),
  (5, 'Bahia', 'BA', '${newDate}', '${newDate}'),
  (6, 'Ceará', 'CE', '${newDate}','${newDate}'),
  (7, 'Distrito Federal', 'DF', '${newDate}','${newDate}'),
  (8, 'Espírito Santo', 'ES', '${newDate}','${newDate}'),
  (9, 'Goiás', 'GO', '${newDate}','${newDate}'),
  (10, 'Maranhão', 'MA','${newDate}', '${newDate}'),
  (11, 'Minas Gerais', 'MG','${newDate}','${newDate}'),
  (12, 'Mato Grosso do Sul', 'MS', '${newDate}', '${newDate}'),
  (13, 'Mato Grosso', 'MT', '${newDate}', '${newDate}'),
  (14, 'Pará', 'PA', '${newDate}', '${newDate}'),
  (15, 'Paraíba', 'PB', '${newDate}', '${newDate}'),
  (16, 'Pernambuco', 'PE', '${newDate}', '${newDate}'),
  (17, 'Piauí', 'PI', '${newDate}', '${newDate}'),
  (18, 'Paraná', 'PR', '${newDate}', '${newDate}'),
  (19, 'Rio de Janeiro', 'RJ', '${newDate}', '${newDate}'),
  (20, 'Rio Grande do Norte', 'RN', '${newDate}', '${newDate}'),
  (21, 'Rondônia', 'RO', '${newDate}', '${newDate}'),
  (22, 'Roraima', 'RR', '${newDate}', '${newDate}'),
  (23, 'Rio Grande do Sul', 'RS', '${newDate}', '${newDate}'),
  (24, 'Santa Catarina', 'SC', '${newDate}', '${newDate}'),
  (25, 'Sergipe', 'SE', '${newDate}', '${newDate}'),
  (26, 'São Paulo', 'SP', '${newDate}', '${newDate}'),
  (27, 'Tocantins', 'TO', '${newDate}', '${newDate}')`;

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ${this.insertTbale}  ${this.states}
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
