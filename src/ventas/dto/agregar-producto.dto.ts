import { IsNumber } from 'class-validator';

export class AgregarProductoDto {
  @IsNumber()
  productoId: number;

  @IsNumber()
  cantidad: number;
}