import {
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/order/order.model';
import { Wallpaper } from 'src/wallpaper/wallpaper.model';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: false })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Wallpaper)
  @Column({ type: DataType.INTEGER, allowNull: false })
  wallpaperId: number;

  @BelongsTo(() => Wallpaper)
  wallpaper: Wallpaper;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  priceAtPurchase: number;
}
