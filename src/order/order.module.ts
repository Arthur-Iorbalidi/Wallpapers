import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderItem } from 'src/order-item/order-item.model';
import { User } from 'src/user/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from 'src/cart-item/cart-item.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
      SequelizeModule.forFeature([
        Order,
        OrderItem,
        CartItem,
        User
      ]),
      AuthModule
    ],
    exports: [OrderModule],
})
export class OrderModule {}
