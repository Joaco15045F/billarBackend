import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecursosService } from './recursos.service';
import { RecursosController } from './recursos.controller';
import { Recurso } from './recurso.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Recurso]),
    AuthModule, 
  ],
  providers: [RecursosService],
  controllers: [RecursosController]
})
export class RecursosModule {}
