import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEnrollmentsTable1628100504355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'enrollments',
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
            name: 'installments',
            type: 'int',
          },
          {
            name: 'due_day',
            type: 'int',
          },
          {
            name: 'student_id',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'enrollments',
      new TableForeignKey({
        name: 'enrollment_student_id_foreign_key',
        columnNames: ['student_id'],
        referencedTableName: 'students',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'enrollments',
      'enrollment_student_id_foreign_key',
    );

    await queryRunner.dropTable('enrollments');
  }
}
