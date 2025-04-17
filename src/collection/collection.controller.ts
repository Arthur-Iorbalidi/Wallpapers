import { Controller, Get, Param, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
    getAll(
      @Query('sortBy') sortBy?: string,
      @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
      @Query('search') search?: string,
    ) {
      return this.collectionService.getAll({
        sortBy,
        sortOrder,
        search,
      });
    }
  
    @Get(':id')
    getById(@Param('id') id: number) {
      return this.collectionService.getById(id);
    }
}
