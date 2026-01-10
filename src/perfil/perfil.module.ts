import { Module } from '@nestjs/common';
import { PerfilController } from './perfil.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_jwt_secret_key', // el mismo que usaste en AuthModule
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [PerfilController],
  providers: [JwtAuthGuard],
})
export class PerfilModule {}
