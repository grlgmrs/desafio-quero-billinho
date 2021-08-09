import { Module } from '@nestjs/common';
import { EnrollmentsService } from './services/enrollments.service';
import { EnrollmentsController } from './controllers/enrollments.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Bill } from './entities/bill.entity';
import { EnrollmentsRepository } from './repository/enrollments/enrollments-repository';
import { BillsRepository } from './repository/bills/bills-repository';

@Module({
  controllers: [EnrollmentsController],
  providers: [
    EnrollmentsService,
    {
      provide: getRepositoryToken(Bill),
      useClass: BillsRepository,
    },
    {
      provide: getRepositoryToken(Enrollment),
      useClass: EnrollmentsRepository,
    },
  ],
})
export class EnrollmentsModule {}
