import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './productos.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  // Listar todos los productos activos
  listarActivos() {
    return this.productoRepository.find({ where: { activo: true } });
  }

  // Crear nuevo producto
  crearProducto(nombre: string, precio: number) {
    const producto = this.productoRepository.create({ nombre, precio });
    return this.productoRepository.save(producto);
  }

  // Editar producto
  actualizarProducto(id: number, nombre: string, precio: number) {
    return this.productoRepository.update(id, { nombre, precio });
  }

  // Desactivar producto
  desactivarProducto(id: number) {
    return this.productoRepository.update(id, { activo: false });
  }
}
