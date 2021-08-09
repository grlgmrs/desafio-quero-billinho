import { Module } from '@nestjs/common';
import { StudentsService } from './services/students.service';
import { StudentsController } from './controllers/students.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentsRepository } from './repositories/students-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [
    StudentsService,
    {
      provide: getRepositoryToken(Student),
      useClass: StudentsRepository,
    },
  ],
})
export class StudentsModule {}
