import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection, getConnection } from 'typeorm';
import { CreateStudentDto } from '../src/modules/students/dto/create-student.dto';
import * as faker from 'faker';
import * as fakerBr from 'faker-br';
import { randomPaymentMethod } from '@shared/utils/faker/random-payment-method';

const generateRandomStudent = (): CreateStudentDto => ({
  name: faker.name.findName(),
  cpf: fakerBr.br.cpf(),
  birthdate: faker.date.past(20),
  payment_method: randomPaymentMethod(),
});

describe('AppController (e2e)', () => {
  let app;
  let module: TestingModule;
  let connection: Connection;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    connection = module.get(Connection);
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    module.close();
  });

  it('/students (POST)', () => {
    let student = generateRandomStudent();

    debugger;

    return request(app.getHttpServer())
      .post('/cat')
      .send(student)
      .expect(201)
      .expect({
        name: 'Ulla',
        color: 'Black',
        id: 1,
      });
  });
});
