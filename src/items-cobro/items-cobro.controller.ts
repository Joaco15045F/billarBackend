import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ItemsCobroService } from './items-cobro.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('items-cobro')
export class ItemsCobroController {
  constructor(private readonly itemsCobroService: ItemsCobroService) {}

  @Get()
  listarPorVenta(@Query('ventaId') ventaId: number) {
    return this.itemsCobroService.listarPorVenta(Number(ventaId));
  }
}
