import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Wallpaper } from 'src/wallpaper/wallpaper.model';

interface CollectionCreationAttrs {
  name: string;
}

@Table({ tableName: 'collections' })
export class Collection extends Model<Collection, CollectionCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Wallpaper)
  wallpapers: Wallpaper[];
}
