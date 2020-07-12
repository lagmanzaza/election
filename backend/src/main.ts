import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as csurf from 'csurf';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(helmet());
  app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );
  await app.listen(process.env.SERVER_PORT, '0.0.0.0');
}
bootstrap();
