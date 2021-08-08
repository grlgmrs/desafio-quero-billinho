import { InjectRepository } from '@nestjs/typeorm';
import { IFindManyOptions } from '@shared/helpers/paginate-helper/ipaginate';
import { PaginateEntity } from '@shared/helpers/paginate-helper/paginate-entity';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../entities/student.entity';
import { IStudentsRepository } from './istudents-repository';

export class StudentsRepository
  extends PaginateEntity<Student>
  implements IStudentsRepository
{
  constructor(
    @InjectRepository(Student) private studentsRepo: IStudentsRepository,
  ) {
    super();
  }

  create(createStudentDto: CreateStudentDto): Student {
    return this.studentsRepo.create(createStudentDto);
  }

  save(student: Student | CreateStudentDto): Promise<Student> {
    return this.studentsRepo.save(student);
  }

  findAndCount(options?: IFindManyOptions): Promise<[Student[], number]> {
    throw this.studentsRepo.findAndCount(options);
  }
}
