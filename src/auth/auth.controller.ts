import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(
        @Body() body: { nombre_usuario: string; contrasena: string }
    ){
        const usuario = await this.authService.validateUser(body.nombre_usuario, body.contrasena);
        return this.authService.login(usuario);
    }

    @Post('register')
    async register(
        @Body() body: { nombre_usuario: string; contrasena: string }
    ){
        return this.authService.register(body.nombre_usuario, body.contrasena);
    }
}
