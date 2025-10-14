import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto } from './dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // Cart include options for consistent data fetching
  private readonly cartIncludeOptions = {
    items: {
      include: {
        productVariant: {
          select: {
            id: true,
            sku: true,
            title: true,
            price: true,
            stock: true,
            is_active: true,
            product: {
              select: {
                id: true,
                name: true,
                brand: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            attributes: {
              select: {
                attribute: {
                  select: {
                    id: true,
                    code: true,
                    name: true,
                  },
                },
                value: {
                  select: {
                    id: true,
                    value: true,
                  },
                },
              },
              where: {
                attribute: {
                  code: {
                    in: ['GRADES', 'COLOR', 'STORAGE'],
                  },
                },
              },
            },
            ProductVariantImage: {
              select: {
                image: {
                  select: {
                    id: true,
                    imageUrl: true,
                    altText: true,
                  },
                },
              },
              take: 1,
              orderBy: {
                image: {
                  displayOrder: 'asc' as const,
                },
              },
            },
          },
        },
      },
    },
  };

  // Get or create cart for user
  private async getOrCreateCart(userId: string) {
    let cart = await this.prisma.shoppingCart.findUnique({
      where: { userId },
      include: this.cartIncludeOptions,
    });

    if (!cart) {
      cart = await this.prisma.shoppingCart.create({
        data: { userId },
        include: this.cartIncludeOptions,
      });
    }

    return cart;
  }

  // Get user's cart
  async getCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);

    // Calculate total items and total price
    const totalItems = cart.items.length;
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * Number(item.productVariant.price),
      0,
    );

    return {
      ...cart,
      totalItems,
      totalPrice: Number(totalPrice.toFixed(2)),
    };
  }

  // Add product to cart (default quantity = 1)
  async addToCart(userId: string, addToCartDto: AddToCartDto) {
    const { productVariantId } = addToCartDto;

    // Check if product variant exists and has stock
    const productVariant = await this.prisma.productVariant.findUnique({
      where: { id: productVariantId },
    });

    if (!productVariant) {
      throw new NotFoundException('Product variant not found');
    }

    if (!productVariant.is_active) {
      throw new BadRequestException('Product variant is not available');
    }

    if (productVariant.stock < 1) {
      throw new BadRequestException('Product is out of stock');
    }

    const cart = await this.getOrCreateCart(userId);

    // Check if item already exists in cart
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productVariantId: {
          cartId: cart.id,
          productVariantId,
        },
      },
    });

    if (existingItem) {
      // Check if adding 1 more exceeds stock
      if (existingItem.quantity + 1 > productVariant.stock) {
        throw new BadRequestException(
          `Cannot add more products. Available stock: ${productVariant.stock}`,
        );
      }

      // Update existing item quantity by 1
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
        select: {
          id: true,
          quantity: true,
          productVariant: {
            select: {
              id: true,
              title: true,
              price: true,
              stock: true,
              product: {
                select: {
                  name: true,
                  brand: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    } else {
      // Add new item to cart
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productVariantId,
          quantity: 1,
        },
        select: {
          id: true,
          quantity: true,
          productVariant: {
            select: {
              id: true,
              title: true,
              price: true,
              stock: true,
              product: {
                select: {
                  name: true,
                  brand: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }
  }

  // Remove product from cart completely
  async removeFromCart(userId: string, productVariantId: string) {
    const cart = await this.getOrCreateCart(userId);

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productVariantId: {
          cartId: cart.id,
          productVariantId,
        },
      },
    });

    if (!existingItem) {
      throw new NotFoundException('Item not found in cart');
    }

    return this.prisma.cartItem.delete({
      where: { id: existingItem.id },
    });
  }

  // Update cart item quantity (validate against stock)
  async updateCartItemQuantity(
    userId: string,
    productVariantId: string,
    updateCartItemDto: UpdateCartItemDto,
  ) {
    const { quantity } = updateCartItemDto;

    // Get product variant to check stock
    const productVariant = await this.prisma.productVariant.findUnique({
      where: { id: productVariantId },
    });

    if (!productVariant) {
      throw new NotFoundException('Product variant not found');
    }

    if (!productVariant.is_active) {
      throw new BadRequestException('Product variant is not available');
    }

    if (quantity > productVariant.stock) {
      throw new BadRequestException(
        `Quantity exceeds available stock. Maximum available: ${productVariant.stock}`,
      );
    }

    const cart = await this.getOrCreateCart(userId);

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productVariantId: {
          cartId: cart.id,
          productVariantId,
        },
      },
    });

    if (!existingItem) {
      throw new NotFoundException('Item not found in cart');
    }

    return this.prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity },
      select: {
        id: true,
        quantity: true,
        productVariant: {
          select: {
            id: true,
            title: true,
            price: true,
            stock: true,
            product: {
              select: {
                name: true,
                brand: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  // Get cart items count only (lightweight)
  async getCartItemsCount(userId: string) {
    const cart = await this.prisma.shoppingCart.findUnique({
      where: { userId },
      select: {
        items: {
          select: {
            quantity: true,
          },
        },
      },
    });

    if (!cart) {
      return { totalItems: 0 };
    }

    const totalItems = cart.items.length;
    
    return { totalItems };
  }

  // Clear entire cart
  async clearCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return { message: 'Cart cleared successfully' };
  }
}
