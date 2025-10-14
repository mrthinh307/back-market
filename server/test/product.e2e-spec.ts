import { HttpStatus } from '@nestjs/common';
import * as pactum from 'pactum';

import { TestSetup, TEST_CONSTANTS } from './helpers/test-setup';

describe('Product E2E Tests', () => {
  const TEST_PORT = 3334;

  beforeAll(async () => {
    await TestSetup.setupApp(TEST_PORT);
  });

  afterAll(async () => {
    await TestSetup.teardownApp(TEST_PORT);
  });

  describe('Product API Comprehensive Tests', () => {
    beforeAll(async () => {
      await setupTestData();
    });

    describe('GET /products - Valid Scenarios', () => {
      it('should return products for valid categoryId', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams('categoryId', TEST_CONSTANTS.VALID_CATEGORY_ID)
          .expectStatus(HttpStatus.OK)
          .expectJson('products', [])
          .expectJsonSchema({
            type: 'object',
            properties: {
              products: {
                type: 'array'
              }
            },
            required: ['products']
          });
      });

      it('should handle categoryId as string number', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams('categoryId', TEST_CONSTANTS.LARGE_CATEGORY_ID)
          .expectStatus(HttpStatus.OK);
      });

      it('should filter by brandId when provided', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams({
            categoryId: TEST_CONSTANTS.VALID_CATEGORY_ID,
            brandId: TEST_CONSTANTS.VALID_UUID
          })
          .expectStatus(HttpStatus.OK)
          .expectJson('products', []);
      });

      it('should handle isExcludedBrand=true correctly', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams({
            categoryId: TEST_CONSTANTS.VALID_CATEGORY_ID,
            isExcludedBrand: 'true'
          })
          .expectStatus(HttpStatus.OK);
      });

      it('should handle isExcludedBrand=false correctly', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams({
            categoryId: TEST_CONSTANTS.VALID_CATEGORY_ID,
            isExcludedBrand: 'false'
          })
          .expectStatus(HttpStatus.OK);
      });

      it('should handle all parameters together', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams({
            categoryId: TEST_CONSTANTS.VALID_CATEGORY_ID,
            brandId: TEST_CONSTANTS.VALID_UUID,
            isExcludedBrand: 'true'
          })
          .expectStatus(HttpStatus.OK);
      });
    });

    describe('GET /products - Error Scenarios', () => {
      it('should return 400 when categoryId is missing', () => {
        return pactum
          .spec()
          .get('/products')
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('categoryId');
      });

      it('should return 400 when categoryId is not a number', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams('categoryId', TEST_CONSTANTS.INVALID_CATEGORY_ID)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when categoryId is empty string', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams('categoryId', TEST_CONSTANTS.EMPTY_STRING)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when brandId is invalid UUID', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams({
            categoryId: TEST_CONSTANTS.VALID_CATEGORY_ID,
            brandId: TEST_CONSTANTS.INVALID_UUID
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when brandId is empty string', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams({
            categoryId: TEST_CONSTANTS.VALID_CATEGORY_ID,
            brandId: TEST_CONSTANTS.EMPTY_STRING
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should handle invalid isExcludedBrand value gracefully', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams({
            categoryId: TEST_CONSTANTS.VALID_CATEGORY_ID,
            isExcludedBrand: 'invalid-boolean'
          })
          .expectStatus(HttpStatus.OK); // Should default to false
      });
    });

    describe('GET /products - Edge Cases', () => {
      it('should handle very large categoryId numbers', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams('categoryId', TEST_CONSTANTS.LARGE_CATEGORY_ID)
          .expectStatus(HttpStatus.OK);
      });

      it('should handle zero as categoryId', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams('categoryId', TEST_CONSTANTS.ZERO_CATEGORY_ID)
          .expectStatus(HttpStatus.OK);
      });

      it('should handle negative categoryId', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams('categoryId', TEST_CONSTANTS.NEGATIVE_CATEGORY_ID)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should handle decimal categoryId', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams('categoryId', TEST_CONSTANTS.DECIMAL_CATEGORY_ID)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
    });

    describe('GET /products - Response Validation', () => {
      it('should return correct response structure', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams('categoryId', TEST_CONSTANTS.VALID_CATEGORY_ID)
          .expectStatus(HttpStatus.OK)
          .expectJsonSchema({
            type: 'object',
            properties: {
              products: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    brand: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' }
                      },
                      required: ['id', 'name']
                    },
                    category: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' }
                      },
                      required: ['id', 'name']
                    },
                    image: { type: ['string', 'null'] },
                    color: { type: 'string' },
                    priceValue: { type: 'number' },
                    priceWithCurrency: { type: 'string' },
                    stock: { type: 'number' },
                    variants: {
                      type: 'object',
                      properties: {
                        colors: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              name: { type: 'string' }
                            },
                            required: ['name']
                          }
                        }
                      },
                      required: ['colors']
                    },
                    reviewRating: {
                      type: 'object',
                      properties: {
                        count: { type: 'number' },
                        average: { type: 'number' }
                      },
                      required: ['count', 'average']
                    }
                  }
                }
              }
            },
            required: ['products']
          });
      });

      it('should return empty array when no products found', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams('categoryId', TEST_CONSTANTS.LARGE_CATEGORY_ID)
          .expectStatus(HttpStatus.OK)
          .expectJson('products', []);
      });
    });

    describe('GET /products - Performance Tests', () => {
      it('should respond within reasonable time', () => {
        return pactum
          .spec()
          .get('/products')
          .withQueryParams('categoryId', TEST_CONSTANTS.VALID_CATEGORY_ID)
          .expectStatus(HttpStatus.OK)
          .expectResponseTime(5000); // 5 seconds max
      });
    });
  });

  // Helper function to setup test data
  async function setupTestData() {
    // Clean database first
    const prisma = TestSetup.getPrisma(TEST_PORT);
    if (prisma) {
      await prisma.cleanDb();
    }
    
    // In a real scenario, you would create test categories, brands, products here
    // Example:
    // await prisma.category.create({
    //   data: {
    //     id: 1,
    //     name: 'Test Category'
    //   }
    // });
    
    // await TestSetup.prisma.brand.create({
    //   data: {
    //     id: TEST_CONSTANTS.VALID_UUID,
    //     name: 'Test Brand'
    //   }
    // });
  }
});