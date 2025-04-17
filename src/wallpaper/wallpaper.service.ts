import { Injectable, NotFoundException } from '@nestjs/common';
import { Wallpaper } from './wallpaper.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FilesService } from 'src/files/files.service';

interface GetAllWallpapersOptions {
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
}

@Injectable()
export class WallpaperService {
  constructor(
    @InjectModel(Wallpaper) private wallpaperRepository: typeof Wallpaper,
    private fileService: FilesService,
  ) {}

  async getAll(options: GetAllWallpapersOptions) {
    const {
      sortBy = 'createdAt',
      sortOrder = 'ASC',
      search,
    } = options;

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { id: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const wallpapers = await this.wallpaperRepository.findAll({
      where,
      order: [[sortBy, sortOrder]],
    });

    return wallpapers;
  }

  async getById(id: number) {
    const wallpaper = await this.wallpaperRepository.findOne({
      where: { id },
    });

    if (!wallpaper) {
      throw new NotFoundException(`Movie not found`);
    }

    return wallpaper;
  }
}
