import { IFindManyOptions } from '@shared/helpers/paginate-helper/ipaginate';
import { PaginateEntity } from '@shared/helpers/paginate-helper/paginate-entity';
import { fakePromise } from '@shared/utils/faker/fake-promise';
import { CreateEnrollmentDto } from '../../dto/create-enrollment.dto';
import { Enrollment } from '../../entities/enrollment.entity';
import { IBillRepository } from '../bills/ibill-repository';
import { IEnrollmentRepository } from './ienrollments-repository';

export class EnrollmentsFakeRepository
  extends PaginateEntity<Enrollment>
  implements IEnrollmentRepository
{
  private enrollments: Enrollment[] = [];

  constructor(private billRepo: IBillRepository) {
    super();
  }

  create(createEnrollmentDto: CreateEnrollmentDto): Enrollment {
    return new Enrollment(createEnrollmentDto);
  }

  async save(enrollment: Enrollment): Promise<Enrollment> {
    const newEnrollment = new Enrollment(enrollment);

    if (enrollment.bills) {
      newEnrollment.bills = await this.billRepo.save(enrollment.bills);
    }

    newEnrollment.id = this.enrollments.length + 1;
    this.enrollments.push(newEnrollment);

    return fakePromise<Enrollment>(newEnrollment);
  }

  findAndCount({
    skip,
    take,
  }: IFindManyOptions): Promise<[Enrollment[], number]> {
    return fakePromise([
      this.enrollments.splice(skip, take),
      this.enrollments.length,
    ]);
  }

  getLastId(): number {
    return this.enrollments.length;
  }
}
