import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FilesModule } from './files/files.module';
import { ReportsModule } from './reports/reports.module';
import { NewsModule } from './news/news.module';
import { OrderModule } from './order/order.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderItemModule } from './order-item/order-item.module';
import { StockModule } from './stock/stock.module';
import * as path from 'path';
import { Wallpaper } from './wallpaper/wallpaper.model';
import { Stock } from './stock/stock.model';
import { OrderItem } from './order-item/order-item.model';
import { Order } from './order/order.model';
import { News } from './news/news.model';
import { Collection } from './collection/collection.model';
import { CartItem } from './cart-item/cart-item.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Wallpaper,
        Stock,
        OrderItem,
        Order,
        News,
        Collection,
        CartItem
      ],
      autoLoadModels: true,
    }),
    UserModule,
    AuthModule,
    FilesModule,
    ReportsModule,
    NewsModule,
    OrderModule,
    CartItemModule,
    OrderItemModule,
    StockModule,
  ],
})
export class AppModule {}
