import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { CollectEntity } from './entities/collect.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CollectEntity])],
  controllers: [CollectController],
  providers: [CollectService]
})
export class CollectModule {}
