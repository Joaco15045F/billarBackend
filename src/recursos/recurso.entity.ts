import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


@Entity('recursos')
export class Recurso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

    @Column({ length: 20 })
    tipo: string;


    @Column('decimal', { precision: 10, scale: 2 })
    precio_por_hora: number;
    

    @Column({ default: true })
    activo: boolean;


    @CreateDateColumn({name: 'fecha_creacion'})
    fecha_creacion: Date;

}