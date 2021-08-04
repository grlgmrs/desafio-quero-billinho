import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Paginate,
  PaginateHelper,
  PaginateRequestDto,
} from '../../shared/paginate';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentRepo.save(createStudentDto);

    return { id: student.id };
  }

  async findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<Paginate<Student>> {
    const paginateHelper = new PaginateHelper(this.studentRepo);

    return paginateHelper.paginate(paginateRequestDto);
  }
}
