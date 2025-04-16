import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { OrderItem } from './order-item.model';
import { Order } from 'src/order/order.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { Wallpaper } from 'src/wallpaper/wallpaper.model';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService],
  imports: [
      SequelizeModule.forFeature([
        OrderItem,
        Order,
        Wallpaper,
      ]),
      FilesModule,
    ],
    exports: [OrderItemModule],
})
export class OrderItemModule {}
