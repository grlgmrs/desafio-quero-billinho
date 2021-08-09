import { IBaseRepository } from '@shared/base-repository/ibase-repository';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../entities/student.entity';

export interface IStudentsRepository extends IBaseRepository<Student> {
  create(createStudentDto: CreateStudentDto): Student;

  save(student: Student | CreateStudentDto): Promise<Student>;
}
