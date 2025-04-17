import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { Collection } from './collection.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallpaper } from 'src/wallpaper/wallpaper.model';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService],
  imports: [
      SequelizeModule.forFeature([
        Collection,
        Wallpaper
      ]),
    ],
    exports: [CollectionModule],
})
export class CollectionModule {}
