import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { User } from '../auth/auth.types';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  // Get user's cart
  @Get()
  async getCart(@GetUser() user: User) {
    return this.cartService.getCart(user.id);
  }

  // Get cart items count only
  @Get('count')
  async getCartItemsCount(@GetUser() user: User) {
    return this.cartService.getCartItemsCount(user.id);
  }

  // Add product to cart (default quantity = 1)
  @Post('add')
  async addToCart(@GetUser() user: User, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(user.id, addToCartDto);
  }

  // Update cart item quantity
  @Put('update/:productVariantId')
  async updateCartItemQuantity(
    @GetUser() user: User,
    @Param('productVariantId', ParseUUIDPipe) productVariantId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItemQuantity(
      user.id,
      productVariantId,
      updateCartItemDto,
    );
  }

  // Remove product from cart
  @Delete('remove/:productVariantId')
  async removeFromCart(
    @GetUser() user: User,
    @Param('productVariantId', ParseUUIDPipe) productVariantId: string,
  ) {
    return this.cartService.removeFromCart(user.id, productVariantId);
  }

  // Clear entire cart
  @Delete('clear')
  async clearCart(@GetUser() user: User) {
    return this.cartService.clearCart(user.id);
  }
}