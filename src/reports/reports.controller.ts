import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('order/:id')
  async getOrderReportById(
    @Req() req,
    @Res() res: Response,
    @Param('id') orderId: string,
  ) {
    const buffer = await this.reportsService.generateOrderReportById(
      req.user.id,
      parseInt(orderId),
    );

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=order-${orderId}-report.docx`,
    );

    res.send(buffer);
  }
}
