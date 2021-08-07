import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bill } from '../entities/bill.entity';
import { Enrollment } from '../entities/enrollment.entity';
import { BillsFakeRepository } from '../repository/bills-fake-repository';
import { EnrollmentsFakeRepository } from '../repository/enrollments-fake-repository';
import { IBillRepository } from '../repository/ibill-repository';
import { IEnrollmentRepository } from '../repository/ienrollments-repository';
import { EnrollmentsService } from './enrollments.service';

describe('EnrollmentsService', () => {
  let service: EnrollmentsService;
  let billsFakeRepository: IBillRepository = new BillsFakeRepository();
  let enrollmentsFakeRepository: IEnrollmentRepository =
    new EnrollmentsFakeRepository(billsFakeRepository);

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
});
