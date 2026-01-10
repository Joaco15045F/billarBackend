import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('perfil')
export class PerfilController {
    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(@Req() req) {
        return req.user;
    }
}