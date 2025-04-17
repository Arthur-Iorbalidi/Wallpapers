import { Controller, Get, Param, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getAll() {
    return this.newsService.getAll();
  }
  
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.newsService.getById(id);
  }
}
