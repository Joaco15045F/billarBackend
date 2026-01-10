import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException(
        'No se proporcionó el token de autenticación',
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token de autenticación inválido');
    }

    try {
      const payload = this.jwtService.verify(token);
      request['user'] = payload; // Adjuntar el payload al request
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Token de autenticación inválido o expirado',
      );
    }
  }
}
