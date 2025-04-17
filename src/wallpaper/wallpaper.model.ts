import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Collection } from 'src/collection/collection.model';
import { Stock } from 'src/stock/stock.model';

interface WallpaperCreationAttrs {
  base_material: string;
  size: number;
  price: number;
  id_collection: number;
}

@Table({ tableName: 'wallpapers' })
export class Wallpaper extends Model<Wallpaper, WallpaperCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  base_material: string;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  size: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  price: number;

  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @ForeignKey(() => Collection)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_collection: number;

  @BelongsTo(() => Collection)
  collection: Collection;

  @ForeignKey(() => Stock)
  @Column({ type: DataType.INTEGER, allowNull: true })
  stockId: number;

  @BelongsTo(() => Stock)
  stock: Stock;
}
