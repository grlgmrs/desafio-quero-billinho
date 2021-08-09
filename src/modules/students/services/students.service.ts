import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/ipaginate';
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
    return this.studentRepo.paginate(paginateRequestDto);
  }
}
