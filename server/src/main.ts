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
    origin: [
      process.env.FRONTEND_URL, // FE production
      'https://backmarket.mrthinh.site', // FE production 
      'http://localhost:3000', // FE dev local
    ],
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 8888, '0.0.0.0');
}
void bootstrap();
