import { Module } from '@nestjs/common';
import { WallpaperController } from './wallpaper.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { FilesModule } from 'src/files/files.module';
import { WallpaperService } from './wallpaper.service';
import { Wallpaper } from './wallpaper.model';

@Module({
  controllers: [WallpaperController],
  providers: [WallpaperService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Wallpaper
    ]),
    FilesModule,
  ],
  exports: [WallpaperModule],
})
export class WallpaperModule {}
