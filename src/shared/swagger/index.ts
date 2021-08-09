import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class SetupSwagger {
  private readonly swaggerPath = 'api';

  constructor(private app: INestApplication) {}

  init() {
    const config = new DocumentBuilder()
      .setTitle('Billinho API')
      .setDescription('Desafio no processo seletivo da Quero 📚')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(this.app, config);

    SwaggerModule.setup(this.swaggerPath, this.app, document);
  }
}
