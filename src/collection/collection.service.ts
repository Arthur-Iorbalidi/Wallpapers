import { Injectable, NotFoundException } from '@nestjs/common';
import { Collection } from './collection.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

interface GetAllCollectionsOptions {
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
}

@Injectable()
export class CollectionService {
  constructor(
      @InjectModel(Collection) private collectionRepository: typeof Collection,
    ) {}
  
    async getAll(options: GetAllCollectionsOptions) {
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

    const collections = await this.collectionRepository.findAll({
      where,
      order: [[sortBy, sortOrder]],
      include: {all: true}
    });

    return collections;
  }

  async getById(id: number) {
    const collection = await this.collectionRepository.findOne({
      where: { id },
      include: {all: true}
    });

    if (!collection) {
      throw new NotFoundException(`Collection not found`);
    }

    return collection;
  }
}
