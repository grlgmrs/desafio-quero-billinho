import { PaginateRequestDto } from '@shared/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/helpers/paginate-helper/ipaginate';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../entities/student.entity';

export interface IStudentsService {
  create(createStudentDto: CreateStudentDto): Promise<{ id: number }>;

  findAll(paginateRequestDto: PaginateRequestDto): Promise<IPaginate<Student>>;
}
