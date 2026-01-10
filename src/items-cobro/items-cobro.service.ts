import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemCobro } from './item-cobro.entity';

@Injectable()
export class ItemsCobroService {
  constructor(
    @InjectRepository(ItemCobro)
    private itemCobroRepository: Repository<ItemCobro>,
  ) {}

  listarPorVenta(ventaId: number) {
    return this.itemCobroRepository.find({
      where: { venta: { id: ventaId } },
    });
  }
}
