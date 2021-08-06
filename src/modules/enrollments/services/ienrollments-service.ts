import { IPaginate, PaginateRequestDto } from '@shared/helpers/paginate-helper';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { Enrollment } from '../entities/enrollment.entity';
import { IEnrollmentRepository } from '../repository/ienrollments-repository';

export interface IEnrollmentsService {
  create(
    createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<IEnrollmentRepository>;

  findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<Enrollment>>;
}
