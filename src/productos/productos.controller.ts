import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get('activos')
  listarActivos() {
    return this.productosService.listarActivos();
  }

  @Post('crear')
  crear(@Body() body: { nombre: string; precio: number }) {
    return this.productosService.crearProducto(body.nombre, body.precio);
  }

  @Put('actualizar/:id')
  actualizar(
    @Param('id') id: number,
    @Body() body: { nombre: string; precio: number },
  ) {
    return this.productosService.actualizarProducto(id, body.nombre, body.precio);
  }

  @Put('desactivar/:id')
  desactivar(@Param('id') id: number) {
    return this.productosService.desactivarProducto(id);
  }
}
