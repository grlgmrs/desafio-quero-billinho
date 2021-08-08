import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { Bill } from '../entities/bill.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { PaginateRequestDto } from '@shared/helpers/paginate-helper/dto/paginate-request.dto';
import { IPaginate } from '@shared/helpers/paginate-helper/ipaginate';
import { IEnrollmentRepository } from '../repository/enrollments/ienrollments-repository';
import { IBillRepository } from '../repository/bills/ibill-repository';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: IEnrollmentRepository,
    @InjectRepository(Bill)
    private billRepo: IBillRepository,
  ) {}

  create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    const enrollment = this.enrollmentRepo.create(createEnrollmentDto);

    enrollment.bills = this.billRepo.generate(enrollment);

    return this.enrollmentRepo.save(enrollment);
  }

  findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<Enrollment>> {
    return this.enrollmentRepo.paginate(paginateRequestDto, ['bills']);
  }
}
