import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const DATABASE_CONFIGS = <TypeOrmModuleAsyncOptions>{
  useFactory: async () => {
    if (process.env.NODE_ENV === 'test') {
      return {
        type: 'postgres',
        host: process.env.DB_HOSTNAME,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../../**/*.entity.ts'],
        synchronize: true,
      };
    }

    return {
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [process.env.TYPEORM_ENTITIES],
    };
  },
};
