import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStudentsTable1628033173860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          { name: 'id', type: 'int', isPrimary: true },
          { name: 'name', type: 'varchar' },
          { name: 'cpf', type: 'varchar', isUnique: true },
          { name: 'birthdate', type: 'timestamptz', isNullable: true },
          { name: 'payment_method', type: 'varchar' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('students');
  }
}
