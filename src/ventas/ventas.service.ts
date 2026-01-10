import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Venta } from './ventas.entity';
import { DetalleVenta } from './detalle-venta.entity';
import { Producto } from '../productos/productos.entity';
import { ItemCobro } from '../items-cobro/item-cobro.entity';
import moment from 'moment-timezone';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventasRepository: Repository<Venta>,

    @InjectRepository(DetalleVenta)
    private detalleVentaRepository: Repository<DetalleVenta>,

    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,

    @InjectRepository(ItemCobro)
    private itemCobroRepository: Repository<ItemCobro>,
  ) {}

  // Abrir venta
  async abrirVenta(recursoId: number, usuarioId: number) {
    const venta = this.ventasRepository.create({
      recurso: { id: recursoId } as any,
      usuario: { id: usuarioId } as any,
      hora_inicio: moment().tz('America/La_Paz').toDate(),
      estado: 'ABIERTA',
    });

    return this.ventasRepository.save(venta);
  }

  // Obtener ventas abiertas
  obtenerVentasAbiertas() {
    return this.ventasRepository.find({
      where: { estado: 'ABIERTA' },
      relations: ['recurso', 'usuario', 'detalles'],
    });
  }

  // Agregar producto a venta
  async agregarProducto(ventaId: number, productoId: number, cantidad: number) {
    const venta = await this.ventasRepository.findOne({
      where: { id: ventaId },
    });
    if (!venta) throw new NotFoundException('Venta no encontrada');
    if (venta.estado !== 'ABIERTA')
      throw new BadRequestException(
        'No se puede agregar productos a una venta cerrada',
      );

    const producto = await this.productoRepository.findOne({
      where: { id: productoId },
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    const subtotal = Number(producto.precio) * cantidad;

    const detalle = this.detalleVentaRepository.create({
      venta: { id: ventaId } as any,
      producto: { id: productoId } as any,
      nombre_producto: producto.nombre,
      cantidad,
      precio_unitario: producto.precio,
      subtotal,
    });

    await this.detalleVentaRepository.save(detalle);

    // Crear ItemCobro para el producto
    const itemCobro = this.itemCobroRepository.create({
      venta_id: ventaId,
      tipo: 'PRODUCTO',
      descripcion: producto.nombre,
      cantidad,
      monto: subtotal,
      pagado: false,
    });

    await this.itemCobroRepository.save(itemCobro);

    // Actualizar total_productos de la venta
    const totalProductos = await this.detalleVentaRepository
      .createQueryBuilder('detalle')
      .select('SUM(detalle.subtotal)', 'sum')
      .where('detalle.venta_id = :ventaId', { ventaId })
      .getRawOne();

    venta.total_productos = Number(totalProductos.sum) || 0;
    venta.total_venta = Number(
      (venta.total_productos + (venta.total_recurso || 0)).toFixed(2),
    );

    return this.ventasRepository.save(venta);
  }

  // Calcular tiempo y crear ítem de recurso
  async calcularTiempo(id: number) {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: ['recurso', 'itemsCobro'],
    });

    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }

    if (venta.estado !== 'ABIERTA') {
      throw new BadRequestException('La venta no está abierta');
    }

    const horaFin = new Date();

    const diffMs = horaFin.getTime() - new Date(venta.hora_inicio).getTime();
    const duracionHoras = Number((diffMs / (1000 * 60 * 60)).toFixed(2));

    const totalRecurso = Number(
      (duracionHoras * Number(venta.recurso.precio_por_hora)).toFixed(2),
    );

    // Verificar si ya existe un ítem de recurso
    const itemRecursoExistente = venta.itemsCobro.find(item => item.tipo === 'RECURSO');
    if (!itemRecursoExistente) {
      // Crear ItemCobro para el recurso
      const itemRecurso = this.itemCobroRepository.create({
        venta_id: id,
        tipo: 'RECURSO',
        descripcion: venta.recurso.nombre,
        cantidad: null,
        monto: totalRecurso,
        pagado: false,
      });

      await this.itemCobroRepository.save(itemRecurso);
    }

    // Actualizar la venta con hora_fin, duracion, total_recurso
    venta.hora_fin = horaFin;
    venta.duracion_horas = duracionHoras;
    venta.total_recurso = totalRecurso;
    venta.total_venta = Number((Number(venta.total_productos || 0) + totalRecurso).toFixed(2));

    return this.ventasRepository.save(venta);
  }

  // Cerrar venta (solo si todo pagado)
  async cerrarVenta(id: number) {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: ['itemsCobro'],
    });

    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }

    if (venta.estado !== 'ABIERTA') {
      throw new BadRequestException('La venta ya está cerrada o anulada');
    }

    // Verificar que TODOS los items estén pagados
    const itemsPendientes = venta.itemsCobro.filter(item => !item.pagado);
    if (itemsPendientes.length > 0) {
      throw new BadRequestException(
        'No se puede cerrar la venta: hay consumos pendientes de pago'
      );
    }

    venta.estado = 'CERRADA';
    return this.ventasRepository.save(venta);
  }

  // Obtener venta por ID
  async obtenerVentaPorId(id: number) {
    return this.ventasRepository.findOne({
      where: { id },
      relations: ['recurso', 'usuario', 'detalles', 'itemsCobro'],
    });
  }

  // Obtener todas las ventas
  obtenerTodasLasVentas() {
    return this.ventasRepository.find({
      relations: ['recurso', 'usuario', 'detalles'],
      order: { fecha_creacion: 'DESC' },
    });
  }

  // Obtener ventas por fecha
  obtenerVentasPorFecha(fecha: string) {
    const start = new Date(fecha + ' 00:00:00');
    const end = new Date(fecha + ' 23:59:59');
    return this.ventasRepository.find({
      where: {
        fecha_creacion: Between(start, end),
      },
      relations: ['recurso', 'usuario', 'detalles', 'itemsCobro'],
      order: { fecha_creacion: 'DESC' },
    });
  }

  // Anular venta
  async anularVenta(id: number) {
    const venta = await this.ventasRepository.findOne({ where: { id } });
    if (!venta) throw new NotFoundException('Venta no encontrada');
    if (venta.estado === 'ANULADA') throw new BadRequestException('La venta ya está anulada');

    venta.estado = 'ANULADA';
    return this.ventasRepository.save(venta);
  }

  // Pagar item de cobro
  async pagarItemCobro(itemId: number) {
    const item = await this.itemCobroRepository.findOne({
      where: { id: itemId },
      relations: ['venta'],
    });
    if (!item) throw new NotFoundException('Item de cobro no encontrado');
    if (item.pagado) throw new BadRequestException('El item ya está pagado');

    item.pagado = true;
    return this.itemCobroRepository.save(item);
  }
}
