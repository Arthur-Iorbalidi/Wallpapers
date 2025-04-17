import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrderItem } from 'src/order-item/order-item.model';
import { CartItem } from 'src/cart-item/cart-item.model';
import { Wallpaper } from 'src/wallpaper/wallpaper.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderRepo: typeof Order,
    @InjectModel(OrderItem) private orderItemRepo: typeof OrderItem,
    @InjectModel(CartItem) private cartRepo: typeof CartItem,
  ) {}

  async createOrder(userId: number) {
    const cartItems = await this.cartRepo.findAll({
      where: { userId },
      include: [Wallpaper],
    });

    if (!cartItems.length) {
      throw new BadRequestException('Cart is empty');
    }

    const order = await this.orderRepo.create({ userId });

    const orderItems = cartItems.map((item) => ({
      orderId: order.id,
      wallpaperId: item.wallpaperId,
      quantity: item.quantity,
      priceAtPurchase: item.wallpaper.price,
    }));

    await this.orderItemRepo.bulkCreate(orderItems);

    await this.cartRepo.destroy({ where: { userId } });

    return order;
  }

  async removeOrder(userId: number, orderId: number) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.orderItemRepo.destroy({ where: { orderId } });
    await order.destroy();

    return { message: 'Order deleted' };
  }

  async getOrders(userId: number) {
    return this.orderRepo.findAll({
      where: { userId },
      include: [OrderItem],
    });
  }

  async getOrderById(userId: number, orderId: number) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId, userId },
      include: [OrderItem],
    });
  
    if (!order) {
      throw new NotFoundException('Order not found');
    }
  
    return order;
  }
}
