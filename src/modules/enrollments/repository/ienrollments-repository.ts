import { IPaginateRepository } from '@shared/helpers/paginate-helper/ipaginate';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { Enrollment } from '../entities/enrollment.entity';

export interface IEnrollmentRepository extends IPaginateRepository<Enrollment> {
  create(createEnrollmentDto: CreateEnrollmentDto): Enrollment;

  save(enrollment: Enrollment): Promise<Enrollment>;
}
