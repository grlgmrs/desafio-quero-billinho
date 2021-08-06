import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginate,
  PaginateHelper,
  PaginateRequestDto,
} from '@shared/helpers/paginate-helper';
import { CreateStudentDto } from '../dto/create-student.dto';
import { Student } from '../entities/student.entity';
import { IStudentsRepository } from '../repositories/istudents-repository';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepo: IStudentsRepository,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentRepo.save(createStudentDto);

    return { id: student.id };
  }

  async findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<Student>> {
    const paginateHelper = new PaginateHelper(this.studentRepo);

    return paginateHelper.paginate(paginateRequestDto);
  }
}
