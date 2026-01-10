import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuarios/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
    ){}


    async validateUser(nombre_usuario: string, contrasena: string){
        const usuario = await this.usuarioService.findByNombre(nombre_usuario);
        if (!usuario){
            throw new UnauthorizedException('Usuario no encontrado');
        }

        const isPasswordMatch = await bcrypt.compare(contrasena, usuario.contrasena_hash);
        if (!isPasswordMatch){
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        return usuario;
    }


    async login(usuario: any){
        const payload = { nombre_usuario: usuario.nombre_usuario, sub: usuario.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(nombre_usuario: string, contrasena: string){
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        return this.usuarioService.create({ nombre_usuario, contrasena_hash: hashedPassword });
    }
}
