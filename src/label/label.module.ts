import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label, LabelEntity } from './entities/label.entity';


@Module({
  imports: [TypeOrmModule.forFeature([LabelEntity, Label])],
  controllers: [LabelController],
  providers: [LabelService]
})
export class LabelModule { }
