import { Injectable, NotFoundException } from '@nestjs/common';
import { Wallpaper } from './wallpaper.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

interface GetAllWallpapersOptions {
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
}

@Injectable()
export class WallpaperService {
  constructor(
    @InjectModel(Wallpaper) private wallpaperRepository: typeof Wallpaper,
  ) {}

  async getAll(options: GetAllWallpapersOptions) {
    const {
      sortBy = 'createdAt',
      sortOrder = 'ASC',
      search,
    } = options;

    const where: any = {};

    if (search) {
      const isNumeric = !isNaN(Number(search));
    
      if (isNumeric) {
        where[Op.or] = [
          { id: Number(search) },
        ];
      } else {
        where[Op.or] = [
          { base_material: { [Op.iLike]: `%${search}%` } },
        ];
      }
    }
    

    const wallpapers = await this.wallpaperRepository.findAll({
      where,
      order: [[sortBy, sortOrder]],
      include: {all: true}
    });

    return wallpapers;
  }

  async getById(id: number) {
    const wallpaper = await this.wallpaperRepository.findOne({
      where: { id },
      include: {all: true}
    });

    if (!wallpaper) {
      throw new NotFoundException(`Wallpaper not found`);
    }

    return wallpaper;
  }
}
