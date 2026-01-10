import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsCobroService } from './items-cobro.service';
import { ItemsCobroController } from './items-cobro.controller';
import { ItemCobro } from './item-cobro.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ItemCobro]), AuthModule],
  providers: [ItemsCobroService],
  controllers: [ItemsCobroController]
})
export class ItemsCobroModule {}
