import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PromocionesService } from './promociones.service';
import { Promocion } from './promocion.entity';

@Controller('promociones')
@UseGuards(JwtAuthGuard)
export class PromocionesController {
  constructor(private readonly promocionesService: PromocionesService) {}

  @Post()
  async crear(@Body() data: Partial<Promocion>): Promise<Promocion> {
    return this.promocionesService.crearPromocion(data);
  }

  @Get()
  async obtenerActivas(): Promise<Promocion[]> {
    return this.promocionesService.obtenerPromocionesActivas();
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: string): Promise<Promocion> {
    return this.promocionesService.obtenerPromocionPorId(+id);
  }
}