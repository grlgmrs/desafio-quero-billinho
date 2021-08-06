import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { IStudentsRepository } from '../repositories/istudents-repository';
import { StudentsFakeRepository } from '../repositories/students-fake-repository';
import { StudentsService } from './students.service';
import * as faker from 'faker';
import * as fakerBr from 'faker-br';
import { CreateStudentDto } from '../dto/create-student.dto';
import { randomPaymentMethod } from '@shared/utils/faker/random-payment-method';

describe('StudentsService', () => {
  let service: StudentsService;
  let studentsFakeRepository: IStudentsRepository =
    new StudentsFakeRepository();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: studentsFakeRepository,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create 10 students', async () => {
    const students = Array.from(
      { length: 10 },
      () =>
        <CreateStudentDto>{
          name: faker.name.findName(),
          cpf: fakerBr.br.cpf(),
          payment_method: randomPaymentMethod(),
        },
    );

    for (const key in students) {
      const { id } = await service.create(students[key]);

      expect(id).toBe(parseInt(key) + 1);
    }
  });

  it('should get paginate students', async () => {
    const response = await service.findAll({ page: 2, count: 3 });

    var initId = 4;
    response.items.forEach((student) => {
      expect(student.id).toBe(initId++);
    });
  });
});
