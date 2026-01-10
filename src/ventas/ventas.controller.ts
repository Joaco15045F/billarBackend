import { Controller, Post, Get, Param, Body, UseGuards, Query } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AbrirVentaDto } from './dto/abrir-venta.dto';
import { AgregarProductoDto } from './dto/agregar-producto.dto';

@UseGuards(JwtAuthGuard)
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post('abrir')
  abrir(@Body() body: AbrirVentaDto) {
    return this.ventasService.abrirVenta(body.recursoId, body.usuarioId);
  }

  @Get('abierta')
  obtenerAbiertas() {
    return this.ventasService.obtenerVentasAbiertas();
  }

  @Post('cerrar/:id')
  cerrar(@Param('id') id: number) {
    return this.ventasService.cerrarVenta(Number(id));
  }

  @Post('calcular/:id')
  calcular(@Param('id') id: number) {
    return this.ventasService.calcularTiempo(Number(id));
  }

  @Post(':id/productos')
  agregarProducto(
    @Param('id') ventaId: number,
    @Body() body: AgregarProductoDto,
  ) {
    return this.ventasService.agregarProducto(
      Number(ventaId),
      body.productoId,
      body.cantidad,
    );
  }

  @Get(':id')
  obtenerVenta(@Param('id') id: number) {
    return this.ventasService.obtenerVentaPorId(Number(id));
  }

  @Get()
  obtenerTodas(@Query('fecha') fecha?: string) {
    if (fecha) {
      return this.ventasService.obtenerVentasPorFecha(fecha);
    }
    return this.ventasService.obtenerTodasLasVentas();
  }

  @Post('anular/:id')
  anular(@Param('id') id: number) {
    return this.ventasService.anularVenta(Number(id));
  }

  @Post('items-cobro/:itemId/pagar')
  pagarItem(@Param('itemId') itemId: number) {
    return this.ventasService.pagarItemCobro(Number(itemId));
  }
}
