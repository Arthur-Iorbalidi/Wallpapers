import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Wallpaper } from 'src/wallpaper/wallpaper.model';

interface NewsCreationAttrs {
  id_wallpaper: number;
}

@Table({ tableName: 'news' })
export class News extends Model<News, NewsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Wallpaper)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_wallpaper: number;

  @BelongsTo(() => Wallpaper)
  wallpaper: Wallpaper;
}
