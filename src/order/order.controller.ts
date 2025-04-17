import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async create(@Request() req) {
    return this.orderService.createOrder(req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return this.orderService.removeOrder(req.user.id, +id);
  }

  @Get()
  async getAll(@Request() req) {
    return this.orderService.getOrders(req.user.id);
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @Request() req) {
    return this.orderService.getOrderById(req.user.id, +id);
  }

}
