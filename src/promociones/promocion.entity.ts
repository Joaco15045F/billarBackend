import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum TipoPromocion {
  TIEMPO_CON_REGALO = 'TIEMPO_CON_REGALO',
  PRODUCTO_GRATIS = 'PRODUCTO_GRATIS',
  DESCUENTO_TIEMPO = 'DESCUENTO_TIEMPO',
}

@Entity('promociones')
export class Promocion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'enum', enum: TipoPromocion })
  tipo: TipoPromocion;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'json' })
  condicion: any; // Ej: { tiempo_minimo: 2 }

  @Column({ type: 'json' })
  beneficio: any; // Ej: { opciones: ['cerveza', 'coca', 'soda', 'hora_gratis'] }

  @Column({ default: true })
  activa: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;
}