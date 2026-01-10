import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Recurso } from '../recursos/recurso.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { DetalleVenta } from './detalle-venta.entity';
import { ItemCobro } from '../items-cobro/item-cobro.entity';

export type EstadoVenta = 'ABIERTA' | 'CERRADA' | 'ANULADA';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recurso)
  @JoinColumn({ name: 'recursos_id' })
  recurso: Recurso;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'datetime' })
  hora_inicio: Date;

  @Column({ type: 'datetime', nullable: true })
  hora_fin: Date | null;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  duracion_horas: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total_recurso: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total_productos: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total_venta: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  metodo_pago: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nota_pago: string;

  @Column({
    type: 'enum',
    enum: ['ABIERTA', 'CERRADA', 'ANULADA'],
    default: 'ABIERTA',
  })
  estado: EstadoVenta;

  @CreateDateColumn()
  fecha_creacion: Date;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta)
  detalles: DetalleVenta[];

  @OneToMany(() => ItemCobro, (item) => item.venta)
  itemsCobro: ItemCobro[];
}
