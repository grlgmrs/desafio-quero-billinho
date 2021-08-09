import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateStudentDto } from '../src/modules/students/dto/create-student.dto';
import * as faker from 'faker';
import * as fakerBr from 'faker-br';
import { randomPaymentMethod } from '@shared/utils/faker/random-payment-method';
import { PaginateRequestDto } from '@shared/base-repository/helpers/paginate-helper/dto/paginate-request.dto';
import { Student } from '@modules/students/entities/student.entity';
import { CreateEnrollmentDto } from '@modules/enrollments/dto/enrollments/create-enrollment.dto';
import { Enrollment } from '@modules/enrollments/entities/enrollment.entity';
import { IPaginate } from '@shared/base-repository/helpers/paginate-helper/ipaginate';

const generateRandomStudent = (): CreateStudentDto => ({
  name: faker.name.findName(),
  cpf: fakerBr.br.cpf(),
  birthdate: faker.date.past(20),
  payment_method: randomPaymentMethod(),
});

describe('AppController (e2e)', () => {
  let app;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    module.close();
  });

  it('/students (POST) Create 5 students', async () => {
    let students = Array.from({ length: 5 }, generateRandomStudent);

    return new Promise<void>(async (res) => {
      for (const idx in students) {
        const response = await request(app.getHttpServer())
          .post('/students')
          .send(students[idx]);

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(parseInt(idx) + 1);
      }

      res();
    });
  });

  it('/students (GET) Get 3th page of students (paginated by 2)', async () => {
    const paginate = <PaginateRequestDto>{
      count: 2,
      page: 3,
    };

    const response = await request(app.getHttpServer())
      .get('/students')
      .send(paginate);

    const students = response.body['items'] as Student[];

    expect(response.status).toBe(200);
    expect(students.length).toBe(1);
    expect(students[0].id).toBe(5);
  });

  it('/enrollments (POST) Test basic guard', async () => {
    const response = await request(app.getHttpServer()).post('/enrollments');

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('Unauthorized');
  });

  it('/enrollments (POST) Add enrollment to student 1', async () => {
    const enrollment = <CreateEnrollmentDto>{
      amount: 12000_00,
      installments: 4,
      due_day: 5,
      student_id: 1,
    };

    const authorizationKey = Buffer.from(
      `${process.env.HTTP_BASIC_USER}:${process.env.HTTP_BASIC_PASS}`,
    ).toString('base64');

    const response = await request(app.getHttpServer())
      .post('/enrollments')
      .set({
        Authorization: `Basic ${authorizationKey}`,
      })
      .send(enrollment);

    const createdEnrollment = response.body as Enrollment;

    expect(response.status).toBe(201);
    expect(createdEnrollment.bills.length).toBe(4);
    expect(
      createdEnrollment.bills.reduce((amount, bill) => amount + bill.amount, 0),
    ).toBe(12000_00);
  });

  it('/enrollments (GET) Get enrollments with default pagination', async () => {
    const response = await request(app.getHttpServer()).get('/enrollments');

    const enrollments = response.body as IPaginate<Enrollment>;

    expect(response.status).toBe(200);
    expect(enrollments.page).toBe(1);
    expect(enrollments.items.length).toBe(1);
    expect(enrollments.items[0].bills.length).toBe(4);
    expect(
      enrollments.items[0].bills.reduce(
        (amount, bill) => amount + bill.amount,
        0,
      ),
    ).toBe(12000_00);
  });
});
