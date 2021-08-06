import { IPaginate, PaginateRequestDto } from '@shared/helpers/paginate-helper';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../entities/student.entity';

export interface IStudentsService {
  create(createStudentDto: CreateStudentDto): Promise<{ id: number }>;

  findAll(paginateRequestDto: PaginateRequestDto): Promise<IPaginate<Student>>;
}
