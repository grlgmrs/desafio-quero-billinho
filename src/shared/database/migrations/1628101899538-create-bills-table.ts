import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBillsTable1628101899538 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bills',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'amount',
            type: 'int',
          },
          {
            name: 'due_date',
            type: 'timestamptz',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'enrollment_id',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'bills',
      new TableForeignKey({
        name: 'bill_enrollment_id_foreign_key',
        columnNames: ['enrollment_id'],
        referencedTableName: 'enrollments',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'bills',
      'enrollment_student_id_foreign_key',
    );

    await queryRunner.dropTable('bills');
  }
}
