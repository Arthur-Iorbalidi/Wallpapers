import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Stock } from './stock.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [StockController],
  providers: [StockService],
  imports: [
      SequelizeModule.forFeature([
        Stock,
      ]),
    ],
    exports: [StockModule],
})
export class StockModule {}
