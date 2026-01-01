import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return this.usuarioRepository.findOneBy({ id });
  }

  create(usuario: Partial<Usuario>) {
    // Si viene la contraseña en "usuario.contrasena", la convertimos a hash
    if ((usuario as any).contrasena) {
      usuario.contrasena_hash = bcrypt.hashSync(
        (usuario as any).contrasena,
        10,
      );
      delete (usuario as any).contrasena; // borramos la propiedad para no guardarla
    }

    const nuevoUsuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(nuevoUsuario);
  }

  remove(id: number) {
    return this.usuarioRepository.delete(id);
  }
}
