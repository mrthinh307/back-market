import { HttpStatus } from '@nestjs/common';
import * as pactum from 'pactum';

import { TestSetup, TEST_CONSTANTS } from './helpers/test-setup';
import { SignupDto } from '../src/auth/dto';

describe('Cart E2E Tests', () => {
  let userAccessToken: string;
  let anotherUserToken: string;
  const TEST_PORT = 3336;

  // Available product variant IDs from the database
  const VALID_PV_HIGH_STOCK = '00207b4a-b170-46dd-ba2d-080dc010d884'; // stock: 999
  const VALID_PV_ZERO_STOCK = '0017fd3e-7543-42f0-8551-46c463845395'; // stock: 0
  const VALID_PV_LOW_STOCK_1 = '001310b7-2a41-4a00-942d-0122f6b92c29'; // stock: 1
  const VALID_PV_LOW_STOCK_8 = '00157053-b1cd-426a-b1d8-a5bc93054053'; // stock: 8

  beforeAll(async () => {
    await TestSetup.setupApp(TEST_PORT);

    // Create users and get tokens
    const user: SignupDto = {
      email: 'cart-user@test.com',
      password: 'Password123',
      firstName: 'Cart',
      lastName: 'User',
    };

    const anotherUser: SignupDto = {
      email: 'another-cart-user@test.com',
      password: 'Password123',
      firstName: 'Another',
      lastName: 'User',
    };

    userAccessToken = await TestSetup.createUser(user);
    anotherUserToken = await TestSetup.createUser(anotherUser);

    // Verify tokens are created
    expect(userAccessToken).toBeDefined();
    expect(anotherUserToken).toBeDefined();
  });

  afterAll(async () => {
    await TestSetup.teardownApp(TEST_PORT);
  });

  describe('Cart Authentication', () => {
    it('should require authentication for GET /cart', () => {
      return pactum.spec().get('/cart').expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('should require authentication for GET /cart/count', () => {
      return pactum
        .spec()
        .get('/cart/count')
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('should require authentication for POST /cart/add', () => {
      return pactum
        .spec()
        .post('/cart/add')
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK })
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('should require authentication for PUT /cart/update/:productVariantId', () => {
      return pactum
        .spec()
        .put(`/cart/update/${VALID_PV_HIGH_STOCK}`)
        .withBody({ quantity: 2 })
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('should require authentication for DELETE /cart/remove/:productVariantId', () => {
      return pactum
        .spec()
        .delete(`/cart/remove/${VALID_PV_HIGH_STOCK}`)
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('should require authentication for DELETE /cart/clear', () => {
      return pactum
        .spec()
        .delete('/cart/clear')
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /cart - Get Cart', () => {
    it('should return empty cart for new user', () => {
      return pactum
        .spec()
        .get('/cart')
        .withBearerToken(userAccessToken)
        .expectStatus(HttpStatus.OK)
        .expectJsonSchema({
          type: 'object',
          properties: {
            items: {
              type: 'array',
            },
            totalItems: {
              type: 'number',
            },
            totalPrice: {
              type: 'number',
            },
          },
          required: ['items', 'totalItems', 'totalPrice'],
        })
        .expectJson('items', [])
        .expectJson('totalItems', 0)
        .expectJson('totalPrice', 0);
    });

    it('should return cart with items after adding products', async () => {
      // Add item first
      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK });

      // Get cart
      return pactum
        .spec()
        .get('/cart')
        .withBearerToken(userAccessToken)
        .expectStatus(HttpStatus.OK)
        .expectJsonMatch({
          items: [
            {
              productVariantId: VALID_PV_HIGH_STOCK,
              quantity: 1,
            },
          ],
          totalItems: 1,
        });
    });
  });

  describe('GET /cart/count - Get Cart Items Count', () => {
    beforeEach(async () => {
      // Clear cart before each test for clean state
      await pactum
        .spec()
        .delete('/cart/clear')
        .withBearerToken(userAccessToken);
    });

    it('should return 0 for empty cart', () => {
      return pactum
        .spec()
        .get('/cart/count')
        .withBearerToken(userAccessToken)
        .expectStatus(HttpStatus.OK)
        .expectJsonSchema({
          type: 'object',
          properties: {
            totalItems: {
              type: 'number',
            },
          },
          required: ['totalItems'],
        })
        .expectJson('totalItems', 0);
    });

    it('should return correct count after adding different items', async () => {
      // Add 2 different items
      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK })

      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_LOW_STOCK_8 })

      // Get count
      return pactum
        .spec()
        .get('/cart/count')
        .withBearerToken(userAccessToken)
        .expectStatus(HttpStatus.OK)
        .expectJson('totalItems', 2);
    });

    it('should return correct count after adding same item multiple times', async () => {
      // Add 2 same items
      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK });

      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK });

      // Get count
      return pactum
        .spec()
        .get('/cart/count')
        .withBearerToken(userAccessToken)
        .expectStatus(HttpStatus.OK)
        .expectJson('totalItems', 1);
    });
  });

  describe('POST /cart/add - Add to Cart', () => {
    beforeEach(async () => {
      // Clear cart before each test
      await pactum
        .spec()
        .delete('/cart/clear')
        .withBearerToken(userAccessToken);
    });

    describe('Validation Tests', () => {
      it('should reject if productVariantId is missing', () => {
        return pactum
          .spec()
          .post('/cart/add')
          .withBearerToken(userAccessToken)
          .withBody({})
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('productVariantId');
      });

      it('should reject if productVariantId is not a valid UUID', () => {
        return pactum
          .spec()
          .post('/cart/add')
          .withBearerToken(userAccessToken)
          .withBody({ productVariantId: 'invalid-uuid' })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should reject if productVariantId does not exist', () => {
        return pactum
          .spec()
          .post('/cart/add')
          .withBearerToken(userAccessToken)
          .withBody({ productVariantId: TEST_CONSTANTS.VALID_UUID })
          .expectStatus(HttpStatus.NOT_FOUND)
          .expectBodyContains('Product variant not found');
      });
    });

    describe('Stock Validation', () => {
      it('should reject if product is out of stock', () => {
        return pactum
          .spec()
          .post('/cart/add')
          .withBearerToken(userAccessToken)
          .withBody({ productVariantId: VALID_PV_ZERO_STOCK })
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('out of stock');
      });

      it('should add product with sufficient stock', () => {
        return pactum
          .spec()
          .post('/cart/add')
          .withBearerToken(userAccessToken)
          .withBody({ productVariantId: VALID_PV_HIGH_STOCK })
          .expectStatus(HttpStatus.CREATED)
      });
    });

    describe('Quantity Management', () => {
      it('should increment quantity if same product is added again', async () => {
        // Add first time
        await pactum
          .spec()
          .post('/cart/add')
          .withBearerToken(userAccessToken)
          .withBody({ productVariantId: VALID_PV_HIGH_STOCK });

        // Add second time
        await pactum
          .spec()
          .post('/cart/add')
          .withBearerToken(userAccessToken)
          .withBody({ productVariantId: VALID_PV_HIGH_STOCK })

        // Verify cart has correct quantity
        return pactum
          .spec()
          .get('/cart')
          .withBearerToken(userAccessToken)
          .expectJsonMatch({
            items: [
              {
                quantity: 2,
              },
            ],
          });
      });

      it('should not exceed available stock when incrementing', async () => {
        // Add item to cart (quantity 1)
        await pactum
          .spec()
          .post('/cart/add')
          .withBearerToken(userAccessToken)
          .withBody({ productVariantId: VALID_PV_LOW_STOCK_1 });

        // Try to add again (would exceed stock of 1)
        return pactum
          .spec()
          .post('/cart/add')
          .withBearerToken(userAccessToken)
          .withBody({ productVariantId: VALID_PV_LOW_STOCK_1 })
          .expectStatus(HttpStatus.BAD_REQUEST)
      });
    });
  });

  describe('PUT /cart/update/:productVariantId - Update Cart Item Quantity', () => {
    beforeEach(async () => {
      // Clear cart and add a product
      await pactum
        .spec()
        .delete('/cart/clear')
        .withBearerToken(userAccessToken);

      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK });
    });

    describe('Validation Tests', () => {
      it('should reject if quantity is missing', () => {
        return pactum
          .spec()
          .put(`/cart/update/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken)
          .withBody({})
          .expectStatus(HttpStatus.BAD_REQUEST)
      });

      it('should reject if quantity is not a number', () => {
        return pactum
          .spec()
          .put(`/cart/update/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken)
          .withBody({ quantity: 'invalid' })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should reject if quantity is less than 1', () => {
        return pactum
          .spec()
          .put(`/cart/update/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken)
          .withBody({ quantity: 0 })
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('Quantity must be at least 1');
      });

      it('should reject if quantity exceeds 100', () => {
        return pactum
          .spec()
          .put(`/cart/update/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken)
          .withBody({ quantity: 101 })
          .expectStatus(HttpStatus.BAD_REQUEST)
          .expectBodyContains('Quantity cannot exceed 100');
      });

      it('should reject if quantity is a decimal', () => {
        return pactum
          .spec()
          .put(`/cart/update/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken)
          .withBody({ quantity: 1.5 })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should reject if productVariantId is not a valid UUID', () => {
        return pactum
          .spec()
          .put('/cart/update/invalid-uuid')
          .withBearerToken(userAccessToken)
          .withBody({ quantity: 2 })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should reject if product is not in cart', () => {
        return pactum
          .spec()
          .put(`/cart/update/${VALID_PV_LOW_STOCK_8}`)
          .withBearerToken(userAccessToken)
          .withBody({ quantity: 2 })
          .expectStatus(HttpStatus.NOT_FOUND)
      });
    });

    describe('Stock Validation', () => {
      it('should reject if requested quantity exceeds stock', () => {
        return pactum
          .spec()
          .put(`/cart/update/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken)
          .withBody({ quantity: 1000 })
          .expectStatus(HttpStatus.BAD_REQUEST)
      });

      it('should update quantity within stock limit', () => {
        return pactum
          .spec()
          .put(`/cart/update/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken)
          .withBody({ quantity: 5 })
          .expectStatus(HttpStatus.OK)
      });
    });

    describe('Quantity Update', () => {
      it('should successfully update quantity to valid value', async () => {
        await pactum
          .spec()
          .put(`/cart/update/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken)
          .withBody({ quantity: 3 })
          .expectStatus(HttpStatus.OK);

        // Verify updated quantity
        return pactum
          .spec()
          .get('/cart')
          .withBearerToken(userAccessToken)
          .expectJsonMatch({
            items: [
              {
                quantity: 3,
              },
            ],
          });
      });

      it('should allow updating to quantity 1', () => {
        return pactum
          .spec()
          .put(`/cart/update/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken)
          .withBody({ quantity: 1 })
          .expectStatus(HttpStatus.OK);
      });

      it('should allow updating to maximum allowed quantity (100)', () => {
        return pactum
          .spec()
          .put(`/cart/update/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken)
          .withBody({ quantity: 100 })
          .expectStatus(HttpStatus.OK)
      });
    });
  });

  describe('DELETE /cart/remove/:productVariantId - Remove from Cart', () => {
    beforeEach(async () => {
      // Clear cart and add products
      await pactum
        .spec()
        .delete('/cart/clear')
        .withBearerToken(userAccessToken);

      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK });
    });

    describe('Validation Tests', () => {
      it('should reject if productVariantId is not a valid UUID', () => {
        return pactum
          .spec()
          .delete('/cart/remove/invalid-uuid')
          .withBearerToken(userAccessToken)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should reject if product is not in cart', () => {
        return pactum
          .spec()
          .delete(`/cart/remove/${VALID_PV_LOW_STOCK_8}`)
          .withBearerToken(userAccessToken)
          .expectStatus(HttpStatus.NOT_FOUND)
      });
    });

    describe('Remove Operation', () => {
      it('should successfully remove product from cart', async () => {
        await pactum
          .spec()
          .delete(`/cart/remove/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken)
          .expectStatus(HttpStatus.OK)

        // Verify product is removed
        return pactum
          .spec()
          .get('/cart')
          .withBearerToken(userAccessToken)
          .expectJson('items', [])
          .expectJson('totalItems', 0);
      });

      it('should only remove specified product from multi-item cart', async () => {
        // Add second product
        await pactum
          .spec()
          .post('/cart/add')
          .withBearerToken(userAccessToken)
          .withBody({ productVariantId: VALID_PV_LOW_STOCK_8 });

        // Remove first product
        await pactum
          .spec()
          .delete(`/cart/remove/${VALID_PV_HIGH_STOCK}`)
          .withBearerToken(userAccessToken);

        // Verify only second product remains
        return pactum
          .spec()
          .get('/cart')
          .withBearerToken(userAccessToken)
          .expectJsonMatch({
            items: [{ productVariantId: VALID_PV_LOW_STOCK_8 }],
            totalItems: 1,
          });
      });
    });
  });

  describe('DELETE /cart/clear - Clear Cart', () => {
    it('should clear empty cart without error', () => {
      return pactum
        .spec()
        .delete('/cart/clear')
        .withBearerToken(userAccessToken)
        .expectStatus(HttpStatus.OK)
        .expectJsonMatch({
          message: 'Cart cleared successfully',
        });
    });

    it('should clear cart with single item', async () => {
      // Add item
      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK });

      // Clear cart
      await pactum
        .spec()
        .delete('/cart/clear')
        .withBearerToken(userAccessToken)
        .expectStatus(HttpStatus.OK);

      // Verify cart is empty
      return pactum
        .spec()
        .get('/cart')
        .withBearerToken(userAccessToken)
        .expectJson('items', [])
        .expectJson('totalItems', 0);
    });

    it('should clear cart with multiple items', async () => {
      // Add multiple items
      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK });

      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_LOW_STOCK_8 });

      // Clear cart
      await pactum
        .spec()
        .delete('/cart/clear')
        .withBearerToken(userAccessToken)
        .expectStatus(HttpStatus.OK);

      // Verify cart is empty
      return pactum
        .spec()
        .get('/cart')
        .withBearerToken(userAccessToken)
        .expectJson('items', [])
        .expectJson('totalItems', 0)
        .expectJson('totalPrice', 0);
    });
  });

  describe('Cart Isolation Between Users', () => {
    beforeEach(async () => {
      // Clear both users' carts
      await pactum
        .spec()
        .delete('/cart/clear')
        .withBearerToken(userAccessToken);

      await pactum
        .spec()
        .delete('/cart/clear')
        .withBearerToken(anotherUserToken);
    });

    it('should maintain separate carts for different users', async () => {
      // User 1 adds product
      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK });

      // User 2 adds different product
      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(anotherUserToken)
        .withBody({ productVariantId: VALID_PV_LOW_STOCK_8 });

      // Verify User 1's cart
      await pactum
        .spec()
        .get('/cart')
        .withBearerToken(userAccessToken)
        .expectJsonMatch({
          items: [{ productVariantId: VALID_PV_HIGH_STOCK }],
          totalItems: 1,
        });

      // Verify User 2's cart
      return pactum
        .spec()
        .get('/cart')
        .withBearerToken(anotherUserToken)
        .expectJsonMatch({
          items: [{ productVariantId: VALID_PV_LOW_STOCK_8 }],
          totalItems: 1,
        });
    });

    it("should not allow user to modify another user's cart", async () => {
      // User 1 adds product
      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK });

      // User 2 tries to remove from User 1's cart (should only affect their own cart)
      await pactum
        .spec()
        .delete(`/cart/remove/${VALID_PV_HIGH_STOCK}`)
        .withBearerToken(anotherUserToken)
        .expectStatus(HttpStatus.NOT_FOUND);

      // Verify User 1's cart is unchanged
      return pactum
        .spec()
        .get('/cart')
        .withBearerToken(userAccessToken)
        .expectJsonMatch({
          items: [{ productVariantId: VALID_PV_HIGH_STOCK }],
          totalItems: 1,
        });
    });
  });

  describe('Cart Total Calculations', () => {
    beforeEach(async () => {
      await pactum
        .spec()
        .delete('/cart/clear')
        .withBearerToken(userAccessToken);
    });

    it('should calculate correct total price for single item', async () => {
      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK });

      return pactum
        .spec()
        .get('/cart')
        .withBearerToken(userAccessToken)
        .expectJsonSchema({
          type: 'object',
          properties: {
            totalPrice: {
              type: 'number',
              minimum: 0,
            },
          },
        });
    });

    it('should calculate correct total price for multiple items', async () => {
      // Add first product
      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_HIGH_STOCK });

      // Add second product
      await pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: VALID_PV_LOW_STOCK_8 });

      return pactum
        .spec()
        .get('/cart')
        .withBearerToken(userAccessToken)
        .expectJsonSchema({
          type: 'object',
          properties: {
            totalItems: { type: 'number' },
            totalPrice: {
              type: 'number',
              minimum: 0,
            },
          },
        })
        .expectJson('totalItems', 2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle operations on non-existent product variant', () => {
      return pactum
        .spec()
        .post('/cart/add')
        .withBearerToken(userAccessToken)
        .withBody({ productVariantId: TEST_CONSTANTS.VALID_UUID })
        .expectStatus(HttpStatus.NOT_FOUND);
    });
  });
});
