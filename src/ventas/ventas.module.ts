import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './ventas.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DetalleVenta } from './detalle-venta.entity';
import { Producto } from 'src/productos/productos.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { ItemCobro } from '../items-cobro/item-cobro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, DetalleVenta, Producto, ItemCobro]), AuthModule, ProductosModule],
  providers: [VentasService],
  controllers: [VentasController]
})
export class VentasModule {}
