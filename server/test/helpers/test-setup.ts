import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';

import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { SignupDto } from '../../src/auth/dto';

export class TestSetup {
  private static instances: Map<number, { app: INestApplication; prisma: PrismaService }> = new Map();

  static async setupApp(port: number = 3333) {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(port);

    const prisma = app.get<PrismaService>(PrismaService);
    await prisma.cleanDb();

    // Store instance by port for proper cleanup
    this.instances.set(port, { app, prisma });

    pactum.request.setBaseUrl(`http://localhost:${port}`);

    return { app, prisma };
  }

  static async teardownApp(port?: number) {
    if (port) {
      // Clean up specific port instance
      const instance = this.instances.get(port);
      if (instance) {
        if (instance.prisma) {
          await instance.prisma.cleanDb();
          await instance.prisma.$disconnect();
        }
        if (instance.app) {
          await instance.app.close();
        }
        this.instances.delete(port);
      }
    } else {
      // Clean up all instances
      for (const [instancePort, instance] of this.instances.entries()) {
        if (instance.prisma) {
          await instance.prisma.cleanDb();
          await instance.prisma.$disconnect();
        }
        if (instance.app) {
          await instance.app.close();
        }
        this.instances.delete(instancePort);
      }
    }
  }

  static getPrisma(port: number): PrismaService | undefined {
    return this.instances.get(port)?.prisma;
  }

  static getApp(port: number): INestApplication | undefined {
    return this.instances.get(port)?.app;
  }

  static async createUser(userDto: SignupDto): Promise<string> {
    await pactum
      .spec()
      .post('/auth/signup')
      .withBody(userDto)
      .expectStatus(HttpStatus.CREATED);

    const loginResponse: any = await pactum
      .spec()
      .post('/auth/login')
      .withBody({
        email: userDto.email,
        password: userDto.password,
      })
      .expectStatus(HttpStatus.OK);

    // Extract access_token from Set-Cookie header
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const setCookieHeader = loginResponse.headers?.['set-cookie'] as
      | string
      | string[]
      | undefined;
    if (!setCookieHeader) {
      throw new Error('No Set-Cookie header found in login response');
    }

    // Find the access_token cookie
    const accessTokenCookie = Array.isArray(setCookieHeader)
      ? setCookieHeader.find((cookie: string) =>
          cookie.startsWith('access_token='),
        )
      : typeof setCookieHeader === 'string' &&
          setCookieHeader.startsWith('access_token=')
        ? setCookieHeader
        : undefined;

    if (!accessTokenCookie) {
      throw new Error('No access_token cookie found in response');
    }

    // Extract token value from cookie string: "access_token=<token>; Path=/; HttpOnly"
    const tokenMatch = accessTokenCookie.match(/access_token=([^;]+)/);
    if (!tokenMatch || !tokenMatch[1]) {
      throw new Error('Failed to extract access_token from cookie');
    }

    const token = tokenMatch[1];
    console.log(
      'Extracted token for',
      userDto.email,
      ':',
      token ? 'Success' : 'Failed',
    );

    return token;
  }

  static async createAdminUser(
    email: string = 'admin@test.com',
  ): Promise<string> {
    const adminDto: SignupDto = {
      email,
      password: 'Thinhksbk55',
      firstName: 'Admin',
      lastName: 'User',
    };

    return this.createUser(adminDto);
  }

  static async createRegularUser(
    email: string = 'user@test.com',
  ): Promise<string> {
    const userDto: SignupDto = {
      email,
      password: 'Thinhksbk55',
      firstName: 'Regular',
      lastName: 'User',
    };

    return this.createUser(userDto);
  }
}

export const TEST_CONSTANTS = {
  VALID_UUID: '550e8400-e29b-41d4-a716-446655440000',
  VALID_PRODUCT_VARIANT_ID: '0017fd3e-7543-42f0-8551-46c463845395',
  VALID_PRODUCT_ID: '96775c93-e577-4a8f-a3a7-b8ab1e4ed56c',
  INVALID_UUID: 'invalid-uuid-format',
  EMPTY_STRING: '',
  VALID_CATEGORY_ID: '1',
  INVALID_CATEGORY_ID: 'not-a-number',
  LARGE_CATEGORY_ID: '999999999',
  NEGATIVE_CATEGORY_ID: '-1',
  DECIMAL_CATEGORY_ID: '1.5',
  ZERO_CATEGORY_ID: '0',
};
