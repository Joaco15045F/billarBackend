import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promocion, TipoPromocion } from './promocion.entity';
import { Producto } from '../productos/productos.entity';

@Injectable()
export class PromocionesService {
  constructor(
    @InjectRepository(Promocion)
    private promocionRepository: Repository<Promocion>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async crearPromocion(data: Partial<Promocion>): Promise<Promocion> {
    const promocion = this.promocionRepository.create(data);
    return this.promocionRepository.save(promocion);
  }

  async obtenerPromocionesActivas(): Promise<Promocion[]> {
    return this.promocionRepository.find({ where: { activa: true } });
  }

  async obtenerPromocionPorId(id: number): Promise<Promocion> {
    const promocion = await this.promocionRepository.findOne({ where: { id } });
    if (!promocion) throw new NotFoundException('Promoción no encontrada');
    return promocion;
  }

  async verificarPromocionTiempo(tiempoHoras: number): Promise<Promocion | null> {
    const promociones = await this.obtenerPromocionesActivas();
    return promociones.find(p =>
      p.tipo === TipoPromocion.TIEMPO_CON_REGALO &&
      p.condicion.tiempo_minimo <= tiempoHoras
    ) || null;
  }

  async aplicarRegaloPromocion(ventaId: number, opcionSeleccionada: string): Promise<any> {
    // Lógica para aplicar el regalo basado en la opción
    // Esto se integrará con ventas.service
    const productoMap = {
      'cerveza': 'Cerveza en Lata',
      'coca': 'Coca Machucada',
      'soda': 'Soda 2 Litros',
    };

    if (opcionSeleccionada === 'hora_gratis') {
      // Extender tiempo +1 hora gratis
      return { tipo: 'DESCUENTO_TIEMPO', descripcion: '1 hora gratis adicional', monto: 0 };
    } else if (productoMap[opcionSeleccionada]) {
      const producto = await this.productoRepository.findOne({ where: { nombre: productoMap[opcionSeleccionada] } });
      if (!producto) throw new NotFoundException('Producto no encontrado');
      return {
        tipo: 'PRODUCTO',
        descripcion: productoMap[opcionSeleccionada],
        cantidad: 1,
        monto: 0, // Gratis
        producto_id: producto.id
      };
    }
    throw new NotFoundException('Opción de regalo inválida');
  }
}