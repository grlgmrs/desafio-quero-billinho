import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Paginate,
  PaginateHelper,
  PaginateRequestDto,
} from 'src/shared/paginate';
import { Repository } from 'typeorm';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Bill } from './entities/bill.entity';
import { Enrollment } from './entities/enrollment.entity';
import BillGeneratorHelper from './helpers/bill-generator';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(Bill)
    private billRepo: Repository<Bill>,
  ) {}

  create(createEnrollmentDto: CreateEnrollmentDto) {
    const enrollment = this.enrollmentRepo.create(createEnrollmentDto);
    const billGenerator = new BillGeneratorHelper(enrollment);
    const bills = Array<Bill>(enrollment.installments).fill(<Bill>{});

    enrollment.bills = bills.map((_, index) =>
      this.billRepo.create(billGenerator.generateBill(index + 1)),
    );

    return this.enrollmentRepo.save(enrollment);
  }

  findAll(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<Paginate<Enrollment>> {
    const paginateHelper = new PaginateHelper(this.enrollmentRepo);

    return paginateHelper.paginate(paginateRequestDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} enrollment`;
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}
