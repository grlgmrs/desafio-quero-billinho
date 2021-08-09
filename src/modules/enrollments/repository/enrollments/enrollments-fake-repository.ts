import { BaseRepository } from '@shared/base-repository/base-repository';
import { IFindManyOptions } from '@shared/base-repository/helpers/paginate-helper/ipaginate';
import { fakePromise } from '@shared/utils/faker/fake-promise';
import { CreateEnrollmentDto } from '../../dto/create-enrollment.dto';
import { Enrollment } from '../../entities/enrollment.entity';
import { IBillRepository } from '../bills/ibill-repository';
import { IEnrollmentRepository } from './ienrollments-repository';

export class EnrollmentsFakeRepository
  extends BaseRepository<Enrollment>
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
    relations,
  }: IFindManyOptions): Promise<[Enrollment[], number]> {
    return fakePromise([
      this.withRelations(relations).splice(skip, take),
      this.enrollments.length,
    ]);
  }

  getLastId(): number {
    return this.enrollments.length;
  }

  private withRelations(relations: string[] = []): Enrollment[] {
    return this.enrollments.map((enrollment) => ({
      ...enrollment,
      bills: relations.includes('bills') ? enrollment.bills : [],
      student: relations.includes('student') ? enrollment.student : null,
    }));
  }
}
