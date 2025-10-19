/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // Enable transformation of incoming data
    }),
  );
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || origin.includes('localhost')) return callback(null, true);

      if (origin.endsWith('.vercel.app')) return callback(null, true);

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 8888, '0.0.0.0');
}
void bootstrap();
