import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { CollectService } from './collect.service';
import { AllCollectDto, CreateCollectDto } from './dto/create-collect.dto';
import { UpdateCollectDto } from './dto/update-collect.dto';

@Controller('collect')
export class CollectController {
  constructor(private readonly collectService: CollectService) { }

  @Post()
  create(@Body() createCollectDto: CreateCollectDto) {
    return this.collectService.create(createCollectDto);
  }

  @Get()
  findAll(@Query() allCollectDto: AllCollectDto, @Req() req) {
    return this.collectService.findAll(allCollectDto, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectDto: UpdateCollectDto) {
    return this.collectService.update(+id, updateCollectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectService.remove(+id);
  }
}
