import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthModule } from 'src/auth/auth.module';
import { CartItem } from 'src/cart-item/cart-item.model';
import { Order } from 'src/order/order.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([
      User,
      CartItem,
      Order
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
