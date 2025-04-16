import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { Wallpaper } from 'src/wallpaper/wallpaper.model';

interface CartItemCreationAttrs {
  userId: number;
  wallpaperId: number;
  quantity: number;
}

@Table({ tableName: 'cart-items' })
export class CartItem extends Model<CartItem, CartItemCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Wallpaper)
  @Column({ type: DataType.INTEGER, allowNull: false })
  wallpaperId: number;

  @BelongsTo(() => Wallpaper)
  wallpaper: Wallpaper;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  quantity: number;
}
