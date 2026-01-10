import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recurso } from './recurso.entity';

@Injectable()
export class RecursosService {
  constructor(
    @InjectRepository(Recurso)
    private recursoRepository: Repository<Recurso>,
  ) {}

  findAll(): Promise<Recurso[]> {
    return this.recursoRepository.find();
  }

  findOne(id: number): Promise<Recurso | null> {
    return this.recursoRepository.findOneBy({ id });
  }

  create(recurso: Partial<Recurso>): Promise<Recurso> {
    const nuevo = this.recursoRepository.create(recurso);
    return this.recursoRepository.save(nuevo);
  }

  async update(id: number, recurso: Partial<Recurso>): Promise<Recurso | null> {
    await this.recursoRepository.update(id, recurso);
    return this.findOne(id);
  }

  remove(id: number): Promise<any> {
    return this.recursoRepository.delete(id);
  }
}
