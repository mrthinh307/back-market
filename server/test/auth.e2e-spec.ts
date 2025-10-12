import { HttpStatus } from '@nestjs/common';
import * as pactum from 'pactum';

import { TestSetup } from './helpers/test-setup';
import { SignupDto } from '../src/auth/dto';

describe('Auth E2E Tests', () => {
  const TEST_PORT = 3333;

  beforeAll(async () => {
    await TestSetup.setupApp(TEST_PORT);
  });

  afterAll(async () => {
    await TestSetup.teardownApp(TEST_PORT);
  });

  describe('Authentication Flow', () => {
    const validUserDto: SignupDto = {
      email: 'test@gmail.com',
      password: 'Thinhksbk55',
      firstName: 'Test',
      lastName: 'Signup',
    };

    describe('POST /auth/signup', () => {
      describe('Validation Tests', () => {
        it('should throw if email is empty', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              password: validUserDto.password,
              firstName: validUserDto.firstName,
              lastName: validUserDto.lastName,
            })
            .expectStatus(HttpStatus.BAD_REQUEST)
            .expectBodyContains('email');
        });

        it('should throw if email is invalid format', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              email: 'invalid-email',
              password: validUserDto.password,
              firstName: validUserDto.firstName,
              lastName: validUserDto.lastName,
            })
            .expectStatus(HttpStatus.BAD_REQUEST);
        });

        it('should throw if password is empty', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              email: validUserDto.email,
              firstName: validUserDto.firstName,
              lastName: validUserDto.lastName,
            })
            .expectStatus(HttpStatus.BAD_REQUEST)
            .expectBodyContains('password');
        });

        it('should throw if password is too short', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              email: validUserDto.email,
              password: '123',
              firstName: validUserDto.firstName,
              lastName: validUserDto.lastName,
            })
            .expectStatus(HttpStatus.BAD_REQUEST);
        });

        it('should throw if firstName is empty', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              email: validUserDto.email,
              password: validUserDto.password,
              lastName: validUserDto.lastName,
            })
            .expectStatus(HttpStatus.BAD_REQUEST)
            .expectBodyContains('firstName');
        });

        it('should throw if lastName is empty', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              email: validUserDto.email,
              password: validUserDto.password,
              firstName: validUserDto.firstName,
            })
            .expectStatus(HttpStatus.BAD_REQUEST)
            .expectBodyContains('lastName');
        });

        it('should throw if no body is provided', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .expectStatus(HttpStatus.BAD_REQUEST);
        });
      });

      describe('Success Cases', () => {
        it('should signup with valid data', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody(validUserDto)
            .expectStatus(HttpStatus.CREATED)
            .expectJsonSchema({
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
              },
            });
        });
      });

      describe('Edge Cases', () => {
        it('should handle email with special characters', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              email: 'test+special@gmail.com',
              password: 'Thinhksbk55',
              firstName: 'Test',
              lastName: 'Special',
            })
            .expectStatus(HttpStatus.CREATED);
        });

        it('should handle very long valid email', () => {
          const longEmail = 'a'.repeat(50) + '@gmail.com';
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              email: longEmail,
              password: 'Thinhksbk55',
              firstName: 'Long',
              lastName: 'Email',
            })
            .expectStatus(HttpStatus.CREATED);
        });

        it('should handle maximum length password', () => {
          const longPassword = 'a'.repeat(100);
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              email: 'longpass@gmail.com',
              password: longPassword,
              firstName: 'Long',
              lastName: 'Password',
            })
            .expectStatus(HttpStatus.CREATED);
        });
      });
    });

    describe('POST /auth/login', () => {
      describe('Validation Tests', () => {
        it('should throw if email is empty', () => {
          return pactum
            .spec()
            .post('/auth/login')
            .withBody({
              password: validUserDto.password,
            })
            .expectStatus(HttpStatus.BAD_REQUEST)
            .expectBodyContains('email');
        });

        it('should throw if no body is provided', () => {
          return pactum
            .spec()
            .post('/auth/login')
            .expectStatus(HttpStatus.BAD_REQUEST);
        });

        it('should throw if email format is invalid', () => {
          return pactum
            .spec()
            .post('/auth/login')
            .withBody({
              email: 'invalid-email',
              password: validUserDto.password,
            })
            .expectStatus(HttpStatus.BAD_REQUEST);
        });
      });

      describe('Authentication Tests', () => {
        it('should login with valid credentials', () => {
          return pactum
            .spec()
            .post('/auth/login')
            .withBody({
              email: validUserDto.email,
              password: validUserDto.password,
            })
            .expectStatus(HttpStatus.OK);
        });

        it('should reject invalid email', () => {
          return pactum
            .spec()
            .post('/auth/login')
            .withBody({
              email: 'nonexistent@gmail.com',
              password: validUserDto.password,
            })
            .expectStatus(HttpStatus.FORBIDDEN);
        });

        it('should reject invalid password', () => {
          return pactum
            .spec()
            .post('/auth/login')
            .withBody({
              email: validUserDto.email,
              password: 'wrongpassword',
            })
            .expectStatus(HttpStatus.FORBIDDEN);
        });

        it('should reject empty password', () => {
          return pactum
            .spec()
            .post('/auth/login')
            .withBody({
              email: validUserDto.email,
              password: '',
            })
            .expectStatus(HttpStatus.BAD_REQUEST)
        });
      });

      describe('Security Tests', () => {
        it('should handle SQL injection attempts in email', () => {
          return pactum
            .spec()
            .post('/auth/login')
            .withBody({
              email: "admin@test.com' OR '1'='1",
              password: validUserDto.password,
            })
            .expectStatus(HttpStatus.BAD_REQUEST);
        });

        it('should handle special characters in password', () => {
          return pactum
            .spec()
            .post('/auth/login')
            .withBody({
              email: validUserDto.email,
              password: "'; DROP TABLE users; --",
            })
            .expectStatus(HttpStatus.FORBIDDEN);
        });
      });
    });

    describe('POST /auth/logout', () => {
      it('should logout successfully', () => {
        return pactum.spec().post('/auth/logout').expectStatus(HttpStatus.OK);
      });

      it('should handle logout without authentication', () => {
        return pactum.spec().post('/auth/logout').expectStatus(HttpStatus.OK);
      });
    });

    describe('Authentication Flow Integration', () => {
      it('should complete full signup-login-logout flow', async () => {
        const newUser: SignupDto = {
          email: 'integration@test.com',
          password: 'Thinhksbk55',
          firstName: 'Integration',
          lastName: 'Test',
        };

        // Signup
        await pactum
          .spec()
          .post('/auth/signup')
          .withBody(newUser)
          .expectStatus(HttpStatus.CREATED);

        // Login
        await pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: newUser.email,
            password: newUser.password,
          })
          .expectStatus(HttpStatus.OK)

        // Logout
        await pactum.spec().post('/auth/logout').expectStatus(HttpStatus.OK);
      });
    });
  });
});
