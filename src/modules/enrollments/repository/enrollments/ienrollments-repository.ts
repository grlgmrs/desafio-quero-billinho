import { CreateEnrollmentDto } from '@modules/enrollments/dto/enrollments/create-enrollment.dto';
import { Enrollment } from '@modules/enrollments/entities/enrollment.entity';
import { IBaseRepository } from '@shared/base-repository/ibase-repository';

export interface IEnrollmentRepository extends IBaseRepository<Enrollment> {
  create(createEnrollmentDto: CreateEnrollmentDto): Enrollment;

  save(enrollment: Enrollment): Promise<Enrollment>;
}
