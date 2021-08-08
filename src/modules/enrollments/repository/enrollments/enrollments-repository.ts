import { CreateEnrollmentDto } from '@modules/enrollments/dto/create-enrollment.dto';
import { Enrollment } from '@modules/enrollments/entities/enrollment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IFindManyOptions } from '@shared/helpers/paginate-helper/ipaginate';
import { PaginateEntity } from '@shared/helpers/paginate-helper/paginate-entity';
import { IEnrollmentRepository } from './ienrollments-repository';

export class EnrollmentsRepository
  extends PaginateEntity<Enrollment>
  implements IEnrollmentRepository
{
  constructor(
    @InjectRepository(Enrollment) private enrollmentRepo: IEnrollmentRepository,
  ) {
    super();
  }

  create(createEnrollmentDto: CreateEnrollmentDto): Enrollment {
    return this.enrollmentRepo.create(createEnrollmentDto);
  }

  save(enrollment: Enrollment): Promise<Enrollment> {
    return this.enrollmentRepo.save(enrollment);
  }

  findAndCount(options?: IFindManyOptions): Promise<[Enrollment[], number]> {
    return this.enrollmentRepo.findAndCount(options);
  }
}
