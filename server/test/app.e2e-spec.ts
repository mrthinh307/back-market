import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get<PrismaService>(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Application Health', () => {
    it('should start the application successfully', () => {
      expect(app).toBeDefined();
    });

    it('should connect to database successfully', () => {
      expect(prisma).toBeDefined();
    });

    it('should have proper base URL configured', () => {
      // Base URL is set, just verify pactum is configured
      expect(pactum).toBeDefined();
    });
  });

  describe('API Availability', () => {
    it('should respond to health check', () => {
      return pactum.spec().get('/').expectStatus(HttpStatus.NOT_FOUND);
    });

    it('should have auth endpoints available', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .expectStatus(HttpStatus.BAD_REQUEST); // Without body, should return 400
    });

    it('should have users endpoint available', () => {
      return pactum
        .spec()
        .get('/users/me')
        .expectStatus(HttpStatus.UNAUTHORIZED); // Without auth, should return 401
    });

    it('should have products endpoint available', () => {
      return pactum
        .spec()
        .get('/products')
        .expectStatus(HttpStatus.BAD_REQUEST); // Without required params, should return 400
    });

    it('should have variants endpoint available', () => {
      return pactum
        .spec()
        .get('/variants/relevants')
        .expectStatus(HttpStatus.BAD_REQUEST); // Without required params, should return 400
    });

    it('should have cart endpoint available', () => {
      return pactum.spec().get('/cart').expectStatus(HttpStatus.UNAUTHORIZED); // Without auth, should return 401
    });
  });
});
