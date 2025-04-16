import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderItem } from 'src/order-item/order-item.model';
import { User } from 'src/user/user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
      SequelizeModule.forFeature([
        Order,
        OrderItem,
        User
      ]),
    ],
    exports: [OrderModule],
})
export class OrderModule {}
