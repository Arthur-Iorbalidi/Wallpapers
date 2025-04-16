import { Controller } from '@nestjs/common';
import { CartItemService } from './cart-item.service';

@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}
}
