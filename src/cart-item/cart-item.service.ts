import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './cart-item.model';

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem)
    private cartItemRepository: typeof CartItem,
  ) {}

  async addToCart(userId: number, wallpaperId: number, quantity: number = 1) {
    const [item, created] = await this.cartItemRepository.findOrCreate({
      where: { userId, wallpaperId },
      defaults: { quantity },
    });

    if (!created) {
      item.quantity += quantity;
      await item.save();
    }

    return item;
  }

  async removeFromCart(userId: number, cartItemId: number) {
    const item = await this.cartItemRepository.findOne({
      where: { id: cartItemId, userId },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    await item.destroy();
    return { message: 'Removed from cart' };
  }

  async getCart(userId: number) {
    return this.cartItemRepository.findAll({
      where: { userId },
      include: { all: true },
    });
  }
}
