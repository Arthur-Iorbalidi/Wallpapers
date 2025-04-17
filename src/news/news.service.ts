import { Injectable, NotFoundException } from '@nestjs/common';
import { News } from './news.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News) private newsRepository: typeof News,
  ) {}

  async getAll() {
    const news = await this.newsRepository.findAll({ include: {all: true}});
    return news.map(item => item.wallpaper);
  }

  async getById(id: number) {
    const news = await this.newsRepository.findOne({
      where: { id },
      include: {all: true}
    });

    if (!news) {
      throw new NotFoundException(`News not found`);
    }

    return news;
  }
}
