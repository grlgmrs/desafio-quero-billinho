import { fakePromise } from '@shared/utils/faker/fake-promise';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../entities/student.entity';
import { IStudentsRepository } from './istudents-repository';

export class StudentsFakeRepository implements IStudentsRepository {
  private studentsFake: Student[] = [];

  create(createStudentDto: CreateStudentDto): Student {
    return new Student(createStudentDto);
  }

  save(student: Student | CreateStudentDto): Promise<Student> {
    const newStudent = new Student(student);
    newStudent.id = this.studentsFake.length + 1;

    this.studentsFake.push(newStudent);

    return fakePromise<Student>(newStudent);
  }

  findAndCount(options?: {
    relations?: string[];
    take?: number;
    skip?: number;
  }): Promise<[Student[], number]> {
    const { take, skip } = options;

    return fakePromise([
      this.studentsFake.splice(skip!, take!),
      this.studentsFake.length,
    ]);
  }
}
