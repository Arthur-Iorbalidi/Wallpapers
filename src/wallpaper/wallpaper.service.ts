import { Injectable, NotFoundException } from '@nestjs/common';
import { Wallpaper } from './wallpaper.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FilesService } from 'src/files/files.service';

interface GetAllMoviesOptions {
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

  async getAll(options: GetAllMoviesOptions) {
    const {
      sortBy = 'name',
      sortOrder = 'ASC',
      search,
    } = options;

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const movies = await this.wallpaperRepository.findAll({
      where,
      order: [[sortBy, sortOrder]],
    });

    return movies;
  }

  async getById(id: number) {
    const movie = await this.wallpaperRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Movie not found`);
    }

    return movie;
  }
}
