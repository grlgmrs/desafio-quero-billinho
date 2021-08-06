import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginate,
  PaginateHelper,
  PaginateRequestDto,
} from '@shared/helpers/paginate-helper';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { Bill } from '../entities/bill.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { IBillRepository } from '../repository/ibill-repository';
import { IEnrollmentRepository } from '../repository/ienrollments-repository';
import BillGeneratorHelper from '../helpers/bill-generator';

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
    const billGenerator = new BillGeneratorHelper(enrollment);

    enrollment.bills = this.billRepo.create(billGenerator.generateBills());

    return this.enrollmentRepo.save(enrollment);
  }

  findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<Enrollment>> {
    const paginateHelper = new PaginateHelper(this.enrollmentRepo, ['bills']);

    return paginateHelper.paginate(paginateRequestDto);
  }
}
