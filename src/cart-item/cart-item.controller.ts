import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartItemController {
  constructor(private cartService: CartItemService) {}

  @Post()
  async add(
    @Body('wallpaperId') wallpaperId: number,
    @Body('quantity') quantity: number,
    @Request() req,
  ) {
    return this.cartService.addToCart(req.user.id, wallpaperId, quantity);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return this.cartService.removeFromCart(req.user.id, id);
  }

  @Get()
  async getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }
}
