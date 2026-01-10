import { IsNumber } from 'class-validator';

export class AbrirVentaDto {
  @IsNumber()
  recursoId: number;

  @IsNumber()
  usuarioId: number;
}