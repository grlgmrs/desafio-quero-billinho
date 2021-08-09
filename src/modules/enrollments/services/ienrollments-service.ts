import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/ipaginate';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { Enrollment } from '../entities/enrollment.entity';
import { IEnrollmentRepository } from '../repository/enrollments/ienrollments-repository';

export interface IEnrollmentsService {
  create(
    createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<IEnrollmentRepository>;

  findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<Enrollment>>;
}
