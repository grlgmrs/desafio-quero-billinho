import { CreateEnrollmentDto } from '@modules/enrollments/dto/create-enrollment.dto';
import { Enrollment } from '@modules/enrollments/entities/enrollment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@shared/base-repository/base-repository';
import { IFindManyOptions } from '@shared/base-repository/helpers/paginate-helper/ipaginate';
import { IEnrollmentRepository } from './ienrollments-repository';

export class EnrollmentsRepository
  extends BaseRepository<Enrollment>
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
