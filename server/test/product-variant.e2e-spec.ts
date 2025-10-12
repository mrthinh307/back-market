import { HttpStatus } from '@nestjs/common';
import * as pactum from 'pactum';

import { TestSetup, TEST_CONSTANTS } from './helpers/test-setup';

describe('Product Variant E2E Tests', () => {
  const TEST_PORT = 3335;

  beforeAll(async () => {
    await TestSetup.setupApp(TEST_PORT);
  });

  afterAll(async () => {
    await TestSetup.teardownApp(TEST_PORT);
  });

  describe('Product Variant API Comprehensive Tests', () => {
    beforeAll(async () => {
      await setupTestData();
    });

    describe('GET /variants/relevants - Valid Scenarios', () => {
      it('should return relevant variants with valid parameters', () => {
        return pactum
          .spec()
          .get('/variants/relevants')
          .withQueryParams({
            productId: TEST_CONSTANTS.VALID_PRODUCT_ID,
            defaultVariantId: TEST_CONSTANTS.VALID_PRODUCT_VARIANT_ID,
          })
          .expectStatus(HttpStatus.OK);
      });
    });

    describe('GET /variants/relevants - Error Scenarios', () => {
      it('should return 400 when productId is missing', () => {
        return pactum
          .spec()
          .get('/variants/relevants')
          .withQueryParams('defaultVariantId', TEST_CONSTANTS.VALID_UUID)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when defaultVariantId is missing', () => {
        return pactum
          .spec()
          .get('/variants/relevants')
          .withQueryParams('productId', TEST_CONSTANTS.VALID_UUID)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when both parameters are missing', () => {
        return pactum
          .spec()
          .get('/variants/relevants')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when productId is invalid UUID', () => {
        return pactum
          .spec()
          .get('/variants/relevants')
          .withQueryParams({
            productId: TEST_CONSTANTS.INVALID_UUID,
            defaultVariantId: TEST_CONSTANTS.VALID_UUID,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when defaultVariantId is invalid UUID', () => {
        return pactum
          .spec()
          .get('/variants/relevants')
          .withQueryParams({
            productId: TEST_CONSTANTS.VALID_UUID,
            defaultVariantId: TEST_CONSTANTS.INVALID_UUID,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when both parameters are invalid UUIDs', () => {
        return pactum
          .spec()
          .get('/variants/relevants')
          .withQueryParams({
            productId: TEST_CONSTANTS.INVALID_UUID,
            defaultVariantId: TEST_CONSTANTS.INVALID_UUID,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when parameters are empty strings', () => {
        return pactum
          .spec()
          .get('/variants/relevants')
          .withQueryParams({
            productId: TEST_CONSTANTS.EMPTY_STRING,
            defaultVariantId: TEST_CONSTANTS.EMPTY_STRING,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when productId is empty but defaultVariantId is valid', () => {
        return pactum
          .spec()
          .get('/variants/relevants')
          .withQueryParams({
            productId: TEST_CONSTANTS.EMPTY_STRING,
            defaultVariantId: TEST_CONSTANTS.VALID_UUID,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
    });

    describe('GET /variants/relevants - Response Validation', () => {
      it('should return proper response structure', () => {
        return pactum
          .spec()
          .get('/variants/relevants')
          .withQueryParams({
            productId: TEST_CONSTANTS.VALID_PRODUCT_ID,
            defaultVariantId: TEST_CONSTANTS.VALID_PRODUCT_VARIANT_ID,
          })
          .expectStatus(HttpStatus.OK)
          .expectJsonSchema({
            type: 'object',
            properties: {
              relevantVariants: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    attribute: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        code: { type: 'string' },
                        name: { type: 'string' },
                      },
                      required: ['id', 'code', 'name'],
                    },
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          variantId: { type: 'string' },
                          slug: { type: 'string' },
                          available: { type: 'boolean' },
                          selected: { type: 'boolean' },
                          priceValue: { type: 'number' },
                          priceWithCurrency: { type: 'string' },
                          grade: {
                            type: 'object',
                            properties: {
                              id: { type: 'number' },
                              name: { type: 'string' },
                              displayOrder: { type: 'number' },
                            },
                            required: ['id', 'name', 'displayOrder'],
                          },
                        },
                        required: [
                          'variantId',
                          'slug',
                          'available',
                          'selected',
                          'priceValue',
                          'priceWithCurrency',
                          'grade',
                        ],
                      },
                    },
                  },
                  required: ['attribute', 'items'],
                },
              },
            },
            required: ['relevantVariants'],
          });
      });
    });

    describe('GET /variants/:id - Valid Scenarios', () => {
      it('should handle valid UUID format (even if variant not found)', () => {
        return pactum
          .spec()
          .get(`/variants/${TEST_CONSTANTS.VALID_UUID}`)
          .expectStatus(HttpStatus.NOT_FOUND); // Expected since no test data
      });

      it('should handle different valid UUID formats', () => {
        const upperCaseUUID = TEST_CONSTANTS.VALID_UUID.toUpperCase();
        return pactum
          .spec()
          .get(`/variants/${upperCaseUUID}`)
          .expectStatus(HttpStatus.NOT_FOUND);
      });

      it('should handle valid product variant UUID', () => {
        return pactum
          .spec()
          .get(`/variants/${TEST_CONSTANTS.VALID_PRODUCT_VARIANT_ID}`)
          .expectStatus(HttpStatus.OK);
      });

      it('should handle another valid UUID', () => {
        const uppercaseVariantId =
          TEST_CONSTANTS.VALID_PRODUCT_VARIANT_ID.toUpperCase();
        return pactum
          .spec()
          .get(`/variants/${uppercaseVariantId}`)
          .expectStatus(HttpStatus.OK);
      });
    });

    describe('GET /variants/:id - Error Scenarios', () => {
      it('should return 400 when variant ID is invalid UUID', () => {
        return pactum
          .spec()
          .get(`/variants/${TEST_CONSTANTS.INVALID_UUID}`)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 404 when route has no ID', () => {
        return pactum
          .spec()
          .get('/variants/')
          .expectStatus(HttpStatus.NOT_FOUND); // Route not found
      });

      it('should return 400 when variant ID is too short', () => {
        return pactum
          .spec()
          .get('/variants/123')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when variant ID contains invalid characters', () => {
        return pactum
          .spec()
          .get('/variants/550e8400-e29b-41d4-a716-44665544000g')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when variant ID has wrong format', () => {
        return pactum
          .spec()
          .get('/variants/550e8400e29b41d4a716446655440000')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 when variant ID is empty', () => {
        return pactum
          .spec()
          .get('/variants/%20') // URL encoded space
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
    });

    // describe('DELETE /variants/:id - Authentication Tests', () => {
    //   it('should return 401 when no authorization header', () => {
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${TEST_CONSTANTS.VALID_UUID}`)
    //       .expectStatus(HttpStatus.UNAUTHORIZED);
    //   });

    //   it('should return 401 when authorization header is malformed', () => {
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${TEST_CONSTANTS.VALID_UUID}`)
    //       .withHeaders({
    //         Authorization: 'InvalidTokenFormat',
    //       })
    //       .expectStatus(HttpStatus.UNAUTHORIZED);
    //   });

    //   it('should return 401 when token is invalid', () => {
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${TEST_CONSTANTS.VALID_UUID}`)
    //       .withHeaders({
    //         Authorization: 'Bearer invalid-token',
    //       })
    //       .expectStatus(HttpStatus.UNAUTHORIZED);
    //   });

    //   it('should return 401 when bearer token is missing', () => {
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${TEST_CONSTANTS.VALID_UUID}`)
    //       .withHeaders({
    //         Authorization: 'Bearer',
    //       })
    //       .expectStatus(HttpStatus.UNAUTHORIZED);
    //   });

    //   it('should return 401 when authorization header has wrong scheme', () => {
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${TEST_CONSTANTS.VALID_UUID}`)
    //       .withHeaders({
    //         Authorization: 'Basic invalid-token',
    //       })
    //       .expectStatus(HttpStatus.UNAUTHORIZED);
    //   });
    // });

    // describe('DELETE /variants/:id - Authorization Tests', () => {
    //   it('should return 403 when user is not admin', () => {
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${TEST_CONSTANTS.VALID_UUID}`)
    //       .withHeaders({
    //         Authorization: `Bearer ${regularUserToken}`,
    //       })
    //       .expectStatus(HttpStatus.FORBIDDEN);
    //   });

    //   it('should return 403 for regular user with different variant ID', () => {
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${TEST_CONSTANTS.VALID_PRODUCT_VARIANT_ID}`)
    //       .withHeaders({
    //         Authorization: `Bearer ${regularUserToken}`,
    //       })
    //       .expectStatus(HttpStatus.FORBIDDEN);
    //   });

    //   it('should allow admin to attempt deletion', () => {
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${TEST_CONSTANTS.VALID_UUID}`)
    //       .withHeaders({
    //         Authorization: `Bearer ${adminAccessToken}`,
    //       })
    //       .expectStatus(HttpStatus.NOT_FOUND); // Expected since no test data
    //   });
    // });

    // describe('DELETE /variants/:id - Validation Tests', () => {
    //   it('should return 400 when variant ID is invalid UUID with admin token', () => {
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${TEST_CONSTANTS.INVALID_UUID}`)
    //       .withHeaders({
    //         Authorization: `Bearer ${adminAccessToken}`,
    //       })
    //       .expectStatus(HttpStatus.BAD_REQUEST);
    //   });

    //   it('should return 404 when variant does not exist with admin token', () => {
    //     const nonExistentUUID = '550e8400-e29b-41d4-a716-446655440999';
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${nonExistentUUID}`)
    //       .withHeaders({
    //         Authorization: `Bearer ${adminAccessToken}`,
    //       })
    //       .expectStatus(HttpStatus.NOT_FOUND);
    //   });

    //   it('should return 400 for malformed UUID even with admin token', () => {
    //     return pactum
    //       .spec()
    //       .delete('/variants/not-a-uuid-at-all')
    //       .withHeaders({
    //         Authorization: `Bearer ${adminAccessToken}`,
    //       })
    //       .expectStatus(HttpStatus.BAD_REQUEST);
    //   });
    // });

    // describe('DELETE /variants/:id - Success Scenarios', () => {
    //   it('should return 404 when trying to delete non-existent variant (admin)', () => {
    //     // This test would return 204 if variant exists and is successfully deleted
    //     // For now, we expect 404 since no test data exists
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${TEST_CONSTANTS.VALID_UUID}`)
    //       .withHeaders({
    //         Authorization: `Bearer ${adminAccessToken}`,
    //       })
    //       .expectStatus(HttpStatus.NOT_FOUND);
    //   });

    //   it('should return 404 for another non-existent variant (admin)', () => {
    //     return pactum
    //       .spec()
    //       .delete(`/variants/${TEST_CONSTANTS.VALID_PRODUCT_VARIANT_ID}`)
    //       .withHeaders({
    //         Authorization: `Bearer ${adminAccessToken}`,
    //       })
    //       .expectStatus(HttpStatus.NOT_FOUND);
    //   });
    // });
  });

  // Helper function to setup test data
  async function setupTestData() {
    // Clean database first
    const prisma = TestSetup.getPrisma(TEST_PORT);
    if (prisma) {
      await prisma.cleanDb();
    }

    // In a real scenario, you would create test products, variants here
    // Example:
    // await prisma.product.create({
    //   data: {
    //     id: TEST_CONSTANTS.VALID_UUID,
    //     title: 'Test Product',
    //     // ... other required fields
    //   }
    // });

    // await TestSetup.prisma.productVariant.create({
    //   data: {
    //     id: TEST_CONSTANTS.VALID_PRODUCT_VARIANT_ID,
    //     productId: TEST_CONSTANTS.VALID_UUID,
    //     // ... other required fields
    //   }
    // });
  }
});
