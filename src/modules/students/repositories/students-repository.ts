import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@shared/base-repository/base-repository';
import { IFindManyOptions } from '@shared/base-repository/helpers/paginate-helper/ipaginate';
import { Connection, Repository } from 'typeorm';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../entities/student.entity';
import { IStudentsRepository } from './istudents-repository';

export class StudentsRepository
  extends BaseRepository<Student>
  implements IStudentsRepository
{
  private studentsRepo: Repository<Student>;

  constructor(@InjectConnection() connection: Connection) {
    super();

    this.studentsRepo = connection.getRepository(Student);
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
