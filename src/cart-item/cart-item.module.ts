import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { CartItem } from './cart-item.model';
import { User } from 'src/user/user.model';
import { Wallpaper } from 'src/wallpaper/wallpaper.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [CartItemController],
  providers: [CartItemService],
  imports: [
      SequelizeModule.forFeature([
        CartItem,
        User,
        Wallpaper
      ]),
    ],
    exports: [CartItemModule],
})
export class CartItemModule {}
