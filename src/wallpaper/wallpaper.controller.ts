import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { WallpaperService } from './wallpaper.service';

@Controller('wallpapers')
export class WallpaperController {
  constructor(private readonly wallpaperService: WallpaperService) {}

  @Get()
  getAll(
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Query('search') search?: string,
  ) {
    return this.wallpaperService.getAll({
      sortBy,
      sortOrder,
      search,
    });
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.wallpaperService.getById(id);
  }
}
