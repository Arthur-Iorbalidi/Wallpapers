import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderItem } from 'src/order-item/order-item.model';
import { User } from 'src/user/user.model';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
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

  @HasMany(() => OrderItem)
  items: OrderItem[];

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'pending' })
  status: string;

  @Column({ type: DataType.DOUBLE, allowNull: false, defaultValue: 0 })
  totalPrice: number;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  createdAt: Date;
}
