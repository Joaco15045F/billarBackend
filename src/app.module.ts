import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';
import { PerfilModule } from './perfil/perfil.module';
import { RecursosModule } from './recursos/recursos.module';
import { VentasModule } from './ventas/ventas.module';
import { ProductosModule } from './productos/productos.module';
import { ItemsCobroModule } from './items-cobro/items-cobro.module';
import { PromocionesModule } from './promociones/promociones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      timezone: '-04:00',
    }),
    UsuarioModule,
    AuthModule,
    PerfilModule,
    RecursosModule,
    VentasModule,
    ProductosModule,
    ItemsCobroModule,
    PromocionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
