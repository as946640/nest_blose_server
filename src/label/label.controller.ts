import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { LabelEntity } from './entities/label.entity';
import { ResultData } from '@/common/utils/result';
import { AllLabelDto } from './dto/label.dto';
import { AllowAnon } from '@/common/decorators/allow-anon.decorator';

@ApiTags('文章标签')
@Controller('label')
@ApiExtraModels(ResultData, LabelEntity)
export class LabelController {
  constructor(private readonly labelService: LabelService) { }

  @Post()
  create(@Body() createLabelDto: CreateLabelDto, @Req() req) {
    return this.labelService.create(createLabelDto, req.user);
  }

  @Get()
  @AllowAnon()
  findAll(@Query() allLabelDto: AllLabelDto) {
    return this.labelService.findAll(allLabelDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto) {
    return this.labelService.update(+id, updateLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labelService.remove(+id);
  }
}
