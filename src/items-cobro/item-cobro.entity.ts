import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Venta } from '../ventas/ventas.entity';

@Entity('items_cobro')
export class ItemCobro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  venta_id: number;

  @ManyToOne(() => Venta, (venta) => venta.itemsCobro)
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @Column({
    type: 'enum',
    enum: ['PRODUCTO', 'RECURSO', 'PROMOCION'],
  })
  tipo: 'PRODUCTO' | 'RECURSO' | 'PROMOCION';

  @Column()
  descripcion: string;

  @Column({ type: 'int', nullable: true })
  cantidad: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ default: false })
  pagado: boolean;
}
