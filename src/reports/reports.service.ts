import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class ReportsService {
  constructor(private orderService: OrderService) {}

  async generateOrderReportById(userId: number, orderId: number): Promise<Buffer> {
    const order = await this.orderService.getOrderById(userId, orderId);

    const itemsTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('ID товара')] }),
            new TableCell({ children: [new Paragraph('Кол-во')] }),
            new TableCell({ children: [new Paragraph('Цена за штуку')] }),
          ],
        }),
        ...order.items.map((item) =>
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(item.wallpaperId.toString())] }),
              new TableCell({ children: [new Paragraph(item.quantity.toString())] }),
              new TableCell({ children: [new Paragraph(item.priceAtPurchase.toFixed(2))] }),
            ],
          }),
        ),
      ],
    });

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Отчёт по заказу №${order.id}`,
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            new Paragraph(`Дата заказа: ${order.createdAt.toLocaleString()}`),
            new Paragraph(`Общая стоимость: ${order.totalPrice.toFixed(2)}₽`),
            new Paragraph(''),
            new Paragraph({
              children: [
                new TextRun({ text: 'Список товаров:', bold: true }),
              ],
            }),
            itemsTable,
          ],
        },
      ],
    });

    return await Packer.toBuffer(doc);
  }
}
