import { CreateEnrollmentDto } from '@modules/enrollments/dto/create-enrollment.dto';
import { Enrollment } from '@modules/enrollments/entities/enrollment.entity';
import { IPaginateRepository } from '@shared/helpers/paginate-helper/ipaginate';

export interface IEnrollmentRepository extends IPaginateRepository<Enrollment> {
  create(createEnrollmentDto: CreateEnrollmentDto): Enrollment;

  save(enrollment: Enrollment): Promise<Enrollment>;
}
