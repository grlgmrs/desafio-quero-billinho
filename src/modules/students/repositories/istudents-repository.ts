import { IPaginateRepository } from '@shared/helpers/paginate-helper/ipaginate';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../entities/student.entity';

export interface IStudentsRepository extends IPaginateRepository<Student> {
  create(createStudentDto: CreateStudentDto): Student;

  save(student: Student): Promise<Student>;
  save(student: CreateStudentDto): Promise<Student>;
}
