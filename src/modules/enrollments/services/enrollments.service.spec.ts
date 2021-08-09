import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bill } from '../entities/bill.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { BillsFakeRepository } from '../repository/bills/bills-fake-repository';
import { EnrollmentsFakeRepository } from '../repository/enrollments/enrollments-fake-repository';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from '../dto/enrollments/create-enrollment.dto';
import { IBillRepository } from '../repository/bills/ibill-repository';
import { BillStatus } from '../dto/bills/create-bill.dto';

describe('EnrollmentsService', () => {
  let service: EnrollmentsService;
  let billsFakeRepository: IBillRepository = new BillsFakeRepository();
  let enrollmentsFakeRepository = new EnrollmentsFakeRepository(
    billsFakeRepository,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentsService,
        {
          provide: getRepositoryToken(Bill),
          useValue: billsFakeRepository,
        },
        {
          provide: getRepositoryToken(Enrollment),
          useValue: enrollmentsFakeRepository,
        },
      ],
    }).compile();

    service = module.get<EnrollmentsService>(EnrollmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an enrollment with three bills', async () => {
    const lastIdInserted = enrollmentsFakeRepository.getLastId();
    const enrollment = <CreateEnrollmentDto>{
      amount: 1200000,
      installments: 3,
      due_day: 5,
      student_id: 1,
    };

    const newEnrollment = await service.create(enrollment);
    const billsSum = newEnrollment.bills.reduce(
      (acc, bill) => acc + bill.amount,
      0,
    );

    expect(newEnrollment.id).toBe(1);
    expect(newEnrollment.due_day).toBe(enrollment.due_day);
    expect(newEnrollment.amount).toBe(billsSum);
    expect(newEnrollment.bills.length).toBe(enrollment.installments);
    newEnrollment.bills.forEach((bill, idx) => {
      expect(bill.id).toBe(lastIdInserted + idx + 1);
      expect(bill.amount).toBe(
        newEnrollment.amount / newEnrollment.installments,
      );
      expect(bill.status).toBe(BillStatus.Open);
    });
  });

  it('should create 4 enrollments with one bill each', async () => {
    const lastIdInserted = enrollmentsFakeRepository.getLastId();
    const enrollments = Array.from(
      { length: 4 },
      () =>
        <CreateEnrollmentDto>{
          amount: 1200000,
          installments: 1,
          due_day: 5,
          student_id: 1,
        },
    );

    for (const key in enrollments) {
      const newEnrollment = await service.create(enrollments[key]);

      expect(newEnrollment.id).toBe(lastIdInserted + parseInt(key) + 1);
      expect(newEnrollment.bills[0].amount).toBe(1200000);
      expect(newEnrollment.bills[0].status).toBe(BillStatus.Open);
    }
  });

  it('should paginate enrollments', async () => {
    const enrollments = await service.findAll({ page: 2, count: 3 });

    expect(enrollments.items.length).toBe(2);
    expect(enrollments.items[0].id).toBe(4);
    expect(enrollments.items[0].bills.length).toBe(1);
    expect(enrollments.items[1].id).toBe(5);
    expect(enrollments.items[1].bills.length).toBe(1);
  });
});
