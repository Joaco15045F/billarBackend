import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { RecursosService } from './recursos.service';
import { Recurso } from './recurso.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('recursos')
@UseGuards(JwtAuthGuard) // todos los endpoint requieren login
export class RecursosController {
  constructor(private readonly recursosService: RecursosService) {}

  @Get()
  findAll(): Promise<Recurso[]> {
    return this.recursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Recurso | null> {
    return this.recursosService.findOne(id);
  }

  @Post()
  create(@Body() recurso: Partial<Recurso>): Promise<Recurso> {
    return this.recursosService.create(recurso);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() recurso: Partial<Recurso>,
  ): Promise<Recurso | null> {
    return this.recursosService.update(id, recurso);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recursosService.remove(id);
  }
}
