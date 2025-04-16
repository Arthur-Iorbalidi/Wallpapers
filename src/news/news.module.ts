import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './news.model';
import { Wallpaper } from 'src/wallpaper/wallpaper.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
      SequelizeModule.forFeature([
        News,
        Wallpaper
      ]),
    ],
    exports: [NewsModule],
})
export class NewsModule {}
