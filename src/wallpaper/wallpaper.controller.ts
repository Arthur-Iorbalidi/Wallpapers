import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { WallpaperService } from './wallpaper.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('wallpapers')
export class WallpaperController {
  constructor(private readonly movieService: WallpaperService) {}

  @Get()
  getAll(
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Query('search') search?: string,
  ) {
    return this.movieService.getAll({
      sortBy,
      sortOrder,
      search,
    });
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.movieService.getById(id);
  }
}
