import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { SignupDto } from 'src/auth/dto';

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

  describe('Auth', () => {
    const dto: SignupDto = {
      email: 'test@gmail.com',
      password: '123456',
      firstName: 'Test',
      lastName: 'Signup',
    };
    describe('Signup', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
            firstName: dto.firstName,
            lastName: dto.lastName,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      it('should throw if email is invalid', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: 'invalid-email',
            password: dto.password,
            firstName: dto.firstName,
            lastName: dto.lastName,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
            firstName: dto.firstName,
            lastName: dto.lastName,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      it('should throw if password is too short', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
            password: '123',
            firstName: dto.firstName,
            lastName: dto.lastName,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      it('should throw if firstName is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
            password: dto.password,
            lastName: dto.lastName,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      it('should throw if lastName is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
            password: dto.password,
            firstName: dto.firstName,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      it('should throw if no body is provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(HttpStatus.CREATED);
      });
    });

    describe('Login', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: dto.password,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      // it('should throw if password is empty', () => {
      //   return pactum
      //     .spec()
      //     .post('/auth/login')
      //     .withBody({
      //       email: dto.email,
      //     })
      //     .expectStatus(HttpStatus.BAD_REQUEST);
      // });
      it('should throw if no body is provided', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: dto.email,
            password: dto.password,
          })
          .expectStatus(HttpStatus.OK);
      });
    });

    describe('Logout', () => {
      it('should logout', () => {
        return pactum.spec().post('/auth/logout').expectStatus(HttpStatus.OK);
      });
    });
  });

  // describe('Users', () => {
  //   describe('Get me', () => {
  //     it.todo('should get user profile');
  //   });

  //   describe('Update User Profile', () => {
  //     it.todo('should update user profile');
  //   });

  //   describe('Delete User Account', () => {
  //     it.todo('should delete user account');
  //   });
  // });

  // describe('Products', () => {
  //   describe('Create Product', () => {
  //     it.todo('should create product');
  //   });

  //   describe('Get Products', () => {
  //     it.todo('should get products');
  //   });

  //   describe('Get Product by ID', () => {
  //     it.todo('should get product by id');
  //   });

  //   describe('Update Product', () => {
  //     it.todo('should update product');
  //   });

  //   describe('Delete Product', () => {
  //     it.todo('should delete product');
  //   });
  // });

  // describe('Categories', () => {
  //   describe('Create Category', () => {
  //     it.todo('should create category');
  //   });

  //   describe('Get Categories', () => {
  //     it.todo('should get categories');
  //   });

  //   describe('Get Category by ID', () => {
  //     it.todo('should get category by id');
  //   });

  //   describe('Update Category', () => {
  //     it.todo('should update category');
  //   });

  //   describe('Delete Category', () => {
  //     it.todo('should delete category');
  //   });
  // });

  // describe('Orders', () => {
  //   describe('Create Order', () => {
  //     it.todo('should create order');
  //   });

  //   describe('Get Orders', () => {
  //     it.todo('should get orders');
  //   });

  //   describe('Get Order by ID', () => {
  //     it.todo('should get order by id');
  //   });

  //   describe('Update Order', () => {
  //     it.todo('should update order');
  //   });

  //   describe('Delete Order', () => {
  //     it.todo('should delete order');
  //   });
  // });
});
