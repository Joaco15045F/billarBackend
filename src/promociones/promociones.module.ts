import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocion } from './promocion.entity';
import { PromocionesService } from './promociones.service';
import { PromocionesController } from './promociones.controller';
import { AuthModule } from '../auth/auth.module';
import { ProductosModule } from '../productos/productos.module';
import { Producto } from '../productos/productos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promocion, Producto]), AuthModule, ProductosModule],
  providers: [PromocionesService],
  controllers: [PromocionesController],
  exports: [PromocionesService],
})
export class PromocionesModule {}